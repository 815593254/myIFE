function OptCreate() {
    this.id = 0;
    this.data = {
        lable: '',              //标签名字
        type: '',               //表单类型
        necessary: true,        //是否必需
        minLength: 0,          //text之类文本的最小长度限制
        maxLength: 1,          //text之类文本的最大长度限制
        defaultText: '',       //获取焦点的默认提示
        successText: '',       //输入正确的提示
        item: [],               //radio的选项
        failText: [],          //验证错误的提示
        id: 0,                  //表单的id，初始值为0
        validator: function () {
        }                       //表单的验证规则
    };
}

OptCreate.prototype.getOpt = function (optSet) {
    this.baseOpt(optSet);
    switch (optSet.type.val) {
        case 'textarea':
            this.data.type = 'textarea';
            this.validator = CheckFunction.nameCheck();
            break;
        case 'input':
            this.data.type = 'input';
            break;
        case 'radio':
            this.data.type = 'radio';
            break;
        case 'checkbox':
            this.data.type = 'checkbox';
            break;
        case 'select':
            this.data.type = 'select';
            break;
    }
}

OptCreate.prototype.baseOpt = function (optSet) {
    this.data.lable = optSet.opt.val;
    this.data.id = this.id++;
}

OptCreate.prototype.returnOpt = function (optSet) {
    this.getOpt(optSet);
    return this.data;
}

OptCreate.prototype.setLength = function () {

}

OptCreate.prototype.setNumber = function () {

}

