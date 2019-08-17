

cc.Class({
    //extends: cc.Component,

    properties: {
        
    },


    init:function () {
        /*[[
            两个字节的id范围为0x0000~0xFFFF
            低两位为游戏中的id一共256个
            高两位为游戏id一共256个
            其中
            麻将类消息           0x00~0x5F
            扑克类消息           0x60~0x9F
            字牌类消息           0xA0~0xDF
            其它类型游戏消息     0xC0~0xFF   
            --]]*/
            
            //---------------------------------------------------麻将类------------------------------------------
            //房间外的功能
            //0x0000-->0x00FF 
            cc.vv.CG_HEARTBEAT             = 0
            cc.vv.GC_HEARTBEAT             = 0
            cc.vv.CG_LOGIN				   = 1
            cc.vv.GC_LOGIN				   = 1
            cc.vv.CG_TOKEN_LOGIN           = 2
            cc.vv.GC_TOKEN_LOGIN           = 2
            cc.vv.CG_CREATE_ROOM           = 3
            cc.vv.CG_JOIN_ROOM             = 4
            cc.vv.CG_EXCHANGE_MONEY        = 5
            cc.vv.GC_EXCHANGE_MONEY        = 5
            cc.vv.CG_ZHANJI                = 6
            cc.vv.GC_ZHANJI                = 6
            cc.vv.CG_FIGHT                 = 7
            cc.vv.GC_FIGHT                 = 7
            cc.vv.CG_USER_INFO             = 8
            cc.vv.GC_USER_INFO             = 8

            cc.vv.CG_FIGHT_CODE             = 9     //回放码
            cc.vv.GC_FIGHT_CODE             = 9
            cc.vv.CG_RULE_AWARD             = 10        //查看规则奖励
            cc.vv.GC_RULE_AWARD             = 10
            cc.vv.CG_BIND                   = 11    //绑定
            cc.vv.GC_BIND                   = 11
            cc.vv.CG_HUIFANG                = 12    // 分享回放码
            cc.vv.GC_HUIFANG                = 12
            cc.vv.GC_ErrMsg                 = 13
            
            //房间内的功能
            //0x0100--> 通用的和转转麻将256
            cc.vv.GC_ADD_PLAYER            = 256
            cc.vv.CG_EXIT_PLAYER           = 257
            cc.vv.GC_EXIT_PLAYER           = 257
            cc.vv.CG_MESSAGE               = 258
            cc.vv.GC_MESSAGE               = 258
            cc.vv.CG_WAIT_JIESAN           = 259
            cc.vv.GC_WAIT_JIESAN           = 259
            cc.vv.GC_ROOM_INFO             = 260
            cc.vv.GC_DRAG_INTO_ROOM        = 261
            cc.vv.GC_OFFLINE               = 263
            cc.vv.CG_READY                 = 264
            cc.vv.GC_READY                 = 264
            cc.vv.GC_KAIPAI                = 265    
            cc.vv.GC_RELOGIN_DATA          = 266
            cc.vv.CG_JIESAN_APPLY          = 267
            cc.vv.GC_JIESAN                = 268
            cc.vv.CG_JIESAN_CHOICE         = 269
            cc.vv.GC_FAPAI                 = 270
            cc.vv.CG_ACTION                = 271
            cc.vv.GC_ACTION                = 271
            cc.vv.GC_ACTION_VALID          = 272
            cc.vv.GC_OVER                  = 273
            cc.vv.GC_GAME_OVER             = 274
            cc.vv.GC_CUR_DIRECT            = 275
            cc.vv.GC_BIRD                  = 276
            cc.vv.GC_JOIN_CONFIRM          = 277
            cc.vv.GC_CUR_CHUPAI            = 278
            cc.vv.GC_PAIJU_INFO            = 279
            cc.vv.CG_TUO_GUAN              = 280
            cc.vv.GC_TUO_GUAN              = 280
            cc.vv.CG_DissGuildRoom         = 281
            cc.vv.GC_DissGuildRoom         = 281
            cc.vv.GC_DissGuildRoom_p       = 282
            
            cc.vv.CG_SHAOREN_APPLY         = 283
            cc.vv.GC_SHAOREN               = 284
            cc.vv.CG_SHAOREN_CHOICE        = 285
            cc.vv.GC_PLAY_SCORE        	   = 286
            cc.vv.CG_BACKHALL              = 287
            cc.vv.GC_BACKHALL              = 287
            cc.vv.CG_BACKROOM              = 288
            //0x0200-->长沙麻将512
            cc.vv.GC_DICE                  = 512
            cc.vv.GC_SEABED_START          = 513
            cc.vv.CG_SEABED                = 514
            cc.vv.GC_SEABED                = 514
            cc.vv.GC_SEABED_RESULT         = 515
            cc.vv.GC_HANDS_HU              = 516
            cc.vv.GC_HANDS_HU_END          = 517
            cc.vv.CG_PIAO_FEN              = 518
            cc.vv.GC_PIAO_FEN              = 518
            cc.vv.GC_TING                  = 519


            cc.vv.GC_DINGZHUANG             = 768
            cc.vv.GC_HUANWEI                = 769
            
            //0x0300--> 红中麻将768
            
            //0x0400--> 广东麻将1024
            cc.vv.GC_GUI_CARD			   = 1024
            //0x0500--> 株洲麻将1280
            cc.vv.CG_PIAO_YU               = 1280
            cc.vv.GC_PIAO_YU               = 1280



            //---------------------------------------------扑克类----------------------------------
            cc.vv.GC_PK_KAIPAI			= 24577
            cc.vv.CG_PK_ACTION			= 24578
            cc.vv.GC_PK_OPERATION      = 24578
            cc.vv.GC_PK_SHAIZI         = 24579
            cc.vv.GC_PK_RELOGIN_DATA   = 24580
            cc.vv.GC_PK_ERRORCODE      = 24581
            cc.vv.GC_PK_OVER           = 24582
            cc.vv.GC_PK_GAMEOVER       = 24583
            cc.vv.GC_PK_HANDPOKER      = 24584
            cc.vv.GC_PK_QIEPAI         = 24585
            cc.vv.CG_PK_QIEPAIACT      = 24586
            cc.vv.GC_PK_QIEPAIACT      = 24586
            cc.vv.GC_CONFIRM_TIP       = 24588
            cc.vv.CG_PK_JOIN_CONFIRM   = 24589
            cc.vv.CG_YAOBUQI           = 24591

            //---------------------------------------------字牌类----------------------------------
            cc.vv.GC_PH_ACTION              = 40961          //发送动作
            cc.vv.CG_PH_ACTION				= 40961
            cc.vv.GC_PH_ACTION_VALID        = 40962          //客户端可以执行动作的列表
            cc.vv.GC_PH_OVER                = 40963          //服务器同步小结算数据
            cc.vv.GC_PH_GAME_OVER           = 40964          //服务器同步大结算数据
            cc.vv.GC_PH_FAPAI               = 40965          //服务器同步发牌消息
            cc.vv.GC_PH_KAIPAI              = 40966          //服务端推送开牌消息
            cc.vv.GC_PH_RELOGIN_DATA        = 40967   		 //推送玩家断线重连数据
            cc.vv.GC_PH_TINGPAI             = 40968          //听牌列表
            cc.vv.GC_PH_SISHOU              = 40969          //死手
            cc.vv.GC_PH_CUR_DIRECT          = 40970          //当前出牌方位
            cc.vv.GC_PH_QIPAI               = 40971          //弃牌
            cc.vv.GC_PH_DINGZHUANG          = 40972          //定庄
            cc.vv.GC_PH_PIAO_FEN            = 40973          //飘分
            cc.vv.CG_PH_PIAO_FEN            = 40973          //飘分
            cc.vv.GC_GUOHU                  = 40974          //过胡（回放）
            
            //---------------------------------------------俱乐部类----------------------------------
            cc.vv.guild = {};

            cc.vv.guild.CG_Login            = 1         // 登录
            cc.vv.guild.GC_Login            = 1
            cc.vv.guild.CG_Heart            = 2         // 心跳
            cc.vv.guild.GC_Heart            = 2
            cc.vv.guild.CG_CheckCreateGuild = 30        // 创建社区检查名称
            cc.vv.guild.GC_CheckCreateGuild = 30
            cc.vv.guild.CG_CreateGuild      = 31        // 创建社区
            cc.vv.guild.GC_CreateGuild      = 31    
            cc.vv.guild.CG_GetLastGuild     = 32        // 获取最后操作社区
            cc.vv.guild.GC_GetLastGuild     = 32
            cc.vv.guild.CG_GetGuildMembers  = 33        // 获取社区成员
            cc.vv.guild.GC_GetGuildMembers  = 33
            cc.vv.guild.CG_GetGuildInfos    = 34
            cc.vv.guild.GC_GetGuildInfos    = 34
            cc.vv.guild.CG_GuildClose       = 35
            cc.vv.guild.GC_GuildClose       = 35
            cc.vv.guild.CG_GuildOpen        = 36
            cc.vv.guild.GC_GuildOpen        = 36
            cc.vv.guild.CG_GuildInviteJoin  = 37
            cc.vv.guild.GC_GuildInviteJoin  = 37
            cc.vv.guild.CG_GuildInviteJoinDo= 38
            cc.vv.guild.GC_GuildInviteJoinDo= 38
            cc.vv.guild.CG_GuildApplyJoin   = 39
            cc.vv.guild.GC_GuildApplyJoin   = 39
            cc.vv.guild.CG_GuildApplyJoinDo = 40
            cc.vv.guild.GC_GuildApplyJoinDo = 40
            cc.vv.guild.CG_GuildApplyJoinList = 41
            cc.vv.guild.GC_GuildApplyJoinList = 41
            cc.vv.guild.CG_GuildKickOut     = 42
            cc.vv.guild.GC_GuildKickOut     = 42
            cc.vv.guild.CG_GuildLog         = 43
            cc.vv.guild.GC_GuildLog         = 43
            cc.vv.guild.CG_GuildMyCreateList= 44
            cc.vv.guild.GC_GuildMyCreateList= 44
            cc.vv.guild.CG_GuildMyJoinList  = 45
            cc.vv.guild.GC_GuildMyJoinList  = 45
            cc.vv.guild.CG_GuildQuit        = 46
            cc.vv.guild.GC_GuildQuit        = 46
            cc.vv.guild.CG_UpGuildName      = 47
            cc.vv.guild.GC_UpGuildName      = 47
            cc.vv.guild.CG_UpGuildNotice    = 48
            cc.vv.guild.GC_UpGuildNotice    = 48
            cc.vv.guild.CG_UpGuildRule      = 49
            cc.vv.guild.GC_UpGuildRule      = 49
            cc.vv.guild.CG_GuildAgentInfo   = 50
            cc.vv.guild.GC_GuildAgentInfo   = 50
            cc.vv.guild.CG_GuildExchange    = 51
            cc.vv.guild.GC_GuildExchange    = 51
            cc.vv.guild.CG_GuildGame        = 52
            cc.vv.guild.GC_GuildGame        = 52
            cc.vv.guild.CG_GuildManager     = 53
            cc.vv.guild.GC_GuildManager     = 53
            cc.vv.guild.CG_CheckGuildApplyJoin = 54
            cc.vv.guild.GC_CheckGuildApplyJoin = 54
            cc.vv.guild.CG_EnterGuildHall   = 2002
            cc.vv.guild.GC_EnterGuildHall   = 2002
            cc.vv.guild.CG_QuitGuildHall    = 2003
            cc.vv.guild.GC_GuildHallMsg     = 2004
            cc.vv.guild.GC_GuildMatchs      = 2005
            cc.vv.guild.CG_GetGuildTableIp  = 2006 //获取桌子IP 
            cc.vv.guild.GC_GetGuildTableIp  = 2006
            cc.vv.guild.CG_GetGuildZhanJiIp = 2008 // 获取战绩游戏服IP
            cc.vv.guild.GC_GetGuildZhanJiIp = 2008
            cc.vv.guild.CG_JoinGuildGroup   = 2009




            //---------------------------------------------其它类-------------------------------------
            //0xC000--> 欢乐跳跳跳 49152
            
             //未建立路由 #define HEARTBEAT 0 
             //心跳 #define LOGIN 1 
             //使用账号登录 #define TOKEN_LOGIN 2 
             //断线重连 #define CREATE_ROOM 3 
             //创建房间 #define JOIN_ROOM 4 
             //进入房间 
             //已建立路由 #define ADD_PLAYER 11 
             //房间加入用户 #define EXIT_PLAYER 12 
             //准备界面客户端发送退出消息 #define MESSAGE 13 
             //客户端发送消息 #define WAIT_JIESAN 14 
             //等待界面房主发送解散消息 #define ROOM_INFO 15 
             //服务端推送房间信息 #define DRAG_INTO_ROOM 16 
             //服务端将玩家拉入房间 #define EXCHANGE_MONEY 17 
             //兑换金币 #define OFFLINE 18 

        //     var huTypeArr = {
        //         [cc.vv.Hu.CHR_QING_YI_SE] : "清一色",
        //         [cc.vv.Hu.CHK_QUAN_QIU_REN] : "全求人",
        //         [cc.vv.Hu.CHK_PENG_PENG] : "碰碰胡",
        //         [cc.vv.Hu.CHK_QI_XIAO_DUI] : "七小对",
        //         [cc.vv.Hu.CHK_HAO_QI_XIAO_DUI] : "豪华七小对",
        //         [cc.vv.Hu.CHK_JIAN_JIAN] : "将将胡",
        //         [cc.vv.Hu.CHK_GANGSHANGHUA] : "杠上花",
        //         [cc.vv.Hu.CHK_HAIDI] : "海底捞月",
    
        //         [cc.vv.Hu.CHR_JIEJIEGAO] : "节节高",
        //         [cc.vv.Hu.CHR_SANTONG] : "三同",
        //         [cc.vv.Hu.CHR_YIZHIHUA] : "一枝花",
        //         [cc.vv.Hu.CHR_DASIXI] : "大四喜",
        //         [cc.vv.Hu.CHR_BANBANHU] : "板板胡",
        //         [cc.vv.Hu.CHR_QUEYISE] : "缺一色",
        //         [cc.vv.Hu.CHR_LIULIU] : "六六顺",
        //         [cc.vv.Hu.CHR_ZHONGTUDASIXI] : "中途大四喜",
        //         [cc.vv.Hu.CHR_ZHONGTULIULIU] : "中途六六顺",
        //     };

        //     for (var k in huTypeArr){
        //         var v =  huTypeArr[k];
        //         console.log("huTypeArr=====================",k,v);
        //        // if bit.band(huMask,k) == k then
        //        //     local sprite = display.newSprite(v)
        //        //     infoPanel:addChild(sprite)
        //        //     imgX = imgX + sprite:getContentSize().width + gt.conf.g.OVER_WORD_DIFF
        //        //     sprite:setPosition(cc.v2(imgX,imgY))
        //        // end
        //    }

            // var gg = (cc.vv.Hu.CHR_BANBANHU | cc.vv.Hu.CHR_QUEYISE | cc.vv.Hu.CHR_LIULIU)
            // console.log("||||||||||||||||||||||||||||||====",gg);

        
            
    },

    // start () {

    // },

    // update (dt) {},
});
