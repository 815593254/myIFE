
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
                label: $('#optBox').find('#labelText').val(),
                min: $('#optBox').find('#min').val(),
                max: $('#optBox').find('#max').val()
            },
            rule: {
                dom: $('#ruleBox'),
                val: $('#ruleBox').find(':checked').val()
            }
        }
    }
}
var optSet = new OptValBox();
var optCreate = new OptCreate();

$('#typeBox').on('change', function () {
    if ($(this).find(':checked').val() == 'input') {
        $('#len').show();
        $('#ruleBox').show();
    } else {
        $('#len').hide();
        $('#ruleBox').hide();
    }
})

$('#ruleBox').on('change', function () {
    if ($(this).find(':checked').val() == 'text' || $(this).find(':checked').val() == 'pwd') {
        $('#len').show();
    } else {
        $('#len').hide();
    }
})

$('#addBtn').click(function () {
    if ($('#labelText').val() == '') {
        alert('表单名不能为空');
        return;
    }
    FormCreate.createForm(optCreate.returnOpt(optSet.getOpt()), $('#formDom'));
});