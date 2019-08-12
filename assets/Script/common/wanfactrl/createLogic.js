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
        wanfaLabelPrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor () {
        this.lineHeight = 60;
    },

    start () {

    },

    // update (dt) {},

    setInfo:function(){

    },

    createItemPanel:function(){
          
    },

    showView:function(){
        this.setInfo();
        // this.confisetInfo();    // 根据配置重置房卡显示数据
        this.initUI();
        // this.setToRule();
    },

    initUI:function(){
        var line = 0;
        for (const key in this.args_wanfa_Img) {
            var wanfaNode = new cc.Node;
            this.node.addChild(wanfaNode);
            wanfaNode.setPosition(-300,line*-60 - 40)
            this.wanfaLabel = cc.instantiate(this.wanfaLabelPrefab);
            this.wanfaLabel.getComponent(cc.Label).string = this.args_wanfa_Img[key].name;
            wanfaNode.addChild(this.wanfaLabel);
            if (this.args_wanfa_Img[key].height){
                line += this.args_wanfa_Img[key].height;
            }else{
                line++;
            }
        }
        this.allLine = line
        if(this.hallJs){
            this.hallJs.scrollCont.setContentSize(this.hallJs.scrollCont.getContentSize().width,
                this.allLine*60);
        }
        
    },
});
