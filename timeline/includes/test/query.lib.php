<?php



function connectDB() {
	$dbase = mysql_connect('localhost', 'root', 'pass') or die("Could not connect to server");
	mysql_select_db('timeline') or die("Could not connect to database");
	return $dbase;
}

function mysqlQuery($query) {
  $res = mysql_query($query) or mysql_error();
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

function mysqlFetchRow($resource) {
 $rowCount = mysql_fetch_row($resource);
 if(!$rowCount)return 0;
 return $rowCount;

}

?>

