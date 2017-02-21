var CreateFormOpt = function (opt) {
    this.label = opt.label;
    this.type = opt.type;
    this.validator = opt.validator;
    this.rules = opt.rules;
    this.success = opt.success;
    this.fail = opt.fail;
};

// CreateFormOption.prototype.retOpt = function () {
//     return {
//         label: this.label,
//         type: this.type,
//         validator: this.validator,
//         rules: this.rules,
//         success: this.success,
//         fail: this.fail
//     }
// }

var nameInput = new CreateFormOpt("name", "text", CheckFunction.nameTest, "必填，长度为4~18个字符，只允许输入中文、英文字母和数字,中文占2字符", "名称可用");
var passwordInput = new CreateFormOpt("password", "password", CheckFunction.passwordTest, "必填，长度为9~24个字符，只允许输入英文字母和数字", "密码可用");
var againInput = new CreateFormOpt("passwordAgain", "password", CheckFunction.passwordConfirm, "重复输入密码,俩次密码需相同", "密码正确");
var emailInput = new CreateFormOpt("email", "text", CheckFunction.emailTest, "必填，请输入正确的邮箱地址", "邮箱格式正确");
var phoneInput = new CreateFormOpt("phone", "text", CheckFunction.phoneTest, "必填，请输入正确的手机号码", "手机号码格式正确");

var CheckFunction = (function () {
    var result = [];
    return {
        /*******检测姓名格式*******/
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
})()


$('#conBtn').on('click', function () {
    var opt = [];
    $('form input:checked').each(function () {
        opt.push($(this).val());
    })

})