var SHIP_TOTAL_ENERGY = 100;  //飞船初始能源
var SAPCE_SHIP_ARRAY = [];    //飞船队列
var ORBIT_HEIGHT = 200;       //轨道半径
var FRAME_PRE_SECOND = 100;   //帧数
var MAX_SHIP_NUM = 4;         //最大飞船数

/****飞船类*****/
var SpaceShip = function (shipId) {
    this.shipDom = $('#ship-fire');     //飞船DOM

    this.shipDom = (function () {
        $('.plant').append('<div class="ship-fire" id="spaceShip-' + shipId + '">' +
            '<div class="ship">' +
            '<div class="shipId">' + shipId + '号</div>' +
            '<div class="remainEnergy">100%</div>' +
            '</div>' +
            '</div>')
        return $('#spaceShip-' + shipId);
    })()

    this.shipId = shipId;       //飞船号
    this.status = 'static';     //飞船状态
    this.totalEnergy = SHIP_TOTAL_ENERGY;    //总能源
    this.remainEnergy = SHIP_TOTAL_ENERGY;   //剩余能源
    this.leftPosition = 290;  //left坐标量
    this.topPosition = 75;   //top坐标量
    this.deg = 0;      //飞船角坐标角度
    this.speed = 50;   //飞行角速度，(单位：度/秒)
    this.ENERGY_CONSUME_PRE_SECOND = 0.05;  //能源消耗速度(每秒百分之几)
    this.ENERGY_RECOVER_PRE_SECOND = 0.02;    //能源回复速度（每秒百分之几）
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
        this.topPosition = 50 - ORBIT_HEIGHT * Math.sin(this.deg * Math.PI * 2 / 360);    //计算top和left的值
        this.leftPosition = 85 + ORBIT_HEIGHT * Math.cos(this.deg * Math.PI * 2 / 360);
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
        // this.fly();
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
        '<input class="createNewShipBtn" value="起飞新的飞船" type="button" onclick="commander' + this.commanderId + '.orderCreateNewShip()"/>' +
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
    if (emptyId == false) {
        console.log('飞船数到达上限');
        return;
    }
    var ship = new SpaceShip(emptyId);    //new飞船实例
    this.spaceShipArray[emptyId] = ship;
    this.commanderDom.append('<div id="shipControl-' + emptyId + '"><span>' + emptyId + '号飞船</span>' +
        '<input type="button" value="开始飞行" onclick="commander' + this.commanderId + '.orderBeginFly(' + emptyId + ')"></input>' +
        '<input type="button" value="停止飞行" onclick="commander' + this.commanderId + '.orderStopFly(' + emptyId + ')"></input>' +
        '<input type="button" value="摧毁飞船" onclick="commander' + this.commanderId + '.orderDestory(' + emptyId + ')"></input></div>');
}

Commander.prototype.orderBeginFly = function (shipId) {    //命令：开始飞行
    for (var i = 1; i <= MAX_SHIP_NUM; i++) {
        if (this.spaceShipArray[i]) {
            this.spaceShipArray[i].radio({ id: shipId, commond: 'fly' });
        }
    }
}

Commander.prototype.orderStopFly = function (shipId) {     //命令：停止飞行
    for (var i = 1; i <= MAX_SHIP_NUM; i++) {
        if (this.spaceShipArray[i]) {
            this.spaceShipArray[i].radio({ id: shipId, commond: 'stop' });
        }
    }
}

Commander.prototype.orderDestory = function (shipId) {     //命令：摧毁飞船
    for (var i = 1; i <= MAX_SHIP_NUM; i++) {
        if (this.spaceShipArray[i]) {
            this.spaceShipArray[i].radio({ id: shipId, commond: 'destructive' });
        }
    }
    $('#shipControl-' + shipId).remove();
    this.spaceShipArray[shipId] = false;
}

var Mediator = (function (cmd) {
    this.cmd = cmd;
    this.sendBroadcase = function () {
        var spaceShipArray = commander1.getShipArray();
        for (var i = 1; i <= MAX_SHIP_NUM; i++) {
            if (spaceShipArray[i]) {
                spaceShipArray[i].radio({ id: shipId, commond: 'fly' });
            }
        }
    }
})()




var commander1 = new Commander(1);      //建立指挥官实例
commander1.init(1);                     //初始化

setInterval(function () {
    var spaceShipArray = commander1.getShipArray();
    for (var i = 1; i <= MAX_SHIP_NUM; i++) {
        if (spaceShipArray[i]) {
            spaceShipArray[i].animation();
        }
    }
}, 1000 / FRAME_PRE_SECOND)