$(function () {
    var arr = [77,45,73,45,98,10,35,67,48,24,48,96,56,38,74,29,32, 45, 23, 56, 76, 43, 79, 99, 12, 74];
    var list = $('#list');
    var input_list = $('#input_list');
    var soft_button = $('#soft');
    list.on("click", "p", function () {
        this.remove();
    });
    $('#left_input').on('click', function () {
        if (/^\d+$/.test(input_list.val()) && 10 < input_list.val() && input_list.val() < 100) {
            if (arr.length > 60) {
                alert('队列满了');
            } else {
                arr.unshift(input_list.val());
                write_list();
                input_list.val('');
            }
        } else {
            return null;
        }
    });

    $('#right_input').on('click', function () {
        if (/^\d+$/.test(input_list.val()) && 10 < input_list.val() && input_list.val() < 100) {
            if (arr.length > 60) {
                alert('超过60个');
            } else {
                arr.push(input_list.val());
                //write_list();
                input_list.val('');
            }
        } else {
            return null;
        }
    });
    $('#left_out').on('click', function () {
        arr.shift();
        //write_list();
    });

    $('#right_out').on('click', function () {
        arr.pop();
        //write_list();
    });

    soft_button.click(function () {
        var i = 1;
        setInterval(function () {
            InsertSort(arr, arr.length, i);
            i++;
            if (i > arr.length) {
                return null;
            }
            console.log(arr);
            list.find('p').remove();
            arr.map(function (x) {
                list.append('<p style="height:' + x + 'px"></p>');
            });
        }, 300)
    });

    function write_list() {
        // list.find('p').remove();
        InsertSort(arr, arr.length);
        // arr.map(function (x) {
        //     list.append('<p style="height:' + x + 'px"></p>');
        // })
    }

    // function InsertSort(a, n) {
    //     for (var i = 1; i < n; i++) {
    //         if (a[i] < a[i - 1]) {
    //             var j = i - 1;
    //             var x = a[i];
    //             while (x < a[j]) {
    //                 a[j + 1] = a[j];
    //                 j--;
    //             }
    //             a[j + 1] = x;
    //         }
    //     }
    // }

    function InsertSort(a, n, i) {
        if (a[i] < a[i - 1]) {
            var j = i - 1;
            var x = a[i];
            while (x < a[j]) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = x;
        }
    }

    function ShellInsertSort(a, n, dk){
        for(var i = dk ; i < n ; i++){
            if(a[i] < a[i-dk]){
                var j = i-dk;
                var tmp = a[i];
                while(tmp < a[i-dk]){
                    a[i] = a[i-dk];
                    j -= dk;
                }
                a[j+dk] = tmp;
            }
        }
    }

})