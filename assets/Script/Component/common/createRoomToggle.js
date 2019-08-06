// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let CheckType = cc.Enum({
    MULTICHECK:1,
    RADIO: 2,
});


cc.Class({
    extends: cc.Component,

    properties: {
        checkBackImage:cc.SpriteFrame,
        checkCheckImage:cc.SpriteFrame,
        radioBackImage:cc.SpriteFrame,
        radioCheckImage:cc.SpriteFrame,

        backSp:cc.Sprite,
        checkSp:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.setCheckType(CheckType.MULTICHECK)
    },

    start () {

    },

    onEnable () {
    	if (!CC_EDITOR) {
            this._registerNodeEvent();
        }
    },

    onDisable () {
    	if (!CC_EDITOR) {
            this._unregisterNodeEvent();
        }
    },

    setCheckType:function(type) {
    	if (type == CheckType.MULTICHECK) {
    		this.backSp.spriteFrame = this.checkBackImage;
    		this.checkSp.spriteFrame = this.checkCheckImage;
    	}
    	

    },


    _registerNodeEvent () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);

        this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
    },

    _unregisterNodeEvent () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);

        this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
    },
});
