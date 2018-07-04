<!DOCTYPE html>
<html lang="jp">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>シューティングゲーム</title>
        <link rel="stylesheet" href="./css/reset.css">
        <link rel="stylesheet" href="./css/style.css"> 
</head>
<body>
    <div class="start-image">
        <div class="enter-area">
            <form method="post" action="player.php">

            <fieldset>
                <label>User Name<input type="text" name="userName"></label>
                <br>
                <input id="go" type="submit" value="Go to TOMIO!">
            </fieldset>
            </form>
        </div>
    </div>
    <script src="http://code.jquery.com/jquery-3.2.1.js"></script>
</body>
</html>