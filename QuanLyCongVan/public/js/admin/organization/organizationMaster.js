$(document).ready(function () {
    try {
        InitEvents();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ready:</b> ' + e.message, 4);
    }
});

function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveOrganization();
        });
        $('#btn-delete').on('click', function () {
            DeleteOrganization();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}
function SaveOrganization() {
    try {
        var err1 = validate("#form-organization");
        if (!err1) {
            $('#form-organization').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editOrganization + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editOrganization + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-Organization-trans');
                        $('.item-error').first().focus();
                    } else {
                        jMessage(res.MsgNo, function () {
                            $('[tabindex=1]').focus();
                        });
                    }
                },
            });
        }
        else {
            $('.item-error').first().focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>SaveOrganization:</b> ' + e.message, 4);
    }
}

function DeleteOrganization() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteOrganization,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdOrganization').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createOrganization;
                        } else {
                            jMessage(res.MsgNo, function (ok) { });
                        }
                    }
                });
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>DeleteOrganization:</b> ' + e.message, 4);
    }
}