$(function () {
    var arr = [];
    var num = 0;
    var tagArr = [];

    $('#tagInputDiv button').on('click', function () {   //绑定事件，点击添加
        var tagTmp = $('#tagInputDiv input').val().trim();
        if (tagTmp == '') {
            return;
        };
        for (var i = 0; i < $('#tagInputDiv table tr td').length; i++) {
            if (tagTmp == $('#tagInputDiv table tr td')[i].innerText) {
                $('#tagInputDiv input').val('');
                return;
            }
        }
        if (num >= 2) {
            $('#tagInputDiv table tr td:first-child').remove();
        }
        $('#tagInputDiv table tr').append("<td class='td_style'>" + tagTmp + "</td>");
        $('#tagInputDiv input').val('');
        num++;
    });


    $('#tagInputDiv input').on("keyup", function () {
        if (/.*[,，.;。\s]$/.test(this.value)) {
            if (this.value.trim() != '') {
                var tagTmp = this.value.trim().match(/[^,，.;。\s]*/);
                if (!tagSet.has(tagTmp)) {
                    if (tagArr.length >= 10) {
                        tagSet.delete(tagArr.shift());
                    }
                    tagArr.push(tagTmp);
                    tagSet.add(tagTmp);
                }
                $('#tagInputDiv table tr').writeList(tagArr);
                this.value = '';
            }
        }
    });
    $('#tagInputDiv table tr').on('mouseover', 'td', function () {
        var tmp = this.innerText;
        this.innerText = `删除：${tmp}`;
        this.style.width = '80px'
    });
    $('#tagInputDiv table tr').on('mouseout', 'td', function () {
        this.innerText = this.innerText.replace("删除：", '');
        this.style.width = "30px";
    });
    $('#tagInputDiv table tr').on("click", "td", function () {  //绑定事件，点击删除
        console.log(tagArr.indexOf(this.innerText.replace('删除：', '')));
        tagArr.splice(tagArr.indexOf(this.innerText.replace('删除：', '')), 0);
        this.remove();
    });


    $('#list').on("click", "td", function () {  //绑定事件，点击删除
        this.remove();
    });

    $('#left_input').on('click', function () {  //从左侧输入，
        var strTmp = StrToStrarr($('#input_list').val())   //测试输入是否合法
        strTmp.map(function (s) {
            arr.unshift(s);
        })
        $('#list').writeList(arr);   //显示
        $('#input_list').val('');  //清空输入框
    });

    $('#right_input').on('click', function () {
        var strTmp = StrToStrarr($('#input_list').val());
        strTmp.map(function (s) {
            arr.push(s);
        })
        $('#list').writeList(arr);
        $('#input_list').val('');
    });

    $('#left_out').on('click', function () {   //删除
        arr.shift();
        $('#list').writeList(arr);
    });

    $('#right_out').on('click', function () {
        arr.pop();
        $('#list').writeList(arr);
    });

    $("#searchButton").on('click', function () {
        searchStr($('#search').val());
    });

    $.fn.writeList = function (arr) {    //扩展一个写数组的函数
        var that = this;
        this.find('td').remove();
        arr.map(function (x) {
            that.append("<td class='td_style'>" + x + "</td>");
        });
        return this;
    }

    function StrToStrarr(str) {    //把字符串按，；等隔开放入数组
        return str.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function (e) {
            if (e != '' && e.length > 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    function searchStr(ss) {    //搜索目标字符并高亮
        var arrTmp = [];
        var reg = new RegExp(ss, 'g');
        writeList(arr);
        arr.map(function (st) {
            arrTmp.push(st.replace(reg, '<span class="highlight">' + ss + '</span>'))
        });
        writeList(arrTmp);
    }

    $('#removeAll').on('click', function () {    //清空
        $('#list').find('td').remove();;
    });
})