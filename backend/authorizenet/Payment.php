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

// Set Transaction ID To Empty String Here
$transactionId = "";
$wasTransactionSuccessful = false;
$response = null;

// Retrieve card and user info from the submitted form data
$cardNumber = $_POST['cardnumber'];
$expiryYear = $_POST['expiryyear'];
$expiryMonth = $_POST['expirymonth'];
$expirationDate = $expiryYear . '-' . $expiryMonth;
$cardCode = $_POST['cardcode'];
$invoiceNumber = $_POST['Account_Num'];
$Account_Num = $_POST['Account_Num'];
$productDescription = 'Tax Reduction Payment For Property At ' . $_POST['Situs_Address'] . ', Account Number ' . $_POST['Account_Num'];
$email = $_POST['email'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$company = $_POST['company'];
$country = 'US';
$address = $_POST['address'];
$address2 = $_POST['address2'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$phone = $_POST['phone'];
$password = $_POST['password'];
$productID = $_POST['productID'];
$couponID = $_POST['couponID'];
$couponCode = "";

// Get The Amount For This Property
// Woocommerce Rest Api
require_once WOOCOMMERCE_PATH . 'wooconnection.php';

// use the product id to get the price through woocommerce
$product = $woocommerce->get('products/' . $productID);
$amount = $product->price;

// Now Check If We Have Coupon Sent
if ($couponID !== "") {
    $couponDetails = $woocommerce->get('coupons/' . $couponID);

    // Reset The Coupon Code From Empty String
    $couponCode = $couponDetails->code;

    // Recalculate The Amount
    // Check The Discount Type
    if ($couponDetails->discount_type === "percent") {
        // Calculate Based On Percentage
        $CouponDiscount = $amount * (intval($couponDetails->amount) / 100);
        $amount = $amount - $CouponDiscount;

    } else {
        // Calculate Based On Fixed Discount
        $CouponDiscount = intval($couponDetails->amount);
        $amount = $amount - $CouponDiscount;
    }

    // Check If the New Price Is <= Zero
    if ($amount <= 0) {
        $amount = 0;
        $CouponDiscount = $amount;
    }
}


// Run Authorize.net If $amount is greater than Zero
require 'vendor/autoload.php';

use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;
define("AUTHORIZENET_LOG_FILE", "phplog");

if ($amount > 0) {

    /* Create a merchantAuthenticationType object with authentication details
        retrieved from the constants file */
    $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
    $merchantAuthentication->setName(ANET_API_LOGIN_ID);
    $merchantAuthentication->setTransactionKey(ANET_TRANSACTION_KEY);
    
    // Set the transaction's refId
    $refId = 'ref' . time();
    
    // Create the payment data for a credit card
    $creditCard = new AnetAPI\CreditCardType();
    $creditCard->setCardNumber($cardNumber);
    $creditCard->setExpirationDate($expirationDate);
    $creditCard->setCardCode($cardCode);
    
    
    // Add the payment data to a paymentType object
    $paymentOne = new AnetAPI\PaymentType();
    $paymentOne->setCreditCard($creditCard);
    
    
    // Create order information
    $order = new AnetAPI\OrderType();
    $order->setInvoiceNumber($invoiceNumber);
    $order->setDescription($productDescription);
    
    
    // Set the customer's Bill To address
    $customerAddress = new AnetAPI\CustomerAddressType();
    $customerAddress->setFirstName($firstName);
    $customerAddress->setLastName($lastName);
    $customerAddress->setCompany($company);
    $customerAddress->setAddress($address);
    $customerAddress->setCity($city);
    $customerAddress->setState($state);
    $customerAddress->setZip($zipcode);
    $customerAddress->setCountry($country);
    
    
    // Set the customer's identifying information
    $customerData = new AnetAPI\CustomerDataType();
    $customerData->setType("individual");
    $customerData->setId($invoiceNumber);
    $customerData->setEmail($email);
    
    
    // Add values for transaction settings
    // $duplicateWindowSetting = new AnetAPI\SettingType();
    // $duplicateWindowSetting->setSettingName("duplicateWindow");
    // $duplicateWindowSetting->setSettingValue("60");
    
    
    // Add some merchant defined fields. These fields won't be stored with the transaction,
    // but will be echoed back in the response.
    $merchantDefinedField1 = new AnetAPI\UserFieldType();
    $merchantDefinedField1->setName("AccounNum");
    $merchantDefinedField1->setValue($Account_Num);
    // $merchantDefinedField2 = new AnetAPI\UserFieldType();
    // $merchantDefinedField2->setName("favoriteColor");
    // $merchantDefinedField2->setValue("blue");
    
    
    // Create a TransactionRequestType object and add the previous objects to it
    $transactionRequestType = new AnetAPI\TransactionRequestType();
    $transactionRequestType->setTransactionType("authCaptureTransaction");
    $transactionRequestType->setAmount($amount);
    $transactionRequestType->setOrder($order);
    $transactionRequestType->setPayment($paymentOne);
    $transactionRequestType->setBillTo($customerAddress);
    $transactionRequestType->setCustomer($customerData);
    // $transactionRequestType->addToTransactionSettings($duplicateWindowSetting);
    $transactionRequestType->addToUserFields($merchantDefinedField1);
    // $transactionRequestType->addToUserFields($merchantDefinedField2);
    
    
    // Assemble the complete transaction request
    $request = new AnetAPI\CreateTransactionRequest();
    $request->setMerchantAuthentication($merchantAuthentication);
    $request->setRefId($refId);
    $request->setTransactionRequest($transactionRequestType);
    
    
    // Create the controller and get the response
    $controller = new AnetController\CreateTransactionController($request);
    $response = $controller->executeWithApiResponse(constant("\\net\authorize\api\constants\ANetEnvironment::$ANET_ENV"));

    if ($response != null) {
        // Check to see if the API request was successfully received and acted upon
        if ($response->getMessages()->getResultCode() == "Ok") {
            // Since the API request was successful, look for a transaction response
            // and parse it to display the results of authorizing the card
            $tresponse = $response->getTransactionResponse();
        
            if ($tresponse != null && $tresponse->getMessages() != null) {
                // echo " Successfully created transaction with Transaction ID: " . $tresponse->getTransId() . "\n";
                // echo " Transaction Response Code: " . $tresponse->getResponseCode() . "\n";
                // echo " Message Code: " . $tresponse->getMessages()[0]->getCode() . "\n";
                // echo " Auth Code: " . $tresponse->getAuthCode() . "\n";
                // echo " Description: " . $tresponse->getMessages()[0]->getDescription() . "\n";
                $transactionId = $tresponse->getTransId();
                $wasTransactionSuccessful = true;
                
            } else {
                $apiResponse = json_encode(
                    [
                        "code" => "payment_error",
                        "paymentCode" => $tresponse->getErrors()[0]->getErrorCode(),
                        "paymentMessage" => $tresponse->getErrors()[0]->getErrorText(),
                        "transactionResponse" => $tresponse,
                    ]
                );
            }
            // Or, print errors if the API request wasn't successful
        } else {
            $tresponse = $response->getTransactionResponse();
        
            if ($tresponse != null && $tresponse->getErrors() != null) {
                $apiResponse = json_encode(
                    [
                        "code" => "payment_error",
                        "paymentCode" => $tresponse->getErrors()[0]->getErrorCode(),
                        "paymentMessage" => $tresponse->getErrors()[0]->getErrorText(),
                        "transactionResponse" => $tresponse
                    ]
                );
            } else {
                $apiResponse = json_encode(
                    [
                        "code" => "payment_error",
                        "paymentCode" => $response->getMessages()->getMessage()[0]->getCode(),
                        "paymentMessage" => $response->getMessages()->getMessage()[0]->getText(),
                        "transactionResponse" => $tresponse
                    ]
                );
            }
        }
    } else {
        $apiResponse = json_encode(
            [
                "code" => "payment_error",
                "paymentMessage" => "No Response From Authorize.Net"
            ]
        );
    }

}


if ($amount === 0 || ($amount > 0 && $wasTransactionSuccessful)) {
    try {
        // Create A New Customer
        include_once WOOCOMMERCE_PATH . "CreateCustomer.php";
    
        // Create A New Order
        include_once WOOCOMMERCE_PATH . "CreateOrder.php";
    
        // Update Infusionsoft Account
        include_once INFUSIONSOFT_PATH . "UpdateContact.php";
    
        // Redirect to signnow
        include_once SIGNNOW_PATH . "signdocument.php";
    
        $apiResponse = json_encode(
            [
                "code" => "payment_success",
                "transactionResponse" => $response === null ? '' : $response->getTransactionResponse(),
                "paymentMessage" => $response === null ? 'Ok' : $response->getMessages()->getResultCode(),
                "signNowLink" => $link_to_sign_doc,
                "situsAddres" => $_POST['Situs_Address'],
                "amount" => CURRENCY . $amount
            ]
        );
    
    } catch (Exception $e) {
        $apiResponse = json_encode(
            [
                "code" => "registration-error-email-exists",
                "paymentMessage" => $e->getMessage(),
            ]
        );
    }
}

echo $apiResponse;

return $response;

?>