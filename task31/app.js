$('#inputCompany').hide();
$('#radioZoom').on('change', function () {
    if ($('#radioZoom').find('input:checked').val() == 'yes') {
        $('#selectCitySchool').show();
        $('#inputCompany').hide();
    } else {
        $('#selectCitySchool').hide();
        $('#inputCompany').show();
    }
})
$('#selectSchool>select').hide();
$('#selectSchool>select:first-child').show();
$('#selectCity').on('change', function () {
    $('#selectSchool>select').each(function () {
        $(this).hide();
    })
    $('#selectSchool').find(`:nth-child(${$('#selectCity').find(':checked').index() + 1})`).show();
})
