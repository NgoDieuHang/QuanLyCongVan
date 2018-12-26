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
        $('#TieuDe').on('blur', function () {
            if ($('#IsInsert').val() == "I") {
                $('#BeautyId').val(getStringWithoutDiacritics($('#TieuDe').val()));
            }  
        });
        $('#btn-save').on('click', function () {
            SaveNews();
        });
        $('#btn-save-trans').on('click', function () {
            SaveNewsTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });
        $('#btn-delete').on('click', function () {
            DeleteNews();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}


function SaveNews() {
    try {
        $('#NoiDung').val(CKEDITOR.instances['NoiDung'].getData());
        var err1 = validate("#form-news-main");
        var err2 = ValidateFile(0);
        if (!err1 && !err2) {
            $('#form-news-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editNews + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editNews + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-news-trans');
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
        }, '<b>SaveNews:</b> ' + e.message, 4);
    }
}
function SaveNewsTrans() {
    try {
        $('#NoiDung_Trans').val(CKEDITOR.instances['NoiDung_Trans'].getData());
        if (!validate('#form-news-trans')) {
            $('#form-news-trans').ajaxSubmit({
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
                        fillError(res.ListError, '#form-news-trans');
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
        }, '<b>SaveNewsTrans:</b> ' + e.message, 4);
    }
}
function ReferTranslate() {
    try {
        $.ajax({
            type: 'GET',
            url: url.referNewsWithLang,
            data: {
                id: $('#IdNews_Trans').val(),
                lang: $('#LanguageTrans').val()
            },
            success: function (res) {
                SetDataTrans('#form-news-trans', res);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslate:</b> ' + e.message, 4);
    }
}

function DeleteNews() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteNews,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdNews').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createNews;
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
        }, '<b>DeleteNews:</b> ' + e.message, 4);
    }
}