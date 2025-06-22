<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Actions\Action;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Concerns\InteractsWithFormActions;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ManageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use InteractsWithFormActions;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $view = 'filament.pages.manage-settings';

    protected static ?string $title = 'Settings';

    protected static ?string $navigationGroup = 'System';

    protected static ?int $navigationSort = 100;

    /**
     * @var array<string, mixed>
     */
    public array $data = [];

    public function mount(): void
    {
        // Ensure settings exist in database
        if (Setting::count() === 0) {
            Artisan::call('db:seed', ['--class' => 'SettingSeeder']);
        }

        $this->data = $this->getFormData();
        $this->form->fill($this->data);
    }

    /**
     * @return array<string, mixed>
     */
    protected function getFormData(): array
    {
        $settings = Setting::all()->keyBy('key');
        $data = [];

        foreach ($settings as $key => $setting) {
            // Convert dotted keys to underscore for form fields
            $fieldName = str_replace('.', '_', $key);
            $data[$fieldName] = match ($setting->type) {
                'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
                'integer' => (int) ($setting->value ?? 0),
                'float' => (float) ($setting->value ?? 0.0),
                'json', 'tags' => json_decode($setting->value ?? '[]', true),
                default => $setting->value ?? '',
            };
        }

        return $data;
    }

    public function form(Form $form): Form
    {
        $settings = Setting::all()->groupBy('group');
        $tabs = [];

        foreach ($settings as $group => $groupSettings) {
            $components = [];

            foreach ($groupSettings->sortBy('sort_order') as $setting) {
                $component = $this->createFormField($setting);
                if ($component) {
                    $components[] = $component;
                }
            }

            if (!empty($components)) {
                $tabs[] = Tab::make(ucfirst((string) ($group ?: 'General')))
                    ->schema($components)
                    ->icon($this->getGroupIcon(is_string($group) ? $group : null));
            }
        }

        return $form
            ->schema([
                Tabs::make('settings_tabs')
                    ->tabs($tabs)
                    ->persistTabInQueryString()
                    ->columnSpanFull(),
            ])
            ->statePath('data');
    }

    protected function createFormField(Setting $setting): mixed
    {
        $label = $this->formatLabel($setting->key);
        $helperText = $setting->description ?? '';
        $required = in_array('required', $setting->validation_rules ?? []);

        // Use array notation for dotted keys
        $fieldName = str_replace('.', '_', $setting->key);

        return match ($setting->type) {
            'boolean' => Checkbox::make($fieldName)
                ->label($label)
                ->helperText($helperText),

            'integer' => TextInput::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->numeric()
                ->required($required),

            'float' => TextInput::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->numeric()
                ->step(0.01)
                ->required($required),

            'email' => TextInput::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->email()
                ->required($required),

            'url' => TextInput::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->url()
                ->required($required),

            'file' => FileUpload::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->disk(config('filesystems.default'))
                ->directory('settings/files')
                ->visibility('public')
                ->acceptedFileTypes(['application/pdf', 'image/*', '.ico'])
                ->maxSize(2048)
                ->required($required),

            'image' => FileUpload::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->disk(config('filesystems.default'))
                ->directory('settings/images')
                ->visibility('public')
                ->fetchFileInformation(false)
                ->image()
                ->imageEditor()
                ->maxSize(5120)
                ->required($required),

            'tags' => TagsInput::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->required($required),

            'string' => $this->createStringField($setting, $fieldName, $label, $helperText, $required),

            default => TextInput::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->required($required),
        };
    }

    protected function createStringField(Setting $setting, string $fieldName, string $label, string $helperText, bool $required): mixed
    {
        // Special handling for certain string fields
        if (str_contains($setting->key, 'color')) {
            return ColorPicker::make($fieldName)
                ->label($label)
                ->helperText($helperText);
        }

        if (str_contains($setting->key, 'theme')) {
            return Select::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->options([
                    'light' => 'Light',
                    'dark' => 'Dark',
                    'auto' => 'Auto',
                ])
                ->required($required);
        }

        if (str_contains($setting->key, 'description') ||
            str_contains($setting->key, 'robots') ||
            strlen($setting->value ?? '') > 100) {
            return Textarea::make($fieldName)
                ->label($label)
                ->helperText($helperText)
                ->rows(3)
                ->required($required);
        }

        return TextInput::make($fieldName)
            ->label($label)
            ->helperText($helperText)
            ->required($required);
    }

    protected function formatLabel(string $key): string
    {
        $parts = explode('.', $key);
        $label = end($parts);
        return ucwords(str_replace(['_', '-'], ' ', $label));
    }

    protected function getGroupIcon(string|null $group): string
    {
        return match ($group) {
            'general' => 'heroicon-o-home',
            'contact' => 'heroicon-o-envelope',
            'social' => 'heroicon-o-share',
            'seo' => 'heroicon-o-magnifying-glass',
            'appearance' => 'heroicon-o-paint-brush',
            'features' => 'heroicon-o-puzzle-piece',
            'resume' => 'heroicon-o-document-text',
            default => 'heroicon-o-cog-6-tooth',
        };
    }

    /**
     * @return array<Action>
     */
    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Settings')
                ->submit('save')
                ->keyBindings(['mod+s']),

            Action::make('reset')
                ->label('Reset to Defaults')
                ->color('gray')
                ->requiresConfirmation()
                ->action('resetToDefaults'),

            Action::make('clearCache')
                ->label('Clear Cache')
                ->color('warning')
                ->action('clearSettingsCache'),
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $fieldName => $value) {
            $key = Str::replaceFirst('_', '.', $fieldName);
            $setting = Setting::where('key', $key)->first();

            if (!$setting) {
                continue;
            }

            if (is_null($value) || (is_string($value) && trim($value) === '')) {
                $value = '';
            }

            $processedValue = match ($setting->type) {
                'boolean' => $value ? '1' : '0',
                'json', 'tags' => json_encode($value),
                default => (string) $value,
            };

            $setting->update(['value' => $processedValue]);
        }

        // Clear settings cache
        Cache::forget('settings.all');
        Cache::forget('settings.public');

        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }

    public function resetToDefaults(): void
    {
        // Run the seeder to reset to defaults
        Artisan::call('db:seed', ['--class' => 'SettingSeeder']);

        // Clear cache
        Cache::forget('settings.all');
        Cache::forget('settings.public');

        // Refresh form data
        $this->form->fill($this->getFormData());

        Notification::make()
            ->title('Settings reset to defaults')
            ->success()
            ->send();
    }

    public function clearSettingsCache(): void
    {
        Cache::forget('settings.all');
        Cache::forget('settings.public');

        Notification::make()
            ->title('Settings cache cleared')
            ->success()
            ->send();
    }

    public static function shouldRegisterNavigation(): bool
    {
        return true;
    }
}
