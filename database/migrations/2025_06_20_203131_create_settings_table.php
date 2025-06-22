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
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->enum('type', ['string', 'boolean', 'integer', 'float', 'file', 'image', 'url', 'email', 'json'])->default('string');
            $table->string('group')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_public')->default(false);
            $table->json('validation_rules')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_locked')->default(false);
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
