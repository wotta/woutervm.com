<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a listing of the pages.
     */
    public function index()
    {
        $pages = Page::published()
            ->inMenu()
            ->rootPages()
            ->orderBy('menu_order')
            ->get();

        return Inertia::render('Pages/Index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Display the specified page.
     */
    public function show(string $slug)
    {
        // Handle nested page paths (e.g., services/laravel-development)
        $slugs = explode('/', $slug);
        $page = null;
        $parentId = null;

        foreach ($slugs as $currentSlug) {
            $page = Page::where('slug', $currentSlug)
                ->where('parent_id', $parentId)
                ->published()
                ->firstOrFail();
            
            $parentId = $page->id;
        }

        // Load related data
        $page->load(['parent', 'children' => function ($query) {
            $query->published()->inMenu()->orderBy('menu_order');
        }]);

        // Get breadcrumbs
        $breadcrumbs = $page->getBreadcrumbs();

        // Get navigation (pages that should show in menu)
        $navigation = Page::published()
            ->inMenu()
            ->rootPages()
            ->with(['children' => function ($query) {
                $query->published()->inMenu()->orderBy('menu_order');
            }])
            ->orderBy('menu_order')
            ->get();

        return Inertia::render('Pages/Show', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'excerpt' => $page->excerpt,
                'content' => $page->content,
                'template' => $page->template,
                'featured_image_url' => $page->featured_image_url,
                'meta_title' => $page->getMetaTitle(),
                'meta_description' => $page->getMetaDescription(),
                'meta_keywords' => $page->getMetaKeywords(),
                'is_featured' => $page->is_featured,
                'published_at' => $page->published_at,
                'settings' => $page->settings,
                'parent' => $page->parent ? [
                    'id' => $page->parent->id,
                    'title' => $page->parent->title,
                    'slug' => $page->parent->slug,
                ] : null,
                'children' => $page->children->map(function ($child) {
                    return [
                        'id' => $child->id,
                        'title' => $child->title,
                        'slug' => $child->slug,
                        'excerpt' => $child->excerpt,
                    ];
                }),
            ],
            'breadcrumbs' => $breadcrumbs,
            'navigation' => $navigation->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'children' => $item->children->map(function ($child) {
                        return [
                            'id' => $child->id,
                            'title' => $child->title,
                            'slug' => $child->slug,
                        ];
                    }),
                ];
            }),
        ]);
    }

    /**
     * Search pages
     */
    public function search(Request $request)
    {
        $query = $request->get('q');
        
        if (!$query) {
            return Inertia::render('Pages/Search', [
                'pages' => [],
                'query' => '',
            ]);
        }

        $pages = Page::published()
            ->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('excerpt', 'LIKE', "%{$query}%")
                    ->orWhere('content', 'LIKE', "%{$query}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Pages/Search', [
            'pages' => $pages,
            'query' => $query,
        ]);
    }

    /**
     * Display pages by template
     */
    public function byTemplate(string $template)
    {
        $pages = Page::published()
            ->byTemplate($template)
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return Inertia::render('Pages/Template', [
            'pages' => $pages,
            'template' => $template,
        ]);
    }

    /**
     * Get sitemap data
     */
    public function sitemap()
    {
        $pages = Page::published()
            ->select(['slug', 'updated_at', 'created_at'])
            ->get()
            ->map(function ($page) {
                return [
                    'url' => route('pages.show', $page->slug),
                    'lastmod' => $page->updated_at->toISOString(),
                    'changefreq' => 'weekly',
                    'priority' => $page->is_featured ? '0.9' : '0.8',
                ];
            });

        return response()->xml($pages, 200, [
            'Content-Type' => 'application/xml'
        ]);
    }
}