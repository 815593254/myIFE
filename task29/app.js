$(function () {
    var inputValue = $('[name = inputValue]');

    $("#inputBtn").on('click', function () {
        validate(inputValue.val());
    })

    function validate(inputValue) {   //检测格式，输出提示
        if (countLength(inputValue) == 0) {
            $('#tip').text('姓名不能为空');
            $('#tip').css('color', 'red');
            $([name = "inputValue"]).css('border', '1px solid red');
        } else if (countLength(inputValue) >= 4 && countLength(inputValue) <= 16) {
            $('#tip').text('格式正确');
            $('#tip').css('color', 'green');
            $([name = "inputValue"]).css('border', '1px solid green');
        } else {
            $('#tip').text('请输入长度为4~16位字符');
            $('#tip').css('color', 'red');
            $([name = "inputValue"]).css('border', '1px solid red');
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

