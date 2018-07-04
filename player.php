<?php
// 関数読み込み
include("functions.php");

//入力チェック(受信確認処理追加)
if(
    !isset($_POST["userName"]) || $_POST["userName"]==""
  ){
    exit('ParamError');
  }

//POSTデータ取得
$userName = $_POST["userName"];
// XSS対策
$userName = h($userName);
?>
<script type="text/javascript">let userName = "<?= $userName ?>";</script>
<!-- <script type="text/javascript" src="./index.js"></script> -->
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
<body>
    <!-- <img class="cover-image" src="images/tomio_top.jpeg"> -->
    <div class="menu-area">
        <div id ="trigger-start" class="timer-start">
            <p>富美男START</p>
        </div>
        <div id="trigger-stop" class="timer-stop">
            <p>富美男STOP</p>
        </div>
        <div id="user-name">
            <p>USER NAME：<?= $userName ?></p>
        </div>
        <div id ="score-board">
            <p>富美男SCORE</p>
        </div>
        <div id="timer">
            <p>富美男TIME
                <span id="min">0</span>min
                <span id="sec">00.00</span>sec
            </p>
       </div>
    </div>
    <div class="canvas-wrap"></div>   
        <div class="canvas-container">
            <canvas id="canvas" width="1200" height="800"></canvas>
        </div>
    </div>


    <script src="http://code.jquery.com/jquery-3.2.1.js"></script>
    <script src="./js/index.js"></script>
</body>
</html>