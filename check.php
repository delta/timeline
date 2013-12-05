<pre>
<?php
  print_r($_POST);
?>
</pre>
<?php
		date_default_timezone_set("Asia/Kolkata");
		include 'tmp.php';
		function gete($s){
			$sp = explode(" ", $s);
			$sq = explode("-", $sp[0]);
			$sr = explode(":", $sp[1]);
		  $r =  date("Y-m-d H:i:s", mktime($sr[0], $sr[1], 0, $sq[1], $sq[2], $sp[0]));
			return $r;
		}

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
			$sql = "INSERT INTO content_data (content_title, content_start_time, content_desc, content_end_time, content_revision_history, content_updated_by, content_modified_on, content_created_on) VALUES(:title, :sdate, :desc, :edate, :revison_history, :content_update_by, :cmo, :cco)";
			$stm = $pdo->prepare($sql);
			$stm->execute(array(':title' => $title,
													':sdate' => gete($sdate),
													':desc' => $desc,
													':edate' => gete($edate),
													':revison_history' => 1,
													':content_update_by' => 2,
													':cmo' => gete($edate),
													':cco' => gete($edate)));
			$sql = "insert into timeline_tags(tag_name, tag_description) values(:name, :desc)";
			$stm = $pdo->prepare($sql);
			$stm->execute(array(
										':name' => $prim,
										':desc' => "none"
									));

			$stm->execute(array(
										':name' => $seco,
										':desc' => "none"
									));
		}
?>
