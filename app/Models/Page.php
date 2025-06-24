<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'status',
        'template',
        'featured_image',
        'meta_data',
        'settings',
        'is_featured',
        'show_in_menu',
        'menu_order',
        'published_at',
        'parent_id',
    ];

    protected $casts = [
        'meta_data' => 'array',
        'settings' => 'array',
        'is_featured' => 'boolean',
        'show_in_menu' => 'boolean',
        'menu_order' => 'integer',
        'published_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($page) {
            if (empty($page->slug)) {
                $page->slug = Str::slug($page->title);
            }
        });

        static::updating(function ($page) {
            if ($page->isDirty('title') && empty($page->slug)) {
                $page->slug = Str::slug($page->title);
            }
        });
    }

    // Relationships
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Page::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Page::class, 'parent_id')->orderBy('menu_order');
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->where(function ($q) {
                        $q->whereNull('published_at')
                          ->orWhere('published_at', '<=', now());
                    });
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeInMenu($query)
    {
        return $query->where('show_in_menu', true)->orderBy('menu_order');
    }

    public function scopeRootPages($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeByTemplate($query, string $template)
    {
        return $query->where('template', $template);
    }

    // Accessors
    public function getFeaturedImageUrlAttribute(): ?string
    {
        if (!$this->featured_image) {
            return null;
        }

        if (Str::startsWith($this->featured_image, ['http://', 'https://'])) {
            return $this->featured_image;
        }

        return Storage::url($this->featured_image);
    }

    public function getExcerptAttribute($value): string
    {
        if ($value) {
            return $value;
        }

        // Auto-generate excerpt from content if not provided
        if ($this->content) {
            return Str::limit(strip_tags($this->content), 160);
        }

        return '';
    }

    public function getIsPublishedAttribute(): bool
    {
        return $this->status === 'published' && 
               ($this->published_at === null || $this->published_at <= now());
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    // Helper methods
    public function getPath(): string
    {
        $path = collect([$this->slug]);
        
        $parent = $this->parent;
        while ($parent) {
            $path->prepend($parent->slug);
            $parent = $parent->parent;
        }
        
        return $path->implode('/');
    }

    public function getBreadcrumbs(): array
    {
        $breadcrumbs = collect([['title' => $this->title, 'url' => null]]);
        
        $parent = $this->parent;
        while ($parent) {
            $breadcrumbs->prepend([
                'title' => $parent->title,
                'url' => route('pages.show', $parent->slug)
            ]);
            $parent = $parent->parent;
        }
        
        return $breadcrumbs->toArray();
    }

    public function getMetaTitle(): string
    {
        return $this->meta_data['title'] ?? $this->title;
    }

    public function getMetaDescription(): string
    {
        return $this->meta_data['description'] ?? $this->excerpt;
    }

    public function getMetaKeywords(): string
    {
        return $this->meta_data['keywords'] ?? '';
    }

    public function publish(): bool
    {
        return $this->update([
            'status' => 'published',
            'published_at' => $this->published_at ?? now(),
        ]);
    }

    public function unpublish(): bool
    {
        return $this->update([
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    public static function getAvailableTemplates(): array
    {
        return [
            'default' => 'Default',
            'landing' => 'Landing Page',
            'about' => 'About Page',
            'contact' => 'Contact Page',
            'portfolio' => 'Portfolio',
            'blog' => 'Blog',
            'custom' => 'Custom',
        ];
    }

    public static function getAvailableStatuses(): array
    {
        return [
            'draft' => 'Draft',
            'published' => 'Published',
            'private' => 'Private',
        ];
    }
}