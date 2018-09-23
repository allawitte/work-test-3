<?php
include("db.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$author = $request->author;
$message = $request->message;
$time = $request->time;
$q = mysql_query("INSERT INTO chats (author, message, time) VALUES ('$author', '$message', '$time')");
if ($q == TRUE) {
    echo "ok";
} else {
    echo "error";
}


//var data = {
//            author: author,
  //          message: vm.newMsg,
//            time: new Date().getTime()
 //       };