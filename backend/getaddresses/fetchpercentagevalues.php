<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$accountNum = $_POST["accountNum"];
// $accountNum = "00031879";

define('DS', '/');
if ($_SERVER['HTTP_HOST'] === 'localhost') {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'practices' . DS . 'learnreactjs' . DS . 'propertytaxlock' . DS . 'backend' . DS . 'config.php';
} else {
    include_once $_SERVER['DOCUMENT_ROOT'] . DS . 'test' . DS . 'backend' . DS . 'config.php';
}

$totalValuesTableList = array('2014values','2015values','2016values','2017values','2018values','2019values');
// Set empty array
$appraisalYearAndTotalValuesList = array();

try{
    // Create a database connection
    $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if ($accountNum !== NULL) {
        for ($i=0; $i < count($totalValuesTableList); $i++) { 
            // Create an sql statement
            $sql = "SELECT `Appraisal_Year` AS Year, `Total_Value` AS TValue FROM " . $totalValuesTableList[$i] . " WHERE `Account_Num` = " . $accountNum;
            
            $query = $db->query($sql);
            
            if ($query->num_rows > 0) {
                while ($row = $query->fetch_assoc()) {
                    $appraisalYearAndTotalValuesList[] = $row;
                }
            }
        }

        // Next Calculate Percentage Chage
        // First Array Has A Percentage Change of 0
        // Set Empty Array For Percentage Change
        $appraisalYearAndTotalValuesAndPercentageChangeList = array();
        if (count($appraisalYearAndTotalValuesList) > 0) {
            for ($i=0; $i < count($appraisalYearAndTotalValuesList); $i++) { 
                # code...
                $currentTValue = $appraisalYearAndTotalValuesList[$i]["TValue"];
                if ($i === 0) {
                    $percentageChange = 0;
                } else {
                    $previousTValue = $appraisalYearAndTotalValuesList[$i - 1]["TValue"];
                    $percentageChange = ((($currentTValue - $previousTValue) / $previousTValue) * 100);
                    $percentageChange = number_format($percentageChange, 2);
                }

                $percentageChange = $percentageChange . "%";
                $appraisalYear = $appraisalYearAndTotalValuesList[$i]["Year"];
                $Tvalue = $currentTValue;
                $FormattedTValue = "$" . number_format($Tvalue);

                $appraisalYearAndTotalValuesAndPercentageChangeList[] = array(
                    "year" => $appraisalYear,
                    "TValue" => $Tvalue,
                    "FormattedTValue" => $FormattedTValue,
                    "PercentageChange" => $percentageChange,
                );
            }

            echo json_encode(array(
                "code" => "success",
                "statistics" => $appraisalYearAndTotalValuesAndPercentageChangeList,
            ));

        } else {
            echo json_encode(array(
                "code" => "empty",
                "message" => "Account Number Was Not Found In Values Tables"
            ));
        }

    } else {
        echo json_encode(array(
            "code" => "error",
            "message" => "Account Number Was Not Sent"
        ));
    }

} catch (Exception $e) {
    echo json_encode(array(
        "code" => "error",
        "message" => $e->getMessage()
    ));
}

?>