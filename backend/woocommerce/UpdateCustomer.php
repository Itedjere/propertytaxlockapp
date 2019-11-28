<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

define('DS', '/');
if ($_SERVER['HTTP_HOST'] === 'localhost') {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'practices' . DS . 'learnreactjs' . DS . 'propertytaxlock' . DS . 'backend' . DS . 'config.php';
} else {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'test' . DS . 'backend' . DS . 'config.php';
}

require "../authentication/vendor/autoload.php";

use \Firebase\JWT\JWT;

// Check the UpdateType
$updateType = $_POST["updateType"];

switch ($updateType) {
    case 'userprofile':
        # code...
        updateUserProfile();
        break;
    case 'bllingdetails':
        # code...
        updateBillingDetails();
        break;
    case 'changepassword':
        # code...
        changeUserPassword();
        break;
    default:
        # code...
        break;
}

// Updating Functions

function updateUserProfile() {

    // Woocommerce Rest Api
    include_once 'wooconnection.php';

    $email = $_POST['email'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $state = $_POST['state1'];
    $zipcode = $_POST['zipcode'];
    $phone = $_POST['phone'];
    $customerId = $_POST['userId'];
    $jwt = $_POST["jwt"];

    try {
        if (JWT::decode($jwt, JWT_SECRET, array('HS256'))) {
            $data = [
                'email' => $email,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'billing' => [
                    'address_1' => $address,
                    'city' => $city,
                    'state' => $state,
                    'postcode' => $zipcode,
                    'phone' => $phone
                ]
            ];
            echo json_encode($woocommerce->put('customers/' . $customerId, $data));
        }
    } catch (Exception $e) {
        echo json_encode(["code" => "jwt_error", "message" => $e->getMessage()]);
    }
}

function updateBillingDetails() {

    // Woocommerce Rest Api
    include_once 'wooconnection.php';
    
    $email = $_POST['email'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $state = $_POST['state1'];
    $zipcode = $_POST['zipcode'];
    $phone = $_POST['phone'];
    $company = $_POST['company'];
    $customerId = $_POST['userId'];
    $jwt = $_POST['jwt'];

    try {
        if (JWT::decode($jwt, JWT_SECRET, array('HS256'))) {
            $data = [
                'billing' => [
                    'address_1' => $address,
                    'city' => $city,
                    'email' => $email,
                    'state' => $state,
                    'postcode' => $zipcode,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'phone' => $phone,
                    'company' => $company,
                ]
            ];

            echo json_encode($woocommerce->put('customers/' . $customerId, $data));
        }
    } catch(Exception $e) {
        echo json_encode(["code" => "jwt_error", "message" => $e->getMessage()]);
    }
}

function changeUserPassword() {

    // Woocommerce Rest Api
    include_once 'wooconnection.php';
    
    $oldpassword = $_POST['oldpassword'];
    $newpassword = $_POST['newpassword'];
    $customerId = $_POST['userId'];
    $jwt = $_POST['jwt'];

    try {
        if (JWT::decode($jwt, JWT_SECRET, array('HS256'))) {

            $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
            // We need to check if the old password matches the one on the database
            $sql = "SELECT * FROM `customers` WHERE `customer_id` = " . $customerId;
            $query = $db->query($sql);
            if ($query->num_rows > 0) {
                $row = $query->fetch_array();
        
                // Confirm The Old Pasword With The One In The Database
                $oldHash = $row["customer_password"];
        
                if (password_verify($oldpassword, $oldHash)) {
        
                    // Hash the new Password
                    $newPasswordHash = password_hash($newpassword, PASSWORD_DEFAULT);
        
                    // Update Customer Password In The Database
                    $sql = "UPDATE `customers` SET `customer_password` = '" . $newPasswordHash . "' WHERE `customer_id` = " . $customerId;
                    if ($db->query($sql)) {
                        // Woocommerce Update
                        $data = [
                            'password' => $newpassword
                        ];
                        echo json_encode($woocommerce->put('customers/' . $customerId, $data));

                    } else {
                        echo json_encode([
                            "code" => "db_error",
                            "message" => "An Internal Server Error Occured. Please Try Again Later"
                        ]);
                    }
        
                } else {
                    echo json_encode([
                        "code" => "invalid_password",
                        "message" => "The Current Password Is Not Correct"
                    ]);
                }
            } else {
                echo json_encode([
                    "code" => "invalid_customer",
                    "message" => "You Are Not Successfully Logged In"
                ]);
            }
            // Close database connection
            $db->close();
            
        }
    } catch(Exception $e) {
        echo json_encode(["code" => "jwt_error", "message" => $e->getMessage()]);
    }


    
}

?>