

const State = cc.Enum({
    NORMAL: 0,
    HOVER: 1,
    PRESSED: 2,
    DISABLED: 3,
});

const CheckType = cc.Enum({
    MULTICHECK:1,
    RADIO: 2,
});

// const GraySpriteState = require('utils/gray-sprite-state');

cc.Class({
    extends: cc.Component,
    // mixins: [GraySpriteState],
    properties: {
        checkBackImage:cc.SpriteFrame,
        checkCheckImage:cc.SpriteFrame,
        radioBackImage:cc.SpriteFrame,
        radioCheckImage:cc.SpriteFrame,

        backSp:cc.Sprite,
        checkSp:cc.Sprite,

        interactable: {
            default: true,
            tooltip: CC_DEV && 'i18n:COMPONENT.button.interactable',
            notify () {
                this._updateState();

                if (!this.interactable) {
                    this._resetState();
                }
            },
            animatable: false
        },

        // enableAutoGrayEffect: {
        //     default: false,
        //     tooltip: CC_DEV && 'i18n:COMPONENT.button.auto_gray_effect',
        //     notify () {
        //         this._updateDisabledState();
        //     }
        // },

    },

    // LIFE-CYCLE CALLBACKS:
    ctor () {
        this._pressed = false;
        this._hovered = false;
        this._fromColor = null;
        this._toColor = null;
        this._time = 0;
        this._transitionFinished = true;
        // init _originalScale in __preload()
        this._fromScale = cc.Vec2.ZERO;
        this._toScale = cc.Vec2.ZERO;
        this._originalScale = null;

        this._graySpriteMaterial = null;
        this._spriteMaterial = null;

        this._sprite = null;
    },

    onLoad () {
    	// this._setCheckType(CheckType.MULTICHECK)
    	this._applyTarget();
    	this._updateState();

    },

    _setCheckType:function(type) {
    	if (type == CheckType.MULTICHECK) {
    		this.backSp.spriteFrame = this.checkBackImage;
    		this.checkSp.spriteFrame = this.checkCheckImage;
    	}
    },

    _resetState () {
        this._pressed = false;

        let originalScale = this._originalScale;

        this.backSp.node.setScale(originalScale.x, originalScale.y);
        this.checkSp.node.setScale(originalScale.x, originalScale.y);

        this._transitionFinished = true;
    },

    start () {

    },


    onEnable () {
    	if (!CC_EDITOR) {
            this._registerNodeEvent();
        }
    },

    onDisable () {
    	this._resetState();

    	if (!CC_EDITOR) {
            this._unregisterNodeEvent();
        }
    },

    update (dt) {
        if (this._transitionFinished) return;

        this.time += dt;
        let ratio = 1.0;
        if (this.duration > 0) {
            ratio = this.time / this.duration;
        }

        // clamp ratio
        if (ratio >= 1) {
            ratio = 1;
        }

        this.backSp.scale = this._fromScale.lerp(this._toScale, ratio);
        this.checkSp.scale = this._fromScale.lerp(this._toScale, ratio);

        if (ratio === 1) {
            this._transitionFinished = true;
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

    _applyTarget () {
        if (!this._originalScale) {
            this._originalScale = cc.Vec2.ZERO;
        }
        this._originalScale.x = this.backSp.scaleX;
        this._originalScale.y = this.backSp.scaleY;
    },

    _onTouchBegan (event) {
        if (!this.interactable) return;

        this._pressed = true;
        this._updateState();
        event.stopPropagation();
    },

    _onTouchMove (event) {
        if (!this.interactable || !this._pressed) return;
        // mobile phone will not emit _onMouseMoveOut,
        // so we have to do hit test when touch moving
        let touch = event.touch;
        let hit = this.node._hitTest(touch.getLocation());
        let originalScale = this._originalScale;

        if (originalScale) {
            if (hit) {
                this._fromScale.x = originalScale.x;
                this._fromScale.y = originalScale.y;
                this._toScale.x = originalScale.x * this.zoomScale;
                this._toScale.y = originalScale.y * this.zoomScale;
                this._transitionFinished = false;
            } else {
                this.time = 0;
                this._transitionFinished = true;
                this.backSp.node.setScale(originalScale.x, originalScale.y);
                this.checkSp.node.setScale(originalScale.x, originalScale.y);
            }
        }
        event.stopPropagation();
    },


	_onTouchEnded (event) {
        if (!this.interactable) return;

        if (this._pressed) {
            cc.Component.EventHandler.emitEvents(this.clickEvents, event);
            this.node.emit('click', this);
        }
        this._pressed = false;
        this._updateState();
        event.stopPropagation();
    },

    _onTouchCancel () {
        if (!this.interactable) return;

        this._pressed = false;
        this._updateState();
    },

    _onMouseMoveIn () {
        if (this._pressed || !this.interactable ) return;

        if (!this._hovered) {
            this._hovered = true;
            this._updateState();
        }
    },

    _onMouseMoveOut () {
        if (this._hovered) {
            this._hovered = false;
            this._updateState();
        }
    },




    _updateState () {
        let state = this._getButtonState();
        this._updateScaleTransition(state);
        this._updateDisabledState();
    },

    _getButtonState () {
        let state;
        if (!this.interactable) {
            state = State.DISABLED;
        }
        else if (this._pressed) {
            state = State.PRESSED;
        }
        else if (this._hovered) {
            state = State.HOVER;
        }
        else {
            state = State.NORMAL;
        }
        return state;
    },

    _updateScaleTransition (state) {
        if (state === State.PRESSED) {
            this._zoomUp();
        } else {
            this._zoomBack();
        }
    },

    _zoomUp () {
        // skip before __preload()
        if (!this._originalScale) {
            return;
        }

        this._fromScale.x = this._originalScale.x;
        this._fromScale.y = this._originalScale.y;
        this._toScale.x = this._originalScale.x * this.zoomScale;
        this._toScale.y = this._originalScale.y * this.zoomScale;
        this.time = 0;
        this._transitionFinished = false;
    },

    _zoomBack () {
        // skip before __preload()
        if (!this._originalScale) {
            return;
        }

        let target = this._getTarget();
        this._fromScale.x = target.scaleX;
        this._fromScale.y = target.scaleY;
        this._toScale.x = this._originalScale.x;
        this._toScale.y = this._originalScale.y;
        this.time = 0;
        this._transitionFinished = false;
    },

        // let material = this.checkSp.sharedMaterials[1];
        // material = cc.Material.getInstantiatedMaterial(material, this);
        // material.setProperty('texture', this.checkSp.spriteFrame.getTexture());

        // this.checkSp.setMaterial(0, material);
        // this.checkSp.markForRender(true);

});
