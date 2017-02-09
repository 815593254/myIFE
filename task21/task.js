// $(function () {

//     var list = $('#list');
//     var input_list = $('#input_list');
//     list.on("click", "td", function () {
//         this.remove();
//     });

//     $('#left_input').on('click', function () {
//         if (/^\d+$/.test(input_list.val())) {
//             list.prepend("<td>" + input_list.val() + "</td>");
//         }
//     });

//     $('#right_input').on('click', function () {
//         if (/^\d+$/.test(input_list.val())) {
//             list.append("<td>" + input_list.val() + "</td>");
//         }
//     });

//     $('#left_out').on('click', function () {
//         var tmp = list.find('td:first-child').text();
//         list.find('td:first-child').remove();
//         alert(tmp);
//     });

//     $('#right_out').on('click', function () {
//         var tmp = list.find('td:last-child').text();
//         list.find('td:last-child').remove();
//         alert(tmp);
//     });
// })

$(function () {
    var arr = [];
    var list = $('#list');
    var input_list = $('#input_list');
    list.on("click", "td", function () {  //显示列表，点击删除
        this.remove();
    });

    $('#left_input').on('click', function () {  //从左侧输入，
        var strTmp = StrToStrarr(input_list.val())   //测试语法
        strTmp.map(function(s){
            arr.unshift(s);
        })
        // arr.unshift(input_list.val());  //压入数组
        write_list();   //显示
        input_list.val('');  //清空输入框
    });

    $('#right_input').on('click', function () {
        var strTmp = StrToStrarr(input_list.val());
        strTmp.map(function(s){
            arr.push(s);
        }) 
        write_list();
        input_list.val('');
    });

    $('#left_out').on('click', function () {   //删除
        arr.shift();
        write_list();
    });

    $('#right_out').on('click', function () {
        arr.pop();
        write_list();
    });

    function write_list() {  //修改dom显示出结果
        list.find('td').remove();
        arr.map(function (x) {
            list.append("<td>" + x + "</td>");
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
})