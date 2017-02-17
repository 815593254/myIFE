var SHIP_TOTAL_ENERGY = 100;  //飞船初始能源
var FRAME_PRE_SECOND = 100;   //帧数
var MAX_SHIP_NUM = 4;         //最大飞船数
var HEIGHT_ARRAY = [200, 250, 300, 350];  //设定轨道
var POWER_SYSTEM = [{ speed: 30, consume: 0.05 }, { speed: 50, consume: 0.07 }, { speed: 80, consume: 0.09 }]   //动力系统
var ENERGY_RECOVER_PRE_SECOND = [0.02, 0.03, 0.04]     //充电系统

/****飞船类*****/
var SpaceShip = function (shipSet, commanderId, shipId, height) {
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
    this.status = 'stop';     //飞船状态
    this.orbitHeight = height;       //轨道半径
    this.totalEnergy = SHIP_TOTAL_ENERGY;    //总能源
    this.remainEnergy = SHIP_TOTAL_ENERGY;   //剩余能源
    this.leftPosition = 0;  //left坐标量,这里可设起始位置
    this.topPosition = 0;   //top坐标量
    this.deg = 0;      //飞船角坐标角度
    // this.speed = 50;   //飞行角速度，(单位：度/秒)
    this.speed = POWER_SYSTEM[shipSet.powerSystem].speed;
    // this.energyComsumePreSecond = 0.05;  //能源消耗速度(每秒百分之几)
    this.energyComsumePreSecond = POWER_SYSTEM[shipSet.powerSystem].consume;
    this.energyRecoverPreSecond = ENERGY_RECOVER_PRE_SECOND[shipSet.energySystem];    //能源回复速度（每秒百分之几）
}

/*****设置飞船转为飞行状态******/
SpaceShip.prototype.fly = function () {
    this.status = 'fly';
}

/*****返回飞船转态******/
SpaceShip.prototype.returnStatus = function () {
    return this.status;
}

/*****返回飞船能源剩余*******/
SpaceShip.prototype.returnRemainEnergy = function () {
    return this.remainEnergy;
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
        this.topPosition = 50 - this.orbitHeight * Math.sin(this.deg * Math.PI * 2 / 360);    //计算top和left的值
        this.leftPosition = 100 + this.orbitHeight * Math.cos(this.deg * Math.PI * 2 / 360);
        this.deg += this.speed / FRAME_PRE_SECOND;          //计算每帧改变多少角度
        this.remainEnergy -= this.totalEnergy * this.energyComsumePreSecond / FRAME_PRE_SECOND;    //计算每帧减少多少能源
        this.shipDom.css('top', this.topPosition + 'px');                              //    
        this.shipDom.css('left', this.leftPosition + 'px');                            //设置样式     
        this.shipDom.css('transform', 'rotate(' + this.deg * -1 + 'deg)');             //Css 
        this.shipDom.find('.remainEnergy').text(Math.round(this.remainEnergy) + "%");  //      
    }

    if (this.status == 'stop') {
        if (this.remainEnergy <= this.totalEnergy) {
            this.remainEnergy += this.totalEnergy * this.energyRecoverPreSecond / FRAME_PRE_SECOND;    //计算每帧回复多少能源
        }
        this.shipDom.find('.remainEnergy').text(Math.round(this.remainEnergy) + "%");
    }
}

SpaceShip.prototype.radio = function (signal) {    //电台
    if (this.shipId == signal.id) {
        this[signal.commond]();
        console.log('aaaaaaaaaaaaaaaa');
    }
}

SpaceShip.prototype.destructive = function () {   //自爆装置
    this.shipDom.remove();
}

SpaceShip.prototype.sendInf = function () {

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
        '<select name="powerSystem"><option value="0">前进号</option><option value="1">奔腾号</option><option value="2">超越号</option></select>&nbsp;&nbsp;&nbsp;' +
        '<select name="energySystem"><option value="0">劲量型</option><option value="1">光能型</option><option value="2">永久型</option></select>' +
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
    var shipName = this.commanderDom.find('select[name=powerSystem] option:selected').text();
    var energySys = this.commanderDom.find('select[name=energySystem] option:selected').text();

    var ship = new SpaceShip(shipSet, this.commanderId, emptyId, HEIGHT_ARRAY[emptyId - 1]);    //new飞船实例
    Monitor.addNewShip(emptyId, shipName, energySys, 'stop', SHIP_TOTAL_ENERGY);
    this.spaceShipArray[emptyId] = ship;

    this.commanderDom.append('<div class="shipControl" id="shipControl-' + emptyId + '"><span>' + emptyId + '号飞船</span>' +
        '<input type="button" value="开始飞行" onclick="commander' + this.commanderId + '.orderBeginFly(' + emptyId + ')"></input>' +
        '<input type="button" value="停止飞行" onclick="commander' + this.commanderId + '.orderStopFly(' + emptyId + ')"></input>' +
        '<input type="button" value="摧毁飞船" onclick="commander' + this.commanderId + '.orderDestory(' + emptyId + ')"></input></div>');
}

