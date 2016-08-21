//app.js

var size;

var mylabel;
//背景スクロールで追加した部分
var gameLayer;
//背景の海
var background;
//上の岩
var background2;
//下の岩
var background3;
//上の石
var background4;
//下の石
var background5;
//背景の海の速さ
var scrollSpeed = 0.5;
//背景の岩の速さ
var scrollSpeediwa = 2;
//背景の石の速さ
var scrollSpeedisi = 5;
//宇宙船で追加した部分　重力
var ship;
var coral;
var coral2;
var gameGravity = -0.05;
//宇宙船を操作するで追加した部分 エンジンの推進力
var gameThrust = 0.1;
//パーティクル
var emitter;
var audioEngine;
var miss = 0;
var missText;
var score = 0;
var scoreText;


var gameScene = cc.Scene.extend({

    onEnter: function() {
        this._super();



        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
            //audioEngine.playMusic("res/bgm_main.mp3", true);
            audioEngine.playMusic(res.bgm_main, true);
        }
        //ミスした回数
        missText = cc.LabelTTF.create("Miss: 0", "Arial", "32", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText);
        missText.setPosition(400, 50);

        //スコア
        scoreText = cc.LabelTTF.create("Score: 0", "Arial", "32", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(70, 50);
    },

});


var game = cc.Layer.extend({
    init: function() {
        this._super();
        var gradient = cc.LayerGradient.create(cc.color(255, 100, 100, 255), cc.color(0xff, 0xff, 0x0, 255));
        this.addChild(gradient);



        size = cc.director.getWinSize();
        //BGMと効果音のエンジンを追加

        //宇宙船を操作するで追加した部分
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event) {
                ship.engineOn = true;
            },
            onMouseUp: function(event) {
                ship.engineOn = false;
            }
        }, this)

        //スクロールする背景スプライトをインスタンス　スクロール速度:scrollSpeed
        background = new ScrollingBG();
        background2 = new ScrollingBG2();
        background3 = new ScrollingBG3();
        background4 = new ScrollingBG4();
        background5 = new ScrollingBG5();
        this.addChild(background);
        this.addChild(background2);
        this.addChild(background3);
        this.addChild(background4);
        this.addChild(background5);

        ship = new Ship();
        this.addChild(ship);

        //scheduleUpdate関数は、描画の都度、update関数を呼び出す
        this.scheduleUpdate();
        //小惑星の生成で追加
        this.schedule(this.addAsteroid, 0.5);
        //サンゴ上
        this.schedule(this.addCoral, 10.5);
        //サンゴ下
        this.schedule(this.addCoral2, 12.5);
        //ここからパーティクルの設定
        emitter = cc.ParticleSun.create();
        this.addChild(emitter, 1);
        var myTexture = cc.textureCache.addImage(res.wave_png);
        emitter.setTexture(myTexture);
        emitter.setStartSize(2);
        emitter.setEndSize(4);

    },
    update: function(dt) {
        //backgroundのscrollメソッドを呼び出す
        background.scroll();
        background2.scroll();
        background3.scroll();
        background4.scroll();
        background5.scroll();
        ship.updateY();
    },
    //小惑星の生成で追加
    addAsteroid: function(event) {
        var asteroid = new Asteroid();
        this.addChild(asteroid);
    },
    removeAsteroid: function(asteroid) {
        this.removeChild(asteroid);
    },
    //サンゴ上
    addCoral: function(event) {
        var coral = new Coral();
        this.addChild(coral);
    },
    removeCoral: function(coral) {
        this.removeChild(coral);
    },
    //サンゴ下
    addCoral2: function(event) {
        var coral2 = new Coral2();
        this.addChild(coral2);
    },
    removeCoral2: function(coral2) {
        this.removeChild(coral2);
    },
    //BGMと効果音の関数を追加
    /*
    playSe: function() {
      this.audioEngine.playEffect(res.se_surprize);
    },
    playBgm: function() {
      if (!this.audioEngine.isMusicPlaying()) {
        this.audioEngine.playMusic(res.bgm_main, true);
      }
    },
    stopBgm: function() {
      if (this.audioEngine.isMusicPlaying()) {
        this.audioEngine.stopMusic();
      }
    },
    bgmUp: function() {
      this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume() + 0.1);
    },
    bgmDown: function() {
      this.audioEngine.setMusicVolume(this.audioEngine.getMusicVolume() - 0.1);
    },
    seUp: function() {
      this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume() + 0.1);
    },
    seDown: function() {
      this.audioEngine.setEffectsVolume(this.audioEngine.getEffectsVolume() - 0.1);
    }*/

});

