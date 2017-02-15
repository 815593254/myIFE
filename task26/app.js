// var ship = $('#ship-fire');
// var deg = 0;
// var x = 0;
// var y = 0;
// var z = 200;
// $("#createNewShip").on('click', function () {
//     setInterval(function () {
//         ship.css('transform', 'rotate(' + deg * -1 + 'deg)');
//         y = 75 - z * Math.sin(deg * Math.PI * 2 / 360);
//         x = 90 + z * Math.cos(deg * Math.PI * 2 / 360);
//         ship.css('top', y + 'px');
//         ship.css('left', x + 'px');
//         deg++;
//     }, 30)
// })

var SHIP_TOTAL_ENERGY = 100;  //飞船初始能源
var SAPCE_SHIP_ARRAY = [];    //飞船队列
var ORBIT_HEIGHT = 200;       //轨道半径
var FRAME_PRE_SECOND = 100;   //帧数
/****飞船类*****/
var SpaceShip = function (shipId) {
    this.shipDom = $('#ship-fire');     //飞船DOM
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
        this.shipDom.css('top', this.topPosition + 'px');   //设css
        this.shipDom.css('left', this.leftPosition + 'px');
        this.shipDom.css('transform', 'rotate(' + this.deg * -1 + 'deg)');
        this.shipDom.find('.remainEnergy').text(Math.round(this.remainEnergy) + "%");
    }
    if (this.status == 'stop') {
        this.remainEnergy += this.totalEnergy * this.ENERGY_RECOVER_PRE_SECOND / FRAME_PRE_SECOND;    //计算每帧回复多少能源
        this.shipDom.find('.remainEnergy').text(Math.round(this.remainEnergy) + "%");
    }
}

SpaceShip.prototype.radio = function (signal) {
    if (this.shipId == signal.id) {
        this[signal.commond];
    }
}

SpaceShip.prototype.destructiveMechanism = function () {
    this.shipDom.remove();
}

var ship1 = new SpaceShip(1);
ship1.fly();

setInterval(function () {
    ship1.animation();

}, 1000 / FRAME_PRE_SECOND)