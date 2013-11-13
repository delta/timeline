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
 global $action,$sourceFolder;
 // print_r($_GET);
  $timelinePath=mapAddress();
  $pagePathArr=explode("/",$_GET['page']);
  $callFunction = "get".$action;
  if(isset($timelinePath[$action])) {
    echo $callFunction."<br/>";
     require_once($sourceFolder."/".$timelinePath[$action]);
     $callFunction();
  }
  else {
//    $CONTENT = get404();
 }
 }

function mapAddress() {
  $timelinePath=array(
		       "login" => "authenticate.lib.php",
                       "admin" => "admin.lib.php",
                       "graph" => "graph.lib.php",
                       "contentedit" => "content.lib.php"
                      
                       );

  return $timelinePath;
}
