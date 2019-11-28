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

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// JWT Validation
require "../authentication/vendor/autoload.php";

use \Firebase\JWT\JWT;

$jwt = $_POST["jwt"];
$customerId = $_POST["customerId"];
$accountNum = $_POST["accountNumber"];

$propertytype = $_POST["propertytype"];
$recentPurchasedCost = $_POST["recentPurchasedCost"];
$currentListedSaleCost = $_POST["currentListedSaleCost"];
$recentListedCost = $_POST["recentListedCost"];
$rentalProperty = $_POST["rentalProperty"] ? 'Yes' : 'No';
$obtainedPermits = $_POST["obtainedPermits"] ? 'Yes' : 'No';
$subtiantialImprovements = $_POST["subtiantialImprovements"] ? 'Yes' : 'No';
$yourOpinionOfValue = $_POST["yourOpinionOfValue"];
$totalLivingAreaSqFt = $_POST["totalLivingAreaSqFt"];
$lotAreaSqFt = $_POST["lotAreaSqFt"];
$bathroomsFull = $_POST["bathroomsFull"];
$bathroomsHalf = $_POST["bathroomsHalf"];
$bedrooms = $_POST["bedrooms"];
$numStoreis = $_POST["numStoreis"];
$numFirePlaces = $_POST["numFirePlaces"];
$FirePlaces = $_POST["FirePlaces"];
$basementType = $_POST["basementType"];
$basementAreaSqFt = $_POST["basementAreaSqFt"];
$garageType = $_POST["garageType"];
$numcars = $_POST["numcars"];
$foundationType = $_POST["foundationType"];
$typeOfRoof = $_POST["typeOfRoof"];
$woodframeExterior = $_POST["woodframeExterior"] ? 'Yes' : 'No';
$brickExterior = $_POST["brickExterior"] ? 'Yes' : 'No';
$stoneExterior = $_POST["stoneExterior"] ? 'Yes' : 'No';
$stuccoExterior = $_POST["stuccoExterior"] ? 'Yes' : 'No';
$guestquaters = $_POST["guestquaters"] ? 'Yes' : 'No';
$outdoorkitchen = $_POST["outdoorkitchen"] ? 'Yes' : 'No';
$stableBan = $_POST["stableBan"] ? 'Yes' : 'No';
$storageBuilding = $_POST["storageBuilding"] ? 'Yes' : 'No';
$tennisCourt = $_POST["tennisCourt"] ? 'Yes' : 'No';
$boatDock = $_POST["boatDock"] ? 'Yes' : 'No';
$boatDockWLift = $_POST["boatDockWLift"] ? 'Yes' : 'No';
$deck = $_POST["deck"] ? 'Yes' : 'No';
$Elevator = $_POST["Elevator"] ? 'Yes' : 'No';
$Pool = $_POST["Pool"] ? 'Yes' : 'No';
$Spa = $_POST["Spa"] ? 'Yes' : 'No';
$septicTank = $_POST["septicTank"] ? 'Yes' : 'No';
$Workshop = $_POST["Workshop"] ? 'Yes' : 'No';
$otherExteriorFeatures = $_POST["otherExteriorFeatures"];
$gatedCommunity = $_POST["gatedCommunity"] ? 'Yes' : 'No';
$creek = $_POST["creek"] ? 'Yes' : 'No';
$Lake = $_POST["Lake"] ? 'Yes' : 'No';
$pond = $_POST["pond"] ? 'Yes' : 'No';
$parkView = $_POST["parkView"] ? 'Yes' : 'No';
$golf = $_POST["golf"] ? 'Yes' : 'No';
$largeLot = $_POST["largeLot"] ? 'Yes' : 'No';
$irregularSize = $_POST["irregularSize"] ? 'Yes' : 'No';
$Corner = $_POST["Corner"] ? 'Yes' : 'No';
$greenBelt = $_POST["greenBelt"] ? 'Yes' : 'No';
$describeLot = $_POST["describeLot"];
$interiorFoundationIssues = $_POST["interiorFoundationIssues"] ? 'Yes' : 'No';
$exteriorFoundationIssues = $_POST["exteriorFoundationIssues"] ? 'Yes' : 'No';
$electricalIssues = $_POST["electricalIssues"] ? 'Yes' : 'No';
$plumbingIssues = $_POST["plumbingIssues"] ? 'Yes' : 'No';
$defectiveRoof = $_POST["defectiveRoof"] ? 'Yes' : 'No';
$subjectToFlooding = $_POST["subjectToFlooding"] ? 'Yes' : 'No';
$backsToCommercialProperty = $_POST["backsToCommercialProperty"] ? 'Yes' : 'No';
$petOdors = $_POST["petOdors"] ? 'Yes' : 'No';
$smokeOdors = $_POST["smokeOdors"] ? 'Yes' : 'No';
$cracksInSheetrocks = $_POST["cracksInSheetrocks"] ? 'Yes' : 'No';
$wallsNeedPaint = $_POST["wallsNeedPaint"] ? 'Yes' : 'No';
$CarpetNeedReplace = $_POST["CarpetNeedReplace"] ? 'Yes' : 'No';
$woodFloorRefinishing = $_POST["woodFloorRefinishing"] ? 'Yes' : 'No';
$TileColorOutdated = $_POST["TileColorOutdated"] ? 'Yes' : 'No';
$DoorsNeedRepair = $_POST["DoorsNeedRepair"] ? 'Yes' : 'No';
$CabinetNeedRepair = $_POST["CabinetNeedRepair"] ? 'Yes' : 'No';
$windowNeedRepair = $_POST["windowNeedRepair"] ? 'Yes' : 'No';
$windowNeedReplacement = $_POST["windowNeedReplacement"] ? 'Yes' : 'No';
$chimneyNeedCleaning = $_POST["chimneyNeedCleaning"] ? 'Yes' : 'No';
$electricalWiringProblems = $_POST["electricalWiringProblems"] ? 'Yes' : 'No';
$plumbingNeedsRepair = $_POST["plumbingNeedsRepair"] ? 'Yes' : 'No';
$bathrooms = $_POST["bathrooms"] ? 'Yes' : 'No';
$kitchen = $_POST["kitchen"] ? 'Yes' : 'No';
$faucets = $_POST["faucets"] ? 'Yes' : 'No';
$counterTopsNeedReplaced = $_POST["counterTopsNeedReplaced"] ? 'Yes' : 'No';
$showerTub = $_POST["showerTub"] ? 'Yes' : 'No';
$LightFixturesNeedReplaced = $_POST["LightFixturesNeedReplaced"];
$ApplicancesNeedRepairReplaced = $_POST["ApplicancesNeedRepairReplaced"];
$Toilets = $_POST["Toilets"] ? 'Yes' : 'No';
$MirroNeedReplaced = $_POST["MirroNeedReplaced"] ? 'Yes' : 'No';
$landscapingIsDead = $_POST["landscapingIsDead"] ? 'Yes' : 'No';
$landscapingIsBelowTypical = $_POST["landscapingIsBelowTypical"] ? 'Yes' : 'No';
$ExteriorNeedPaint = $_POST["ExteriorNeedPaint"] ? 'Yes' : 'No';
$exteriorWoodNeedsRepair = $_POST["exteriorWoodNeedsRepair"] ? 'Yes' : 'No';
$roofNeedsPaint = $_POST["roofNeedsPaint"] ? 'Yes' : 'No';
$roofNeedsReplacement = $_POST["roofNeedsReplacement"] ? 'Yes' : 'No';
$minorFoundationSettling = $_POST["minorFoundationSettling"] ? 'Yes' : 'No';
$majorFoundationSettling = $_POST["majorFoundationSettling"] ? 'Yes' : 'No';
$drivewayMinorCracks = $_POST["drivewayMinorCracks"] ? 'Yes' : 'No';
$drivewayMajorCracks = $_POST["drivewayMajorCracks"] ? 'Yes' : 'No';
$fenceNeedsRepair = $_POST["fenceNeedsRepair"] ? 'Yes' : 'No';
$fenceNeedsReplacement = $_POST["fenceNeedsReplacement"] ? 'Yes' : 'No';
$frontDoorNeedsRepair = $_POST["frontDoorNeedsRepair"] ? 'Yes' : 'No';
$frontDoorNeedsReplacement = $_POST["frontDoorNeedsReplacement"] ? 'Yes' : 'No';
$poolNeedsNewEquipment = $_POST["poolNeedsNewEquipment"] ? 'Yes' : 'No';
$poolNeedsResurfaced = $_POST["poolNeedsResurfaced"] ? 'Yes' : 'No';
$shuttersNeedRepairReplacement = $_POST["shuttersNeedRepairReplacement"] ? 'Yes' : 'No';
$guttersNeedRepairReplacement = $_POST["guttersNeedRepairReplacement"] ? 'Yes' : 'No';
$sprinklerSystemNeedRepair = $_POST["sprinklerSystemNeedRepair"] ? 'Yes' : 'No';
$garageDoorNeedRepair = $_POST["garageDoorNeedRepair"] ? 'Yes' : 'No';
$garageDoorOpenersNeedRepair = $_POST["garageDoorOpenersNeedRepair"] ? 'Yes' : 'No';
$condition = $_POST["condition"];;
$commentsConditionsHome = $_POST["commentsConditionsHome"];
$reasonsValueLowered = $_POST["reasonsValueLowered"];
$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$email = $_POST["email"];

