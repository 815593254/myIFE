/********表单验证规则*******/
var CheckFunction = {
    /****计算长度*****/
    countLength: function (str) {
        var inputLength = 0;
        if (str == '') {
            return 0;
        }
        for (var i = 0; i < str.length; i++) {
            var countCode = str.charCodeAt(i);   //返回字符串第i个字符的unicode编码
            if (countCode >= 0 && countCode <= 128) {
                inputLength += 1;
            } else {
                inputLength += 2;
            }
        }
        return inputLength;
    },

    /*******检测长度*******/
    lengthCheck: function (value, min, max) {
        if (CheckFunction.countLength(value) == 0) {
            return false;
        } else if (CheckFunction.countLength(value) >= min && CheckFunction.countLength(value) <= max) {
            return true;
        } else {
            return false;
        }
    },

    /*****检测是否数值*****/
    numCheck: function (value) {
        var reg = /^\d+$/;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    /*****检查密码是否相同******/
    passwordConfirm: function (value1, value2) {
        if (CheckFunction.countLength(value2) == 0) {
            return false;
        } else if (value1 === value2) {
            return true;
        } else if (value1 != value2 || CheckFunction.countLength(value2) == 0) {
            return false;
        } else {
            return false;
        }
    },

    /*****邮箱验证******/
    emailCheck: function (value) {
        var reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (reg.test(value)) {
            return true;
        } else if (CheckFunction.countLength(value) == 0) {
            return false;
        } else {
            return false;
        }
    },

    /*****手机号码验证******/
    phoneCheck: function (value) {
        if (/^\d{13}$/.test(value)) {
            return true;
        } else {
            return false;
        }
    },
}

/*******获取配置项********/
function OptCreate() {
    this.id = 0;
    this.data = {
        lable: '',              //标签名字
        type: '',               //表单类型
        textType: '',           //文字类型
        necessary: true,        //是否必需
        rule: '',               //规则
        minLength: 0,           //text之类文本的最小长度限制
        maxLength: 1,           //text之类文本的最大长度限制
        defaultText: '',        //获取焦点的默认提示
        successText: '',        //输入正确的提示
        failText: [],           //验证错误的提示
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
            this.data.validator = CheckFunction.lengthCheck;
            this.data.defaultText = '请输入'+this.data.min+'到'+this.data.max+'位字符'
            break;
        case 'input':
            this.data.type = 'input';
            switch (optSet.rule.val) {
                case 'text':
                    this.data.textType = 'text';
                    this.data.validator = CheckFunction.lengthCheck;
                    this.data.defaultText = '请输入'+this.data.min+'到'+this.data.max+'位字符';
                    break;
                case 'num':
                    this.data.textType = 'text';
                    this.data.validator = CheckFunction.numCheck;
                    this.data.defaultText = '请输入数值';
                    break;
                case 'pwd':
                    this.data.textType = 'password';
                    this.data.validator = [CheckFunction.lengthCheck, CheckFunction.passwordConfirm];
                    this.data.defaultText = ['请输入'+this.data.min+'到'+this.data.max+'位字符', '请输入相同密码'];
                    this.data.failText = ['格式不正确', '两个密码不相同'];
                    break;
                case 'email':
                    this.data.textType = 'text';
                    this.data.validator = CheckFunction.emailCheck;
                    this.data.defaultText = '请输入正确的邮箱地址';
                    break;
                case 'phone':
                    this.data.textType = 'text';
                    this.data.validator = CheckFunction.phoneCheck;
                    this.data.defaultText = '请输入手机号码';
            }
            break;
    }
}

/*******基本信息********/
OptCreate.prototype.baseOpt = function (optSet) {
    this.data.lable = optSet.opt.label;
    this.data.id = this.id++;
    this.data.min = optSet.opt.min || 4;
    this.data.max = optSet.opt.max || 16;
    this.data.successText = '输入正确';
    this.data.failText = '格式不正确';
}

/*******返回信息*******/
OptCreate.prototype.returnOpt = function (optSet) {
    this.getOpt(optSet);
    return this.data;
}