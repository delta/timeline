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

/// Url Should be handled here
function parseAddress() {
	print_r($_GET);

}