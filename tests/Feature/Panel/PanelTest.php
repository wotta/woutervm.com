<?php

use App\Models\User;
use Filament\Facades\Filament;
use Filament\Pages\Auth\Login;

use function Tests\livewire;

test('Panel can be rendered', function () {
    $this->followingRedirects();
    $response = $this->get('/wotty');

    $response->assertStatus(200);
});

test('Panel can be accessed', function () {
    $this->assertGuest();

    $userToAuthenticate = User::factory()->create([
        'email' => 'test@' . config()->string('application.security_domain'),
    ]);

    livewire(Login::class)
        ->fillForm([
            'email' => $userToAuthenticate->email,
            'password' => 'password',
        ])
        ->call('authenticate')
        ->assertRedirect(Filament::getUrl());

    $this->assertAuthenticatedAs($userToAuthenticate);
});

test('Panel cannot be accessed', function () {
    $userToAuthenticate = User::factory()->create();

    Filament::setCurrentPanel(Filament::getPanel('custom'));

    livewire(Login::class)
        ->fillForm([
            'email' => $userToAuthenticate->email,
            'password' => 'password',
        ])
        ->call('authenticate')
        ->assertHasFormErrors(['email']);

    $this->assertGuest();
});