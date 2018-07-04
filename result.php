<?php
//関数読みます
include("functions.php");

//入力チェック(受信確認処理追加)
if(
    !isset($_GET["userName"]) || $_GET["userName"]=="" ||
    !isset($_GET["time"]) || $_GET["time"]==""
  ){
    exit('ParamError');
  }

//1. GETデータ取得
$userName   = $_GET["userName"];
$time  = $_GET["time"];

//2. DB接続します(エラー処理含む)
$pdo = db_conn();

//３．データ登録SQL作成。bindValueさんはSQLインジェクション対策だよ。
$stmt = $pdo->prepare("INSERT INTO user_table (id, user_name, clear_time)
VALUES(NULL, :u1, :u2)");
$stmt->bindValue(':u1', $userName);
$stmt->bindValue(':u2', $time);
$status = $stmt->execute();

//４．データ登録処理後
$view = "";
if($status==false){
  errorMsg($stmt);
}else{
  $view .= '<p>User Name：'.$userName.'<br>';
  $view .= "クリアタイム：".$time.'</p>';
}


//２．データ登録SQL作成
$stmt = $pdo->prepare("SELECT user_name,clear_time FROM user_table ORDER BY clear_time LIMIT 10");
$status = $stmt->execute();

//5．ランキング表示用の処理
$viewRank="";
$rank=0;
if($status==false) {
  errorMsg($stmt);
}else{
  //Selectデータの数だけ自動でループしてくれる
  //FETCH_ASSOC=http://php.net/manual/ja/pdostatement.fetch.php
  //演算子.=を使うのはwhile処理でどんどん変数に加えていくから。
  while( $result = $stmt->fetch(PDO::FETCH_ASSOC)){ 
    $rank++;
    $viewRank .= '<tr><td>'.$rank.'</td>';
    $viewRank .= '<td>'.$result["user_name"].'</td>';    
    $viewRank .= '<td>'.$result["clear_time"].'</td></tr>';
  }
}

?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>シューティングゲーム</title>
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/style.css"> 
</head>
<body class="cover-image">
<!-- <img class="cover-image" src="images/tomio_top.jpeg"> -->
    <div class="clear-msg">
        <?= $view ?>
        <table border="1">
            <tr>
                <th>Rank</th>
                <th>User Name</th>
                <th>クリアタイム</th>
            </tr>
                <?=$viewRank?>

        </table>
        <p><a href="start.php">TOPへ戻る</a></p>
    </div>
    <script src="http://code.jquery.com/jquery-3.2.1.js"></script>
</body>
</html>