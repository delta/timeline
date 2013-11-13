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

function createContentForm() {
global $CONTENT;
$CONTENT .=<<<CREATE
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Konami Form</title>
</head>
<img  src="text.png">
<form action="./+contentedit" method="post" enctype="multipart/form-data" name="contend" id="contend" style="visibility:visible;">

<table id="tab">
<tr>
<td><br></td>
</tr>
<tr>isible
<td class="label" style="width:200px;"><label class="invalid">*</label>Username</td>
<td><input type="text" name="user_ent" id="user_ent" onChange="checkuser();"><label class="invalid" id="name"></label></td>
</tr>
<tr>
<td class="label"><label class="invalid">*</label>Password</td>
<td><input type="password" name="pass_ent" id="pass_ent" onChange="checkpass();"><label class="invalid" id="pass"></label></td>
</tr>
<tr>
<td class="label"><label class="invalid">*</label>Confirm Password</td>
<td><input type="password" name="conpass_ent" id="conpass_ent" onChange="checkpass();"><label class="invalid" id="conpass"></label></td>
</tr>
<tr>
<td class="label"><label class="invalid">*</label>Roll No</td>
<td><input type="text" name="roll_ent" onkeydown="return is_num(event);" maxlength="10"></td>
</tr>
<tr>
<td class="label" class="select" ><label class="invalid">*</label>Last School Attended</td>
<td><select name="school" id="school" class="select" style="width:200px;" onChange="school_select();">
  <option value="Kendriya Vidyalaya">Kendriya Vidyalaya</option>
  <option value="DAV Senior Secondary School">DAV Senior Secondary School</option>
  <option value="Vidya Mandir Senior Secondary School">Vidya Mandir Senior Secondary School</option>
  <option value="National Public School">National Public School</option>
  <option value="ST JOSEPH High School">ST JOSEPH High School</option>
  <option value="P E S Central School">P E S Central School</option>
  <option value="Rajhans Vidyalaya">Rajhans Vidyalaya</option>
  <option value="Bharatiya Vidya Bhavan">Bharatiya Vidya Bhavan</option>
  <option value="Maharishi Vidya Mandir">Maharishi Vidya Mandir</option>
  <option value="The Hindu Higher Secondary School">The Hindu Higher Secondary School</option>
  <option value="Jawahar Navodaya Vidyalaya">Jawahar Navodaya Vidyalaya</option>
  <option value="Delhi Public School">Delhi Public School</option>
  <option value="Chinmaya Vidyalaya">Chinmaya Vidyalaya</option>
  <option value="Chaitanya Bharathi Public School">Chaitanya Bharathi Public School</option>
  <option value="Other">Other</option>
</select>
&#160&#160&#160&#160&#160<input type="text" name="sch_ent" id="sch_ent" style="visibility:hidden;"></td>
</tr>
<tr>
<td class="label">Department</td>
<td><select name ="dept_ent" class="select">
  <option value=""></option>
  <option value="CSE">CSE</option>
  <option value="ECE">ECE</option>
  <option value="EEE">EEE</option>
  <option value="ICE">ICE</option>
  <option value="Mech">Mech</option>
  <option value="Prod">Prod</option>
  <option value="Chem">Chem</option>
  <option value="MME">MME</option>
  <option value="Civil">Civil</option>
  <option value="B.Arch">B.Arch</option>
</select></td>
</tr>
<tr>
<td class="label"><label class="invalid">*</label>Date of Birth</td>
<td><input type="text" name="day_ent" id="day_ent"  style="width:50px;" onChange="datecheck();" onkeydown="return is_num(event);"><label class="label">Day</label>&#160&#160&#160&#160&#160
<select name="mon_ent" id="mon_ent"  class="select" style="width:60px;">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
</select>
<label class="label">Month&#160&#160&#160&#160</label>
<select name="year" class="select">
<option value="1985">1985</option>
<option value="1986">1986</option>
<option value="1987">1987</option>
<option value="1988">1988</option>
<option value="1989">1989</option>
<option value="1990">1990</option>
<option value="1991">1991</option>
<option value="1992">1992</option>
<option value="1993">1993</option>
<option value="1994">1994</option>
<option value="1995">1995</option>
<option value="1996">1996</option>
<option value="1997">1997</option>
<option value="1998">1998</option>
<option value="1999">1999</option>
<option value="2000">2000</option>
</select><label class="label">Year&#160</label><label id="date" class="invalid" ></label></td>
</tr>
<tr>
<td class="label">Gender</td>
<td>
<input class="gender" type="radio" name="gen" id="male" value="Male"><label class="label">Male</label>
<input class="gender" type="radio" name="gen" id="female" value="Female"><label class="label">Female</label>
</td>
</tr>
<tr>
<td class="label"><label class="invalid">*</label>Email</td>
<td><input type="text" name="email_ent" id="email_ent" onChange="validateEmail();"><label class="invalid" id = "email"></label></td>
</tr>
<tr>
<td class="label">Club Membership</td>
<td class="label">
<input class="box" type="checkbox" name="DT" onChange="checkclub(0);"><label>DT</label>
<input class="box" type="checkbox" name="MT" onChange="checkclub(1);"><label>MT</label>
<input class="box" type="checkbox" name="Thespian" onChange="checkclub(2);"><label>Thespian</label>
<input class="box" type="checkbox" name="Delta" onChange="checkclub(3);"><label>Delta</label>
<input class="box" type="checkbox" name="RMI" onChange="checkclub(4);"><label>RMI</label>
</td>
</tr>
<tr><td></td>
<td class="label">
<input class="box" type="checkbox" name="Sun Club" onChange="checkclub(5);"><label>Sun Club</label>
<input class="box" type="checkbox" name="Spider" onChange="checkclub(6);"><label>Spider</label>
<input class="box" type="checkbox" name="Phoenix" onChange="checkclub(7);"><label>Phoenix</label>
<input class="box" type="checkbox" name="Leo" onChange="checkclub(8);"><label>Leo</label>
<input class="box" type="checkbox" name="PSI" onChange="checkclub(9);"><label>PSI</label><label class="invalid" id="club"></label>
</td>
</tr>
<tr>
<td class="label">Residential Address</td>
<td><textarea name="res_ent" id="res_ent" cols="45" rows="5"></textarea>
</td>
<tr>
<td class="label">Upload Image</td>
<td><input type="file" name="image" id="image" /></td>
</tr>
<tr>
<td class="label"><label class="invalid">*</label>Enter Code</td>
<td><input name="captcha" type="text">
<img src="captcha.php" /><br></td>
</tr>
<tr>
<td><input type="submit" value="submit" name="submit" id="send"></td>
</tr>
</table>
</form>
<body>
</body>
</html>

CREATE;
}

function updateContentForm() {
 
}

function deleteContentForm() {
 
}

function displayContentForm() {
  global $CONTENT;
  echo "hiiiiiiiiiiiiiiiiiiii".$CONTENT;
  createContentForm();
}
