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

/**
 * Used to escape all Variables
 * Can be used for Array Variables(Like POST,GET)
 * Or for a single variable.
 */

/** used for Connection to Database */
function connectDB() {
	$dbase = mysql_connect(MYSQL_SERVER, MYSQL_USERNAME, MYSQL_PASSWORD) or die("Could not connect to server");
	mysql_select_db(MYSQL_DATABASE) or die("Could not connect to database");
	return $dbase;
}

function escape(&$variable) {
  if(is_array($variable)) {
    foreach($variable as $key => $value) {
      $variable[$key] = mysql_real_escape_string($variable[$key]);
    }
    return;
    }
  $variable=mysql_real_escape_string($variable);
}

function mysqlQuery($query) {
  $res = mysql_query($query) or displayerror(mysql_error());
  if(!$res) return false;
  return $res;
}

function mysqlGetNoOfRows($resource) {
  $rowCount = mysql_num_rows($resource);
  if(!$rowCount) return 0;
  return $rowCount;
}

function mysqlFetchArray($resource) {
 $rowCount = mysql_fetch_array($resource);
 if(!$rowCount)return 0;
 return $rowCount;

}

function mysqlFetchAssoc($resource) {
 $rowCount = mysql_fetch_assoc($resource);
 if(!$rowCount)return 0;
 return $rowCount;

}
