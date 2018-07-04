// 時間計測部分。timeはグローバル変数にしたいからあえてlet付けてません。

$(function(){
    time = 0;
    let mid = 0;
    let now;

    let min_time = 0;
    let sec_time = 0;

    let count;
    let min = $("#min");
    let sec = $("#sec");
    
    let start = $(".timer-start");
    let stop = $(".timer-stop");
    
    //startボタンが押された時の処理
    start.click(function(){
        now = new Date(); //現在時刻
        count = setInterval(counter, 10);
        // toggle();
        // reset.css("color", "#FF9194");
    });

    //stopボタンが押された時の処理
    stop.click(function(){
        mid += (new Date() - now)/1000;
        clearInterval(count);
        // toggle();
        // reset.css("color", "red");
    });

    //時間の計算
    function counter(){

        time = mid + ((new Date() - now)/1000);

        //60秒経過した時の処理
        if(time > 60){
            mid = 0;
            min_time ++;
            now = new Date();
            time = 0;
            sec.html();
        }

        //秒数が10秒より小さかったら01, 02のようにする
        if(time < 10){
            sec.html("0"+time.toFixed(2));
        }else{
            sec.html(time.toFixed(2));
        }
        min.html(min_time);
    }
});

// canvas base。おまじない文。javascriptバージョン。
// const can = document.getElementById("canvas");
// jqueryで動かすためのおまじない設定。
const can = $("#canvas")[0];
const ctx = can.getContext("2d");

// ##################################
// タイマーが重複しないようにする配列
// ##################################
const timerIds  = [];

// ##################################
// player を出現させるかどうかのフラグ
// ##################################
let isAppearPlayer = true;

/*---------------------------
 * player機について
 *--------------------------*/

//Player元オブジェクト
let player = {
    posX:0,//X座標
    posY:can.height/2,//Y座標
    w:null,
    h:null,
    image:"",//下のimg読み込み後関数が実行されたらcanvas上に画像が表示される。
    draw:function(){
        const img = new Image();
        img.src="images/remonzawa.png";

        //imgが読み込めたら画像表示の関数実行。
        img.onload=function(){
            ctx.drawImage(img,player.posX,player.posY);
            player.w = img.width;
            player.h = img.height;
            player.image = img;
        }
    }
};




// マウス操作でPlayer動かす関数

//マウスが動いたときに設定したイベントを実行してくださいね。の記述。
$(can).on("mousemove",function(e){
    // ctx.clearRect(player.posX,player.posY,player.w,player.h);//clearRect：canvas上の指定物を透明な黒にクリア。
    player.posX = e.offsetX - player.image.width /2;
    player.posY = e.offsetY - player.image.height /2;
    // ctx.drawImage(player.image,player.posX,player.posY);
});

let drawPlayer = function(){
};


/*---------------------------
 * ボールについて
 *--------------------------*/
//ボール1(富美男アタック)の元オブジェクト
let ball = {
    speed:10,//弾の発射スピード
    w:null,//弾の幅
    h:null,//弾の高さ
    image:"",//下のimg読み込み後関数が実行されたらcanvas上に画像が表示される。
    draw:function(){
        const img = new Image();
        img.src="images/remonzawa.png";

        //imgが読み込めたら画像表示の関数実行。
        img.onload=function(){
            ball.image = img;
            ball.w = img.width;
            ball.h = img.height;
        }
    }
};

//ボール2(富美男ボール)の元オブジェクト
let ball2 = {
    speed:10,//弾の発射スピード
    w:null,//弾の幅
    h:null,//弾の高さ
    image:"",//下のimg読み込み後関数が実行されたらcanvas上に画像が表示される。
    draw:function(){
        const img = new Image();
        img.src="images/remonzawa_ball.png";

        //imgが読み込めたら画像表示の関数実行。
        img.onload=function(){
            ball2.image = img;
            ball2.w = img.width;
            ball2.h = img.height;
        }
    }
};



//ボールの各弾データ管理用の格納配列
let balls = [];
let balls2 = [];

// ボール作成の関数
let ballInit = function(){
    let newBall = Object.assign({posX:player.posX,posY:player.posY},ball);//オブジェクトとオブジェクトを合体
    ctx.drawImage(newBall.image,newBall.posX,newBall.posY);
    balls.push(newBall);
    // console.log(balls);
    isAppearPlayer = false;
    while(timerIds.Length > 0){
        clearTimer(timerIds.pop());
    }
    setTimeout(function(){
        isAppearPlayer = true;
    },1000);

}

