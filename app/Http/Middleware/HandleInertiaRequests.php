<?php

namespace App\Http\Middleware;

use App\Helpers\SettingsHelper;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        /** @var string $quote */
        $quote = Inspiring::quotes()->random();
        [$message, $author] = str($quote)->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'settings' => fn (): array => SettingsHelper::getPublic(),
            'site' => fn (): array => SettingsHelper::getSiteConfig(),
            'projects' => fn (): array => $this->getProjectsData($request),
        ];
    }

    private function getProjectsData(Request $request): array
    {
        $query = \App\Models\Project::query()->visible()->ordered();

        // Handle search
        if ($search = $request->get('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        // Handle tag filtering
        if ($tags = $request->get('tags')) {
            $tagsArray = is_array($tags) ? $tags : explode(',', $tags);
            foreach ($tagsArray as $tag) {
                $query->whereJsonContains('tags', trim($tag));
            }
        }

        // Handle visibility filtering (defaults to visible only)
        if ($request->has('visible')) {
            $visible = filter_var($request->get('visible'), FILTER_VALIDATE_BOOLEAN);
            $query->where('visible', $visible);
        }

        // Handle sorting
        $sortBy = $request->get('sort_by', 'sort_order');
        $sortDirection = $request->get('sort_direction', 'asc');

        if (in_array($sortBy, ['id', 'created_at', 'updated_at', 'sort_order'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        return $query->get()->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'short_description' => $project->short_description,
                'long_form_content' => $project->long_form_content,
                'tags' => $project->tags ?? [],
                'project_image_url' => $project->project_image_url,
                'project_image_thumbnail_url' => $project->project_image_thumbnail_url,
                'live_demo_link' => $project->live_demo_link,
                'github_link' => $project->github_link,
                'featured' => $project->featured,
                'visible' => $project->visible,
                'sort_order' => $project->sort_order,
                'meta_description' => $project->meta_description,
                'created_at' => $project->created_at?->toISOString(),
                'updated_at' => $project->updated_at?->toISOString(),
            ];
        })->toArray();
    }
}
