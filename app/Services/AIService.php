<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AIService
{
    public function generateProjectDescription(string $title, string $content = ''): string
    {
        if (!$this->isConfigured()) {
            throw new \Exception("Please configure your OpenRouter API key in the .env file (OPENROUTER_API_KEY).");
        }

        if (! class_exists('MoeMizrak\LaravelOpenrouter\Facades\LaravelOpenRouter')) {
            throw new \Exception('Laravel OpenRouter package is not properly installed. Please run: composer require moe-mizrak/laravel-openrouter and php artisan vendor:publish --tag=laravel-openrouter');
        }

        return $this->generateWithPackage($title, $content);
    }

    private function generateWithPackage(string $title, string $content): string
    {
        try {
            $prompt = $this->buildPrompt($title, $content);

            $requestData = [
                'model' => 'google/gemini-2.0-flash-exp:free',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a professional technical writer specializing in creating concise, engaging project descriptions for developer portfolios. Write clear, compelling descriptions that highlight key features and technologies without being overly promotional.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
            ];

            $apiKey = config()->string('laravel-openrouter.api_key', '');
            $timeout = config()->integer('laravel-openrouter.api_timeout', 20);
            $endpoint = config()->string('laravel-openrouter.api_endpoint', 'https://openrouter.ai/api/v1/');

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout($timeout)
                ->post(rtrim($endpoint, '/') . '/chat/completions', $requestData);

            if ($response->failed()) {
                throw new \Exception("Failed to generate description. Please check your OpenRouter API configuration.");
            }

            $data = $response->json();
            if (! isset($data['choices'][0]['message']['content'])) {
                throw new \Exception("Failed to generate description. Please check your OpenRouter API configuration.");
            }

            $content = trim($data['choices'][0]['message']['content']);

            if (empty($content)) {
                throw new \Exception("Failed to generate description. Please check your OpenRouter API configuration.");
            }

            return $content;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    private function buildPrompt(string $title, string $content): string
    {
        $prompt = "Write a concise, professional project description (2-3 sentences, max 150 words) for a project titled: \"{$title}\"";

        if (!empty($content)) {
            $cleanContent = Str::of($content)
                ->stripTags()
                ->words(500)
                ->toString();
            $prompt .= "\n\nAdditional context about the project:\n{$cleanContent}";
        }

        $prompt .= "\n\nThe description should:\n";
        $prompt .= "- Be engaging and professional\n";
        $prompt .= "- Highlight key features or technologies\n";
        $prompt .= "- Be suitable for a developer portfolio\n";
        $prompt .= "- Be concise and to the point\n";
        $prompt .= "- Avoid overly promotional language\n";

        return $prompt;
    }

    public function isConfigured(): bool
    {
        return !blank(config()->string('laravel-openrouter.api_key', ''));
    }
}
