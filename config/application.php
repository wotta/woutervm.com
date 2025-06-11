<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Security Domain
    |--------------------------------------------------------------------------
    |
    | This value determines the allowed email domain for accessing the admin panel.
    | Only users with email addresses ending in this domain will be granted access
    | to the admin panel in production environments.
    |
    */

    'security_domain' => env('SECURITY_DOMAIN', 'example.com'),
];
