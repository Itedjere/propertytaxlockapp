<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// Set The Timezone 
date_default_timezone_set("America/Chicago");

define('DS', '/');
if ($_SERVER['HTTP_HOST'] === 'localhost') {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'practices' . DS . 'learnreactjs' . DS . 'propertytaxlock' . DS . 'backend' . DS . 'config.php';
} else {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'test' . DS . 'backend' . DS . 'config.php';
}

// Woocommerce Rest Api
require_once 'wooconnection.php';

// Coupon Code Title
$couponcode = strtolower($_POST['coupon_name']);
$productID = $_POST["productID"];


try {

    $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    $sql = "SELECT ID FROM `wp_posts` WHERE `post_type` = 'shop_coupon' AND `post_name` = '" . $couponcode . "'";
    
    $query = $db->query($sql);
    
    if ($query->num_rows > 0) {

        $row = $query->fetch_array();
        $couponID = $row['ID'];

        // Close database connection
        $db->close();
        
        // Grab the coupon details
        $couponDetails = $woocommerce->get('coupons/'.$couponID);
        $productDetails = $woocommerce->get('products/'.$productID);

        // Run Conditions Here
        $couponValid = true;

        // 1. Check If The Coupon Code Has Expired
        if ($couponDetails->date_expires !== null) {
            $expiryDate = date_create($couponDetails->date_expires);
            $expiryDateTimestamp = date_timestamp_get($expiryDate);

            $todayDate = date_create();
            $todayDateTimestamp = date_timestamp_get($todayDate);

            if ($todayDateTimestamp >= $expiryDateTimestamp) {
                // Coupon Code Has Expired
                $couponValid = false;
                // Return Invalid Coupon Message
                echo json_encode(array(
                    "code" => "invalid_coupon",
                    "message" => "This Coupon Has Expired"
                ));
                return;
            }
        }

        // 2. Check Coupon Code Usage Limit
        if ($couponDetails->usage_limit !== null) {
            if ($couponDetails->usage_count >= $couponDetails->usage_limit) {
                // Usage Limit Is Exceeded
                $couponValid = false;
                // Return Invalid Coupon Message
                echo json_encode(array(
                    "code" => "invalid_coupon",
                    "message" => "Coupon usage limit has been reached."
                ));
                return;
            }
        }

        // 3. Check If The product ID is in the List of Excluded Products 
        if (in_array($productID, $couponDetails->excluded_product_ids)) {
            // Coupon Cannot Be Used For this Product
            $couponValid = false;
            // Return Invalid Coupon Message
            echo json_encode(array(
                "code" => "invalid_coupon",
                "message" => "Sorry, this coupon is not applicable to the products: " . $productDetails->name
            ));
            return;
        }

        // 4. Check If The Product Category ID is in the List Of Excluded Product Categories
        $productCategories = $productDetails->categories;

        if (count($productCategories) > 0) {
            $arrayBooleans = array();
            $categoryNames = "";

            for ($i = 0; $i < count($productCategories); $i++) { 
                $productCategoryID = $productCategories[$i]->id;
                $productCategoryName = $productCategories[$i]->name;

                if (in_array($productCategoryID, $couponDetails->excluded_product_categories)) {
                    $arrayBooleans[] = false;
                    $categoryNames .= $productCategoryName . ", ";
                }
            }

            if (in_array(false, $arrayBooleans)) {
                // Return Invalid Coupon Message
                // Coupon Cannot Be Use For this Product Category
                $couponValid = false;
                echo json_encode(array(
                    "code" => "invalid_coupon",
                    "message" => "Sorry, this coupon is not applicable to the categories: " . $categoryNames,
                ));
                return;
            }
        }

        // 5. Finally Calculate Discount
        $productPrice = intval($productDetails->price);
        
        if ($couponValid) {

            // Check The Discount Type
            if ($couponDetails->discount_type === "percent") {
                // Calculate Based On Percentage
                $CouponDiscount = $productPrice * (intval($couponDetails->amount) / 100);
                $NewProductPrice = $productPrice - $CouponDiscount;

            } else {
                // Calculate Based On Fixed Discount
                $CouponDiscount = intval($couponDetails->amount);
                $NewProductPrice = $productPrice - $CouponDiscount;
            }

            // Check If the New Price Is <= Zero
            if ($NewProductPrice <= 0) {
                $NewProductPrice = 0;
                $CouponDiscount = $productPrice;
            }

            echo json_encode(array(
                "code" => "success",
                "couponID" => $couponID,
                "couponCode" => $couponcode,
                "couponDiscount" => $CouponDiscount,
                "totalPrice" => $NewProductPrice,
                "subTotalPrice" => $productPrice,
            ));
        }
    
    } else {
        echo json_encode(array(
            "code" => "not_found",
            "message" => 'Invalid Coupon Code'
        ));
    }

} catch (Exception $e) {
    echo json_encode(array(
        "code" => "unknown_error",
        "message" => $e->getMessage(),
    ));
}
?>