let ballInit2 = function(){
    let newBall = Object.assign({posX:player.posX,posY:player.posY},ball2);//オブジェクトとオブジェクトを合体
    ctx.drawImage(newBall.image,newBall.posX,newBall.posY);
    balls2.push(newBall);
    isAppearPlayer = false;
    while(timerIds.Length > 0){
        clearTimer(timerIds.pop());
    }
    setTimeout(function(){
        isAppearPlayer = true;
    },1000);
}



// 配列内の全てのボールが移動するための関数
let ballMove = function(){
    for(let i = 0;i<balls.length;i++){
        // ctx.clearRect(balls[i].posX,balls[i].posY,balls[i].w,balls[i].h);
        balls[i].posX += balls[i].speed;
        ctx.drawImage(balls[i].image,balls[i].posX,balls[i].posY);
    }
};

let ball2Move = function(){
    for(let i = 0;i<balls2.length;i++){
        // ctx.clearRect(balls2[i].posX,balls2[i].posY,balls2[i].w,balls2[i].h);
        balls2[i].posX += balls2[i].speed;
        ctx.drawImage(balls2[i].image,balls2[i].posX,balls2[i].posY);
    }
};

// 配列内の全てのボールを精査して、スクリーンアウトしたら配列データを消去する関数
let ballDelete = function(){
    let new_balls = [];
    for(let i = 0;i<balls.length;i++){
        if(balls[i].posX>=can.width){
            delete balls[i];
        }else{
            new_balls.push(balls[i]);
        }
    }
    balls = new_balls;
};

let ball2Delete = function(){
    let new_balls2 = [];
    for(let i = 0;i<balls2.length;i++){
        if(balls2[i].posX>=can.width){
            delete balls2[i];
        }else{
            new_balls2.push(balls2[i]);
        }
    }
    balls2 = new_balls2;
};





/*---------------------------
 * 敵について
 *--------------------------*/
// 敵の元オブジェクト
let enemy = {
    w:null,
    h:null,
    posX:can.width,
    image:"",//下の関数が実行されたらその画像canvas上に読み込まれる。
    draw:function(){
        const img = new Image();
        img.src = "images/bobunemi.png";
        img.onload = function(){
            enemy.image = img;
            enemy.w = img.width;
            enemy.h = img.height;
        }
    }
}


// 敵データ格納用配列
let enemies = [];


// 敵の出現+配列への格納のための関数
let appearEnemy = function(){
    const num = Math.floor(Math.random()*100);//敵が出てくる確率
    const y = Math.floor(Math.random()*can.height);//敵が出現する場所をランダムで変更する。
    // let newEnemy = Object.assign({posY:y},enemy);//objectの複製
    let newEnemy = Object.assign({posY:y, speed: Math.random() * 25 },enemy);
    // ##################################
	// newEnemy.image が null の間は描画しない
	// ##################################
    if(num>90 && newEnemy.image){
        ctx.drawImage(newEnemy.image,newEnemy.posX,newEnemy.posY);
        enemies.push(newEnemy);
    }
}

// 敵を動かすための関数
let moveEnemy = function(){
    for(let i = 0;i<enemies.length;i++){
        // ctx.clearRect(enemies[i].posX,enemies[i].posY,enemies[i].w,enemies[i].h);
        enemies[i].posX -=enemies[i].speed;
        ctx.drawImage(enemies[i].image,enemies[i].posX,enemies[i].posY,enemies[i].w,enemies[i].h);
    }
}


// 敵がスクリーンアウトした際に配列から消去するための関数
let deleteEnemy = function(){
    let newEnemies = [];
    for(let i=0;i<enemies.length;i++){
        if(enemies[i].posX>=0-enemy.w){
            newEnemies.push(enemies[i]);
        }else{
            delete enemies[i];
            count = count - 10;
            console.log(count);
            $("#score-board > p").html("SCORE：" + count);
        }
    }
    enemies = newEnemies;
}


/*---------------------------
 * 当たり判定
 *--------------------------*/

// ヒット数カウント用変数
let count =0;

