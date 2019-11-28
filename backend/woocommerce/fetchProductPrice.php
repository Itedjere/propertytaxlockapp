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
require_once WOOCOMMERCE_PATH . 'wooconnection.php';

$Account_Num = $_POST["Account_Num"];
// $Account_Num = '00000485';

try {
    // Make a call to the 2019values tables to get the values for this property
    // Use the value to get the product id 
    // use the product id to get the price through woocommerce

    // Create a database connection
    $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
    
    // Make a call to the 2019values tables to get the values for this property
    $sql = "SELECT a.`County`, b.`RP`, b.`Total_Value` FROM `2019values` AS b INNER JOIN `taxes` AS a USING (`Account_Num`) WHERE b.`Account_Num` = " . $Account_Num;
    $query = $db->query($sql);

    if ($query->num_rows > 0) {
        $row = $query->fetch_assoc();

        // Use the value to get the product id 
        $product_id = getProductIDForProperty($row);
    } else {
        // In A Situation Where We Don't Get any response from the database,
        // Set the product id to 24
        $product_id = 24;
    }
    
    // use the product id to get the price through woocommerce
    $product = $woocommerce->get('products/' . $product_id);

    echo json_encode(array(
        "code" => "success",
        "product" => $product,
    ));

} catch(Exception $e) {
    echo json_encode(array(
        "code" => "error",
        "message" => $e->getMessage()
    ));
}

/**
 * Return the correct product ID to add to cart based on property information
 */
function getProductIDForProperty($prop_info) {
	if ($prop_info["RP"] === "C") return 24;  // Commercial property

    $val = intval($prop_info["Total_Value"]);
    
	if ($val < 125001) {
		$product_id = PROPERTY_PRICE[COUNTY[$prop_info["County"]]][0];
	} elseif ($val < 250001) {
		$product_id = PROPERTY_PRICE[COUNTY[$prop_info["County"]]][1];
	} elseif ($val < 375001) {
		$product_id = PROPERTY_PRICE[COUNTY[$prop_info["County"]]][2];
	} else {
		$product_id = PROPERTY_PRICE[COUNTY[$prop_info["County"]]][3];
	}
	return $product_id;
}

?>