//スクロール移動する背景クラス
var ScrollingBG = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor: function() {
        this._super();
        this.initWithFile(res.background_png);

    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter: function() {
        //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
        this.setPosition(size.width, size.height / 2);
        //  this.setPosition(480,160);
    },
    scroll: function() {
        //座標を更新する
        this.setPosition(this.getPosition().x - scrollSpeed, this.getPosition().y);
        //画面の端に到達したら反対側の座標にする
        if (this.getPosition().x < 0) {
            this.setPosition(this.getPosition().x + 480, this.getPosition().y);
        }
    }
});

//スクロール移動する背景クラス2　岩山上
var ScrollingBG2 = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor: function() {
        this._super();
        this.initWithFile(res.rock_png);
    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter: function() {
        //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
        this.setPosition(size.width, size.height * 0.9);
        //  this.setPosition(480,160);
    },
    scroll: function() {
        //座標を更新する
        this.setPosition(this.getPosition().x - scrollSpeediwa, this.getPosition().y);
        //画面の端に到達したら反対側の座標にする
        if (this.getPosition().x < 0) {
            this.setPosition(this.getPosition().x + 480, this.getPosition().y);
        }
    }
});

//スクロール移動する背景クラス　岩山下
var ScrollingBG3 = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor: function() {
        this._super();
        this.initWithFile(res.rock_under_png);
    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter: function() {
        //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
        this.setPosition(size.width, size.height * 0.1);
        //  this.setPosition(480,160);
    },
    scroll: function() {
        //座標を更新する
        this.setPosition(this.getPosition().x - scrollSpeediwa, this.getPosition().y);
        //画面の端に到達したら反対側の座標にする
        if (this.getPosition().x < 0) {
            this.setPosition(this.getPosition().x + 480, this.getPosition().y);
        }
    }
});

//スクロール移動する背景クラス 石上
var ScrollingBG4 = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor: function() {
        this._super();
        this.initWithFile(res.ceiling_png);
    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter: function() {
        //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
        this.setPosition(size.width, size.height * 0.9);
        //  this.setPosition(480,160);
    },
    scroll: function() {
        //座標を更新する
        this.setPosition(this.getPosition().x - scrollSpeedisi, this.getPosition().y);
        //画面の端に到達したら反対側の座標にする
        if (this.getPosition().x < 0) {
            this.setPosition(this.getPosition().x + 480, this.getPosition().y);
        }
    }
});

//スクロール移動する背景クラス 石下
var ScrollingBG5 = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor: function() {
        this._super();
        this.initWithFile(res.land_png);

    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter: function() {
        //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
        this.setPosition(size.width, size.height * 0.1);
        //  this.setPosition(480,160);
    },
    scroll: function() {
        //座標を更新する
        this.setPosition(this.getPosition().x - scrollSpeedisi, this.getPosition().y);
        //画面の端に到達したら反対側の座標にする
        if (this.getPosition().x < 0) {
            this.setPosition(this.getPosition().x + 480, this.getPosition().y);
        }
    }
});



//重力（仮）で落下する　宇宙船　
var Ship = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.ship_png);
        this.ySpeed = 0; //宇宙船の垂直速度
        //宇宙船を操作するで追加した部分
        this.engineOn = false; //カスタム属性追加　宇宙船のエンジンのON OFF
        this.invulnerability = 0; //無敵モード時間　初期値0
    },
    onEnter: function() {
        this.setPosition(60, 160);
    },
    updateY: function() {
        //宇宙船を操作するで追加した部分
        if (this.engineOn) {
            this.ySpeed += gameThrust;
            this.initWithFile(res.shrimp01_png);
            //ここでパーティクルエフェクトを宇宙船のすぐ後ろに配置している
            emitter.setPosition(this.getPosition().x - 25, this.getPosition().y);
        } else {
            this.initWithFile(res.ship_png);
            //エンジンOffのときは画面外に配置
            emitter.setPosition(this.getPosition().x - 250, this.getPosition().y);
        }

        //無敵モード中の視覚効果
        if (this.invulnerability > 0) {
            this.invulnerability--;
            this.setOpacity(255 - this.getOpacity());
        }


        this.setPosition(this.getPosition().x, this.getPosition().y + this.ySpeed);
        this.ySpeed += gameGravity;

        //宇宙船が画面外にでたら、リスタートさせる
        if (this.getPosition().y < 0 || this.getPosition().y > 320) {
            audioEngine.playEffect(res.se_flee1);
            miss++
            missText.setString("Miss: " + miss);
            //三回ミスするとthirdSceneへ
            if (miss == 3) {
                cc.director.runScene(new ResultScene());
            }
            restartGame();

        }
    }
});

