<pre>
<?php
  print_r($_POST);
?>
</pre>
<?php
		include 'tmp.php';

		$title = isset($_POST['title']) ? $_POST['title'] : null;
		$sdate  = isset($_POST['date']) ? $_POST['date'] : null;
		$edate = isset($_POST['edate']) ? $_POST['edate'] : null;
		$desc  = isset($_POST['desc']) ? $_POST['desc'] : null;

		$prim  = isset($_POST['primary']) ? $_POST['primary'] : null;
		$seco  = isset($_POST['secondary']) ? $_POST['secondary'] : null;
		
		
    if($title == null or $sdate == null or $desc == null or $edate == null or $prim == null or $seco == null ){
			echo "Please Fill in All Details";
    }else{
			$pdo = DB::connect();
			$sql = "INSERT INTO content_data (content_title, fcontent_start_time, content_desc, content_end_time, content_revision_history, content_updated_by, content_modified_on, content_created_on) VALUES(:title, :sdate, :desc, :edate, :revison_history, :content_update_by, :cmo, :cco)";
			$stm = $pdo->prepare($sql);
			echo "a";
			$stm->execute(array(':title' => $title,
													':sdate' => $sdate,
													':desc' => $desc,
													':edate' => $edate, 
													':revison_history' => "none",
													':content_update_by' => "none",
													':cmo' => "none",
													':cco' => "none"));
			echo "h";
			echo $stm->rowCount();
		}
?>
