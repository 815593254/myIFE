$(function () {
    $('#inputCompany').hide();
    $('#radioZoom').on('change', function () {
        if ($('#radioZoom').find('input:checked').val() == 'yes') {
            $('#selectSchool').show();
            $('#inputCompany').hide();
        }else{
            $('#selectSchool').hide();
            $('#inputCompany').show();
        }
    })
    $('#shanghaiSchool').hide();
    $('#guangzhouSchool').hide();
    $('#selectCity').on('change',function(){
        if($('#selectCity').find(':checked').val()=='北京'){
            $('#beijinSchool').show();
            $('#shanghaiSchool').hide();
            $('#guangzhouSchool').hide();
        }else if($('#selectCity').find(':checked').val()=='上海'){
            $('#beijinSchool').hide();
            $('#shanghaiSchool').show();
            $('#guangzhouSchool').hide();
        }else{
            $('#beijinSchool').hide();
            $('#shanghaiSchool').hide();
            $('#guangzhouSchool').show();
        }
    })

})