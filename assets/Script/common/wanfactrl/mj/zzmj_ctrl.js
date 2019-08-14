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
    extends: require("createLogic"),

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    setInfo:function(){
        var self = this;
        var x1 = -50;
        var x2 = 200;
        var x3 = 450;
        // 每个节点组   一个节点组只能包含一个单选组
        // sortIndex:  节点序列
        // nodeHeight: 节点所占高度
        // 提供方法
        // changeNodeHeight: sortIndex,toHeight   改变节点高度 ： 节点序列，节点高度
        // hideNode: sortIndex   隐藏其他节点: 节点序列
        // 回调参数

        // 节点组  节点序列以args_wanfa_Img先后为准
        // name 节点名
        // height 节点高度  行数  默认1行 填写默认高度
        this.args_wanfa_Img = [
            {
                name : "局数",
                height : 2,
            },
            {
                name : "人数",
            },
            {
                name : "胡牌",
            },
            {
                name : "飘分",
                height : 2,
            },
            {
                name : "玩法",
                height : 2,
            },
            {
                name : "扎鸟",
            },
            {
                name : "首局",
            },
            {
                name : "防作弊",
            },
            {
                name : "超时机械托管",
            },
        ];
        this.checkDesImg_table = [
            {
                type : "danxuan",
                sortIndex : 0,
                name : { 0 : "check_ju1",1 : "check_ju4", 2 : "check_ju8", 3 : "check_ju12", 4 : "check_ju16"},
                // labledata : { 0 : "8局(1钻石)",1 : "16局(2钻石)"},
                labeldata : { 0 : "1局(2房卡)",1 : "4局(5房卡)", 2 : "8局(10房卡)", 3 : "12局(15房卡)", 4 : "16局(20房卡)"},
                posx : { 0 : x1, 1 : x2, 2 : x3, 3 : x1, 4 : x2},
                posy : { 0 : 0, 1 : 0, 2 : 0, 3 : 1, 4 : 1},
            },
        ];
        // cc.log(this.args_wanfa_Img)
    },
});
