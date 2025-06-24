<?php

namespace App\Filament\Widgets;

use App\Models\Page;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PagesOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $totalPages = Page::count();
        $publishedPages = Page::published()->count();
        $draftPages = Page::draft()->count();
        $featuredPages = Page::featured()->count();

        return [
            Stat::make('Total Pages', $totalPages)
                ->description('All pages in the system')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('primary'),

            Stat::make('Published Pages', $publishedPages)
                ->description('Live on the website')
                ->descriptionIcon('heroicon-m-eye')
                ->color('success'),

            Stat::make('Draft Pages', $draftPages)
                ->description('Work in progress')
                ->descriptionIcon('heroicon-m-pencil')
                ->color('warning'),

            Stat::make('Featured Pages', $featuredPages)
                ->description('Highlighted content')
                ->descriptionIcon('heroicon-m-star')
                ->color('info'),
        ];
    }

    protected static ?int $sort = 2;

    protected static ?string $pollingInterval = '30s';
}