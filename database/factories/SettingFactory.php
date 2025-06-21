<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Setting;

class SettingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Setting::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $types = ['string', 'boolean', 'integer', 'float', 'file', 'image', 'url', 'email', 'json'];
        $groups = ['general', 'seo', 'appearance', 'social', 'contact'];
        $type = fake()->randomElement($types);

        return [
            'key' => fake()->unique()->slug(2, '.'),
            'value' => $this->generateValueForType($type),
            'type' => $type,
            'group' => fake()->randomElement($groups),
            'description' => fake()->sentence(),
            'is_public' => fake()->boolean(30), // 30% chance of being public
            'validation_rules' => $this->generateValidationRules($type),
            'sort_order' => fake()->numberBetween(0, 100),
            'is_locked' => fake()->boolean(10), // 10% chance of being locked
        ];
    }

    /**
     * Generate appropriate value for the given type
     */
    private function generateValueForType(string $type): string
    {
        return match ($type) {
            'boolean' => fake()->boolean() ? '1' : '0',
            'integer' => (string) fake()->numberBetween(1, 1000),
            'float' => (string) fake()->randomFloat(2, 0, 100),
            'email' => fake()->email(),
            'url' => fake()->url(),
            'json' => json_encode(['key' => fake()->word(), 'value' => fake()->sentence()]),
            'file', 'image' => 'settings/files/' . fake()->word() . '.jpg',
            default => fake()->sentence(),
        };
    }

    /**
     * Generate validation rules for the given type
     */
    private function generateValidationRules(string $type): ?array
    {
        return match ($type) {
            'email' => ['email'],
            'url' => ['url'],
            'integer' => ['integer', 'min:0'],
            'float' => ['numeric', 'min:0'],
            'boolean' => ['boolean'],
            'file' => ['file', 'max:2048'],
            'image' => ['image', 'max:2048'],
            default => null,
        };
    }

    /**
     * Create a setting with specific type
     */
    public function ofType(string $type): static
    {
        return $this->state(function () use ($type) {
            return [
                'type' => $type,
                'value' => $this->generateValueForType($type),
                'validation_rules' => $this->generateValidationRules($type),
            ];
        });
    }

    /**
     * Create a public setting
     */
    public function public(): static
    {
        return $this->state(['is_public' => true]);
    }

    /**
     * Create a locked setting
     */
    public function locked(): static
    {
        return $this->state(['is_locked' => true]);
    }

    /**
     * Create a setting in specific group
     */
    public function inGroup(string $group): static
    {
        return $this->state(['group' => $group]);
    }
}
