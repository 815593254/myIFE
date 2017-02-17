var SHIP_TOTAL_ENERGY = 100;  //飞船初始能源
var FRAME_PRE_SECOND = 100;   //帧数
var MAX_SHIP_NUM = 4;         //最大飞船数
var HEIGHT_ARRAY = [200, 250, 300, 350];  //设定轨道

/****飞船类*****/
var SpaceShip = function (shipSet,commanderId, shipId, height) {
    //飞船DOM
    this.shipDom = (function () {
        $('.plant').append('<div class="ship-fire" style="left:' + (100 + height) + 'px" id="commander-' + commanderId + '_spaceShip-' + shipId + '">' +
            '<div class="ship">' +
            '<div class="shipId">' + shipId + '号</div>' +
            '<div class="remainEnergy">100%</div>' +
            '</div>' +
            '</div>')
        return $('#commander-' + commanderId + '_spaceShip-' + shipId);
    })()
    this.shipId = shipId;       //飞船号
    this.status = 'static';     //飞船状态
    this.ORBIT_HEIGHT = height;       //轨道半径
    this.totalEnergy = SHIP_TOTAL_ENERGY;    //总能源
    this.remainEnergy = SHIP_TOTAL_ENERGY;   //剩余能源
    this.leftPosition = 0;  //left坐标量,这里可设起始位置
    this.topPosition = 0;   //top坐标量
    this.deg = 0;      //飞船角坐标角度
    // this.speed = 50;   //飞行角速度，(单位：度/秒)
    this.speed = shipSet.powerSystem;
    // this.ENERGY_CONSUME_PRE_SECOND = 0.05;  //能源消耗速度(每秒百分之几)
    this.ENERGY_CONSUME_PRE_SECOND = shipSet.energySystem;
    this.ENERGY_RECOVER_PRE_SECOND = shipSet.energySystem;    //能源回复速度（每秒百分之几）
}

/*****设置飞船转为飞行状态******/
SpaceShip.prototype.fly = function () {
    this.status = 'fly';
}

/*****设置飞船转为停止状态*******/
SpaceShip.prototype.stop = function () {
    this.status = 'stop';
}

/*****飞船的动画，飞行，充电******/
SpaceShip.prototype.animation = function () {
    if (this.status == 'fly') {
        if (this.remainEnergy <= 0) {
            this.status = 'stop'
            return;
        }
        this.topPosition = 50 - this.ORBIT_HEIGHT * Math.sin(this.deg * Math.PI * 2 / 360);    //计算top和left的值
        this.leftPosition = 100 + this.ORBIT_HEIGHT * Math.cos(this.deg * Math.PI * 2 / 360);
        this.deg += this.speed / FRAME_PRE_SECOND;          //计算每帧改变多少角度
        this.remainEnergy -= this.totalEnergy * this.ENERGY_CONSUME_PRE_SECOND / FRAME_PRE_SECOND;    //计算每帧减少多少能源
        this.shipDom.css('top', this.topPosition + 'px');                              //    
        this.shipDom.css('left', this.leftPosition + 'px');                            //设置样式     
        this.shipDom.css('transform', 'rotate(' + this.deg * -1 + 'deg)');             //Css 
        this.shipDom.find('.remainEnergy').text(Math.round(this.remainEnergy) + "%");  //      
    }

    if (this.status == 'stop') {
        if (this.remainEnergy <= this.totalEnergy) {
            this.remainEnergy += this.totalEnergy * this.ENERGY_RECOVER_PRE_SECOND / FRAME_PRE_SECOND;    //计算每帧回复多少能源
        }
        this.shipDom.find('.remainEnergy').text(Math.round(this.remainEnergy) + "%");
    }
}

SpaceShip.prototype.radio = function (signal) {    //电台
    if (this.shipId == signal.id) {
        this[signal.commond]();
    }
}

SpaceShip.prototype.destructive = function () {   //自爆装置
    this.shipDom.remove();
}

var Commander = function (commanderId) {    //指挥官类
    this.commanderId = commanderId;
    this.commanderDom = null;
    this.spaceShipArray = [];
}

