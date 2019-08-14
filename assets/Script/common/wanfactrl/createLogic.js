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
        this.wnafaNodeArr = []
        for (const key in this.args_wanfa_Img) {
            var wanfaNode = new cc.Node;
            this.wnafaNodeArr.push(wanfaNode)
            this.node.addChild(wanfaNode);
            wanfaNode.setPosition(-300,line*-60 - 40)
            var wanfaLabel = cc.instantiate(this.wanfaLabelPrefab);
            wanfaLabel.getComponent(cc.Label).string = this.args_wanfa_Img[key].name;
            wanfaNode.addChild(wanfaLabel);
            if (this.args_wanfa_Img[key].height){
                line += this.args_wanfa_Img[key].height;
            }else{
                line++;
            }
        }

        this.allLine = line
        
        this.hallJs.scrollCont.setContentSize(this.hallJs.scrollCont.getContentSize().width,
            this.allLine*60);

        for (const key in this.checkDesImg_table){
            if(this.checkDesImg_table[key].type == "danxuan"){
                var checkBtnsName = this.checkDesImg_table[key].name;
                var checkBtnsPosX = this.checkDesImg_table[key].posx;
                var checkBtnsPosY = this.checkDesImg_table[key].posy;
                var sortIndex = this.checkDesImg_table[key].sortIndex;
                for(const key2 in checkBtnsName){
                    var toggleNode = cc.instantiate(this.hallJs.createTogglePrefab);
                    this.wnafaNodeArr[sortIndex].addChild(toggleNode);

                    toggleNode.setPosition(checkBtnsPosX[key2],checkBtnsPosY[key2]*-this.lineHeight);
                    if(key2 == 0){
                        toggleNode.getComponent("createRoomToggle").check();
                    }
                    // 加入点击事件
                    
                }
            }
        }
        
        
    },
});
