<!DOCTYPE html>
<html>
  <head>
    <?php
  require_once('includes/data.php');
?>
    <link href="css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css" />
    <link href="css/timeline.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <a href="admin/admin.php" target="_blank" id="admin"> admin</a>
    <img src="./images/color_pallete.png" onclick="colour_change('select');" width="20px" id="colorPallete">
    <div id="tagPrimaryPicker"><label class="tagPrimary" id="PNULLTAG" style="display:none"></label></div>
    <div id="tagSecondaryPicker"><label class="tagSecondary" id="SNULLTAG" style="display:none"></label></div>
    <div id='datePicker'><div id="dateShower"><select id='manualYear'></select> <select id='manualMonth'></select> <select id='manualDay'></select></div><div style="display:none" data-meta="-1"></div>
    </div>
<!--    <div id="miniature_timeline"><canvas id="mycanvas" width="1300" height="20"></canvas></div> -->
    <script src="js/move.js"></script>
    <script src="js/jquery.js"></script>
    <script src="js/underscore.js"></script>
    <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="js/timeline.js"></script>
  </body>
</html>