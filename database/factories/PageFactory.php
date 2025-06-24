<?php

namespace Database\Factories;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Page>
 */
class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(rand(2, 5), false);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(2),
            'content' => $this->generateContent(),
            'status' => fake()->randomElement(['draft', 'published', 'private']),
            'template' => fake()->randomElement(array_keys(Page::getAvailableTemplates())),
            'featured_image' => null,
            'meta_data' => [
                'title' => $title,
                'description' => fake()->sentence(10),
                'keywords' => implode(', ', fake()->words(5)),
                'noindex' => fake()->boolean(10),
                'nofollow' => fake()->boolean(10),
            ],
            'settings' => [
                'show_sidebar' => fake()->boolean(),
                'allow_comments' => fake()->boolean(),
                'custom_css' => fake()->boolean(20) ? 'body { background-color: #f0f0f0; }' : null,
            ],
            'is_featured' => fake()->boolean(20),
            'show_in_menu' => fake()->boolean(80),
            'menu_order' => fake()->numberBetween(0, 100),
            'published_at' => function (array $attributes) {
                return $attributes['status'] === 'published' ? fake()->dateTimeBetween('-1 year', 'now') : null;
            },
        ];
    }

    /**
     * Indicate that the page is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ]);
    }

    /**
     * Indicate that the page is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the page is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the page should be shown in menu.
     */
    public function inMenu(): static
    {
        return $this->state(fn (array $attributes) => [
            'show_in_menu' => true,
        ]);
    }

    /**
     * Set a specific template.
     */
    public function template(string $template): static
    {
        return $this->state(fn (array $attributes) => [
            'template' => $template,
        ]);
    }

    /**
     * Set a parent page.
     */
    public function child(Page $parent): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => $parent->id,
            'menu_order' => fake()->numberBetween(0, 10),
        ]);
    }

    /**
     * Generate realistic content for the page.
     */
    private function generateContent(): string
    {
        $paragraphs = [];
        $numParagraphs = fake()->numberBetween(3, 8);
        
        for ($i = 0; $i < $numParagraphs; $i++) {
            $paragraphs[] = '<p>' . fake()->paragraph(fake()->numberBetween(3, 8)) . '</p>';
            
            // Occasionally add a heading
            if ($i > 0 && fake()->boolean(30)) {
                $paragraphs[] = '<h2>' . fake()->sentence(3, false) . '</h2>';
            }
            
            // Occasionally add a list
            if (fake()->boolean(20)) {
                $listItems = [];
                for ($j = 0; $j < fake()->numberBetween(3, 6); $j++) {
                    $listItems[] = '<li>' . fake()->sentence(fake()->numberBetween(3, 8)) . '</li>';
                }
                $paragraphs[] = '<ul>' . implode('', $listItems) . '</ul>';
            }
            
            // Occasionally add a blockquote
            if (fake()->boolean(15)) {
                $paragraphs[] = '<blockquote><p>' . fake()->sentence(10) . '</p></blockquote>';
            }
        }
        
        return implode("\n\n", $paragraphs);
    }
}