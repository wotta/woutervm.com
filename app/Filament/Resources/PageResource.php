<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Filament\Resources\PageResource\RelationManagers;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Filament\Forms\Get;
use Filament\Forms\Set;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Content';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Page Content')
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
                            ->helperText('URL-friendly version of the title')
                            ->suffixAction(
                                Action::make('regenerateSlug')
                                    ->icon('heroicon-m-arrow-path')
                                    ->action(function (Set $set, Get $get) {
                                        $set('slug', Str::slug($get('title')));
                                    })
                            ),

                        Forms\Components\Textarea::make('excerpt')
                            ->maxLength(500)
                            ->rows(3)
                            ->helperText('Brief description shown in listings and search results'),

                        Forms\Components\RichEditor::make('content')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'attachFiles',
                                'blockquote',
                                'bold',
                                'bulletList',
                                'codeBlock',
                                'h2',
                                'h3',
                                'italic',
                                'link',
                                'orderedList',
                                'redo',
                                'strike',
                                'underline',
                                'undo',
                            ]),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options(Page::getAvailableStatuses())
                            ->default('draft')
                            ->required(),

                        Forms\Components\Select::make('template')
                            ->options(Page::getAvailableTemplates())
                            ->default('default')
                            ->required(),

                        Forms\Components\DateTimePicker::make('published_at')
                            ->helperText('Leave empty to publish immediately when status is set to published'),

                        Forms\Components\Select::make('parent_id')
                            ->relationship('parent', 'title')
                            ->searchable()
                            ->preload()
                            ->helperText('Select a parent page to create a hierarchy'),

                        Forms\Components\TextInput::make('menu_order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Order in which this page appears in menus'),

                        Forms\Components\Toggle::make('show_in_menu')
                            ->default(true)
                            ->helperText('Whether this page should appear in navigation menus'),

                        Forms\Components\Toggle::make('is_featured')
                            ->default(false)
                            ->helperText('Mark this page as featured'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Media')
                    ->schema([
                        Forms\Components\FileUpload::make('featured_image')
                            ->image()
                            ->directory('pages/featured-images')
                            ->visibility('public')
                            ->imageEditor()
                            ->maxSize(5120)
                            ->helperText('Featured image for this page'),
                    ]),

                Forms\Components\Section::make('SEO & Meta Data')
                    ->schema([
                        Forms\Components\TextInput::make('meta_data.title')
                            ->label('Meta Title')
                            ->maxLength(60)
                            ->helperText('SEO title (leave empty to use page title)'),

                        Forms\Components\Textarea::make('meta_data.description')
                            ->label('Meta Description')
                            ->maxLength(160)
                            ->rows(3)
                            ->helperText('SEO description (leave empty to use excerpt)'),

                        Forms\Components\TextInput::make('meta_data.keywords')
                            ->label('Meta Keywords')
                            ->helperText('Comma-separated keywords for SEO'),

                        Forms\Components\Toggle::make('meta_data.noindex')
                            ->label('No Index')
                            ->helperText('Prevent search engines from indexing this page'),

                        Forms\Components\Toggle::make('meta_data.nofollow')
                            ->label('No Follow')
                            ->helperText('Prevent search engines from following links on this page'),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Forms\Components\Section::make('Custom Settings')
                    ->schema([
                        Forms\Components\KeyValue::make('settings')
                            ->label('Page Settings')
                            ->helperText('Custom key-value pairs for page-specific settings'),
                    ])
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->label('Image')
                    ->circular()
                    ->defaultImageUrl(url('/images/placeholder.png')),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('medium'),

                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->color('gray')
                    ->copyable()
                    ->copyMessage('Slug copied!')
                    ->copyMessageDuration(1500),

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

                Tables\Columns\TextColumn::make('parent.title')
                    ->label('Parent')
                    ->color('gray')
                    ->placeholder('Root Page'),

                Tables\Columns\IconColumn::make('show_in_menu')
                    ->label('In Menu')
                    ->boolean(),

                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),

                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->color('success')
                    ->placeholder('Not scheduled'),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(Page::getAvailableStatuses()),

                Tables\Filters\SelectFilter::make('template')
                    ->options(Page::getAvailableTemplates()),

                Tables\Filters\Filter::make('featured')
                    ->query(fn (Builder $query): Builder => $query->where('is_featured', true))
                    ->label('Featured Pages'),

                Tables\Filters\Filter::make('in_menu')
                    ->query(fn (Builder $query): Builder => $query->where('show_in_menu', true))
                    ->label('In Menu'),

                Tables\Filters\Filter::make('published')
                    ->query(fn (Builder $query): Builder => $query->published())
                    ->label('Published'),

                Tables\Filters\SelectFilter::make('parent')
                    ->relationship('parent', 'title')
                    ->label('Parent Page'),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\Action::make('publish')
                        ->icon('heroicon-o-eye')
                        ->color('success')
                        ->action(fn (Page $record) => $record->publish())
                        ->requiresConfirmation()
                        ->visible(fn (Page $record): bool => $record->status !== 'published'),
                    Tables\Actions\Action::make('unpublish')
                        ->icon('heroicon-o-eye-slash')
                        ->color('warning')
                        ->action(fn (Page $record) => $record->unpublish())
                        ->requiresConfirmation()
                        ->visible(fn (Page $record): bool => $record->status === 'published'),
                    Tables\Actions\Action::make('view_live')
                        ->icon('heroicon-o-arrow-top-right-on-square')
                        ->color('gray')
                        ->url(fn (Page $record): string => route('pages.show', $record->slug))
                        ->openUrlInNewTab()
                        ->visible(fn (Page $record): bool => $record->is_published),
                    Tables\Actions\DeleteAction::make(),
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('publish')
                        ->icon('heroicon-o-eye')
                        ->color('success')
                        ->action(fn ($records) => $records->each->publish())
                        ->requiresConfirmation()
                        ->deselectRecordsAfterCompletion(),
                    Tables\Actions\BulkAction::make('unpublish')
                        ->icon('heroicon-o-eye-slash')
                        ->color('warning')
                        ->action(fn ($records) => $records->each->unpublish())
                        ->requiresConfirmation()
                        ->deselectRecordsAfterCompletion(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\ChildrenRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'view' => Pages\ViewPage::route('/{record}'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::count() > 10 ? 'warning' : 'primary';
    }
}