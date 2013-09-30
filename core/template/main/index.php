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

global $scriptFolder;
?>
<!DOCTYPE html>
<html>
	<head>
		<title>TimeLine</title>
		<meta name="description" content="TimeLine"/>
		<meta name="keywords" content="TimeLine"/>
		<link href="<?php echo $scriptFolder.'/common/bootstrap/css/bootstrap-responsive.min.css'; ?>" type="text/css" rel="stylesheet"/>
		<link href="<?php echo $scriptFolder.'/common/bootstrap/css/bootstrap.min.css'; ?>" type="text/css" rel="stylesheet"/>

	</head>
	<body>
		<div id="core-contents">
			<div id = "core-error">
			<?php echo $ERRORSTRING; ?>
			<?php echo $WARNINGSTRING; ?>
			<?php echo $INFOSTRING; ?>
			</div>
			<?php echo $CONTENT; ?>

		</div>
	</body>
</html>