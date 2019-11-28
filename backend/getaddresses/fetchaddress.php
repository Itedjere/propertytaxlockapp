<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$propertyAddress = $_POST["propertyAddress"];
$searchType = $_POST["searchType"];

define('DS', '/');
if ($_SERVER['HTTP_HOST'] === 'localhost') {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'practices' . DS . 'learnreactjs' . DS . 'propertytaxlock' . DS . 'backend' . DS . 'config.php';
} else {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'test' . DS . 'backend' . DS . 'config.php';
}

if ($searchType === "address") {
    $sql2 = " WHERE MATCH (`taxes`.`Situs_Address`) AGAINST ('" . $propertyAddress . "') ";
} elseif ($searchType === "accountNumber") {
    $sql2 = " WHERE `taxes`.`Account_Num` = '" . $propertyAddress . "'";
} elseif ($searchType === "ownerName") {
    $sql2 = " WHERE MATCH (`taxes`.`Owner_Name`) AGAINST ('" . $propertyAddress . "') ";
}

try{
    // Create a database connection
    $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
    
    // Create an sql statement
    $sql = "SELECT * FROM `taxes`" . $sql2 . " LIMIT 10";
    $query = $db->query($sql);
    
    // Set empty array
    $properties = array();
    if ($query->num_rows > 0) {
        while ($row = $query->fetch_assoc()) {
            if ($row["Situs_Address"] !== "") {
                $properties[] = $row;
            }
        }
        echo json_encode([
            "properties" => $properties,
            "query" => $sql,
        ]);
    
    } else {
        echo json_encode([
            "properties" => $properties,
            "query" => $sql,
        ]);
    }
    
    // Close Database Connection
    $db->close();
}
catch(Exception $e) {
    echo json_encode(array(
        "code" => "error",
        "message" => $e->getMessage(),
        "properties" => array(),
    ));
}
?>