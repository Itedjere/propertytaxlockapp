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

$response = array();
$upload_dir = 'uploads/';
$server_url = HOST_NAME . 'fileupload';

// JWT Validation
require "../authentication/vendor/autoload.php";

use \Firebase\JWT\JWT;

$jwt = $_POST["jwt"];

try {
    if (JWT::decode($jwt, JWT_SECRET, array('HS256'))) {
        if($_FILES['file']) {

            $file_name = $_FILES["file"]["name"];
            $file_type = $_FILES["file"]["type"];
            $file_tmp_name = $_FILES["file"]["tmp_name"];
            $error = $_FILES["file"]["error"];

            if($error > 0){
                $response = array(
                    "code" => "file_error",
                    "message" => "Error uploading the file!"
                );
            } else {

                $random_name = rand(1000, 1000000)."-".$file_name;
                $upload_name = $upload_dir.strtolower($random_name);
                $upload_name = preg_replace('/\s+/', '-', $upload_name);
            
                if (move_uploaded_file($file_tmp_name, $upload_name)) {
                    
                    // Save Customer Document Details Into The Database
                    $title = $_POST["title"];
                    $description = $_POST["description"];
                    $customerId = $_POST["customerId"];
                    $accountNumber = $_POST["accountNumber"];

                    $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
                    $sql = "INSERT INTO `documents` (`doc_customerid`, `doc_accountNumber`, `doc_loc`, `doc_title`, `doc_description`, `doc_type`) VALUES ('" . $customerId . "', '" . $accountNumber . "', '" . $upload_name . "', '" . $title . "', '" . $description . "', '" . $file_type . "')";

                    if ($db->query($sql)) {
                        // Return this newly added document to Client
                        $document = array();
                        $document["doc_id"] = $db->insert_id;
                        $document["doc_customerid"] = $customerId;
                        $document["doc_accountNumber"] = $accountNumber;
                        $document["doc_loc"] = $upload_name;
                        $document["doc_title"] = $title;
                        $document["doc_description"] = $description;
                        $document["doc_type"] = $file_type;

                        $response = array(
                            "document" => $document,
                            "message" => "File uploaded successfully",
                            "url" => $server_url."/".$upload_name
                        );
                        
                    } else {
                            $response = array(
                                "code" => "db_error",
                                "message" => "An Internal Server Error Occured. Please Try Again Later"
                            );
                    }
                    // Close database connection
                    $db->close();
                } else {
                    $response = array(
                        "code" => "move_error",
                        "message" => "Error uploading the file!"
                    );
                }
            }
            
        } else {
            $response = array(
                "code" => "empty_file",
                "message" => "No file was sent!"
            );
        }
        echo json_encode($response);
    }
} catch(Exception $e) {
    echo json_encode(["code" => "jwt_error", "message" => $e->getMessage()]);
}

?>