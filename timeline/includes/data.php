<?php
//check validity for time 
$content_id="";
$content_tag="";

$sourceFolder = substr($_SERVER['SCRIPT_FILENAME'], 0, strrpos($_SERVER['SCRIPT_FILENAME'], '/'))."/test";

require_once("includes/test/query.lib.php");
connectDB();
$content_array = array();
$primary = array();
$seconday = array();



$result = mysqlQuery("select DISTINCT content_data.content_id,content_data.content_title,content_data.content_desc,content_data.content_start,content_data.content_end from content_data,timeline_tags,content_manage_tags where content_manage_tags.content_id = content_data.content_id and timeline_tags.tag_id = content_manage_tags.tag_id ORDER BY content_start");
//  try
  	while ($row = mysqlFetchArray($result))
         {
          $content = new stdClass();
          $content->id = $row['content_id']; 
          $content->title = $row['content_title'];
          $content->content_desc = $row['content_desc'];
          $content->content_start = $row['content_start'];
          $content->content_end = $row['content_end'];

     
          $result1 = mysqlQuery("select DISTINCT timeline_tags.tag_name,permission from timeline_tags,content_manage_tags where timeline_tags.tag_id = content_manage_tags.tag_id and content_manage_tags.permission = 'primary' and content_id =".$row['content_id']);      
          while($row1 = mysqlFetchArray($result1))
          $content->primary_hashtag[] = $row1['tag_name'];
          
       
          $result2 = mysqlQuery("select DISTINCT timeline_tags.tag_name,permission from timeline_tags,content_manage_tags where timeline_tags.tag_id = content_manage_tags.tag_id and content_manage_tags.permission = 'secondary' and content_id =".$row['content_id']);      
          while($row2 = mysqlFetchArray($result2))
          $content->secondary_hashtag[] = $row2['tag_name'];
         

          $content_array[]=($content);

      }/* catch(Exception $e)
       {displayerror($e);}
      */


$result = mysqlQuery("select DISTINCT tag_name,permission from timeline_tags,content_manage_tags where timeline_tags.tag_id = content_manage_tags.tag_id and content_manage_tags.permission = 'primary'");      
  while($row = mysqlFetchArray($result))
        $primary[]=$row['tag_name'];
       
   


$result = mysqlQuery("select DISTINCT tag_name,permission from timeline_tags,content_manage_tags where timeline_tags.tag_id = content_manage_tags.tag_id and content_manage_tags.permission = 'secondary'");      
  while($row = mysqlFetchArray($result))
        $secondary[]=$row['tag_name'];
      

?>
<script>
var recieved_reply = <?php echo json_encode($content_array); ?>;
var recieved_primary_tags = <?php echo json_encode($primary) ?>;
var recieved_secondary_tags = <?php echo json_encode($secondary) ?>;
console.log(recieved_reply);
</script>
