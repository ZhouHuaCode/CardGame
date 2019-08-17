cc.Class({

    properties: {
    },

    init : function(){
        var self = this;
        self.RvcMsg = [];
        self.SendMsg = [];
        self.gcMsgArr = [];
        self.cgMsgArr = [];

        //俱乐部类
        self.SendMsg[cc.vv.guild.CG_Login] = cc.vv.pbHelp.PB["guild.proto"].Login  //登录俱乐部
        self.RvcMsg[cc.vv.guild.GC_Login] = cc.vv.pbHelp.PB["guild.proto"].Login_Resp
        self.SendMsg[cc.vv.guild.CG_Heart] = cc.vv.pbHelp.PB["guild.proto"].Heart  //心跳
        self.RvcMsg[cc.vv.guild.GC_Heart] = cc.vv.pbHelp.PB["guild.proto"].Heart_Resp
        self.SendMsg[cc.vv.guild.CG_CheckCreateGuild] = cc.vv.pbHelp.PB["guild.proto"].CheckCreateGuild  //创建俱乐部前检查是否有权限
        self.RvcMsg[cc.vv.guild.GC_CheckCreateGuild] = cc.vv.pbHelp.PB["guild.proto"].CheckCreateGuild_Resp
        self.SendMsg[cc.vv.guild.CG_CreateGuild] = cc.vv.pbHelp.PB["guild.proto"].CreateGuild  //创建俱乐部
        self.RvcMsg[cc.vv.guild.GC_CreateGuild] = cc.vv.pbHelp.PB["guild.proto"].CreateGuild_Resp
        self.SendMsg[cc.vv.guild.CG_GetLastGuild] = cc.vv.pbHelp.PB["guild.proto"].GetLastGuild  //获取单个俱乐部数据
        self.RvcMsg[cc.vv.guild.GC_GetLastGuild] = cc.vv.pbHelp.PB["guild.proto"].GetLastGuild_Resp
        self.SendMsg[cc.vv.guild.CG_GetGuildMembers] = cc.vv.pbHelp.PB["guild.proto"].GetGuildMembers  //获取单个俱乐部成员数据
        self.RvcMsg[cc.vv.guild.GC_GetGuildMembers] = cc.vv.pbHelp.PB["guild.proto"].GetGuildMembers_Resp
        self.SendMsg[cc.vv.guild.CG_GetGuildInfos] = cc.vv.pbHelp.PB["guild.proto"].GetGuildInfos  //获取单个俱乐部房卡数据
        self.RvcMsg[cc.vv.guild.GC_GetGuildInfos] = cc.vv.pbHelp.PB["guild.proto"].GetGuildInfos_Resp
        self.SendMsg[cc.vv.guild.CG_GuildClose] = cc.vv.pbHelp.PB["guild.proto"].GuildClose  //歇业
        self.RvcMsg[cc.vv.guild.GC_GuildClose] = cc.vv.pbHelp.PB["guild.proto"].GuildClose_Resp
        self.SendMsg[cc.vv.guild.CG_GuildOpen] = cc.vv.pbHelp.PB["guild.proto"].GuildOpen  //开业
        self.RvcMsg[cc.vv.guild.GC_GuildOpen] = cc.vv.pbHelp.PB["guild.proto"].GuildOpen_Resp
        self.SendMsg[cc.vv.guild.CG_GuildInviteJoin] = cc.vv.pbHelp.PB["guild.proto"].GuildInviteJoin  //邀请好友加入俱乐部
        self.RvcMsg[cc.vv.guild.GC_GuildInviteJoin] = cc.vv.pbHelp.PB["guild.proto"].GuildInviteJoin_Resp
        self.SendMsg[cc.vv.guild.CG_GuildInviteJoinDo] = cc.vv.pbHelp.PB["guild.proto"].GuildInviteJoinDo  //执行邀请好友加入俱乐部
        self.RvcMsg[cc.vv.guild.GC_GuildInviteJoinDo] = cc.vv.pbHelp.PB["guild.proto"].GuildInviteJoinDo_Resp
        self.SendMsg[cc.vv.guild.CG_GuildApplyJoin] = cc.vv.pbHelp.PB["guild.proto"].GuildApplyJoin  //申请加入俱乐部
        self.RvcMsg[cc.vv.guild.GC_GuildApplyJoin] = cc.vv.pbHelp.PB["guild.proto"].GuildApplyJoin_Resp
        self.SendMsg[cc.vv.guild.CG_GuildApplyJoinDo] = cc.vv.pbHelp.PB["guild.proto"].GuildApplyJoinDo  //处理加入俱乐部申请
        self.RvcMsg[cc.vv.guild.GC_GuildApplyJoinDo] = cc.vv.pbHelp.PB["guild.proto"].GuildApplyJoinDo_Resp
        self.SendMsg[cc.vv.guild.CG_GuildApplyJoinList] = cc.vv.pbHelp.PB["guild.proto"].GuildApplyJoinList  //申请加入列表
        self.RvcMsg[cc.vv.guild.GC_GuildApplyJoinList] = cc.vv.pbHelp.PB["guild.proto"].GuildApplyJoinList_Resp
        self.SendMsg[cc.vv.guild.CG_GuildKickOut] = cc.vv.pbHelp.PB["guild.proto"].GuildKickOut  //踢出成员
        self.RvcMsg[cc.vv.guild.GC_GuildKickOut] = cc.vv.pbHelp.PB["guild.proto"].GuildKickOut_Resp
        self.SendMsg[cc.vv.guild.CG_GuildLog] = cc.vv.pbHelp.PB["guild.proto"].GuildLog  //俱乐部记录
        self.RvcMsg[cc.vv.guild.GC_GuildLog] = cc.vv.pbHelp.PB["guild.proto"].GuildLog_Resp
        self.SendMsg[cc.vv.guild.CG_GuildMyCreateList] = cc.vv.pbHelp.PB["guild.proto"].GuildMyCreateList  //我的俱乐部列表
        self.RvcMsg[cc.vv.guild.GC_GuildMyCreateList] = cc.vv.pbHelp.PB["guild.proto"].GuildMyCreateList_Resp
        self.SendMsg[cc.vv.guild.CG_GuildMyJoinList] = cc.vv.pbHelp.PB["guild.proto"].GuildMyJoinList  //我加入的俱乐部列表
        self.RvcMsg[cc.vv.guild.GC_GuildMyJoinList] = cc.vv.pbHelp.PB["guild.proto"].GuildMyJoinList_Resp
        self.SendMsg[cc.vv.guild.CG_GuildQuit] = cc.vv.pbHelp.PB["guild.proto"].GuildQuit  //退出俱乐部
        self.RvcMsg[cc.vv.guild.GC_GuildQuit] = cc.vv.pbHelp.PB["guild.proto"].GuildQuit_Resp
        self.SendMsg[cc.vv.guild.CG_UpGuildName] = cc.vv.pbHelp.PB["guild.proto"].UpGuildName  //修改俱乐部名字
        self.RvcMsg[cc.vv.guild.GC_UpGuildName] = cc.vv.pbHelp.PB["guild.proto"].UpGuildName_Resp
        self.SendMsg[cc.vv.guild.CG_UpGuildNotice] = cc.vv.pbHelp.PB["guild.proto"].UpGuildNotice  //修改俱乐部公告
        self.RvcMsg[cc.vv.guild.GC_UpGuildNotice] = cc.vv.pbHelp.PB["guild.proto"].UpGuildNotice_Resp
        self.SendMsg[cc.vv.guild.CG_UpGuildRule] = cc.vv.pbHelp.PB["guild.proto"].UpGuildRule  //修改俱乐部规则
        self.RvcMsg[cc.vv.guild.GC_UpGuildRule] = cc.vv.pbHelp.PB["guild.proto"].UpGuildRule_Resp
        self.SendMsg[cc.vv.guild.CG_GuildAgentInfo] = cc.vv.pbHelp.PB["guild.proto"].GuildAgentInfo  //绑定的代理信息
        self.RvcMsg[cc.vv.guild.GC_GuildAgentInfo] = cc.vv.pbHelp.PB["guild.proto"].GuildAgentInfo_Resp
        self.SendMsg[cc.vv.guild.CG_GuildExchange] = cc.vv.pbHelp.PB["guild.proto"].GuildExchange  //房卡兑换
        self.RvcMsg[cc.vv.guild.GC_GuildExchange] = cc.vv.pbHelp.PB["guild.proto"].GuildExchange_Resp
        self.SendMsg[cc.vv.guild.CG_GuildGame] = cc.vv.pbHelp.PB["guild.proto"].GuildGame  //禁止,允许游戏
        self.RvcMsg[cc.vv.guild.GC_GuildGame] = cc.vv.pbHelp.PB["guild.proto"].GuildGame_Resp
        self.SendMsg[cc.vv.guild.CG_GuildManager] = cc.vv.pbHelp.PB["guild.proto"].GuildManager  //操作管理员游戏
        self.RvcMsg[cc.vv.guild.GC_GuildManager] = cc.vv.pbHelp.PB["guild.proto"].GuildManager_Resp
        self.SendMsg[cc.vv.guild.CG_CheckGuildApplyJoin] = cc.vv.pbHelp.PB["guild.proto"].CheckGuildApplyJoin  //校验申请加入俱乐部
        self.RvcMsg[cc.vv.guild.GC_CheckGuildApplyJoin] = cc.vv.pbHelp.PB["guild.proto"].CheckGuildApplyJoin_Resp
        self.SendMsg[cc.vv.guild.CG_EnterGuildHall] = cc.vv.pbHelp.PB["guild.proto"].EnterGuildHall  //进入俱乐部大厅
        self.RvcMsg[cc.vv.guild.GC_EnterGuildHall] = cc.vv.pbHelp.PB["guild.proto"].EnterGuildHall_Resp
        self.SendMsg[cc.vv.guild.CG_QuitGuildHall] = cc.vv.pbHelp.PB["guild.proto"].QuitGuildHall  //退出俱乐部大厅
        self.RvcMsg[cc.vv.guild.GC_GuildHallMsg] = cc.vv.pbHelp.PB["guild.proto"].GuildHallMsg_Resp  //俱乐部大厅推送消息
        self.RvcMsg[cc.vv.guild.GC_GuildMatchs] = cc.vv.pbHelp.PB["guild.proto"].GuildMatchs_Resp  //刷新大厅桌子
        self.SendMsg[cc.vv.guild.CG_GetGuildTableIp] = cc.vv.pbHelp.PB["guild.proto"].GetGuildTableIp  //获取桌子IP
        self.RvcMsg[cc.vv.guild.GC_GetGuildTableIp] = cc.vv.pbHelp.PB["guild.proto"].GetGuildTableIp_Resp  
        self.SendMsg[cc.vv.guild.CG_GetGuildZhanJiIp] = cc.vv.pbHelp.PB["guild.proto"].GetGuildTableIp  //获取战绩游戏服IP
        self.RvcMsg[cc.vv.guild.GC_GetGuildZhanJiIp] = cc.vv.pbHelp.PB["guild.proto"].GetGuildTableIp_Resp  
        self.SendMsg[cc.vv.guild.CG_JoinGuildGroup] = cc.vv.pbHelp.PB["guild.proto"].JoinGuildGroup  //进入俱乐部不同玩法的分组

        //大厅
        self.cgMsgArr[cc.vv.CG_HEARTBEAT] = cc.vv.pbHelp.PB["gate.proto"].CG_HEARTBEAT;
        self.cgMsgArr[cc.vv.CG_LOGIN] = cc.vv.pbHelp.PB["gate.proto"].CG_LOGIN;
        self.cgMsgArr[cc.vv.CG_TOKEN_LOGIN] = cc.vv.pbHelp.PB["gate.proto"].CG_TOKEN_LOGIN;
        self.cgMsgArr[cc.vv.CG_USER_INFO] = cc.vv.pbHelp.PB["gate.proto"].CG_USER_INFO;
        self.cgMsgArr[cc.vv.CG_CREATE_ROOM] = cc.vv.pbHelp.PB["gate.proto"].CG_CREATE_ROOM;
        self.cgMsgArr[cc.vv.CG_JOIN_ROOM] = cc.vv.pbHelp.PB["gate.proto"].CG_JOIN_ROOM;
        self.cgMsgArr[cc.vv.CG_EXCHANGE_MONEY] = cc.vv.pbHelp.PB["gate.proto"].CG_EXCHANGE_MONEY;
        self.cgMsgArr[cc.vv.CG_READY] = cc.vv.pbHelp.PB["room.proto"].CG_READY;
        self.cgMsgArr[cc.vv.CG_WAIT_JIESAN] = cc.vv.pbHelp.PB["room.proto"].CG_WAIT_JIESAN;
        self.cgMsgArr[ cc.vv.CG_ZHANJI ] = cc.vv.pbHelp.PB["gate.proto"].CG_ZHANJI;
        self.cgMsgArr[ cc.vv.CG_FIGHT ] = cc.vv.pbHelp.PB["gate.proto"].CG_FIGHT;
        self.gcMsgArr[cc.vv.GC_HEARTBEAT] = cc.vv.pbHelp.PB["gate.proto"].GC_HEARTBEAT;
        self.gcMsgArr[cc.vv.GC_LOGIN] = cc.vv.pbHelp.PB["gate.proto"].GC_LOGIN;
        self.gcMsgArr[cc.vv.GC_TOKEN_LOGIN] = cc.vv.pbHelp.PB["gate.proto"].GC_TOKEN_LOGIN;
        self.gcMsgArr[cc.vv.GC_USER_INFO] = cc.vv.pbHelp.PB["gate.proto"].GC_USER_INFO;
        self.gcMsgArr[cc.vv.GC_DRAG_INTO_ROOM] = cc.vv.pbHelp.PB["gate.proto"].GC_DRAG_INTO_ROOM;
        self.gcMsgArr[cc.vv.GC_EXCHANGE_MONEY] = cc.vv.pbHelp.PB["gate.proto"].GC_EXCHANGE_MONEY;
        self.gcMsgArr[ cc.vv.GC_ZHANJI ] = cc.vv.pbHelp.PB["gate.proto"].GC_ZHANJI;
        self.gcMsgArr[ cc.vv.GC_FIGHT ] = cc.vv.pbHelp.PB["gate.proto"].GC_FIGHT;
        self.gcMsgArr[ cc.vv.GC_DETFIGHT ] = cc.vv.pbHelp.PB["gate.proto"].Fight
        self.gcMsgArr[ cc.vv.GC_PLAYERFIGHT ] = cc.vv.pbHelp.PB["gate.proto"].FightPlayers

        self.cgMsgArr[ cc.vv.CG_FIGHT_CODE ] = cc.vv.pbHelp.PB["gate.proto"].CG_FIGHT_CODE
        self.gcMsgArr[ cc.vv.GC_FIGHT_CODE ] = cc.vv.pbHelp.PB["gate.proto"].GC_FIGHT_CODE
        self.cgMsgArr[ cc.vv.CG_RULE_AWARD ] = cc.vv.pbHelp.PB["gate.proto"].CG_RULE_AWARD
        self.gcMsgArr[ cc.vv.GC_RULE_AWARD ] = cc.vv.pbHelp.PB["gate.proto"].GC_RULE_AWARD
        self.cgMsgArr[ cc.vv.CG_BIND ] = cc.vv.pbHelp.PB["gate.proto"].CG_BIND
        self.gcMsgArr[ cc.vv.GC_BIND ] = cc.vv.pbHelp.PB["gate.proto"].GC_BIND
        self.cgMsgArr[ cc.vv.CG_HUIFANG ] = cc.vv.pbHelp.PB["gate.proto"].CG_HUIFANG
        self.gcMsgArr[ cc.vv.GC_HUIFANG ] = cc.vv.pbHelp.PB["gate.proto"].GC_HUIFANG
        self.gcMsgArr[ cc.vv.GC_ErrMsg ] = cc.vv.pbHelp.PB["gate.proto"].GC_ErrMsg
        

        // 房间
        self.cgMsgArr[cc.vv.CG_MESSAGE] = cc.vv.pbHelp.PB["room.proto"].CG_MESSAGE;
        self.cgMsgArr[cc.vv.CG_EXIT_PLAYER] = cc.vv.pbHelp.PB["room.proto"].CG_EXIT_PLAYER;
        self.cgMsgArr[cc.vv.CG_JIESAN_APPLY] = cc.vv.pbHelp.PB["room.proto"].CG_JIESAN_APPLY;
        self.cgMsgArr[cc.vv.CG_JIESAN_CHOICE] = cc.vv.pbHelp.PB["room.proto"].CG_JIESAN_CHOICE;
        self.gcMsgArr[cc.vv.GC_ROOM_INFO] = cc.vv.pbHelp.PB["room.proto"].GC_ROOM_INFO;
        self.gcMsgArr[cc.vv.GC_ADD_PLAYER] = cc.vv.pbHelp.PB["room.proto"].GC_ADD_PLAYER;
        self.gcMsgArr[cc.vv.GC_READY] = cc.vv.pbHelp.PB["room.proto"].GC_READY;
        self.gcMsgArr[cc.vv.GC_WAIT_JIESAN] = cc.vv.pbHelp.PB["room.proto"].GC_WAIT_JIESAN;
        self.gcMsgArr[cc.vv.GC_MESSAGE] = cc.vv.pbHelp.PB["room.proto"].GC_MESSAGE;
        self.gcMsgArr[cc.vv.GC_EXIT_PLAYER] = cc.vv.pbHelp.PB["room.proto"].GC_EXIT_PLAYER;
        self.gcMsgArr[cc.vv.GC_OFFLINE] = cc.vv.pbHelp.PB["room.proto"].GC_OFFLINE;
        self.gcMsgArr[cc.vv.GC_JOIN_CONFIRM] = cc.vv.pbHelp.PB["room.proto"].GC_JOIN_CONFIRM;
        self.gcMsgArr[cc.vv.GC_CUR_DIRECT] = cc.vv.pbHelp.PB["room.proto"].GC_CUR_DIRECT;
        self.gcMsgArr[cc.vv.GC_JIESAN] = cc.vv.pbHelp.PB["room.proto"].GC_JIESAN;
        self.gcMsgArr[cc.vv.GC_CUR_CHUPAI] = cc.vv.pbHelp.PB["room.proto"].GC_CUR_CHUPAI;
        self.gcMsgArr[cc.vv.GC_DissGuildRoom] = cc.vv.pbHelp.PB["room.proto"].GC_DissGuildRoom;
        self.gcMsgArr[cc.vv.GC_DissGuildRoom_p] = cc.vv.pbHelp.PB["room.proto"].GC_DissGuildRoom;
        self.gcMsgArr[cc.vv.GC_PAIJU_INFO] = cc.vv.pbHelp.PB["room.proto"].GC_PAIJU_INFO;
        self.gcMsgArr[cc.vv.GC_CONFIRM_TIP] = cc.vv.pbHelp.PB["room.proto"].GC_CONFIRM_TIP
        self.cgMsgArr[cc.vv.CG_PK_JOIN_CONFIRM] = cc.vv.pbHelp.PB["room.proto"].CG_PK_JOIN_CONFIRM
        
        self.gcMsgArr[cc.vv.GC_SHAOREN] = cc.vv.pbHelp.PB["room.proto"].GC_SHAOREN
        self.cgMsgArr[cc.vv.CG_SHAOREN_APPLY] = cc.vv.pbHelp.PB["room.proto"].CG_SHAOREN_APPLY
        self.cgMsgArr[cc.vv.CG_SHAOREN_CHOICE] = cc.vv.pbHelp.PB["room.proto"].CG_SHAOREN_CHOICE
        
        self.gcMsgArr[cc.vv.GC_PLAY_SCORE] = cc.vv.pbHelp.PB["room.proto"].GC_PLAY_SCORE;

        self.cgMsgArr[cc.vv.CG_SHAOREN_APPLY] = cc.vv.pbHelp.PB["room.proto"].CG_SHAOREN_APPLY;
        self.gcMsgArr[cc.vv.GC_SHAOREN] = cc.vv.pbHelp.PB["room.proto"].GC_SHAOREN;
        self.cgMsgArr[cc.vv.CG_SHAOREN_CHOICE] = cc.vv.pbHelp.PB["room.proto"].CG_SHAOREN_CHOICE;
        self.cgMsgArr[cc.vv.CG_BACKHALL] = cc.vv.pbHelp.PB["room.proto"].CG_BACKHALL  //俱乐部保存返回大厅
        self.gcMsgArr[cc.vv.GC_BACKHALL] = cc.vv.pbHelp.PB["room.proto"].GC_BACKHALL  //俱乐部保存返回大厅
        self.cgMsgArr[cc.vv.CG_BACKROOM] = cc.vv.pbHelp.PB["room.proto"].CG_BACKROOM  //俱乐部保存返回大厅
        
        //if (cc.vv.enum.pbPlatForm != cc.vv.enum.PlatForm_WXWeb) {
            ////-----------------------扑克类-----------------------------------------------------------------------------------
            self.cgMsgArr[cc.vv.CG_PK_ACTION] = cc.vv.pbHelp.PB["pk.proto"].CG_ACTION
            self.cgMsgArr[cc.vv.CG_PK_QIEPAIACT] = cc.vv.pbHelp.PB["pk.proto"].CG_QiePai
            self.gcMsgArr[cc.vv.GC_PK_KAIPAI] = cc.vv.pbHelp.PB["pk.proto"].GC_KAIPAI
            self.gcMsgArr[cc.vv.GC_PK_RELOGIN_DATA] = cc.vv.pbHelp.PB["pk.proto"].GC_RELOGIN_DATA
            self.gcMsgArr[cc.vv.GC_PK_OPERATION] = cc.vv.pbHelp.PB["pk.proto"].GC_PLAY_OPERATION
            self.gcMsgArr[cc.vv.GC_PK_ERRORCODE] = cc.vv.pbHelp.PB["pk.proto"].GC_ErrorCode
            self.gcMsgArr[cc.vv.GC_PK_OVER] = cc.vv.pbHelp.PB["pk.proto"].GC_OVER
            self.gcMsgArr[cc.vv.GC_PK_GAMEOVER] = cc.vv.pbHelp.PB["pk.proto"].GC_GAME_OVER
            self.gcMsgArr[cc.vv.GC_PK_SHAIZI] = cc.vv.pbHelp.PB["pk.proto"].GC_Checkshaizi_Syn
            self.gcMsgArr[cc.vv.GC_PK_HANDPOKER] = cc.vv.pbHelp.PB["pk.proto"].GC_HandPokerSyn
            self.gcMsgArr[cc.vv.GC_PK_QIEPAI] = cc.vv.pbHelp.PB["pk.proto"].GC_QiePai_Syn
            self.gcMsgArr[cc.vv.GC_PK_QIEPAIACT] = cc.vv.pbHelp.PB["pk.proto"].GC_QiePai_Resp

            ////-----------------------麻将类-----------------------------------------------------------------------------------
            self.cgMsgArr[cc.vv.CG_ACTION] = cc.vv.pbHelp.PB["mj.proto"].CG_ACTION;
            self.gcMsgArr[cc.vv.GC_KAIPAI] = cc.vv.pbHelp.PB["mj.proto"].GC_KAIPAI;
            self.gcMsgArr[cc.vv.GC_OVER] = cc.vv.pbHelp.PB["mj.proto"].GC_OVER;
            self.gcMsgArr[cc.vv.GC_GAME_OVER] = cc.vv.pbHelp.PB["mj.proto"].GC_GAME_OVER;
            self.gcMsgArr[cc.vv.GC_ACTION] = cc.vv.pbHelp.PB["mj.proto"].GC_ACTION;
            self.gcMsgArr[cc.vv.GC_FAPAI] = cc.vv.pbHelp.PB["mj.proto"].GC_FAPAI;
            self.gcMsgArr[cc.vv.GC_ACTION_VALID] = cc.vv.pbHelp.PB["mj.proto"].GC_ACTION_VALID;
            self.gcMsgArr[cc.vv.GC_RELOGIN_DATA] = cc.vv.pbHelp.PB["mj.proto"].GC_RELOGIN_DATA;
            self.gcMsgArr[cc.vv.GC_BIRD] = cc.vv.pbHelp.PB["mj.proto"].GC_BIRD;
            self.gcMsgArr[cc.vv.GC_GUI_CARD] = cc.vv.pbHelp.PB["mj.proto"].GC_ACTION;


            self.gcMsgArr[cc.vv.GC_DINGZHUANG] = cc.vv.pbHelp.PB["zzmj.proto"].DingZhuang;//大色子定庄

            self.cgMsgArr[cc.vv.CG_SEABED] = cc.vv.pbHelp.PB["csmj.proto"].CG_SEABED
            self.cgMsgArr[cc.vv.CG_SEABED] = cc.vv.pbHelp.PB["csmj.proto"].CG_SEABED
            self.cgMsgArr[cc.vv.CG_PIAO_FEN] = cc.vv.pbHelp.PB["csmj.proto"].CG_PIAO_FEN
            self.gcMsgArr[cc.vv.GC_DICE] = cc.vv.pbHelp.PB["csmj.proto"].GC_DICE
            //self.gcMsgArr[cc.vv.GC_HANDS_HU] = cc.vv.pbHelp.PB["csmj.proto"].GC_HANDS_HU
            self.gcMsgArr[cc.vv.GC_DICE] = cc.vv.pbHelp.PB["csmj.proto"].GC_DICE
            self.gcMsgArr[cc.vv.GC_SEABED] = cc.vv.pbHelp.PB["csmj.proto"].GC_SEABED
            self.gcMsgArr[cc.vv.GC_HANDS_HU] = cc.vv.pbHelp.PB["csmj.proto"].GC_HANDS_HU
            self.gcMsgArr[cc.vv.GC_HANDS_HU_END] = cc.vv.pbHelp.PB["csmj.proto"].GC_HANDS_HU_END
            self.gcMsgArr[cc.vv.GC_PIAO_FEN] = cc.vv.pbHelp.PB["csmj.proto"].GC_PIAO_FEN
            self.gcMsgArr[cc.vv.GC_TING] = cc.vv.pbHelp.PB["csmj.proto"].GC_TING

            self.gcMsgArr[cc.vv.GC_PIAO_YU] = cc.vv.pbHelp.PB["zhuzhoumj.proto"].GC_PIAO_YU;
            self.cgMsgArr[cc.vv.CG_PIAO_YU] = cc.vv.pbHelp.PB["zhuzhoumj.proto"].CG_PIAO_YU;
        //}

        ////-----------------------跑胡子类-----------------------------------------------------------------------------------
        self.cgMsgArr[cc.vv.CG_PH_ACTION] = cc.vv.pbHelp.PB["phz.proto"].CG_ACTION;
        self.cgMsgArr[cc.vv.CG_PH_PIAO_FEN] = cc.vv.pbHelp.PB["phz.proto"].CG_PIAO_FEN;

        self.gcMsgArr[cc.vv.GC_PH_ACTION] = cc.vv.pbHelp.PB["phz.proto"].GC_ACTION
        self.gcMsgArr[cc.vv.GC_PH_ACTION_VALID] = cc.vv.pbHelp.PB["phz.proto"].GC_ACTION_VALID
        self.gcMsgArr[cc.vv.GC_PH_OVER] = cc.vv.pbHelp.PB["phz.proto"].GC_OVER
        self.gcMsgArr[cc.vv.GC_PH_GAME_OVER] = cc.vv.pbHelp.PB["phz.proto"].GC_GAME_OVER
        self.gcMsgArr[cc.vv.GC_PH_FAPAI] = cc.vv.pbHelp.PB["phz.proto"].GC_FAPAI
        self.gcMsgArr[cc.vv.GC_PH_KAIPAI] = cc.vv.pbHelp.PB["phz.proto"].GC_KAIPAI
        self.gcMsgArr[cc.vv.GC_PH_RELOGIN_DATA] = cc.vv.pbHelp.PB["phz.proto"].GC_RELOGIN_DATA
        self.gcMsgArr[cc.vv.GC_PH_TINGPAI] = cc.vv.pbHelp.PB["phz.proto"].GC_TingPai
        self.gcMsgArr[cc.vv.GC_PH_SISHOU] = cc.vv.pbHelp.PB["phz.proto"].GC_Sishou
        self.gcMsgArr[cc.vv.GC_PH_CUR_DIRECT] = cc.vv.pbHelp.PB["phz.proto"].GC_CUR_DIRECT
        self.gcMsgArr[cc.vv.GC_PH_QIPAI] = cc.vv.pbHelp.PB["phz.proto"].GC_qipai
        self.gcMsgArr[cc.vv.GC_PH_DINGZHUANG] = cc.vv.pbHelp.PB["phz.proto"].GC_DINGZHUANG
        self.gcMsgArr[cc.vv.GC_PH_PIAO_FEN] = cc.vv.pbHelp.PB["phz.proto"].GC_PIAO_FEN
        //self.gcMsgArr[cc.vv.GC_GUOHU] = cc.vv.pbHelp.PB["phz.proto"].GC_PIAO_YU
    },

    // 加载具体游戏及此游戏类型相关PB
    initGamePbs:function(gameId,callback){
        var typeName = cc.vv.enum.gamesType[gameId.toString()];

        if (typeName == "pk") {
            self.cgMsgArr[cc.vv.CG_PK_ACTION] = cc.vv.pbHelp.PB["pk.proto"].CG_ACTION
            self.cgMsgArr[cc.vv.CG_PK_QIEPAIACT] = cc.vv.pbHelp.PB["pk.proto"].CG_QiePai
            self.gcMsgArr[cc.vv.GC_PK_KAIPAI] = cc.vv.pbHelp.PB["pk.proto"].GC_KAIPAI
            self.gcMsgArr[cc.vv.GC_PK_RELOGIN_DATA] = cc.vv.pbHelp.PB["pk.proto"].GC_RELOGIN_DATA
            self.gcMsgArr[cc.vv.GC_PK_OPERATION] = cc.vv.pbHelp.PB["pk.proto"].GC_PLAY_OPERATION
            self.gcMsgArr[cc.vv.GC_PK_ERRORCODE] = cc.vv.pbHelp.PB["pk.proto"].GC_ErrorCode
            self.gcMsgArr[cc.vv.GC_PK_OVER] = cc.vv.pbHelp.PB["pk.proto"].GC_OVER
            self.gcMsgArr[cc.vv.GC_PK_GAMEOVER] = cc.vv.pbHelp.PB["pk.proto"].GC_GAME_OVER
            self.gcMsgArr[cc.vv.GC_PK_SHAIZI] = cc.vv.pbHelp.PB["pk.proto"].GC_Checkshaizi_Syn
            self.gcMsgArr[cc.vv.GC_PK_HANDPOKER] = cc.vv.pbHelp.PB["pk.proto"].GC_HandPokerSyn
            self.gcMsgArr[cc.vv.GC_PK_QIEPAI] = cc.vv.pbHelp.PB["pk.proto"].GC_QiePai_Syn
            self.gcMsgArr[cc.vv.GC_PK_QIEPAIACT] = cc.vv.pbHelp.PB["pk.proto"].GC_QiePai_Resp
        }
        else if (typeName == "mj") {
            //麻将类发送
            self.cgMsgArr[cc.vv.CG_ACTION] = cc.vv.pbHelp.PB["mj.proto"].CG_ACTION;
            self.gcMsgArr[cc.vv.GC_KAIPAI] = cc.vv.pbHelp.PB["mj.proto"].GC_KAIPAI;
            self.gcMsgArr[cc.vv.GC_OVER] = cc.vv.pbHelp.PB["mj.proto"].GC_OVER;
            self.gcMsgArr[cc.vv.GC_GAME_OVER] = cc.vv.pbHelp.PB["mj.proto"].GC_GAME_OVER;
            self.gcMsgArr[cc.vv.GC_ACTION] = cc.vv.pbHelp.PB["mj.proto"].GC_ACTION;
            self.gcMsgArr[cc.vv.GC_FAPAI] = cc.vv.pbHelp.PB["mj.proto"].GC_FAPAI;
            self.gcMsgArr[cc.vv.GC_ACTION_VALID] = cc.vv.pbHelp.PB["mj.proto"].GC_ACTION_VALID;
            self.gcMsgArr[cc.vv.GC_RELOGIN_DATA] = cc.vv.pbHelp.PB["mj.proto"].GC_RELOGIN_DATA;
            self.gcMsgArr[cc.vv.GC_BIRD] = cc.vv.pbHelp.PB["mj.proto"].GC_BIRD;
            self.gcMsgArr[cc.vv.GC_GUI_CARD] = cc.vv.pbHelp.PB["mj.proto"].GC_ACTION;
            if (gameId == cc.vv.enum.GameId.ZZMJ) {
                self.gcMsgArr[cc.vv.GC_DINGZHUANG] = cc.vv.pbHelp.PB["zzmj.proto"].DingZhuang;//大色子定庄
               // self.gcMsgArr[cc.vv.GC_HUANWEI] = cc.vv.pbHelp.PB["zzmj.proto"].GC_ACTION;
            }
            if (gameId == cc.vv.enum.GameId.CSMJ) {
                self.cgMsgArr[cc.vv.CG_SEABED] = cc.vv.pbHelp.PB["csmj.proto"].CG_SEABED
                self.cgMsgArr[cc.vv.CG_SEABED] = cc.vv.pbHelp.PB["csmj.proto"].CG_SEABED
                self.cgMsgArr[cc.vv.CG_PIAO_FEN] = cc.vv.pbHelp.PB["csmj.proto"].CG_PIAO_FEN
                self.gcMsgArr[cc.vv.GC_DICE] = cc.vv.pbHelp.PB["csmj.proto"].GC_DICE
                self.gcMsgArr[cc.vv.GC_HANDS_HU] = cc.vv.pbHelp.PB["csmj.proto"].GC_HANDS_HU
                self.gcMsgArr[cc.vv.GC_DICE] = cc.vv.pbHelp.PB["csmj.proto"].GC_DICE
                self.gcMsgArr[cc.vv.GC_SEABED] = cc.vv.pbHelp.PB["csmj.proto"].GC_SEABED
                self.gcMsgArr[cc.vv.GC_HANDS_HU] = cc.vv.pbHelp.PB["csmj.proto"].GC_HANDS_HU
                self.gcMsgArr[cc.vv.GC_HANDS_HU_END] = cc.vv.pbHelp.PB["csmj.proto"].GC_HANDS_HU_END
                self.gcMsgArr[cc.vv.GC_PIAO_FEN] = cc.vv.pbHelp.PB["csmj.proto"].GC_PIAO_FEN
                self.gcMsgArr[cc.vv.GC_TING] = cc.vv.pbHelp.PB["csmj.proto"].GC_TING
            }
        }
        
        if (callback) {
            callback();
        }
    },

    guildEncodePB:function(msgId,msgTab){
        var self = this;
        var pbData = self.SendMsg[msgId];
        if(pbData == null){
            cc.error("encodePB=="+msgId+"PB is Null");
        }
        return pbData.encode(msgTab).toArrayBuffer();
        
    },

    guildDecodePB:function(msgId,msgTab){
        var self = this;
        var pbData = self.RvcMsg[msgId];
        if(pbData == null){
            cc.error("encodePB=="+msgId+"PB is Null");
        }
        return pbData.decode(msgTab);
    },

    encodePB:function(msgId,msgTab){
        var self = this;
        var pbData = self.cgMsgArr[msgId];
        if(pbData == null){
            cc.error("encodePB=="+msgId+"PB is Null");
        }
        return pbData.encode(msgTab).toArrayBuffer();
        
    },

    decodePB:function(msgId,msgTab){
        var self = this;
        var pbData = self.gcMsgArr[msgId];
        if(pbData == null){
            cc.error("encodePB=="+msgId+"PB is Null");
        }
        return pbData.decode(msgTab);
    },
    
});