Commander.prototype.orderBeginFly = function (shipId) {    //命令：开始飞行
    Logger.log(shipId + '号飞船开始飞行');
    var cmd = Adapter.jsonToBin({ id: shipId, commond: 'fly' });
    Bus.sendBroadcase(this.spaceShipArray, cmd, resolve);
    SignalReceiver.getSignal('asdfsd')
}

Commander.prototype.orderStopFly = function (shipId) {     //命令：停止飞行
    Logger.log(shipId + '号飞船停止飞行');
    var cmd = Adapter.jsonToBin({ id: shipId, commond: 'stop' });
    Bus.sendBroadcase(this.spaceShipArray, cmd, resolve);
}

Commander.prototype.orderDestory = function (shipId) {     //命令：摧毁飞船
    Logger.log('摧毁' + shipId + '号飞船');
    var cmd = Adapter.jsonToBin({ id: shipId, commond: 'destructive' });
    
    // function test(resolve, reject) {
    //     Bus.sendBroadcase(this.shipArr, cmd, resolve);
    // }
    // var p1 = new Promise(test);
    // var p2 = p1.then(function (result) {
    //     console.log('成功：' + result);
    // });
    // var p3 = p2.catch(function (reason) {
    //     console.log('失败：' + reason);
    // });

    Bus.sendBroadcase(this.spaceShipArray, cmd);
    $('#shipControl-' + shipId).remove();
    // this.spaceShipArray[shipId] = false;
}

Commander.prototype.removeSpaceShip = function () {
    this.spaceShipArray[shipId] = false;
}

/*****Adapter类******/
var Adapter = (function () {
    return {
        jsonToBin: function (jsonCmd) {      //json转二进制
            var id = jsonCmd.id.toString(2);
            var cmd = '';
            var path = '0000';
            switch (jsonCmd.commond) {
                case 'fly':
                    cmd = '0001';
                    break;
                case 'stop':
                    cmd = "0010";
                    break;
                case 'destructive':
                    cmd = '0011';
                    break;
            }
            var ene = jsonCmd.energy && jsonCmd.energy.toString(2) || '11111111';
            return path.substring(0, 4 - id.length) + id + cmd + ene;
        },
        binToJson: function (binCmd) {         //二进制转json
            var shipid = parseInt(binCmd.substring(0, 4), 2);
            var cmd = '';
            switch (binCmd.substring(4, 8)) {
                case '0001':
                    cmd = 'fly';
                    break;
                case '0010':
                    cmd = 'stop';
                    break;
                case '0011':
                    cmd = 'destructive';
                    break;
            };
            if (binCmd.substring(8, 16) != '11111111') {
                var ene = parseInt(binCmd.substring(8, 16), 2);
            }
            console.log(cmd);
            return { id: shipid, commond: cmd, energy: ene }
        }
    }
})()

/*****日志系统*****/
var Logger = {
    logDom: (function () {
        $('.main-content').append('<div id="logs"><p>日志:</p></div>');
        return $('#logs');
    })(),
    log: function (text) {
        this.logDom.append('<p>' + text + '</p>');
    }
};

/*****传输介质Bus,可重试*****/
var Bus = (function () {
    var errorRate = 0;
    return {
        sendBroadcase: function (shipArr, binCmd) {
            var shipArrTmp = shipArr;
            var sendCmd = function () {
                setTimeout(function () {
                    if (Math.random() <= this.errorRate) {
                        Logger.log('命令受到干扰，传送失败，重试中...');
                        sendCmd();
                    } else {
                        Logger.log('命令发送成功。');
                        for (var i = 1; i <= MAX_SHIP_NUM; i++) {
                            if (shipArrTmp[i]) {
                                shipArrTmp[i].radio(Adapter.binToJson(binCmd));
                            }
                        }
                    }
                }, 300);
            }
            sendCmd();
        }
    }
})()


/****信号接收器******/
var SignalReceiver = (function () {
    return {
        getSignal: function (sig) {
            this.sendSignal(sig);
        },
        sendSignal: function (sig) {
            DC.getBinSignal(sig);
        }
    }
})()

/*****数据处理中心*****/
var DC = (function () {
    var dataTable = [];
    return {
        getBinSignal: function (sig) {
            varbinSignal = sig;
            Adapter.binToJson(sig);
        }

    }
})()

/****监视系统*****/
var Monitor = (function () {
    var monitorDom = $('.imformation table');
    return {
        addNewShip: function (id, name, energy, status, energyLeft) {
            monitorDom.append('<tr id=monitorId-"' + id + '"><td>' + id + '</td><td>' + name + '</td><td>' + energy + '</td><td id="status">' + status + '</td><td id="energy">' + energyLeft + '%</td></tr>');
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