//上のサンゴクラス
var Coral = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.coral_above_png);
    },
    onEnter: function() {
        this._super();
        this.setPosition(600, 580);
        var moveAction = cc.MoveTo.create(2.5, new cc.Point(-100, 320));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update: function(dt) {
        var shipBoundingBox = ship.getBoundingBox();
        var coralBoundingBox = this.getBoundingBox();
        //rectIntersectsRectは２つの矩形が交わっているかチェックする
        if (cc.rectIntersectsRect(shipBoundingBox, coralBoundingBox) && ship.invulnerability == 0) {
            gameLayer.removeCoral(this); //小惑星を削除する
            //ボリュームを上げる
            audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
            //効果音を再生する
            //  audioEngine.playEffect("res/se_bang.mp3");
            audioEngine.playEffect(res.se_Death);
            miss++;
            missText.setString("Miss: " + miss);
            //三回ミスするとthirdSceneへ
            if (miss == 3) {
                cc.director.runScene(new ResultScene());
            }


            restartGame();
        }

        //画面の外にでたサンゴを消去する処理
        if (this.getPosition().x < -50) {
            gameLayer.removeCoral(this)
        }
    }
});

//下のサンゴクラス
var Coral2 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.coral_under_png);
    },
    onEnter: function() {
        this._super();
        this.setPosition(600, -200);
        var moveAction = cc.MoveTo.create(1.5, new cc.Point(-100, 0));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update: function(dt) {
        var shipBoundingBox = ship.getBoundingBox();
        var coral2BoundingBox = this.getBoundingBox();
        //rectIntersectsRectは２つの矩形が交わっているかチェックする
        if (cc.rectIntersectsRect(shipBoundingBox, coral2BoundingBox) && ship.invulnerability == 0) {
            gameLayer.removeCoral2(this); //小惑星を削除する
            //ボリュームを上げる
            audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
            //効果音を再生する
            //  audioEngine.playEffect("res/se_bang.mp3");
            audioEngine.playEffect(res.se_Death);
            miss++;
            missText.setString("Miss: " + miss);
            //三回ミスするとthirdSceneへ
            if (miss == 3) {
                cc.director.runScene(new ResultScene());
            }

            restartGame();
        }

        //画面の外にでたサンゴを消去する処理
        if (this.getPosition().x < -50) {
            gameLayer.removeCoral2(this)
        }
    }
});

//小惑星クラス
var Asteroid = cc.Sprite.extend({
    sprite: null,
    // ブロックを保持しておく配列
    dropSpriteArray: null,
    // 配列の宣言　ブロックの名前を指定
    dropArray: [res.nagoya0_png, res.nagoya1_png, res.nagoya2_png, res.nagoya3_png, res.nagoya4_png, res.nagoya5_png, res.nagoya6_png],
    ctor: function() {
        this._super();
        //this.initWithFile(res.nagoya0_png);
        var size = cc.director.getWinSize();

        this.dropSpriteArray = new Array();
        var i = 1;
        for (i = 0; i < 1; i++) {
            var rnd = Math.floor(Math.random() * 7);

            this.sprite = new cc.Sprite(this.dropArray[rnd]);
            cc.log(i);
            cc.log(this.dropArray[i]);

            this.dropSpriteArray.push(this.sprite);
            // this.addChild(this.sprite);
            this.addChild(this.dropSpriteArray[i], 0);
        }
    },


    onEnter: function() {
        this._super();
        this.setPosition(1600, Math.random() * 320);
        var moveAction = cc.MoveTo.create(5.5, new cc.Point(-100, Math.random() * 320));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update: function(dt) {
        //小惑星との衝突を判定する処理
        var shipBoundingBox = ship.getBoundingBox();
        var asteroidBoundingBox = this.getBoundingBox();

        //rectIntersectsRectは２つの矩形が交わっているかチェックする
        if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability == 0) {
            gameLayer.removeAsteroid(this); //小惑星を削除する
            //ボリュームを上げる
            audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
            //効果音を再生する
            //  audioEngine.playEffect("res/se_bang.mp3");
            audioEngine.playEffect(res.se_bang);
            score++;
            scoreText.setString("Score: " + score * 10);


        }
        //画面の外にでた小惑星を消去する処理
        if (this.getPosition().x < -50) {
            gameLayer.removeAsteroid(this)
        }

    }
});

//宇宙船を元の位置に戻して、宇宙船の変数を初期化する
function restartGame() {
    ship.ySpeed = 0;
    ship.setPosition(ship.getPosition().x, 160);
    ship.invulnerability = 100;
    //bgmリスタート
    if (!audioEngine.isMusicPlaying()) {
        audioEngine.resumeMusic();
    }
}
