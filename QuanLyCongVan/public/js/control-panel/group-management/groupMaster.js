var msg_err_file = [MsgNo.ChuaChonFile];
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
            SaveGroup();
        });
        $('#btn-save-trans').on('click', function () {
            SaveGroupTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });
        $('#btn-delete').on('click', function () {
            DeleteGroup();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}
function SaveGroup() {
    try {
        var err1 = validate("#form-group-main");
        if (!err1) {
            $('#form-group-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editGroup + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editGroup + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-group-trans');
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
        }, '<b>SaveGroup:</b> ' + e.message, 4);
    }
}
function SaveGroupTrans() {
    try {
        if (!validate("#form-group-trans")) {
            $('#form-group-trans').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-group-trans');
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
        }, '<b>SaveGroupTrans:</b> ' + e.message, 4);
    }
}
function ReferTranslate() {
    try {
        $.ajax({
            type: 'GET',
            url: url.referGroupWithLang,
            data: {
                id: $('#IdGroup_Trans').val(),
                lang: $('#LanguageTrans').val()
            },
            success: function (res) {
                SetDataTrans('#form-group-trans', res);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslate:</b> ' + e.message, 4);
    }
}

function DeleteGroup() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteGroup,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdGroup').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createGroup;
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
        }, '<b>DeleteGroup:</b> ' + e.message, 4);
    }
}