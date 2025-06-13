<?php

namespace App\Filament\Pages;

use App\Filament\Pages\Base\SettingsPage;
use App\Settings\HomeSettings;
use Filament\Forms;
use Filament\Forms\Form;

class GeneralSetting extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = HomeSettings::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Website name')
                    ->required(),
                Forms\Components\FileUpload::make('image')
                    ->label('Image'),
            ]);
    }
}
