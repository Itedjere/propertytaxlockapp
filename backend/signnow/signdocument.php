<?php

require_once SIGNNOW_CLASS_PATH . "SignNowAPI.php";

//redirect to the link
// header("Location: $link_to_sign_doc");

function ptl_signnow_invite_signer($user_details=array(), $template_id="")
{
    $doc_data = array();
    $doc_data["signerName"] = $user_details['first_name'] . ' ' . $user_details['last_name'];
    $doc_data["owner_city"] = $user_details['owner_city'] . ' ' . $user_details['owner_zip'];
    $doc_data["county"] = $user_details['county'];
    $doc_data["account_num"] = $user_details['taxnet_id'];
    $doc_data["situs_address"] = $user_details['situs_address'];
    $doc_data["legaldescription"] = $user_details['legal_description'];
    $doc_data["owner_address"] = $user_details['owner_address'];


    // Set appraisal district name (just uppercase the first letter until this doesn't work anymore)
    $dist_nm = ucfirst($doc_data["county"]);

    $signNow = new SignNow();
    // Step 0.1. Update Signer account with user first name and turn off reusable signatures
    $document_json = $signNow->updateSignerAccount($user_details['first_name'], $user_details['last_name']);
    
    if (empty($template_id)) {
        $template_id = SignNow::$template_id;
    }

    $document_name = "AOA for Property Tax Account Number " . $doc_data["account_num"];

    // // Step 1. Create Document from Template
    $document_json = $signNow->getDocumentFromTemplate($template_id, $document_name);
    if (!empty($document_json)) {
        $document = json_decode($document_json);
        if (isset($document->id)) {
            $document_id = $document->id;
        }
    }
    

    if (!empty($document_id)) {
        $fields = array();
        $fields[] = array("x"=>66,"y"=>518,"width"=>300,"height"=>32,"page_number"=>1,"role"=>"Buyer","required"=>true,"type"=>"signature");
        $fields[] = array("x"=>66,"y"=>576,"width"=>300,"height"=>14,"page_number"=>1,"role"=>"Buyer","required"=>true,"type"=>"text","prefilled_text"=>$doc_data["signerName"]);
        // $fields[] = array("x"=>380,"y"=>576,"width"=>156,"height"=>14,"page_number"=>1,"role"=>"Buyer","required"=>false,"type"=>"text"); // Title

        $radiobuttons = array();
        $radiobuttons[] = array("page_number"=>"1","x"=>"30","y"=>"638","width"=>"14","height"=>"14","checked"=>"1","created"=>"".date("Y-m-d"),"value"=>"owner");
        $radiobuttons[] = array("page_number"=>"1","x"=>"30","y"=>"658","width"=>"14","height"=>"14","checked"=>"0","created"=>"".date("Y-m-d"),"value"=>"manager");
        $radiobuttons[] = array("page_number"=>"1","x"=>"30","y"=>"676","width"=>"14","height"=>"14","checked"=>"0","created"=>"".date("Y-m-d"),"value"=>"other");

        $fields[] = array("name"=>"SignerType","x"=>30,"y"=>638,"width"=>24,"height"=>140,"page_number"=>1,"role"=>"Buyer","required"=>true,"type"=>"radiobutton","radio"=>$radiobuttons);

        // Step 2.5. Add static texts to the document
        $texts = array();
        $texts[] = array("size"=>12,"x"=>28,"y"=>173,"page_number"=>0,"font"=>"Arial","line_height"=>12,"data"=>$dist_nm." Appraisal District");
        $texts[] = array("size"=>12,"x"=>28,"y"=>229,"page_number"=>0,"font"=>"Arial","line_height"=>12,"data"=>$doc_data["signerName"]);
        $texts[] = array("size"=>12,"x"=>28,"y"=>256,"page_number"=>0,"font"=>"Arial","line_height"=>12,"data"=>$doc_data["owner_address"] );
        $texts[] = array("size"=>12,"x"=>28,"y"=>281,"page_number"=>0,"font"=>"Arial","line_height"=>12,"data"=>$doc_data["owner_city"]);

        $texts[] = array("size"=>12,"x"=>28,"y"=>439,"page_number"=>0,"font"=>"Arial","line_height"=>12,"data"=>$doc_data["account_num"]);
        $texts[] = array("size"=>12,"x"=>168,"y"=>439,"page_number"=>0,"font"=>"Arial","line_height"=>12,"data"=>$doc_data["situs_address"]);
        $texts[] = array("size"=>12,"x"=>28,"y"=>470,"page_number"=>0,"font"=>"Arial","line_height"=>12,"data"=>$doc_data["legaldescription"]);

        $dt = new DateTime("now", new DateTimeZone('America/Chicago'));
        $texts[] = array("size"=>12,"x"=>380,"y"=>532,"page_number"=>1,"font"=>"Arial","line_height"=>12,"data"=>$dt->format('M j, Y'));

        $addedFields = $signNow->addFieldsToDocument($document_id, $fields, $texts);
        
        

        // Step 3. Create Invite to Sign Uploaded Document
        $cc = "";
        $invited = $signNow->inviteUserToSignRoleBasedDocument($document_id, '', "Buyer", $doc_data["signerName"], $cc);

        // Step 4. Generate Restricted Scope Access Token for Signing Link
        $signerToken = $signNow->tokenForSigningLink($document_id);

        if (!empty($document_id) && !empty($signerToken)) {
            // Step 5. Store document ID and Signer Token in sessions
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['document_id'] = $document_id;
            $_SESSION['signer_token'] = $signerToken;
        }
    }
}

function ptl_signnow_signing_link($user_details)
{
    $accountNumber = $user_details['taxnet_id'];

    // Get document ID and signer token from order meta
    $document_id = (isset($_SESSION['document_id']) && !empty($_SESSION['document_id'])) ? $_SESSION['document_id'] : '';
    $signerToken = (isset($_SESSION['signer_token']) && !empty($_SESSION['signer_token'])) ? $_SESSION['signer_token'] : '';

    // If no document exists, or user has requested a new link, create a new document and token
    if ($document_id == '') {
        ptl_signnow_invite_signer($user_details);
        $document_id = (isset($_SESSION['document_id']) && !empty($_SESSION['document_id'])) ? $_SESSION['document_id'] : '';
        $signerToken = (isset($_SESSION['signer_token']) && !empty($_SESSION['signer_token'])) ? $_SESSION['signer_token'] : '';
    }
    
    if (!empty($signerToken) && !empty($document_id)) {
        $redirect_uri = SIGNNOW_REDIRECT_URI . "?accountNum=" . $accountNumber;
        $signHref = SignNow::$webBaseURL . "dispatch?route=fieldinvite&document_id=".$document_id."&access_token=".$signerToken."&redirect_uri=".$redirect_uri."&mobileweb=mobileweb_only";
        return $signHref;
    }
    //we have an empty token or document id
    return '';
}

//get the owner's Details
$fullnames = explode(' ', $_POST['Owner_Name']);
$user_details['first_name'] = $fullnames[0];
$user_details['last_name'] = (isset($fullnames[1])) ? $fullnames[1] : '';

$user_details['situs_address'] = $_POST['Situs_Address'];
$user_details['owner_address'] = $_POST['Owner_Address'];
$user_details['taxnet_id'] = $_POST['Account_Num'];
$user_details['owner_city'] = $_POST['Owner_CityState'];
$user_details['owner_zip'] = $_POST['Owner_Zip'];
$user_details['legal_description'] = $_POST['LegalDescription'];
$user_details['county'] = 'tarrant';
 
$link_to_sign_doc = ptl_signnow_signing_link($user_details);

?>