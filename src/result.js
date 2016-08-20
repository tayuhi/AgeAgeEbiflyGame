var ResultLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        //画像
        var sprite = cc.Sprite.create(res.title_button_png);
        sprite.setPosition(size.width / 2, size.height / 2);
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
        cc.director.runScene(new gameScene());
    },
});


var ResultScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(250, 150, 150, 250));
        this.addChild(backgroundLayer);
miss= 0;
        //ラベルとタップイベント取得
        var layer3 = new ResultLayer();
        this.addChild(layer3);

    }
});
