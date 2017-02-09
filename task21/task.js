$(function () {
    var arr = [];
    var list = $('#list');
    var input_list = $('#input_list');

    list.on("click", "td", function () {  //显示列表，点击删除
        this.remove();
    });

    $('#left_input').on('click', function () {  //从左侧输入，
        var strTmp = StrToStrarr(input_list.val())   //测试语法
        strTmp.map(function (s) {
            arr.unshift(s);
        })
        write_list(arr);   //显示
        input_list.val('');  //清空输入框
    });

    $('#right_input').on('click', function () {
        var strTmp = StrToStrarr(input_list.val());
        strTmp.map(function (s) {
            arr.push(s);
        })
        write_list(arr);
        input_list.val('');
    });

    $('#left_out').on('click', function () {   //删除
        arr.shift();
        write_list(arr);
    });

    $('#right_out').on('click', function () {
        arr.pop();
        write_list(arr);
    });

    $("#searchButton").on('click', function () {
        searchStr($('#search').val());
    })
    function write_list(arr) {  //修改dom显示出结果
        list.find('td').remove();
        arr.map(function (x) {
            list.append("<td class='td_style'>" + x + "</td>");
        })
    }

    function StrToStrarr(str) {
        return str.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function (e) {
            if (e != '' && e.length > 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    function searchStr(ss) {
        var arrTmp = [];
        var reg = new RegExp(ss, 'g');
        write_list(arr);
        arr.map(function (st) {
            arrTmp.push(st.replace(reg, '<span class="highlight">' + ss + '</span>'))
        });
        write_list(arrTmp);
    }

    $('#removeAll').on('click', function () {
        list.find('td').remove();;
    });

    
})