<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('/about', 'about')->name('about');
Route::inertia('/resume', 'resume')->name('resume');
