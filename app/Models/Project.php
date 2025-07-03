<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'long_form_content',
        'tags',
        'project_image',
        'project_image_thumbnail',
        'live_demo_link',
        'github_link',
        'featured',
        'visible',
        'sort_order',
        'meta_description',
    ];

    protected $casts = [
        'tags' => 'array',
        'featured' => 'boolean',
        'visible' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });

        static::updating(function ($project) {
            if ($project->isDirty('title') && empty($project->getOriginal('slug'))) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function getProjectImageUrlAttribute(): ?string
    {
        return $this->project_image ? Storage::url($this->project_image) : null;
    }

    public function getProjectImageThumbnailUrlAttribute(): ?string
    {
        return $this->project_image_thumbnail ? Storage::url($this->project_image_thumbnail) : null;
    }

    public function scopeVisible($query)
    {
        return $query->where('visible', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
