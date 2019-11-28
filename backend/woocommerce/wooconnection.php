<?php

require __DIR__ . '/vendor/autoload.php';

use Automattic\WooCommerce\Client;

$woocommerce = new Client(
    'https://propertytaxlock.com/wp/',
    CUSTOMER_KEY,
    CUSTOMER_SECRET,
    [
        'wp_api' => true,
        'version' => 'wc/v3'
    ]
);
?>
