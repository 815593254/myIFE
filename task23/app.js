$(function () {
    var divList = [];
    var timer;
    $('#dlrBtn').on('click', function () {  //前序遍历
        reset();
        dlrOrder($('#root'));
        changeColor();
    });

    $('#postBtn').on('click', function () {  //后序遍历
        reset();
        postOrder($('#root'));
        changeColor();
    })

    $('#searchBtn').on('click', function () {   //查找
        reset();
        if (searchBinaryTree($('#root'))) {
            $('#result').text('已找到');
            changeColor()
        } else {
            $('#result').text('找不到')
        }
    })

    /******前序遍历******/
    function dlrOrder(node) {
        if (node.html() != null) {
            divList.push(node);
            for (var i = 1; i <= node.find('>').length; i++) {
                dlrOrder(node.find(`>div:nth-child(${i})`));
            }
        }
    }

    /******后序遍历******/
    function postOrder(node) {
        if (node.html() != null) {
            for (var i = 1; i <= node.find('>').length; i++) {
                postOrder(node.find(`>div:nth-child(${i})`));
            }
            divList.push(node);
        }
    }

    /*******查找******/
    function searchBinaryTree(node) {
        if (node.html() != null) {
            if ($('#searchValue').val().trim() === node.find('>span').text()) {
                divList.push(node);
                return true;
            }
            divList.push(node);
            for (var i = 1; i <= node.find('>').length; i++) {
                if (searchBinaryTree(node.find(`>div:nth-child(${i})`))) {
                    return true;
                }
            }
        }
    }

    /******结果可视化******/
    function changeColor() {
        var i = 0;
        timer = setInterval(function () {
            if (i > 0) {
                // divList[i - 1].css('background-color', '#fff');
            }
            if (i >= divList.length) {
                clearInterval(timer);
                divList = [];
                return;
            }
            divList[i].css('background-color', '#ccc');
            i++;
        }, 500)
    }

    /******重置顏色******/
    function reset() {
        $('div').css('background-color', '#fff');
        clearInterval(timer);
        divList = [];
    }
})