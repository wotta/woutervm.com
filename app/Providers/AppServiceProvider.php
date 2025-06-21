<?php

namespace App\Providers;

use App\Helpers\SettingsHelper;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register the SettingsHelper as a singleton
        $this->app->singleton(SettingsHelper::class, function () {
            return new SettingsHelper();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register custom Blade directive for settings
        Blade::directive('setting', function ($expression) {
            return "<?php echo setting($expression); ?>";
        });

        Blade::directive('siteConfig', function ($key = null) {
            if ($key) {
                return "<?php echo \\App\\Helpers\\SettingsHelper::getSiteConfig()[$key] ?? ''; ?>";
            }
            return "<?php echo json_encode(\\App\\Helpers\\SettingsHelper::getSiteConfig()); ?>";
        });
    }
}
