<?php

// Woocommerce Store Customer Key and Secret
define('CUSTOMER_KEY', 'ck_98d5a198e28bde435b7985d0f4108b2d3cc6fc1a');
define('CUSTOMER_SECRET', 'cs_08c5cbb93a34e6980c170e8097fd35090bf11bb1');

// Database configuration  
define('DB_HOST', 'localhost');
// define('DB_USERNAME', 'property_taxlock');  
// define('DB_PASSWORD', 'k@+NXi^}[poY');  
// define('DB_NAME', 'property_propertytaxlock');

define('DB_USERNAME', 'root');  
define('DB_PASSWORD', '');  
define('DB_NAME', 'propertytaxlock');


// Cost For Property
define('PROPERTY_PRICE', array (
	'tarrant' => array(25957,25958,25959,25960),
	'denton' => array(25961,25962,25963,25964),
	'dallas' => array(25965,25966,25967,25968),
	'harris' => array(25969,25970,25971,25972),
	'johnson' => array(27631,27637,27640,27643),
));

// Counties And Their Numbers
define('COUNTY', array(
    '220' => 'tarrant',
));
  
 
// Authorize.Net API configuration  
define('CURRENCY', 'USD');
define('ANET_API_LOGIN_ID', '33sx3XvR9FR');  
define('ANET_TRANSACTION_KEY', '6RY64Dby5YDD5w3D');  
$ANET_ENV = 'SANDBOX'; // or PRODUCTION 

// JWT Credentials
define('JWT_SECRET', 'ded059dfeca3056c8f0b42928577cbb843ea75faef4148092c2d0538dc229624');
define('JWT_ISSUER', 'https://propertytaxlock.com');
define('JWT_AUDIENCE', 'https://texaspropertyappeals.com');

//PATHS
!defined('DS') ? define('DS', '/') : null;
if ($_SERVER['HTTP_HOST'] === 'localhost') {
    define('HOST_NAME', 'http://localhost' . DS . 'practices' . DS . 'learnreactjs' . DS . 'propertytaxlock' . DS . 'backend' .DS);
    !defined('DOC_ROOT') ? define('DOC_ROOT', $_SERVER['DOCUMENT_ROOT'] . DS . 'practices' . DS . 'learnreactjs' . DS . 'propertytaxlock' . DS . 'backend' .DS) : null;
} else {
    define('HOST_NAME', 'http://' . $_SERVER['HTTP_HOST'] . DS . 'test' . DS . 'backend' .DS);
    !defined('DOC_ROOT') ? define('DOC_ROOT', $_SERVER['DOCUMENT_ROOT'] . DS . 'test' . DS . 'backend' .DS) : null;
}

// WOOCOMMERCE PATHS
!defined('WOOCOMMERCE_PATH') ? define('WOOCOMMERCE_PATH', DOC_ROOT . 'woocommerce' . DS) : null;


// SIGNNOW PATHS
define('SIGNNOW_PATH', DOC_ROOT . 'signnow' . DS);
define('SIGNNOW_CLASS_PATH', SIGNNOW_PATH . 'class' . DS);
define('SIGNNOW_REDIRECT_URI', 'https://propertytaxlock.com/test/login');

// INFUSIONSOFT PATHS
!defined('INFUSIONSOFT_PATH') ? define('INFUSIONSOFT_PATH', DOC_ROOT . 'infusionsoft_novak' . DS) : null;

// define('JWT_SECRET', 'ded059dfeca305c8f0b42928577cbb843ea75faef4148092c2d0538dc229624');


// This is the function that generated the JWT_SECRET KEY
// hash_hmac('sha256', 'property reductions for you', 'propertytaxlock');
?>