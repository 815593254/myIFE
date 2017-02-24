var FormCreate = (function () {
    /*****添加input表单******/
    var addInput = function (data, dom) {
        var tmp = getVal(data);
        dom.append('<label>' + tmp.lable + '</label><input type="text" id="input_' + tmp.id + '"><span></span><br />');
        evenBind(tmp.id, tmp.validator, tmp.defaultText, tmp.successText, tmp.failText, tmp.min, tmp.max);
    };

    /*******添加文本域表单********/
    var addTextArea = function (data, dom) {
        var tmp = getVal(data);
        dom.append('<label>' + tmp.lable + '</label><textarea id="input_' + tmp.id + '"></textarea><span></span><br />');
        evenBind(tmp.id, tmp.validator, tmp.defaultText, tmp.successText, tmp.failText, tmp.min, tmp.max);
    };

    /******添加密码表单******/
    var addPassword = function (data, dom) {
        var tmp = getVal(data);
        dom.append('<label>' + tmp.lable + '</label><input type="password" id="input_' + tmp.id + '"><span></span><br />');
        dom.append('<label>确认' + tmp.lable + '</label><input type="password" id="input_again_' + tmp.id + '"><br /><span></span><br />');
        evenBind(tmp.id, tmp.validator[0], tmp.defaultText[0], tmp.successText, tmp.failText[0], tmp.min, tmp.max);
        pwdAgainBind(tmp.id, tmp.validator[1], tmp.defaultText[1], tmp.successText, tmp.failText[1]);
    };

    var getVal = function (data) {
        return {
            id: data.id,
            lable: data.lable,
            defaultText: data.defaultText,
            successText: data.successText,
            failText: data.failText,
            validator: data.validator,
            min: data.min,
            max: data.max
        }
    }
    /******绑定事件函数******/
    var evenBind = function (id, validator, defaultText, successText, failText, min, max) {
        $('#input_' + id).on('focus', function () { $('#input_' + id).next().text(defaultText) });
        $('#input_' + id).on('blur', function () {
            if (validator($('#input_' + id).val(), min, max)) {
                $('#input_' + id).removeClass('border_fail').addClass('border_success');
                $('#input_' + id).next().text(successText).removeClass('fail').addClass('success');
            } else {
                $('#input_' + id).removeClass('border_success').addClass('border_fail');
                $('#input_' + id).next().text(failText).removeClass('success').addClass('fail');
            }
        });
    }

    /*******绑定密码函数********/
    var pwdAgainBind = function (id, validator, defaultText, successText, failText) {
        $('#input_again_' + id).on('focus', function () {
            $('#input_again_' + id).next().text(defaultText)
        }).on('blur', function () {
            if (validator($('#input_' + id).val(), $('#input_again_' + id).val())) {
                $('#input_again_' + id).removeClass('border_fail').addClass('border_success');
                $('#input_again_' + id).next().text(successText).removeClass('fail').addClass('success');
            } else {
                $('#input_again_' + id).removeClass('border_success').addClass('border_fail');
                $('#input_again_' + id).next().text(failText).removeClass('success').addClass('fail');
            }
        });
    }

    return {
        createForm: function (data, dom) {
            switch (data.type) {
                case 'input':
                    switch (data.textType) {
                        case 'text':
                            addInput(data, dom);
                            break;
                        case 'password':
                            addPassword(data, dom);
                            break;
                    }
                    break;
                case 'textarea':
                    addTextArea(data, dom);
                    break;
            }
        }
    }
})()

