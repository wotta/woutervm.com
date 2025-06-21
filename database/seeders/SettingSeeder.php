<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultSettings = [
            // General Settings
            [
                'key' => 'site.name',
                'value' => 'Wouter',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Website name/title',
                'is_public' => true,
                'validation_rules' => ['required', 'string', 'max:255'],
                'sort_order' => 1,
                'is_locked' => true,
            ],
            [
                'key' => 'site.tagline',
                'value' => 'Full-Stack Developer & Digital Innovator',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Site tagline or subtitle',
                'is_public' => true,
                'validation_rules' => ['string', 'max:500'],
                'sort_order' => 2,
            ],
            [
                'key' => 'site.description',
                'value' => 'Personal portfolio and blog of Wouter, showcasing full-stack development projects and technical insights.',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Site meta description',
                'is_public' => true,
                'validation_rules' => ['string', 'max:1000'],
                'sort_order' => 3,
            ],
            [
                'key' => 'site.keywords',
                'value' => 'Full-stack developer, Laravel, React, PHP, JavaScript, Web Development',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Site meta keywords',
                'is_public' => true,
                'validation_rules' => ['string', 'max:500'],
                'sort_order' => 4,
            ],
            [
                'key' => 'site.logo',
                'value' => null,
                'type' => 'image',
                'group' => 'general',
                'description' => 'Site logo image',
                'is_public' => true,
                'validation_rules' => ['image', 'max:2048'],
                'sort_order' => 5,
            ],
            [
                'key' => 'site.favicon',
                'value' => '/favicon.ico',
                'type' => 'file',
                'group' => 'general',
                'description' => 'Site favicon',
                'is_public' => true,
                'validation_rules' => ['file', 'max:1024'],
                'sort_order' => 6,
            ],

            // Contact Information
            [
                'key' => 'contact.email',
                'value' => 'hello@woutervm.com',
                'type' => 'email',
                'group' => 'contact',
                'description' => 'Main contact email address',
                'is_public' => true,
                'validation_rules' => ['email'],
                'sort_order' => 1,
            ],
            [
                'key' => 'contact.phone',
                'value' => null,
                'type' => 'string',
                'group' => 'contact',
                'description' => 'Contact phone number',
                'is_public' => false,
                'validation_rules' => ['string', 'max:50'],
                'sort_order' => 2,
            ],
            [
                'key' => 'contact.address',
                'value' => 'Netherlands',
                'type' => 'string',
                'group' => 'contact',
                'description' => 'Contact address/location',
                'is_public' => true,
                'validation_rules' => ['string', 'max:500'],
                'sort_order' => 3,
            ],

            // Social Media
            [
                'key' => 'social.github',
                'value' => 'https://github.com/wotta',
                'type' => 'url',
                'group' => 'social',
                'description' => 'GitHub profile URL',
                'is_public' => true,
                'validation_rules' => ['url'],
                'sort_order' => 1,
            ],
            [
                'key' => 'social.linkedin',
                'value' => 'https://linkedin.com/in/',
                'type' => 'url',
                'group' => 'social',
                'description' => 'LinkedIn profile URL',
                'is_public' => true,
                'validation_rules' => ['url'],
                'sort_order' => 2,
            ],
            [
                'key' => 'social.twitter',
                'value' => 'https://x.com/wotta',
                'type' => 'url',
                'group' => 'social',
                'description' => 'Twitter/X profile URL',
                'is_public' => true,
                'validation_rules' => ['url'],
                'sort_order' => 3,
            ],

            // SEO Settings
            [
                'key' => 'seo.robots_txt',
                'value' => "User-agent: *\nDisallow:",
                'type' => 'string',
                'group' => 'seo',
                'description' => 'Robots.txt content',
                'is_public' => false,
                'validation_rules' => ['string'],
                'sort_order' => 3,
            ],

            // Appearance Settings
            [
                'key' => 'appearance.theme',
                'value' => 'auto',
                'type' => 'string',
                'group' => 'appearance',
                'description' => 'Default theme (light, dark, auto)',
                'is_public' => true,
                'validation_rules' => ['in:light,dark,auto'],
                'sort_order' => 1,
            ],
            [
                'key' => 'appearance.primary_color',
                'value' => '#3b82f6',
                'type' => 'string',
                'group' => 'appearance',
                'description' => 'Primary brand color',
                'is_public' => true,
                'validation_rules' => ['string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
                'sort_order' => 2,
            ],
            [
                'key' => 'appearance.hero_background',
                'value' => null,
                'type' => 'image',
                'group' => 'appearance',
                'description' => 'Hero section background image',
                'is_public' => true,
                'validation_rules' => ['image', 'max:5120'],
                'sort_order' => 3,
            ],

            // Features
            [
                'key' => 'features.blog_enabled',
                'value' => '1',
                'type' => 'boolean',
                'group' => 'features',
                'description' => 'Enable blog functionality',
                'is_public' => false,
                'validation_rules' => ['boolean'],
                'sort_order' => 1,
            ],
            [
                'key' => 'features.contact_form_enabled',
                'value' => '1',
                'type' => 'boolean',
                'group' => 'features',
                'description' => 'Enable contact form',
                'is_public' => true,
                'validation_rules' => ['boolean'],
                'sort_order' => 2,
            ],
            [
                'key' => 'features.projects_per_page',
                'value' => '6',
                'type' => 'integer',
                'group' => 'features',
                'description' => 'Number of projects to show per page',
                'is_public' => false,
                'validation_rules' => ['integer', 'min:1', 'max:50'],
                'sort_order' => 3,
            ],
        ];

        foreach ($defaultSettings as $settingData) {
            Setting::updateOrCreate(
                ['key' => $settingData['key']],
                $settingData
            );
        }
    }
}
