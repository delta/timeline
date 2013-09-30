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

/// opens the template required..need to be worked ot for checking
function getTemplate() {
	global $sourceFolder;
	global $CONTENT;
	global $ERRORSTRING;
	global $INFOSTRING;
	global $WARNINGSTRING;
	$template = include_once($sourceFolder."/template/main/index.php");
	if($template == "") {
		echo "Template Not Found.Contact System Administrator.";
		return false;
	}
	return true;

}