<?php
//共通で使うものを別ファイルにしておきましょう。

//DB接続関数（PDO）
function db_conn(){
  $dbname='gs_db_tomio';
  try {
    return new PDO('mysql:dbname='.$dbname.';charset=utf8;host=localhost','root','');
  } catch (PDOException $e) {
    exit('DbConnectError:'.$e->getMessage());
  }
  return $pdo;
}

//SQL処理エラー
function errorMsg($stmt){
  $error = $stmt->errorInfo();
  exit("ErrorQuery:".$error[2]);
}

/**
* XSS
* @Param:  $str(string) 表示する文字列
* @Return: (string)     サニタイジングした文字列
*/
function h($str){
  return htmlspecialchars($str, ENT_QUOTES, "UTF-8");
}

// SESSIONチェック&リジェネレイト
function chk_ssid(){
  if(!isset($_SESSION["chk_ssid"]) ||
  $_SESSION["chk_ssid"] != session_id()
  ){
  exit("LOGIN ERROR"); }else{
  session_regenerate_id(true); $_SESSION["chk_ssid"] = session_id();
  }
}

?>
