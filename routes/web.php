<?php

use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'home')->name('home');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/resume', 'resume')->name('resume');

// Project routes
Route::get('/projects', function () {
    return Inertia::render('projects/index');
})->name('projects.index');

Route::get('/projects/{project}', function (Project $project) {
    if (!$project->visible) {
        abort(404);
    }

    return Inertia::render('projects/show', [
        'project' => [
            'id' => $project->id,
            'title' => $project->title,
            'slug' => $project->slug,
            'short_description' => $project->short_description,
            'long_form_content' => $project->long_form_content,
            'tags' => $project->tags ?? [],
            'project_image_url' => $project->project_image_url,
            'project_image_thumbnail_url' => $project->project_image_thumbnail_url,
            'live_demo_link' => $project->live_demo_link,
            'github_link' => $project->github_link,
            'featured' => $project->featured,
            'meta_description' => $project->meta_description,
            'created_at' => $project->created_at?->toISOString(),
            'updated_at' => $project->updated_at?->toISOString(),
        ]
    ]);
})->name('projects.show');
