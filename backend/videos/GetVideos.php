<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


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

try {
    if (JWT::decode($jwt, JWT_SECRET, array('HS256'))) {
        $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
        $sql = "SELECT * FROM  `videos`";
        $query = $db->query($sql);

        $videos = array();
        if ($query->num_rows > 0) {
            while($row = $query->fetch_assoc()) {
                $videos[] = $row;
            }
            echo json_encode([
                "videos" => $videos
            ]);

        } else {
            echo json_encode([
                "videos" => $videos
            ]);
        }
    }
} catch(Exception $e) {
    echo json_encode(["code" => "jwt_error", "message" => $e->getMessage()]);
}

?>