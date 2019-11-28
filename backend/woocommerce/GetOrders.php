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

// Woocommerce Rest Api
require_once 'wooconnection.php';


require "../authentication/vendor/autoload.php";

use \Firebase\JWT\JWT;

$customerId = $_POST["customerId"];
$jwt = $_POST["jwt"];

try {

    $decoded = JWT::decode($jwt, JWT_SECRET, array('HS256'));

    echo json_encode($woocommerce->get('orders?customer=' . $customerId));

} catch(Exception $e) {
    echo json_encode(array(
        "code" => "jwt_error",
        "message" => $e->getMessage()
    ));
}
?>