<?php
if(!defined('__TIMELINE__')) { 
	header($_SERVER['SERVER_PROTOCOL'].' 403 Forbidden');
	echo "<h1>403 Forbidden<h1><h4>You are not authorized to access the page.</h4>";
	echo '<hr/>'.$_SERVER['SERVER_SIGNATURE'];
	exit(1);
}

/**
 * Project	: Timeline
 * Author 	: Shriram<vshriram93@gmail.com>
 * Author 	: John
 * Author 	: Karthik Vijay
 * Author 	: Ashutosh
 * Author 	: Vivekanandan
 * Concept	: Tracks activity over the years
 */

/// All Frequently used functions 
/// will be handled by this file

/** used for Connection to Database */
function connectDB() {
	$dbase = mysql_connect(MYSQL_SERVER, MYSQL_USERNAME, MYSQL_PASSWORD) or die("Could not connect to server");
	mysql_select_db(MYSQL_DATABASE) or die("Could not connect to database");
	return $dbase;
}

function displayerror($error_desc) {
	global $ERRORSTRING;
	$ERRORSTRING .= "<div class=\"core-error\">$error_desc</div>";
}

/** Used for giving info */
function displayinfo($error_desc) {
	global $INFOSTRING;
	$INFOSTRING .= "<div class=\"core-info\">$error_desc</div>";
	
}

/** Used for giving warning */
function displaywarning($error_desc) {
	global $WARNINGSTRING;
	$WARNINGSTRING .= "<div class=\"core-warning\">$error_desc</div>";
}

/**
  * Used to escape all Variables
  * Can be used for post Variables
  * Or for a single variable.	
*/
function escape(&$variable) {
	if(is_array($variable)) {
		foreach($variable as $key => $value) {
			$variable[$key] = mysql_real_escape_string($variable[$key]);
		}
		return;
	}
	$variable=mysql_real_escape_string($variable);
}


function insertQuery($tableName,$columnArray,$valueArray) {
	$col = implode(",", $columnArray);
	$val = implode("','", $valueArray);
	$val = '\''.$val.'\'';
	$query = "INSERT INTO `{$tableName}` ({$col}) VALUES ({$val})";
	$res = mysql_query($query) or displayerror(mysql_error());
	if(!$res) return false;
	return true;
}

function isValidEmail($email) {
	return filter_var( $email, FILTER_VALIDATE_EMAIL );
}


/// Still to be tested
function createInputField($inputType,$inputIdArr,$inputNameArr,$placeHolder = "",$extraTagArr = "") {
	$cnt = count($inputType);
	if($placeHolder == "") {
		$placeHolder = array_fill(0, $cnt, '');
	}
	if($extraTagArr == "") {
		$extraTagArr = array_fill(0, $cnt, '');
	}
	$returnData = "";
	$input = array('text','password','search','checkbox','file','hidden','radio','reset','submit');
	for($i=0;$i<$cnt;$i++) {
		if(in_array($inputType[$i], $input)) {
			$tagFieldData = 'name = "{$inputNameArr[$i]}" id = "{$inputIdArr[$i]}" placeHolder = "{$placeHolder}" $extraTagArr';
			$returnData .=<<<INPUT
				<input type = "{$inputType[$i]}" $tagFieldData/>
INPUT;
		}
		if($inputType[$i] == "textarea") {
			$returnData .=<<<TEXTAREA
				<textarea $tagFieldData ></textarea>

TEXTAREA;
		}
		if($inputType[$i] == "select") {
			$returnData .=<<<SELECT
			<select name = "{$inputNameArr[$i]}" id = "{$inputIdArr[$i]}">$extraTagArr</select>
SELECT;
		}
	}
	return $returnData;
}

