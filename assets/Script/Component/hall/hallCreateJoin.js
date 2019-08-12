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
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // name = "check_ju6",      控件名
        // sortIndex = 1,           节点序列
        // type = "text_danxuan",  类型 ： 单选 多选 
        // pos = cc.p(x1, 0),
        // handle = self:DuoxuanHandler({"check_ju6","check_ju10","check_ju16"}),
        // 
        // data = cc.vv.conf.JUSHU["game"][self._gameId][6],
        // text = cc.vv.conf.JUSHU["gametxt"][self._gameId][6],


        // 每个节点组   一个节点组只能包含一个单选组
        // sortIndex:  节点序列
        // nodeHeight: 节点所占高度
        // 提供方法
        // changeNodeHeight: sortIndex,toHeight   改变节点高度 ： 节点序列，节点高度
        // hideNode: sortIndex   隐藏其他节点: 节点序列
        // 回调参数

    },

    ctor () {
        
    },

    start () {

    },

    // update (dt) {},

    onCloseBtnClick:function(){
        
    },

    onCreateBtnClick:function(){
        
    },

    onJoinBtnClick:function(){
        
    },

});
