$(document).ready(function () {
    
    initSetting();

    loadData();   

    $('#add-dialog-button').click(function () {
        dialog.dialog('open');
    });

    $('.ck-right').click(function () {
        $(".ck-left").prop("checked", false);
    });

    $('.ck-left').click(function () {
        $('.ck-right').prop("checked", false);
    });

    $('#cancel-dialog-button').click(function () {
        dialog.dialog('close');
    });

    $('#tbl').on('dblclick', 'tr', function () {
        dialog.dialog('open');
    });
})


//xu ly ngay thang
function formatDate(date) {
    var date = new Date(date);
    var day = date.getDay();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    var result = day + '/' + month + '/' + year;
    return result;
}


function loadData() {
    // load du lieu:
    // 1. buoc1 1 : hoi service lay du lieu: (api.manhnv.net/api/customers)
    // 2. buoc 2 : XY LY DU LIEU   
    // 3, buoc 3: build hmtl va append len UI;

    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
        async: false,
    }).done(function (response) {
        console.log(response);
        $('#tbl tbody').empty();
        for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            var DOB = formatDate(response[i].DateOfBirth);
            var trHTML = `<tr>
                        <td>${response[i].CustomerCode}</td>
                        <td>${response[i].FullName}</td>
                        <td>${response[i].GenderName}</td>
                        <td>${DOB}</td>
                        <td></td>
                        <td>${response[i].PhoneNumber}</td>
                        <td>${response[i].Email}</td>
                        <td>${response[i].Address}</td>
                    </tr>`;
            $('#tbl > tbody:last-child').append(trHTML);
        }
    }).fail(function (response) {

    })
}

function initSetting() {
    dialog = $('#add-dialog').dialog({
        autoOpen: false,
        height: 623,
        width: 750,
        modal: true,
    });
}

