<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder';

    protected static ?string $navigationGroup = 'Content';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                if ($operation !== 'create') {
                                    return;
                                }
                                $set('slug', Str::slug($state));
                            })
                            ->maxLength(255),

                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(Project::class, 'slug', ignoreRecord: true)
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Content')
                    ->schema([
                        Forms\Components\Textarea::make('short_description')
                            ->label('Short Description')
                            ->rows(3)
                            ->maxLength(500)
                            ->hint('Brief description for project listings')
                            ->hintActions([
                                Forms\Components\Actions\Action::make('generateWithAI')
                                    ->label('Generate with AI')
                                    ->icon('heroicon-o-sparkles')
                                    ->action(function (Forms\Get $get, Forms\Set $set) {
                                        $title = $get('title');
                                        $content = $get('long_form_content');

                                        if (empty($title) && empty($content)) {
                                            \Filament\Notifications\Notification::make()
                                                ->title('Missing Information')
                                                ->body('Please provide at least a title or content to generate a description.')
                                                ->warning()
                                                ->send();
                                            return;
                                        }

                                        $aiService = app(\App\Services\AIService::class);

                                        if (!$aiService->isConfigured()) {
                                            \Filament\Notifications\Notification::make()
                                                ->title('AI Service Not Configured')
                                                ->body('Please configure your OpenRouter API key in the services configuration.')
                                                ->warning()
                                                ->send();
                                            return;
                                        }

                                        try {
                                            $aiDescription = $aiService->generateProjectDescription($title, $content);
                                            $set('short_description', $aiDescription);

                                            \Filament\Notifications\Notification::make()
                                                ->title('Description Generated')
                                                ->body('AI-generated description has been added successfully.')
                                                ->success()
                                                ->send();
                                        } catch (\Exception $e) {
                                            \Filament\Notifications\Notification::make()
                                                ->title('Generation Failed')
                                                ->body('Failed to generate description: ' . $e->getMessage())
                                                ->danger()
                                                ->send();
                                        }
                                    })
                                    ->requiresConfirmation()
                                    ->modalHeading('Generate AI Description')
                                    ->modalDescription('This will use AI to generate a short description based on the project title and content. This may overwrite any existing description.')
                                    ->modalSubmitActionLabel('Generate'),
                            ]),

                        Forms\Components\RichEditor::make('long_form_content')
                            ->label('Detailed Content')
                            ->fileAttachmentsDisk('public')
                            ->fileAttachmentsDirectory('project-attachments')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Media')
                    ->schema([
                        Forms\Components\FileUpload::make('project_image')
                            ->label('Project Image')
                            ->image()
                            ->disk('public')
                            ->directory('projects')
                            ->imageEditor()
                            ->imageEditorAspectRatios(['16:9', '4:3', '1:1'])
                            ->afterStateUpdated(function ($state, Forms\Set $set) {
                                if ($state) {
                                    // Generate thumbnail
                                    self::generateThumbnail($state, $set);
                                }
                            })
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Metadata')
                    ->schema([
                        Forms\Components\TagsInput::make('tags')
                            ->label('Technologies & Tools')
                            ->placeholder('Add tags like React, Laravel, etc.')
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('live_demo_link')
                            ->label('Live Demo URL')
                            ->url()
                            ->placeholder('https://example.com')
                            ->maxLength(255),

                        Forms\Components\TextInput::make('github_link')
                            ->label('GitHub Repository URL')
                            ->url()
                            ->placeholder('https://github.com/username/repo')
                            ->maxLength(255),

                        Forms\Components\Textarea::make('meta_description')
                            ->label('SEO Meta Description')
                            ->rows(2)
                            ->maxLength(160)
                            ->hint('Optimal length: 150-160 characters')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('visible')
                            ->label('Visible to Public')
                            ->default(true)
                            ->helperText('Uncheck to hide from public listings'),

                        Forms\Components\Toggle::make('featured')
                            ->label('Featured Project')
                            ->helperText('Featured projects appear prominently'),

                        Forms\Components\TextInput::make('sort_order')
                            ->label('Sort Order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers appear first'),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('project_image')
                    ->label('Image')
                    ->size(60)
                    ->circular(),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('tags')
                    ->badge()
                    ->separator(',')
                    ->limit(3)
                    ->tooltip(fn (Project $record): string => implode(', ', $record->tags)),

                Tables\Columns\IconColumn::make('visible')
                    ->label('Public')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\IconColumn::make('featured')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('visible')
                    ->label('Visibility')
                    ->placeholder('All projects')
                    ->trueLabel('Visible only')
                    ->falseLabel('Hidden only'),

                Tables\Filters\TernaryFilter::make('featured')
                    ->label('Featured')
                    ->placeholder('All projects')
                    ->trueLabel('Featured only')
                    ->falseLabel('Non-featured only'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order');
    }

    protected static function generateThumbnail($imagePath, Forms\Set $set): void
    {
        try {
            $fullPath = storage_path('app/public/' . $imagePath);

            if (!file_exists($fullPath)) {
                return;
            }

            $manager = new ImageManager(new Driver());
            $image = $manager->read($fullPath);

            // Resize to 256px width (w-64 in Tailwind)
            $image->resize(256, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $thumbnailPath = str_replace('.', '_thumb.', $imagePath);
            $thumbnailFullPath = storage_path('app/public/' . $thumbnailPath);

            $image->save($thumbnailFullPath, quality: 80);

            $set('project_image_thumbnail', $thumbnailPath);
        } catch (\Exception $e) {
            // Silently fail - thumbnail generation is not critical
        }
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
