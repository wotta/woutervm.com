<?php

namespace App\Helpers;

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

class SettingsHelper
{
    /**
     * Get a setting value by key with caching
     */
    public static function get(string $key, $default = null)
    {
        return Setting::get($key, $default);
    }

    /**
     * Set a setting value
     */
    public static function set(string $key, $value, ?string $type = null): Setting
    {
        return Setting::set($key, $value, $type);
    }

    /**
     * Get all public settings for frontend use
     */
    public static function getPublic(): array
    {
        return Setting::getPublic();
    }

    /**
     * Get all settings in a specific group
     */
    public static function getGroup(string $group): array
    {
        return Setting::getGroup($group);
    }

    /**
     * Check if a setting exists
     */
    public static function has(string $key): bool
    {
        return Setting::has($key);
    }

    /**
     * Delete a setting
     */
    public static function forget(string $key): bool
    {
        return Setting::forget($key);
    }

    /**
     * Get multiple settings at once
     */
    public static function getMany(array $keys): array
    {
        $results = [];
        foreach ($keys as $key) {
            $results[$key] = static::get($key);
        }
        return $results;
    }

    /**
     * Set multiple settings at once
     */
    public static function setMany(array $settings): void
    {
        foreach ($settings as $key => $value) {
            static::set($key, $value);
        }
    }

    /**
     * Get site configuration for meta tags
     */
    public static function getSiteConfig(): array
    {
        return [
            'name' => static::get('site.name', config('app.name')),
            'description' => static::get('site.description'),
            'keywords' => static::get('site.keywords'),
            'logo' => static::get('site.logo'),
            'favicon' => static::get('site.favicon', '/favicon.ico'),
            'tagline' => static::get('site.tagline'),
        ];
    }

    /**
     * Get contact information
     */
    public static function getContactInfo(): array
    {
        return [
            'email' => static::get('contact.email'),
            'phone' => static::get('contact.phone'),
            'address' => static::get('contact.address'),
        ];
    }

    /**
     * Get social media links
     */
    public static function getSocialLinks(): array
    {
        return array_filter([
            'github' => static::get('social.github'),
            'linkedin' => static::get('social.linkedin'),
            'twitter' => static::get('social.twitter'),
        ]);
    }

    /**
     * Get appearance settings
     */
    public static function getAppearance(): array
    {
        return [
            'theme' => static::get('appearance.theme', 'auto'),
            'primary_color' => static::get('appearance.primary_color', '#3b82f6'),
            'hero_background' => static::get('appearance.hero_background'),
        ];
    }

    /**
     * Get feature flags
     */
    public static function getFeatures(): array
    {
        return [
            'blog_enabled' => static::get('features.blog_enabled', true),
            'contact_form_enabled' => static::get('features.contact_form_enabled', true),
            'projects_per_page' => static::get('features.projects_per_page', 6),
        ];
    }

    /**
     * Clear all settings cache
     */
    public static function clearCache(): void
    {
        Cache::forget('settings.all');
        Cache::forget('settings.public');
    }
}
