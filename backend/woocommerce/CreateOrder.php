<?php

// define('DS', '/');
// if ($_SERVER['HTTP_HOST'] === 'localhost') {
//     include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'practices' . DS . 'learnreactjs' . DS . 'propertytaxlock' . DS . 'propertytaxlock' . DS . 'backend' . DS . 'config.php';
// } else {
//     include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'backend' . DS . 'config.php';
// }

// Woocommerce Rest Api
require_once WOOCOMMERCE_PATH . 'wooconnection.php';

if ($couponID !== "" && $couponCode !== "") {
    $data = [
        'payment_method' => $amount > 0 ? 'authorize_net_cim_credit_card' : '',
        'payment_method_title' => $amount > 0 ? 'Credit Card' : '',
        'transaction_id' => $transactionId,
        'customer_id' => $CustomerId,
        'currency' => CURRENCY,
        'set_paid' => true,
        'billing' => [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'company' => $company,
            'address_1' => $address,
            'address_2' => $address2,
            'city' => $city,
            'state' => $state,
            'postcode' => $zipcode,
            'country' => $country,
            'email' => $email,
            'phone' => $phone
        ],
        'shipping' => [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'company' => $company,
            'address_1' => $address,
            'address_2' => $address2,
            'city' => $city,
            'state' => $state,
            'postcode' => $zipcode,
            'country' => $country,
        ],
        'line_items' => [
            [
                'product_id' => $productID,
                'quantity' => 1
            ]
        ],
        'coupon_lines' => [
            [
                'code' => $couponCode
            ]
        ]
    ];

} else {
    $data = [
        'payment_method' => $amount > 0 ? 'authorize_net_cim_credit_card' : '',
        'payment_method_title' => $amount > 0 ? 'Credit Card' : '',
        'transaction_id' => $transactionId,
        'customer_id' => $CustomerId,
        'currency' => CURRENCY,
        'set_paid' => true,
        'billing' => [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'company' => $company,
            'address_1' => $address,
            'address_2' => $address2,
            'city' => $city,
            'state' => $state,
            'postcode' => $zipcode,
            'country' => $country,
            'email' => $email,
            'phone' => $phone
        ],
        'shipping' => [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'company' => $company,
            'address_1' => $address,
            'address_2' => $address2,
            'city' => $city,
            'state' => $state,
            'postcode' => $zipcode,
            'country' => $country,
        ],
        'line_items' => [
            [
                'product_id' => $productID,
                'quantity' => 1
            ]
        ]
    ];

}

$Order = $woocommerce->post('orders', $data);

$OrderId = $Order->id;

// Add OrderId and Customer Id to Orders Table
$db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$sql = "INSERT INTO `orders` (`orders_id`, `customer_id`) VALUES ('" . $OrderId . "', '" . $CustomerId . "')";

$db->query($sql);

// Close database connection
$db->close();
?>