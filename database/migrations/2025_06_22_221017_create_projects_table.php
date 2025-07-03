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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('long_form_content')->nullable();
            $table->json('tags')->nullable();
            $table->string('project_image')->nullable();
            $table->string('project_image_thumbnail')->nullable();
            $table->string('live_demo_link')->nullable();
            $table->string('github_link')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('visible')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('meta_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
