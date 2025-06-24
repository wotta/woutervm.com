<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPage extends EditRecord
{
    protected static string $resource = PageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
            Actions\Action::make('view_live')
                ->label('View Live')
                ->icon('heroicon-o-arrow-top-right-on-square')
                ->color('gray')
                ->url(fn (): string => route('pages.show', $this->record->slug))
                ->openUrlInNewTab()
                ->visible(fn (): bool => $this->record->is_published),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Page updated successfully';
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Set published_at to now if status is published and no published_at is set
        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        // Clear published_at if status is not published
        if ($data['status'] !== 'published') {
            $data['published_at'] = null;
        }

        return $data;
    }
}