Commander.prototype.init = function () {    //初始化指挥官类
    for (var i = 1; i <= MAX_SHIP_NUM; i++) {    //初始化数组
        this.spaceShipArray[i] = false;
    }
    $('#commander-area').append('<div class="control-area" id="commander-' + this.commanderId + '" >' +   //添加dom节点
        '<input class="createNewShipBtn" value="起飞新的飞船" type="button" onclick="commander' + this.commanderId + '.orderCreateNewShip()"/>&nbsp;&nbsp;' +
        '<select name="powerSystem"><option value="30">前进号</option><option value="50">奔腾号</option><option value="80">超越号</option></select>&nbsp;&nbsp;&nbsp;' +
        '<select name="energySystem"><option value="0.02">劲量型</option><option value="0.03">光能型</option><option value="0.04">永久型</option></select>' +
        '</div>');
    this.commanderDom = $('#commander-' + this.commanderId);
}

Commander.prototype.getEmptyId = function () {    //获得可用id
    for (var i = 1; i <= MAX_SHIP_NUM; i++) {
        if (!this.spaceShipArray[i]) {
            return i;
        } else if (i >= MAX_SHIP_NUM) {
            return false;
        }
    }
}

Commander.prototype.getShipArray = function () {     //返回该指挥官的飞船组
    return this.spaceShipArray;
}

Commander.prototype.orderCreateNewShip = function () {   //起飞新的飞船的命令
    var emptyId = this.getEmptyId();
    var shipSet = {};
    if (emptyId == false) {
        console.log('飞船数到达上限');
        return;
    }
    this.commanderDom.find('select').each(function () {
        shipSet[$(this).attr('name')] = $(this).val();
    });
    var ship = new SpaceShip(shipSet,this.commanderId, emptyId, HEIGHT_ARRAY[emptyId - 1]);    //new飞船实例
    this.spaceShipArray[emptyId] = ship;
    this.commanderDom.append('<div class="shipControl" id="shipControl-' + emptyId + '"><span>' + emptyId + '号飞船</span>' +
        '<input type="button" value="开始飞行" onclick="commander' + this.commanderId + '.orderBeginFly(' + emptyId + ')"></input>' +
        '<input type="button" value="停止飞行" onclick="commander' + this.commanderId + '.orderStopFly(' + emptyId + ')"></input>' +
        '<input type="button" value="摧毁飞船" onclick="commander' + this.commanderId + '.orderDestory(' + emptyId + ')"></input></div>');
}

Commander.prototype.orderBeginFly = function (shipId) {    //命令：开始飞行
    Logger.log(shipId + '号飞船开始飞行');
    Mediator.sendBroadcase(this.spaceShipArray, { id: shipId, commond: 'fly' });
}

Commander.prototype.orderStopFly = function (shipId) {     //命令：停止飞行
    Logger.log(shipId + '号飞船停止飞行');
    Mediator.sendBroadcase(this.spaceShipArray, { id: shipId, commond: 'stop' });
}

Commander.prototype.orderDestory = function (shipId) {     //命令：摧毁飞船
    Logger.log('摧毁' + shipId + '号飞船');
    Mediator.sendBroadcase(this.spaceShipArray, { id: shipId, commond: 'destructive' });
    $('#shipControl-' + shipId).remove();
    this.spaceShipArray[shipId] = false;
}

/*****日志*****/
var Logger = {
    logDom: (function () {
        $('.main-content').append('<div id="logs"><p>日志:</p></div>');
        return $('#logs');
    })(),
    log: function (text) {
        this.logDom.append('<p>' + text + '</p>');
    }
};

/*****传输介质，模拟丢包和延迟*****/
var Mediator = (function () {
    var errorRate = 0.3;
    return {
        sendBroadcase: function (shipArr, cmd) {
            var spaceShipArray = shipArr;
            if (Math.random() <= errorRate) {
                Logger.log('命令受到干扰，传送失败！');
            } else {
                for (var i = 1; i <= MAX_SHIP_NUM; i++) {
                    if (spaceShipArray[i]) {
                        spaceShipArray[i].radio({ id: cmd.id, commond: cmd.commond });
                    }
                }
            }
        }
    }
})()

var commander1 = new Commander(1);      //建立指挥官实例
commander1.init();                     //初始化
var commander2 = new Commander(2);      //建立指挥官实例
commander2.init();                     //初始化


setInterval(function () {
    var spaceShipArray1 = commander1.getShipArray();
    var spaceShipArray2 = commander2.getShipArray();
    for (var i = 1; i <= MAX_SHIP_NUM; i++) {
        if (spaceShipArray1[i]) {
            spaceShipArray1[i].animation();
        }
        if (spaceShipArray2[i]) {
            spaceShipArray2[i].animation();
        }
    }
}, 1000 / FRAME_PRE_SECOND)