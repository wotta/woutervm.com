<?php

test('Panel can be rendered', function () {
    $response = $this->get('/wotty')
        ->assertRedirect('/wotty/login');

    dd($response->getContent());

    $response->assertStatus(200);
});
