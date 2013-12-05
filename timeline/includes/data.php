<?php
//check validity for time 
$content_id="";
$content_tag="";

$sourceFolder = substr($_SERVER['SCRIPT_FILENAME'], 0, strrpos($_SERVER['SCRIPT_FILENAME'], '/'))."/test";

require_once("includes/test/query.lib.php");
connectDB();



$secondary = array();
$array = array();
$array1 = array();
$array2 = array();



$result = mysqlQuery("select content_data.content_id,content_data.content_title,content_data.content_desc,content_data.content_start,content_data.content_end,content_manage_data.permission from content_data,timeline_tags,content_manage_tags where content_manage_tags.content_id = content_data.content_id and timeline_tags.tag_id = content_manage_tags.tag_id");
// $result = mysqlQuery("select * from content_data"); 
  while ($row = mysqlFetchArray($result))
         {
          $content = new stdClass();
          $content->id = $row['content_id']; 
          $content->title = $row['content_title'];
          $content->content_desc = $row['content_desc'];
          $content->content_start = $row['content_start_time'];
          $content->content_end = $row['content_end_time'];
          //$content->primary_hashtag = "timeline";
          //$content->secondary_hashtag = "testing";
          $array[]=($content);
         }
         
       //  echo "<pre>";
         //print(json_encode($array));
        // echo  "</pre>";

//$result = mysqlQuery("select tag_name,permission from timeline_tags,content_manage_tags where timeline_tags.tag_id = content_manage_tags.tag_id and content_manage_tags.permission = 'primary'");      
  $result = mysqlQuery("select * from timeline_tags where tag_description='primary'");
  while($row = mysqlFetchArray($result))
    {  //$primary_tags = new stdClass();
       $primary = $row['tag_name'];
       $array1['primary'][]=($primary);
       
    }
 //print(json_encode($array1));


//$result = mysqlQuery("select tag_name,permission from timeline_tags,content_manage_tags where timeline_tags.tag_id = content_manage_tags.tag_id and content_manage_tags.permission = 'secondary'");      
  $result = mysqlQuery("select * from timeline_tags where tag_description='secondary'");
  while($row = mysqlFetchArray($result))
    {
       $secondary =$row['tag_name'];
       $array2['secondary'][]=($secondary);
       
    }

   //    print(json_encode($array2));
/*
$result1 = mysqlQuery("select * from content_manage_tags where content_id=".$content_id);
//echo "select * from content_manage_tags where content_id=".$content_id;
$row = mysqlFetchArray($result);
$content_tag = $row['content_tag'];


$tag = array();
$result = mysqlQuery("select * from timeline_tags where tag_id=".$content_tag);
  {while ($row = mysqlFetchArray($result))
         $tag[] = $row; 
  }

  */
?>
 <script>
      var recieved_primary_tags=<?php echo json_encode($array1);?>;
      var recieved_secondary_tags=<?php echo json_encode($array2);?>;
      var recieved_reply=<?php echo json_encode($array);?>;
      console.log(recieved_reply);
    </script>