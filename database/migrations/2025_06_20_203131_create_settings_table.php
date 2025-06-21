<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // e.g., 'site.title', 'site.favicon'
            $table->text('value')->nullable(); // JSON-encoded value for complex types
            $table->enum('type', ['string', 'boolean', 'integer', 'float', 'file', 'image', 'url', 'email', 'json'])->default('string');
            $table->string('group')->nullable(); // for organizing: 'general', 'seo', 'appearance'
            $table->text('description')->nullable(); // human-readable description
            $table->boolean('is_public')->default(false); // whether setting can be accessed on frontend
            $table->json('validation_rules')->nullable(); // Laravel validation rules
            $table->integer('sort_order')->default(0); // for custom ordering
            $table->boolean('is_locked')->default(false); // prevent deletion of core settings
            $table->timestamps();

            // Indexes for better performance
            $table->index(['group', 'sort_order']);
            $table->index('is_public');
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
