var msg_err_file = [MsgNo.ChuaChonFile];

/*
 * Các xử lý cho hiển thị danh sách những điều đạt được
 * Author       :   HaLTH - 01/08/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    try {
        InitThingsAchieved();
        InitThingsAchievedEvents();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Ready:</b> ' + e.message, 4);
    }
});

/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HaLTH - 01/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitThingsAchieved() {
    try {
        setTabIndexMenu();
        $('[tabindex=1]').focus();
        if ($('#imageName').val() != '') {
            msg_err_file[0] = 0;
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitThingsAchieved:</b> ' + e.message, 4);
    }
}

/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HaLTH - 01/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitThingsAchievedEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveThingsAchieved();
        });
        $('#btn-save-trans').on('click', function () {
            SaveThingsAchievedTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });
        $('#btn-delete').on('click', function () {
            DeleteThingsAchieved();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitThingsAchievedEvents:</b> ' + e.message, 4);
    }
}
function SaveThingsAchieved() {
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
                            console.log(url.editThingsAchieved + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editThingsAchieved + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
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
        }, '<b>SaveThingsAchieved:</b> ' + e.message, 4);
    }
}
function SaveThingsAchievedTrans() {
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
        }, '<b>SaveThingsAchievedTrans:</b> ' + e.message, 4);
    }
}
function ReferTranslate() {
    try {
        $.ajax({
            type: 'GET',
            url: url.referThingsAchievedWithLang,
            data: {
                id: $('#IdThingsAchieved_Trans').val(),
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

function DeleteThingsAchieved() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteThingsAchieved,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdThingsAchieved').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createThingsAchieved;
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
        }, '<b>Delete Things Achieved:</b> ' + e.message, 4);
    }
}