// ボール1：富美男アタック当たり判定。あたったらスコアカウントと表示。一定数超えたら画面切り替え。
let hitJudge = function(){
    for(let i = 0;i<balls.length;i++){
        const b = balls[i];//1発1発の弾=b
        for(let j=0;j<enemies.length;j++){
            const a = enemies[j];//1体1体の的=a
            if((b.posX+b.w)>=a.posX && b.posY<=(a.posY+a.h) && (b.posY+b.h)>=a.posY){
               enemies.splice(j,1);//配列から削除
            //    ctx.clearRect(a.posX,a.posY,a.w,a.h);
            //    balls.splice(i,1); //配列から削除
            //    ctx.clearRect(b.posX,b.posY,b.w,b.h);
               count ++;
               if(count < 300){
                console.log(count);
                $("#score-board > p").html("SCORE：" + count);
               }else{
                console.log(count);
                console.log("hoge1");
                $("#score-board > p").html("SCORE：" + count);
                cancelAnimationFrame( animationId );
                window.location.href = "result.php" + "?userName=" + userName + "&time=" + time;
                }               
            }
        }

    }
}

// ボール2：富美男ボール当たり判定。あたったらスコアカウントと表示。一定数超えたら画面切り替え。
let hitJudge2 = function(){
    for(let i = 0;i<balls2.length;i++){
        const b = balls2[i];//1発1発の弾=b
        for(let j=0;j<enemies.length;j++){
            const a = enemies[j];//1体1体の的=a
            if((b.posX+b.w)>=a.posX && b.posY<=(a.posY+a.h) && (b.posY+b.h)>=a.posY){
               enemies.splice(j,1);//配列から削除
            //    ctx.clearRect(a.posX,a.posY,a.w,a.h);
               balls2.splice(i,1); //配列から削除、削除しないと端まで駆逐しながら動くよ。
            //    ctx.clearRect(b.posX,b.posY,b.w,b.h);
               count = count + 10;
               if(count < 300){
                console.log(count);
                $("#score-board > p").html("SCORE：" + count);
               }else{
                console.log(count);
                console.log("hoge2");
                $("#score-board > p").html("SCORE：" + count);
                cancelAnimationFrame( animationId );
                window.location.href = "result.php" + "?userName=" + userName + "&time=" + time;
               }
            }
        }

    }
}

//プレーヤー当たり判定
let playerHit = function(){
    for(let j=0;j<enemies.length;j++){
        const a = enemies[j];//1体1体の敵=a
        if((player.posX)>=a.posX && player.posY<=(a.posY+a.h) && (player.posY+player.h)>=a.posY){
            count = count - 10;
            console.log(count);
            $("#score-board > p").html("SCORE：" + count);
            $("#canvas").css("background","red",);
            setTimeout(function(){
                $("#canvas").css("background","linear-gradient(-160deg, black, #dc53bd)");
           },300);
        }
    }
    
}



// ##################################
// ゲームを開始するために必要な関数を制御するための
// 関数。 startGame() をすると、画面が動き出すようにする。
// ##################################

let animationId = null;
let startGame = function(){
    $(window).on("mousedown", ballInit );
    $(window).on("keyup" , function(e){
        if( e.keyCode == 13 ){ ballInit2() }
    });
    render();
};

let startFlag = false;

$('#trigger-start').on('click', function(){
    if(startFlag == false){
        startGame();
        startFlag = true;
    }
});

$('#trigger-stop').on('click', function(){
    if(startFlag == true){
        cancelAnimationFrame( animationId )
        startFlag = false;
    }
});


/*---------------------------
 * 読み込み時に実行する関数
 *--------------------------*/
$(window).on("load",function(){
    player.draw();
    ball.draw();
    ball2.draw();
    enemy.draw();
    //TODO: ここはあとでtrigger-startのボタンクリックで実行するようにする予定だよ。
    // startGame();
});

// mousedownするたびにballデータを作成するようイベント追加
// $(window).on("mousedown",ballInit);

// エンターキーを押下するとballデータを作成するようイベント追加
// $(window).on("keyup",function(e){
//     if(e.keyCode == 13){
//         ballInit2();
//     }
// });

/*---------------------------
 * ループで実行する関数
 *--------------------------*/

const $area = $("#canvas");

let render = function(){
    animationId = requestAnimationFrame(render);
    // requestAnimationFrame(render);
    ctx.clearRect(0,0,$area.width(),$area.height());

	// ##################################
	// player.image が null の間は描画しない
	// ##################################
	if( isAppearPlayer && player.image ){
		ctx.drawImage(player.image,player.posX,player.posY);
	}

    ballMove();
    ball2Move();
    ballDelete();
    ball2Delete();
    appearEnemy();
    moveEnemy();
    deleteEnemy();
    hitJudge();
    hitJudge2();
    playerHit();
}


