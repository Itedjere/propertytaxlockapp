<?php


// Woocommerce Rest Api
require_once WOOCOMMERCE_PATH . 'wooconnection.php';

$data = [
    'email' => $email,
    'first_name' => $firstName,
    'last_name' => $lastName,
    'username' => $email,
    'password' => $password,
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
    ]
];

$Customer = $woocommerce->post('customers', $data);

// Grab the customer Id
$CustomerId = $Customer->id;

/**
 * We just want to hash our password using the current DEFAULT algorithm.
 * This is presently BCRYPT, and will produce a 60 character result.
 *
 * Beware that DEFAULT may change over time, so you would want to prepare
 * By allowing your storage to expand past 60 characters (255 would be good)
 */
$password = password_hash($password, PASSWORD_DEFAULT);


// Save Customer Details Into The Database
$db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$sql = "INSERT INTO `customers` (`customer_email`, `customer_password`, `customer_id`, `account_num`) VALUES ('" . $email . "', '" . $password . "', '" . $CustomerId . "', '" . $invoiceNumber  . "')";

$db->query($sql);
// Close database connection
$db->close();

$db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$sql2 = "INSERT INTO `notifications` (`nt_customerid`, `nt_title`, `nt_type`, `nt_haswatched`) 
        VALUES ('" . $CustomerId . "', 'Please Click Here To Sign Your Document On SignNow', 'signnow', 'NO');";

$sql2 .= "INSERT INTO `notifications` (`nt_customerid`, `nt_title`, `nt_type`, `nt_haswatched`) 
VALUES ('" . $CustomerId . "', 'Watch instructional video on how to upload your documents and sign your documents', 'video', 'NO');";

$sql2 .= "INSERT INTO `notifications` (`nt_customerid`, `nt_title`, `nt_type`, `nt_haswatched`) 
VALUES ('" . $CustomerId . "', 'Please Click Here To Take Survey About Your Property', 'video', 'NO')";

$db->multi_query($sql2);
// Close database connection
$db->close();

?>