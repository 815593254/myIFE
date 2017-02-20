$(function () {

    var result = [false, false, false, false, false];
    /*****隐藏提示框****/
    $('#nameTipTr').hide();
    $('#pwdTipTr').hide();
    $('#pwdConfirmTipTr').hide();
    $('#emailTipTr').hide();
    $('#phoneTipTr').hide();

    /*****绑定事件*****/
    $('#name').on('focus', function () {
        $('#nameTipTr').show();
    }).on('blur', function () {
        testValue.nameTest($('#nameTip'), $('#name'), $('#name').val());
    })

    $('#pwd').on('focus', function () {
        $('#pwdTipTr').show();
    }).on('blur', function () {
        testValue.passwordTest($('#pwdTip'), $('#pwd'), $('#pwd').val());
    })

    $('#pwdConfirm').on('focus', function () {
        $('#pwdConfirmTipTr').show();
    }).on('blur', function () {
        testValue.passwordConfirm($('#pwdConfirmTip'), $('#pwdConfirm'), $('#pwd').val(), $('#pwdConfirm').val());
    })

    $('#email').on('focus', function () {
        $('#emailTipTr').show();
    }).on('blur', function () {
        testValue.emailTest($('#emailTip'), $('#email'), $('#email').val());
    })

    $('#phone').on('focus', function () {
        $('#phoneTipTr').show();
    }).on('blur', function () {
        testValue.phoneTest($('#phoneTip'), $('#phone'), $('#phone').val());
    })

    $('#inputBtn').on('click', function () {
        for (var x of result) {
            if (!x) {
                alert("失败，请检查输入");
                return;
            }            
        }
        alert('成功！');
        return;
    })

    /*****格式检测类*******/
    var testValue = {
        /******检测姓名格式*******/
        nameTest: function (tip, inputBox, value) {
            if (countLength(value) == 0) {
                tip.text('姓名不能为空');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[0] = false;
            } else if (countLength(value) >= 4 && countLength(value) <= 16) {
                tip.text('格式正确');
                tip.css('color', 'green');
                inputBox.css('border', '1px solid green');
                result[0] = true;
            } else {
                tip.text('请输入长度为4~16位字符');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[0] = false;
            }
        },

        /******检测密码格式******/
        passwordTest: function (tip, inputBox, value) {
            if (countLength(value) == 0) {
                tip.text('密码不能为空');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[1] = false;
            } else if (countLength(value) >= 4 && countLength(value) <= 16) {
                tip.text('格式正确');
                tip.css('color', 'green');
                inputBox.css('border', '1px solid green');
                result[1] = true;
            } else {
                tip.text('请输入长度为4~16位字符');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[1] = false;
            }
        },

        /*****检查密码是否相同******/
        passwordConfirm: function (tip, inputBox, value1, value2) {
            if (countLength(value2) == 0) {
                tip.text('密码不能为空');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[2] = false;
            } else if (countLength(value2) >= 4 && countLength(value2) <= 16 && value1 === value2) {
                tip.text('密码正确');
                tip.css('color', 'green');
                inputBox.css('border', '1px solid green');
                result[2] = true;
            } else if (value1 != value2 || countLength(value2) == 0) {
                tip.text('请输入相同密码');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[2] = false;
            } else {
                tip.text('请输入长度为4~16位字符');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[2] = false;
            }
        },

        /*****邮箱检测******/
        emailTest: function (tip, inputBox, value) {
            var reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (reg.test(value)) {
                tip.text('邮箱可用');
                tip.css('color', 'green');
                inputBox.css('border', '1px solid green');
                result[3] = true;
            } else if (countLength(value) == 0) {
                tip.text('请输入邮箱地址');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[3] = false;
            } else {
                tip.text('请输入正确邮箱地址');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[3] = false;
            }
        },

        /*****手机号码检测*****/
        phoneTest: function (tip, inputBox, value) {
            if (/^\d{13}$/.test(value)) {
                tip.text('手机号码可用');
                tip.css('color', 'green');
                inputBox.css('border', '1px solid green');
                result[4] = true;
            } else {
                tip.text('请输入正确手机号码');
                tip.css('color', 'red');
                inputBox.css('border', '1px solid red');
                result[4] = false;
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

    /****计算长度*****/
    function countLength(str) {
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
})

