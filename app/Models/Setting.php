<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
        'description',
        'is_public',
        'validation_rules',
        'sort_order',
        'is_locked',
    ];

    protected $casts = [
        'validation_rules' => 'array',
        'is_public' => 'boolean',
        'is_locked' => 'boolean',
        'sort_order' => 'integer',
    ];

    // Cache settings for 1 hour
    private static int $cacheTime = 3600;

    /**
     * Boot the model and set up event listeners
     */
    protected static function boot()
    {
        parent::boot();

        // Clear cache when settings are modified
        static::saved(function () {
            Cache::forget('settings.all');
            Cache::forget('settings.public');
        });

        static::deleted(function () {
            Cache::forget('settings.all');
            Cache::forget('settings.public');
        });
    }

    /**
     * Get the casted value based on the setting type
     */
    public function getCastedValueAttribute()
    {
        return match ($this->type) {
            'boolean' => filter_var($this->value, FILTER_VALIDATE_BOOLEAN),
            'integer' => (int) $this->value,
            'float' => (float) $this->value,
            'json', 'tags' => json_decode($this->value, true),
            'file', 'image' => $this->value ? Storage::url($this->value) : null,
            default => $this->value,
        };
    }

    /**
     * Get the raw value for storage
     */
    public function getRawValueAttribute()
    {
        return $this->value;
    }

    /**
     * Scope to get settings by group
     */
    public function scopeGroup($query, string $group)
    {
        return $query->where('group', $group);
    }

    /**
     * Scope to get public settings only
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Scope to get settings ordered by sort_order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('key');
    }

    /**
     * Get a setting value by key
     */
    public static function get(string $key, $default = null)
    {
        $settings = static::getAllCached();

        if (!isset($settings[$key])) {
            return $default;
        }

        $setting = $settings[$key];

        return match ($setting['type']) {
            'boolean' => filter_var($setting['value'], FILTER_VALIDATE_BOOLEAN),
            'integer' => (int) $setting['value'],
            'float' => (float) $setting['value'],
            'json', 'tags' => json_decode($setting['value'], true),
            'file', 'image' => $setting['value'] ? Storage::url($setting['value']) : null,
            default => $setting['value'],
        };
    }

    /**
     * Set a setting value by key
     */
    public static function set(string $key, $value, ?string $type = null): self
    {
        $setting = static::firstOrNew(['key' => $key]);

        // Auto-detect type if not provided
        if (!$type && !$setting->exists) {
            $type = static::detectType($value);
        }

        // Handle file uploads
        if (in_array($type ?? $setting->type, ['file', 'image']) && is_object($value)) {
            $value = static::handleFileUpload($value, $type ?? $setting->type);
        }

        // Convert value to string for storage
        $setting->value = match ($type ?? $setting->type) {
            'boolean' => $value ? '1' : '0',
            'json', 'tags' => json_encode($value),
            default => (string) $value,
        };

        if ($type) {
            $setting->type = $type;
        }

        // Validate if rules exist
        if ($setting->validation_rules) {
            $validator = Validator::make(['value' => $value], [
                'value' => $setting->validation_rules
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
        }

        $setting->save();

        return $setting;
    }

    /**
     * Get all settings by group
     */
    public static function getGroup(string $group): array
    {
        $settings = static::getAllCached();

        return collect($settings)
            ->filter(fn($setting) => $setting['group'] === $group)
            ->map(fn($setting) => static::castValue($setting['value'], $setting['type']))
            ->toArray();
    }

    /**
     * Get all public settings (for frontend)
     */
    public static function getPublic(): array
    {
        return Cache::remember('settings.public', static::$cacheTime, function () {
            return static::public()
                ->pluck('value', 'key')
                ->map(function ($value, $key) {
                    $setting = static::where('key', $key)->first();
                    return static::castValue($value, $setting->type);
                })
                ->toArray();
        });
    }

    /**
     * Get all settings (cached)
     */
    private static function getAllCached(): array
    {
        return Cache::remember('settings.all', static::$cacheTime, function () {
            return static::all()
                ->keyBy('key')
                ->map(fn($setting) => [
                    'value' => $setting->value,
                    'type' => $setting->type,
                    'group' => $setting->group,
                ])
                ->toArray();
        });
    }

    /**
     * Cast value based on type
     */
    private static function castValue($value, string $type)
    {
        return match ($type) {
            'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN),
            'integer' => (int) $value,
            'float' => (float) $value,
            'json', 'tags' => json_decode($value, true),
            'file', 'image' => $value ? Storage::url($value) : null,
            default => $value,
        };
    }

    /**
     * Auto-detect the type of a value
     */
    private static function detectType($value): string
    {
        if (is_bool($value)) {
            return 'boolean';
        }

        if (is_int($value)) {
            return 'integer';
        }

        if (is_float($value)) {
            return 'float';
        }

        if (is_array($value)) {
            // If array contains only strings, treat as tags
            if (array_is_list($value) && !empty($value) && array_filter($value, 'is_string') === $value) {
                return 'tags';
            }
            return 'json';
        }

        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return 'email';
        }

        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return 'url';
        }

        return 'string';
    }

    /**
     * Handle file upload
     */
    private static function handleFileUpload($file, string $type): string
    {
        $directory = $type === 'image' ? 'settings/images' : 'settings/files';
        return $file->store($directory, 'public');
    }

    /**
     * Delete a setting
     */
    public static function forget(string $key): bool
    {
        $setting = static::where('key', $key)->first();

        if (!$setting) {
            return false;
        }

        if ($setting->is_locked) {
            throw new \Exception('Cannot delete locked setting: ' . $key);
        }

        // Delete associated file if it exists
        if (in_array($setting->type, ['file', 'image']) && $setting->value) {
            $path = str_replace('/storage/', '', parse_url($setting->value, PHP_URL_PATH));
            Storage::disk('public')->delete($path);
        }

        return $setting->delete();
    }

    /**
     * Check if a setting exists
     */
    public static function has(string $key): bool
    {
        $settings = static::getAllCached();
        return isset($settings[$key]);
    }
}
