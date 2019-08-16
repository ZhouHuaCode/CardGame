

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
        textLabel:cc.Label,

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

        enableAutoGrayEffect: {
            default: false,
            tooltip: CC_DEV && 'i18n:COMPONENT.button.auto_gray_effect',
            notify () {
                this._updateDisabledState();
            }
        },

        _N$isChecked: true,
        isChecked: {
            get: function () {
                return this._N$isChecked;
            },
            set: function (value) {
                if (value === this._N$isChecked) {
                    return;
                }

                this._N$isChecked = value;
                this._updateCheckMark();
                this._updateToggles();
                this._emitToggleEvents();
            },
            tooltip: CC_DEV && 'i18n:COMPONENT.toggle.isChecked',
        },
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
        this._checkType = CheckType.RADIO;

        this.zoomScale = 1.2;
    },

    onLoad () {
    	// this._setCheckType(CheckType.MULTICHECK)
    	this._applyTarget();
    	this._updateState();
    },

    _setCheckType:function(type) {
        this._checkType = type;
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

        this.backSp.node.scale = this._fromScale.lerp(this._toScale, ratio);
        this.checkSp.node.scale = this._fromScale.lerp(this._toScale, ratio);

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
        this._originalScale.x = this.backSp.node.scaleX;
        this._originalScale.y = this.backSp.node.scaleY;
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
            if(this._checkType == CheckType.RADIO){
                this.check();
            }
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

        // let target = this._getTarget();
        this._fromScale.x = this.backSp.node.scaleX;
        this._fromScale.y = this.backSp.node.scaleY;
        this._toScale.x = this._originalScale.x;
        this._toScale.y = this._originalScale.y;
        this.time = 0;
        this._transitionFinished = false;
    },

    _updateDisabledState () {
        if (this.backSp && this.checkSp) {
            if (this.enableAutoGrayEffect) {
                if (!this.interactable) {
                    if (this.backSp){
                        let material = this.backSp.sharedMaterials[0];
                        material = cc.Material.getInstantiatedBuiltinMaterial('2d-gray-sprite', this);
                        material = cc.Material.getInstantiatedMaterial(material, this);
                        material.setProperty('texture', this.backSp.spriteFrame.getTexture());
                        this.backSp.setMaterial(0, material);
                        this.backSp.markForUpdateRenderData(true);
                        this.backSp.markForRender(true);
                    }
                    if (this.checkSp){
                        let material = this.checkSp.sharedMaterials[0];
                        material = cc.Material.getInstantiatedBuiltinMaterial('2d-gray-sprite', this);
                        material = cc.Material.getInstantiatedMaterial(material, this);
                        material.setProperty('texture', this.checkSp.spriteFrame.getTexture());
                        this.checkSp.setMaterial(0, material);
                        this.checkSp.markForUpdateRenderData(true);
                        this.checkSp.markForRender(true);
                    }
                    if (this.textLabel){
                        this.textLabel.node.color = cc.Color.GRAY;
                    }
                }else {
                    if (this.backSp){
                        let material = this.backSp.sharedMaterials[0];
                        material = cc.Material.getInstantiatedBuiltinMaterial('2d-sprite', this);
                        material = cc.Material.getInstantiatedMaterial(material, this);
                        material.setProperty('texture', this.backSp.spriteFrame.getTexture());
                        this.backSp.setMaterial(0, material);
                        this.backSp.markForUpdateRenderData(true);
                        this.backSp.markForRender(true);
                    }
                    if (this.checkSp){
                        let material = this.checkSp.sharedMaterials[0];
                        material = cc.Material.getInstantiatedBuiltinMaterial('2d-sprite', this);
                        material = cc.Material.getInstantiatedMaterial(material, this);
                        material.setProperty('texture', this.checkSp.spriteFrame.getTexture());
                        this.checkSp.setMaterial(0, material);
                        this.checkSp.markForUpdateRenderData(true);
                        this.checkSp.markForRender(true);
                    }
                    if (this.textLabel){
                        if(this.isChecked){
                            this.textLabel.node.color = cc.Color.RED;
                        }else{
                            this.textLabel.node.color = cc.Color.WHITE;
                        }
                        
                    }
                }
            }
        }
    },

    /**
     * !#en Make the toggle button checked.
     * !#zh 使 toggle 按钮处于选中状态
     * @method check
     */
    check: function () {
        this.isChecked = true;
    },

    /**
     * !#en Make the toggle button unchecked.
     * !#zh 使 toggle 按钮处于未选中状态
     * @method uncheck
     */
    uncheck: function () {
        this.isChecked = false;
    },

    _hideCheckMark: function () {
        this._N$isChecked = false;
        this._updateCheckMark();
    },

    _updateCheckMark: function () {
        if (this.checkSp) {
            this.checkSp.node.active = !!this.isChecked;
        }
        if(this.textLabel){
            if(!this.interactable){
                this.textLabel.node.color = cc.Color.GRAY;
            }else if(this.isChecked){
                // 255,60,60
                this.textLabel.node.color = cc.Color.RED;
            }else {
                this.textLabel.node.color = cc.Color.WHITE;
            }
        }
    },

    _emitToggleEvents: function () {
        // this.node.emit('toggle', this);
        // if (this.checkEvents) {
        //     cc.Component.EventHandler.emitEvents(this.checkEvents, this);
        // }
        if(this.checkHandle){
            this.checkHandle(this.toggleName);
        }
    },

    _updateToggles: function () {
        this._toggleContainer = null;
        var self = this
        let parent = this.node.parent;
        if (cc.Node.isNode(parent) && this._checkType == CheckType.RADIO) {
            cc.log("_updateToggles")
            this._toggleContainer = parent.getComponent(cc.ToggleContainer);
            let toggleItems = parent.getComponentsInChildren("createRoomToggle");
            toggleItems.forEach(function (item) {
                if (item !== self && item.isChecked && item.enabled) {
                    item._hideCheckMark();
                }
            });
        }
    },

    setToggleName: function (str) {
        this.toggleName = str;
    },

    setToggleText: function (str) {
        this.toggleText = str;
        if(this.textLabel){
            this.textLabel.string = this.toggleText;
        }
    },

    setCheckHandle: function (callback) {
        this.checkHandle = callback;
    },
});
