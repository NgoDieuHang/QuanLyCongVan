var msg_err_file = [MsgNo.ChuaChonFile];
$(document).ready(function () {
    try {
        Init();
        InitEvents();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ready:</b> ' + e.message, 4);
    }
});
function Init() {
    try {
        setTabIndexMenu();
        $('[tabindex=1]').focus();
        if ($('#imageName').val() != '') {
            msg_err_file[0] = 0;
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init:</b> ' + e.message, 4);
    }
}

function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveSlide();
        });
        $('#btn-save-trans').on('click', function () {
            SaveSlideTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });
        $('#btn-delete').on('click', function () {
            DeleteSlide();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}
function SaveSlide() {
    try {
        var err1 = validate("#form-slide-main");
        var err2 = ValidateFile(0);
        if (!err1 && !err2) {
            $('#form-slide-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editSlide + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editSlide + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-slide-trans');
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
        }, '<b>SaveSlide:</b> ' + e.message, 4);
    }
}
function SaveSlideTrans() {
    try {
        if (!validate("#form-slide-trans")) {
            $('#form-slide-trans').ajaxSubmit({
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
                        fillError(res.ListError, '#form-slide-trans');
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
        }, '<b>SaveSlideTrans:</b> ' + e.message, 4);
    }
}
function ReferTranslate() {
    try {
        $.ajax({
            type: 'GET',
            url: url.referSlideWithLang,
            data: {
                id: $('#IdSlide_Trans').val(),
                lang: $('#LanguageTrans').val()
            },
            success: function (res) {
                SetDataTrans('#form-slide-trans', res);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslate:</b> ' + e.message, 4);
    }
}

function DeleteSlide() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteSlide,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdSlide').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createSlide;
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
        }, '<b>DeleteSlide:</b> ' + e.message, 4);
    }
}