try {
    if (JWT::decode($jwt, JWT_SECRET, array('HS256'))) {
        $db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // First Create Statement To Delete The Old Survey
        $sql1 = "DELETE FROM `survey01` WHERE `accountNum` = '" . $accountNum . "'";
        $sql2 = "DELETE FROM `survey02` WHERE `accountNum` = '" . $accountNum . "'";
        $sql3 = "DELETE FROM `survey03` WHERE `accountNum` = '" . $accountNum . "'";
        $sql4 = "DELETE FROM `survey04` WHERE `accountNum` = '" . $accountNum . "'";
        $sql5 = "DELETE FROM `survey05` WHERE `accountNum` = '" . $accountNum . "'";

        $db->query($sql1);
        $db->query($sql2);
        $db->query($sql3);
        $db->query($sql4);
        $db->query($sql5);

        // Create SQL Statements To Insert Into The Five Survey Tables
        $sql1 = "INSERT INTO `survey01`(`accountNum`, `customerId`, `propertytype`, `recentPurchasedCost`, `currentListedSaleCost`, `recentListedCost`, `rentalProperty`, `obtainedPermits`, `subtiantialImprovements`) VALUES ('" . $accountNum . "','" . $customerId . "','" . $propertytype . "','" . $recentPurchasedCost . "','" . $currentListedSaleCost . "','" . $recentListedCost . "','" . $rentalProperty . "','" . $obtainedPermits . "','" . $subtiantialImprovements . "')";

        $sql2 = "INSERT INTO `survey02`(`AccountNum`, `yourOpinionOfValue`, `totalLivingAreaSqFt`, `lotAreaSqFt`, `bathroomsFull`, `bathroomsHalf`, `bedrooms`, `numStoreis`, `numFirePlaces`, `FirePlaces`, `basementType`, `basementAreaSqFt`, `garageType`, `numcars`, `foundationType`, `typeOfRoof`) VALUES ('" . $accountNum . "','" . $yourOpinionOfValue . "','" . $totalLivingAreaSqFt . "','" . $lotAreaSqFt . "','" . $bathroomsFull . "','" . $bathroomsHalf . "','" . $bedrooms . "','" . $numStoreis . "','" . $numFirePlaces . "','" . $FirePlaces . "','" . $basementType . "','" . $basementAreaSqFt . "','" . $garageType . "','" . $numcars . "','" . $foundationType . "','" . $typeOfRoof . "')";

        $sql3 = "INSERT INTO `survey03`(`AccountNum`, `woodframeExterior`, `brickExterior`, `stoneExterior`, `stuccoExterior`, `guestquaters`, `outdoorkitchen`, `stableBan`, `storageBuilding`, `tennisCourt`, `boatDock`, `boatDockWLift`, `deck`, `Elevator`, `Pool`, `Spa`, `septicTank`, `Workshop`, `otherExteriorFeatures`, `gatedCommunity`, `creek`, `Lake`, `pond`, `parkView`, `golf`, `largeLot`, `irregularSize`, `Corner`, `greenBelt`, `describeLot`) VALUES ('" . $accountNum . "','" . $woodframeExterior . "','" . $brickExterior . "','" . $stoneExterior . "','" . $stuccoExterior . "','" . $guestquaters . "','" . $outdoorkitchen . "','" . $stableBan . "','" . $storageBuilding . "','" . $tennisCourt . "','" . $boatDock . "','" . $boatDockWLift . "','" . $deck . "','" . $Elevator . "','" . $Pool . "','" . $Spa . "','" . $septicTank . "','" . $Workshop . "','" . $otherExteriorFeatures . "','" . $gatedCommunity . "','" . $creek . "','" . $Lake . "','" . $pond . "','" . $parkView . "','" . $golf . "','" . $largeLot . "','" . $irregularSize . "','" . $Corner . "','" . $greenBelt . "','" . $describeLot . "')";

        $sql4 = "INSERT INTO `survey04`(`AccountNum`, `interiorFoundationIssues`, `exteriorFoundationIssues`, `electricalIssues`, `plumbingIssues`, `defectiveRoof`, `subjectToFlooding`, `backsToCommercialProperty`, `petOdors`, `smokeOdors`, `cracksInSheetrocks`, `wallsNeedPaint`, `CarpetNeedReplace`, `woodFloorRefinishing`, `TileColorOutdated`, `DoorsNeedRepair`, `CabinetNeedRepair`, `windowNeedRepair`, `windowNeedReplacement`, `chimneyNeedCleaning`, `electricalWiringProblems`, `plumbingNeedsRepair`, `bathrooms`, `kitchen`, `faucets`, `counterTopsNeedReplaced`, `showerTub`, `LightFixturesNeedReplaced`, `ApplicancesNeedRepairReplaced`, `Toilets`, `MirroNeedReplaced`, `landscapingIsDead`, `landscapingIsBelowTypical`, `ExteriorNeedPaint`, `exteriorWoodNeedsRepair`, `roofNeedsPaint`, `roofNeedsReplacement`, `minorFoundationSettling`, `majorFoundationSettling`, `drivewayMinorCracks`, `drivewayMajorCracks`, `fenceNeedsRepair`, `fenceNeedsReplacement`, `frontDoorNeedsRepair`, `frontDoorNeedsReplacement`, `poolNeedsNewEquipment`, `poolNeedsResurfaced`, `shuttersNeedRepairReplacement`, `guttersNeedRepairReplacement`, `sprinklerSystemNeedRepair`, `garageDoorNeedRepair`, `garageDoorOpenersNeedRepair`) VALUES ('" . $accountNum . "','" . $interiorFoundationIssues . "','" . $exteriorFoundationIssues . "','" . $electricalIssues . "','" . $plumbingIssues . "','" . $defectiveRoof . "','" . $subjectToFlooding . "','" . $backsToCommercialProperty . "','" . $petOdors . "','" . $smokeOdors . "','" . $cracksInSheetrocks . "','" . $wallsNeedPaint . "','" . $CarpetNeedReplace . "','" . $woodFloorRefinishing . "','" . $TileColorOutdated . "','" . $DoorsNeedRepair . "','" . $CabinetNeedRepair . "','" . $windowNeedRepair . "','" . $windowNeedReplacement . "','" . $chimneyNeedCleaning . "','" . $electricalWiringProblems . "','" . $plumbingNeedsRepair . "','" . $bathrooms . "','" . $kitchen . "','" . $faucets . "','" . $counterTopsNeedReplaced . "','" . $showerTub . "','" . $LightFixturesNeedReplaced . "','" . $ApplicancesNeedRepairReplaced . "','" . $Toilets . "','" . $MirroNeedReplaced . "','" . $landscapingIsDead . "','" . $landscapingIsBelowTypical . "','" . $ExteriorNeedPaint . "','" . $exteriorWoodNeedsRepair . "','" . $roofNeedsPaint . "','" . $roofNeedsReplacement . "','" . $minorFoundationSettling . "','" . $majorFoundationSettling . "','" . $drivewayMinorCracks . "','" . $drivewayMajorCracks . "','" . $fenceNeedsRepair . "','" . $fenceNeedsReplacement . "','" . $frontDoorNeedsRepair . "','" . $frontDoorNeedsReplacement . "','" . $poolNeedsNewEquipment . "','" . $poolNeedsResurfaced . "','" . $shuttersNeedRepairReplacement . "','" . $guttersNeedRepairReplacement . "','" . $sprinklerSystemNeedRepair . "','" . $garageDoorNeedRepair . "','" . $garageDoorOpenersNeedRepair . "')";

        $sql5 = "INSERT INTO `survey05`(`AccountNum`, `condition`, `commentsConditionsHome`, `reasonsValueLowered`, `firstname`, `lastname`, `email`, `date`) VALUES ('" . $accountNum . "','" . $condition . "','" . $commentsConditionsHome . "','" . $reasonsValueLowered . "','" . $firstname . "','" . $lastname . "','" . $email . "','" . date("Y-m-d") . "')";

        $db->query($sql1);
        $db->query($sql2);
        $db->query($sql3);
        $db->query($sql4);
        $db->query($sql5);

        // Close database connection
        $db->close();

        echo json_encode(array(
            "code" => "success",
            "message" => "Thank You Taking The Survey. We Have Received Your Answers",
        ));

        
    }
} catch(Exception $e) {
    echo json_encode(["code" => "jwt_error", "message" => $e->getMessage()]);
}

?>