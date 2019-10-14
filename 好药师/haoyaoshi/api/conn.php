<?php
//1.建立连接
$servername = 'localhost';  //主机
$username = 'root'; 
$password = '';
$dbname = 'yaoshi';

$conn = new mysqli($servername,$username,$password,$dbname);
// var_dump($conn);
if($conn->connect_error){
    //证明连接失败
    die("连接失败：" . $conn->connect_error);
}else{
    //  echo '连接成功';
}

?>