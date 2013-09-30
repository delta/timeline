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

function isValidEmail($email) {
	return filter_var( $email, FILTER_VALIDATE_EMAIL );
}


