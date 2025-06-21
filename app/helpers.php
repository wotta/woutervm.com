<?php

use App\Helpers\SettingsHelper;

if (!function_exists('setting')) {
    /**
     * Get a setting value by key
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    function setting(string $key, $default = null)
    {
        return SettingsHelper::get($key, $default);
    }
}

if (!function_exists('settings')) {
    /**
     * Get the settings helper instance
     *
     * @return SettingsHelper
     */
    function settings(): SettingsHelper
    {
        return app(SettingsHelper::class);
    }
}
