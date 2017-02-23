var CheckFunction = {
    /*******检测姓名格式*******/
    nameCheck: function (tip, inputBox, value) {
        if (countLength(value) == 0) {
            return false;
        } else if (countLength(value) >= 4 && countLength(value) <= 16) {
            return true;
        } else {
            return false;
        }
    },

    /******检测密码格式******/
    passwordCheck: function (tip, inputBox, value) {
        if (countLength(value) == 0) {
            return false;
        } else if (countLength(value) >= 4 && countLength(value) <= 16) {
            return true;
        } else {
            return false;
        }
    },

    /*****检查密码是否相同******/
    passwordConfirm: function (tip, inputBox, value1, value2) {
        if (countLength(value2) == 0) {
            return false;
        } else if (countLength(value2) >= 4 && countLength(value2) <= 16 && value1 === value2) {
            return true;
        } else if (value1 != value2 || countLength(value2) == 0) {
            return false;
        } else {
            return false;
        }
    },

    /*****邮箱检测******/
    emailCheck: function (tip, inputBox, value) {
        var reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (reg.test(value)) {
            return true;
        } else if (countLength(value) == 0) {
            return false;
        } else {
            return false;
        }
    },

    /*****手机号码检测*****/
    phoneCheck: function (tip, inputBox, value) {
        if (/^\d{13}$/.test(value)) {
            return true;
        } else {
            return false;
        }
    },

    /****计算长度*****/
    countLength: function (str) {
        var inputLength = 0;
        for (var i = 0; i < str.length; i++) {
            var countCode = str.charCodeAt(i);   //返回字符串第i个字符的unicode编码
            if (countCode >= 0 && countCode <= 128) {
                inputLength += 1;
            } else {
                inputLength += 2;
            }
        }
        return inputLength;
    }
}

$('#conBtn').on('click', function () {
    var opt = [];
    $('form input:checked').each(function () {
        opt.push($(this).val());
    })

})

var OptValBox = function () {
    this.opt = {};
    this.getOpt = function () {
        return {
            type: {
                dom: $('#typeBox'),
                val: $('#typeBox').find(':checked').val()
            },
            opt: {
                dom: $('#optBox'),
                val: $('#optBox').find('#labelText').val()
            },
            rule: {
                dom: $('#ruleBox'),
                val: $('#ruleBox').find('#checked').val()
            }
        }
    }
}
var optSet = new OptValBox();
var optCreate=new OptCreate();

$('#addBtn').click(function () {
    FormCreate(optCreate.returnOpt(optSet.getOpt()),$('#formDom'));
});
