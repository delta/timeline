<?php

/**
 * Project	: Timeline
 * Author 	: Shriram<vshriram93@gmail.com>
 * Author 	: John
 * Author 	: Karthik Vijay
 * Author 	: Ashutosh
 * Author 	: Vivekanandan
 * Concept	: Tracks activity over the years
 */

/// Prevent direct access to php files 
define("__TIMELINE__", "TIMELINE");

/// Location of source folder
$sourceFolder = substr($_SERVER['SCRIPT_FILENAME'], 0, strrpos($_SERVER['SCRIPT_FILENAME'], '/'))."/core";

/// Location of Script folder for front end purpose
$scriptFolder = substr($_SERVER['SCRIPT_NAME'], 0, strrpos($_SERVER['SCRIPT_NAME'], '/'))."/core";

/// If config file is not defined then code will  stop executing
$config = @include_once($sourceFolder."/config.inc.php");

/// If config file is not defined then code will stop executing
if($config !== "configured") {
	//  If config does not exist or not configured.
  echo "Please Configure the config file";
  exit(0);
}

/// This will be content of questions or login page.
$CONTENT = "";

/// ERROR STRING , WARNING STRING AND INFORMATION STRING
$WARNINGSTRING = "";
$INFOSTRING = "";
$ERRORSTRING = "";
/// Contains functions which are common to many tasks and very frequently used.
require_once($sourceFolder."/common.lib.php");

/// connect to Database
connectDB();


/// Include all required libraries
require_once($sourceFolder."/graph.lib.php");
require_once($sourceFolder."/authenticate.lib.php");
require_once($sourceFolder."/parser.lib.php");
require_once($sourceFolder."/template.lib.php");
require_once($sourceFolder."/admin.lib.php");
parseAddress();
/// Get The template from template.lib.php
if(!getTemplate()) {
///	Exit When Template is Not Found
	exit(0);
}

echo "Coming Soon :) <br/>";

print_r($_SESSION);
    
?>
