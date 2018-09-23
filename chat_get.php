<?php
include("db.php");
$q = mysql_query("SELECT * FROM chats");
$records = array();
$counter = 0;
if($q){
  while ($row = mysql_fetch_array($q)) {
      $records[$counter]['id'] = $row['msg_id'];
      $records[$counter]['author'] = $row['author'];
      $records[$counter]['message'] = $row['message'];
      $records[$counter]['time'] = $row['time'];

      $counter ++;
  }
}

$json = json_encode($records);
echo $json;
exit;
?>