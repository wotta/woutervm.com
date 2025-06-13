<?php

namespace App\Settings;

use App\Models\Setting;

class HomeSettings extends Setting
{
    public string $name;

    public ?string $image = null;

    public static function group(): string
    {
        return 'general';
    }
}
