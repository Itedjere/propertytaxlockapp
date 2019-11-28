<?php

/* Update Notifications */

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
$customerId = $_POST["customerId"];
$notificationid = $_POST["notificationid"];

try {
    if (JWT::decode($jwt, JWT_SECRET, array('HS256'))) {
        $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
        $sql = "UPDATE `notifications` SET `nt_haswatched` = 'YES' WHERE 
        `nt_id` = $notificationid";

        $db->query($sql);

        // Get Video Notifications
        $sql1 = "SELECT * FROM `notifications` WHERE 
        `nt_customerid` = $customerId AND `nt_haswatched` = 'NO'";
        $query1 = $db->query($sql1);

        $Notifications = array();
        if ($query1->num_rows > 0) {
            while ($row = $query1->fetch_assoc()) {
                $Notifications[] = $row;
            }
        }
        echo json_encode(
            [
                "notifications" => $Notifications,
            ]
        );

    } else {
        // This User Has Not Been Authenticated. 
        // He Should Login Again
        echo json_encode(
            [
                "code" => "jwt_error",
                "message" => "Please Put In Your Login Details To Login",
            ]
        );
    }
} catch(Exception $e) {
    echo json_encode(["code" => "jwt_error", "message" => $e->getMessage()]);
}

?>