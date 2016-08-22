//thirdScene.js
//nextScene.js

var ThirdLayer = cc.Layer.extend({
  sprite: null,
// ブロックを保持しておく配列
dropSpriteArray: null,
// 配列の宣言　ブロックの名前を指定
dropArray: [res.nagoya0_png,res.nagoya1_png, res.nagoya2_png, res.nagoya3_png, res.nagoya4_png, res.nagoya5_png,res.nagoya6_png,],
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

       this.dropSpriteArray = new Array();
       var i = 1;
       for (i = 0; i < 10; i++) {
           var rnd = Math.floor(Math.random() * 7);


           this.sprite = new cc.Sprite(this.dropArray[rnd]);
           cc.log(i);
           cc.log(this.dropArray[i]);
           this.sprite.attr({
               x: size.width * (i + 1) / 10,
               y: size.height * Math.random(),
               scale: 0.1+Math.random()*1.9,
               rotation: 0
           });
           this.dropSpriteArray.push(this.sprite);
           // this.addChild(this.sprite);
           this.addChild(this.dropSpriteArray[i], 0);


           //  var drop01 = cc.Sprite.create(res.drop01_png);　
           //  drop01.setPosition(size.width * i / 6, size.height / 5);　
           //  this.addChild(drop01);
       }
        var size = cc.director.getWinSize();
        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        if (!audioEngine.isMusicPlaying()) {
            //audioEngine.playMusic("res/bgm_main.mp3", true);
            audioEngine.playMusic(res.bgm_title, true);
        }

        //画像
        var sprite = cc.Sprite.create(res.Title_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.8);
        this.addChild(sprite, 0);

        //画像
        var sprite = cc.Sprite.create(res.go_png);
        sprite.setPosition(size.width / 1.3, size.height / 7);
        sprite.setScale(0.8);
        this.addChild(sprite, 0);

        var label = cc.LabelTTF.create("クリックでスタート", "Arial", 26);
        label.setPosition(size.width / 2, size.height * 5 / 6);
        this.addChild(label, 1);

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
        return true;
    },
    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        cc.director.runScene(new gameScene());

        //bgmの再生をとめる
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
        }

    },
});


var FirstScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 250, 200, 250));
        this.addChild(backgroundLayer);

        //ラベルとタップイベント取得
        var layer3 = new ThirdLayer();
        this.addChild(layer3);

    }
});
