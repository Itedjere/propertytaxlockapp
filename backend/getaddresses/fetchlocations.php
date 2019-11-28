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


try{
    // Create a database connection
    $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // Create an sql statement
    $sql = "SELECT a.`Account_Num`, c.`Latitude`, c.`Longitude`, CONCAT('$', FORMAT(a.`Total_Value` - b.`Total_Value`, 0)) AS TValue FROM `2019values` AS a INNER JOIN `2018values` AS b USING(`Account_Num`) INNER JOIN `leaflet` AS c ON a.`Account_Num` = c.`AccountNumber` WHERE a.`Total_Value` > b.`Total_Value` LIMIT 1000";
    
    $query = $db->query($sql);

    // Set empty array
    $locations = array();
    if ($query->num_rows > 0) {
        while ($row = $query->fetch_assoc()) {
            $locations[] = $row;
        }
    }
    echo json_encode([
        "locations" => $locations,
        "query" => $sql,
    ]);

} catch (Exception $e) {
    echo json_encode(array(
        "code" => "error",
        "message" => $e->getMessage()
    ));
}

?>