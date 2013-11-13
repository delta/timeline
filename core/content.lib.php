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

function createContent() {
  escape($_POST);

 // check for valis dates entered by the user

 if(!mysqlQuery("insert into login_data values  ('$_POST[content_title]','$_POST[content_desc]','$_POST[content_start_time]','$_POST   [content_end_time]','$_POST[content_revision_history]','$_POST[content_updated_by]','$_POST[content_modified_on]','$_POST     	[content_created_on]')"))



}

function updateContent() {
  escape($_POST);
 


}

function deleteContent() {
  escape($_POST);
}

function getcontentedit() {
  global $sourceFolder;
  require_once($sourceFolder."/form/contentForm.php");
  if(issetcheck($_POST)) {
    if($_POST['type']=='create') {
      createContent();
    }
    else if($_POST['type']=='update'){
      updateContent();
    }
    else  if($_POST['type']=='delete'){
      deleteContent();
    }

  }

displayinfo("Created Content");
  displayContentForm();

}



