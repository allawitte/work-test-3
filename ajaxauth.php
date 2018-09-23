<?php
include("db.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$login = $request->login;
$password = $request->password;
$q = mysql_query("SELECT * FROM users WHERE user_login = '$login'");		
	$r = mysql_fetch_array($q);
	if($password = $r['user_password']){
		echo $r['user_login'];
	}
	else {
		echo "auth error";
	}
?>