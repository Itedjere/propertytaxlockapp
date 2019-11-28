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

require "./vendor/autoload.php";

use \Firebase\JWT\JWT;



$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Query the database.
$db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
// We need to check if the old password matches the one on the database
$sql = "SELECT * FROM `customers` WHERE `customer_email` = '" . $email . "' LIMIT 0, 1";

$query = $db->query($sql);
if ($query->num_rows > 0) {
    $row = $query->fetch_array();
    $id = $row["customer_autoid"];
    $email = $row["customer_email"];
    $customerId = $row["customer_id"];
    $accountNum = $row["account_num"];

    // Confirm The Old Pasword With The One In The Database
    $dbHash = $row["customer_password"];

    if (password_verify($password, $dbHash)) {

        $issuedat_claim = time(); // issued at
        // $notbefore_claim = $issuedat_claim + 1; //not before in seconds
        $expire_claim = $issuedat_claim + 86400; // expire time in seconds

        $token = array(
            "iss" => JWT_ISSUER,
            "aud" => JWT_AUDIENCE,
            "iat" => $issuedat_claim,
            // "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
                "email" => $email,
                "customerid" => $customerId,
                "loggedInAs" => "customer"
        ));

        $jwt = JWT::encode($token, JWT_SECRET);

        // Grab the customers Account Numbes
        // $sql = "SELECT 
        // `cust_accountnumbers`.`ca_accnumber`, 
        // `taxes`.`Situs_Address`, 
        // `taxes`.`Owner_CityState` 
        // FROM `cust_accountnumbers` LEFT JOIN `taxes` 
        // ON `cust_accountnumbers`.`ca_accnumber` = `taxes`.`Account_Num` 
        // WHERE `cust_accountnumbers`.`ca_customerid` = $customerId";
        $sql = "SELECT * FROM `taxes` WHERE `taxes`.`Account_Num` = $accountNum";
        $query = $db->query($sql);

        $properties = array();
        if ($query->num_rows > 0) {
            while ($row = $query->fetch_assoc()) {
                $properties[] = $row;
            }

            // Get Notifications
            $sql1 = "SELECT * FROM `notifications` WHERE `nt_customerid` = $customerId AND `nt_haswatched` = 'NO'";
            $query1 = $db->query($sql1);

            $Notifications = array();
            if ($query1->num_rows > 0) {
                while ($row = $query1->fetch_assoc()) {
                    $Notifications[] = $row;
                }
            }


            echo json_encode([
                "code" => "login_success",
                "isLogged" => true,
                "message" => "LoggedIn Successfully",
                "jwt" => $jwt,
                "properties" => $properties,
                "customerId" => $customerId,
                "notifications" => $Notifications,
            ]);
        } else {
            // Account Number Not Found Strange!!!
            echo json_encode([
                "code" => "accountnumber_notfound",
                "message" => "Somehow Your Account Number Was Not Found"
            ]);
        }
    } else {
        echo json_encode([
            "code" => "invalid_password",
            "isLogged" => false,
            "message" => "Invalid Login Credentials"
        ]);
    }

} else {
    // Invalid Email Address
    echo json_encode([
        "code" => "invalid_email",
        "isLogged" => false,
        "message" => "Invalid Login Credentials"
    ]);
}

// Close database connection
$db->close();
?>