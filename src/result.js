var ResultLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        //bgmの再生をとめる
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
        }
        //画像 タイトルに戻る
        var sprite = cc.Sprite.create(res.title_button_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.8);
        this.addChild(sprite, 0);
        //画像　gameover
        var sprite = cc.Sprite.create(res.gameover_png);
        sprite.setPosition(size.width / 2, size.height / 1.5);
        sprite.setScale(0.8);
        this.addChild(sprite, 0);




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
        cc.director.runScene(new FirstScene());

        //bgmの再生をとめる
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
        }

    },
});


var ResultScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        miss = 0;
        score = 0;
      scoreText.setString("Score: " * score);
        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(250, 150, 150, 250));
        this.addChild(backgroundLayer);

        //ラベルとタップイベント取得
        var layer3 = new ResultLayer();
        this.addChild(layer3);

    }
});
