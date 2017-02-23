var FormCreate = (function () {
    var addInput = function (data, dom) {
        dom.append('<label>' + data.lable + '</label><input type="' + data.type + '" id="input_' + data.id + '"><span></span><br />');
    };
    var addTextArea = function (data, dom) {
        dom.append('<label>' + data.lable + '</label><textarea id="input_' + data.id + '"></textarea><span></span><br />');
    };
    var addRadio = function (data, dom) {

    };
    var addCheckbox = function (data, dom) {

    };
    var addSelect = function (data, dom) {

    };
    return function (data, dom) {
        switch (data.type) {
            case 'input':
                addInput(data, dom);
                break;
            case 'textarea':
                addTextArea(data, dom);
                break;
            case 'radio':
                addRadio(data, dom);
                break;
            case 'checkbox':
                addCheckbox(data, dom);
                break;
            case 'select':
                addSelect(data, dom);
        }
    }

})()

