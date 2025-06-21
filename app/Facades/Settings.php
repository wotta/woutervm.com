<?php

namespace App\Facades;

use App\Helpers\SettingsHelper;
use Illuminate\Support\Facades\Facade;

/**
 * @method static mixed get(string $key, $default = null)
 * @method static \App\Models\Setting set(string $key, $value, ?string $type = null)
 * @method static array getPublic()
 * @method static array getGroup(string $group)
 * @method static bool has(string $key)
 * @method static bool forget(string $key)
 * @method static array getMany(array $keys)
 * @method static void setMany(array $settings)
 * @method static array getSiteConfig()
 * @method static array getContactInfo()
 * @method static array getSocialLinks()
 * @method static array getAppearance()
 * @method static array getFeatures()
 * @method static void clearCache()
 */
class Settings extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return SettingsHelper::class;
    }
}
