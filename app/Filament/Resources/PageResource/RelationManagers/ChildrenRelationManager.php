<?php

namespace App\Filament\Resources\PageResource\RelationManagers;

use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Filament\Forms\Get;
use Filament\Forms\Set;

class ChildrenRelationManager extends RelationManager
{
    protected static string $relationship = 'children';

    protected static ?string $title = 'Child Pages';

    protected static ?string $icon = 'heroicon-o-document-duplicate';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Page Details')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => 
                                $set('slug', Str::slug($state))),

                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(Page::class, 'slug', ignoreRecord: true)
                            ->rules(['alpha_dash'])
                            ->helperText('URL-friendly version of the title'),

                        Forms\Components\Textarea::make('excerpt')
                            ->maxLength(500)
                            ->rows(3)
                            ->columnSpanFull(),

                        Forms\Components\Select::make('status')
                            ->options(Page::getAvailableStatuses())
                            ->default('draft')
                            ->required(),

                        Forms\Components\Select::make('template')
                            ->options(Page::getAvailableTemplates())
                            ->default('default')
                            ->required(),

                        Forms\Components\TextInput::make('menu_order')
                            ->numeric()
                            ->default(0),

                        Forms\Components\Toggle::make('show_in_menu')
                            ->default(true),

                        Forms\Components\Toggle::make('is_featured')
                            ->default(false),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Content')
                    ->schema([
                        Forms\Components\RichEditor::make('content')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('medium'),

                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->color('gray')
                    ->copyable(),

                Tables\Columns\SelectColumn::make('status')
                    ->options(Page::getAvailableStatuses())
                    ->selectablePlaceholder(false),

                Tables\Columns\TextColumn::make('template')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'default' => 'gray',
                        'landing' => 'warning',
                        'about' => 'success',
                        'contact' => 'info',
                        'portfolio' => 'purple',
                        'blog' => 'orange',
                        'custom' => 'danger',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('menu_order')
                    ->label('Order')
                    ->numeric()
                    ->sortable(),

                Tables\Columns\IconColumn::make('show_in_menu')
                    ->label('In Menu')
                    ->boolean(),

                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(Page::getAvailableStatuses()),

                Tables\Filters\SelectFilter::make('template')
                    ->options(Page::getAvailableTemplates()),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->mutateFormDataUsing(function (array $data): array {
                        // Automatically set the parent_id to current page
                        $data['parent_id'] = $this->ownerRecord->id;
                        
                        // Set published_at if status is published
                        if ($data['status'] === 'published' && empty($data['published_at'])) {
                            $data['published_at'] = now();
                        }

                        return $data;
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('view_live')
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->color('gray')
                    ->url(fn (Page $record): string => route('pages.show', $record->slug))
                    ->openUrlInNewTab()
                    ->visible(fn (Page $record): bool => $record->is_published),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('menu_order', 'asc')
            ->emptyStateDescription('No child pages found. Create one to get started.')
            ->emptyStateIcon('heroicon-o-document-plus');
    }

    public function isReadOnly(): bool
    {
        return false;
    }
}