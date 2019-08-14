// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // testToggleContainer:cc.Node,
        // testToggle:cc.Node,
        scrollCont:cc.Node,
        wanfaLabelPrefab:cc.Prefab,
        createTogglePrefab:cc.Prefab,
        // testNode:cc.Node,
    },

    // onTestClick:function(){
    //     var preInteractable = this.testNode.getComponent("createRoomToggle").interactable;
    //     this.testNode.getComponent("createRoomToggle").interactable = !preInteractable;
    //     this.testNode.getComponent("createRoomToggle")._setCheckType(1)
    // },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // var testToggle2 = cc.instantiate(this.testToggle);
        // this.testToggleContainer.addChild(testToggle2);
        // testToggle2.setPosition(70,0);

        // var testToggle3 = cc.instantiate(this.testToggle);
        // this.testToggleContainer.addChild(testToggle3);
        // testToggle3.setPosition(70,70);
        // testToggle3.setContentSize(150,50)

        
        // this.testCreate()
        var createRoomNode = new cc.Node;
        this.scrollCont.addChild(createRoomNode);
        // self.preCreateNodes[self.lastCreateGameName] = createRoomNode;
        // self.createToAdd.addChild(createRoomNode);
        // var compStr = self.lastCreateGameName + "Create";
        var compStr = "zzmj_ctrl"
        createRoomNode.addComponent(compStr);
        this.createScript = createRoomNode.getComponent(compStr);
        this.createScript.wanfaLabelPrefab = this.wanfaLabelPrefab;
        this.createScript.hallJs = this;
        // this.createScript.setShowType(cc.vv.enum.createType.createType_hall);
        this.createScript.showView();
    },

    start () {

    },

    // update (dt) {},

    onCreateJoinBtnClick:function(){
        this.showCreateJoinPanel();
    },

    onCreateBtnClick:function(){
        // 载入进度

    },

    showCreateJoinPanel:function(){
        var self = this;
        // this.createJoinNode.active = true;
        cc.loader.loadRes("prefabs/createJoinNode", function (err, res) {
            var createJoinNode = cc.instantiate(res);
            // playerNode.zIndex = cc.vv.enum.ZOrder.PlayerNode;
            self.node.addChild(createJoinNode);
            // playerNode.setName("playerNode");
            // playerNode.getComponent("gamehomepage").updatePlayerInfo(data);
        });
    },

    testCreate:function(){
        var self = this;

        self.promptTextNode = new cc.Node;
        this.scrollCont.addChild(self.promptTextNode);
        self.promptTextNode.addComponent(cc.ToggleContainer);
        self.promptTextNode.setPosition(0,-100);

        cc.loader.loadRes("prefabs/singleToggle", function (err, res) {
            var createJoinNode = cc.instantiate(res);
            self.promptTextNode.addChild(createJoinNode);
        });
    },
});
