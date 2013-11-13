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


function loginUser() {
  escape($_POST);
  
}

function resetPassword() {
  escape($_POST);
  /// validate if password can be reset(like openid-can't be reset),email exist
}


function init($addressArr) {

if(count($addressArr)==1) {
$CONTENT.= loginUser();
}
else if($addressArr[1]=='resetPassword') {
     $CONTENT.=resetPassword();
}
}
