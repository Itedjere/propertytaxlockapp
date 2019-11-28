<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");

define('DS', '/');
if ($_SERVER['HTTP_HOST'] === 'localhost') {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'practices' . DS . 'learnreactjs' . DS . 'propertytaxlock' . DS . 'backend' . DS . 'config.php';
} else {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'test' . DS . 'backend' . DS . 'config.php';
}

// JWT Validation
require "../authentication/vendor/autoload.php";

use \Firebase\JWT\JWT;

$jwt = $_POST["jwt"];
$customerId = $_POST["customerId"];

try {
    if (JWT::decode($jwt, JWT_SECRET, array('HS256'))) {
        $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
        $sql = "SELECT * FROM  `documents` WHERE `doc_customerid` = " . $customerId;
        $query = $db->query($sql);

        $documents = array();
        if ($query->num_rows > 0) {
            while($row = $query->fetch_assoc()) {
                $documents[] = $row;
            }
            echo json_encode([
                "documents" => $documents
            ]);

        } else {
            echo json_encode([
                "documents" => $documents
            ]);
        }
    }
} catch(Exception $e) {
    echo json_encode(["code" => "jwt_error", "message" => $e->getMessage()]);
}

?>