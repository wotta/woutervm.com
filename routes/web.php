<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/resume', 'resume')->name('resume');

// Page routes
Route::prefix('pages')->name('pages.')->group(function () {
    Route::get('/', [PageController::class, 'index'])->name('index');
    Route::get('/search', [PageController::class, 'search'])->name('search');
    Route::get('/template/{template}', [PageController::class, 'byTemplate'])->name('template');
});

// Sitemap
Route::get('/sitemap.xml', [PageController::class, 'sitemap'])->name('sitemap');

// Individual page routes (catch-all for dynamic pages)
// This should be at the end to avoid conflicts
Route::get('/{slug}', [PageController::class, 'show'])
    ->where('slug', '.*')
    ->name('pages.show');