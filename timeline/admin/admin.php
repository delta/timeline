<?php
		
			echo $PHP_AUTH_USER;
			echo $PHP_AUTH_USER;
			
		if($_SERVER['PHP_AUTH_USER'] != "admin" or $_SERVER['PHP_AUTH_PW'] != "admin_timeline"){
			header("WWW-Authenticate: Basic realm=Protected Page:Enter your username and password for access.");
			header('HTTP/1.0 401 Unauthorised');
			echo "Access Denied";
			exit;
		}

?>
<html>
  <head>
    <title>Timeline</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="dist/css/bootstrap-theme.min.css" rel="stylesheet">
		<link href="dist/css/jquery.simple-dtpicker.css" rel="stylesheet">
		

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
		<div class="container">
			<div class="navbar navbar-default" role="navigation">
				<a class=navbar-brand href="#">Timeline</a>
			</div>
			<div class="page-header">
				<h1>Timeline <small>NIT Trichy, Delta.</small></h1>
			</div>
			<form role="form" method="post" action="check.php">
				<div class="form-group">
						<label class="sr-only" for="title">Title</label>
					<input class="form-control" type="text" id="title" placeholder="Title"  name="title">
				</div>

				<div id="date_picker"></div>

				<div class="form-group form-inline">
						<label for="date">Starting Date</label>
					<input type="text" id="date" name="date">
						<label class="sr-only" for="stime">Time</label>
					<input type="text" id="edate"  name="edate">
				</div>

				<div class="form-group">
						<label for="primary">Primary Tags</label>
					<select name="primary" id="primary">
						<option value="festember">Festember</option>
						<option value="pragyan">Pragyan</option>
					  <option value="nittfest">NITTFest</option>
					</select>
					
						<label for="secondary">secondary Tags</label>
					<select name="secondary" id="secondary">
						<option value="workshop">Workshop</option>
						<option value="events">Events</option>
					  <option value="lecture">Lecture</option>
					</select>
				</div>


				<div class="form-group">
					<textarea class="form-control" rows="6" name="desc"></textarea>
				</div>
				<button type="submit" class="btn btn-primary btn-lg">Submit</button>
			</form>
		</div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="dist/js/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="dist/js/bootstrap.min.js"></script>
		<script src="dist/js/jquery.simple-dtpicker.js"></script>
		<script>
			$(function(){
				$('#date_pickert').dtpicker();
				$('#date').appendDtpicker({
					"closeOnSelected" : true
				});
				$('#edate').appendDtpicker({
					"closeOnSelected" : true
				});
			});
		</script>
  </body>
</html>