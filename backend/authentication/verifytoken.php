<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

require_once '../woocommerce/wooconfig.php';

require "./vendor/autoload.php";

use \Firebase\JWT\JWT;

$jwt = $_POST["jwt"];

try {

    JWT::decode($jwt, JWT_SECRET, array('HS256'));

} catch(Exception $e) {
    echo json_encode(array(
        "code" => "invalid_token",
        "message" => $e->getMessage()
    ));
}

?>