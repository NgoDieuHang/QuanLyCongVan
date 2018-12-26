var msg_err_file = [MsgNo.ChuaChonFile];
/*
 * Các xử lý cho phần thêm danh sách lỗi
 * Author       :   HoangNM -13/08/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
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
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function Init() {
    try {
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveErrorMsg();
        });
        $('#btn-save-trans').on('click', function () {
            SaveErrorMsgTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });
        $('#btn-delete').on('click', function () {
            DeleteErrorMsg();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}

/*
 * hiển thị thông tin khi thay đổi ngôn ngữ
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function ReferTranslate() {
    try {
        $.ajax({
            type: 'GET',
            url: url.referSlideWithLang,
            data: {
                id: $('#IdErroMsg_Trans').val(),
                lang: $('#LanguageTrans').val()
            },
            success: function (res) {
                SetDataTrans('#form-errorMsg-trans', res);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslate:</b> ' + e.message, 4);
    }
}
/*
 * lưu thông tin của errorMgs
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveErrorMsg() {
    try {
        var err1 = validate("#form-photo-main");
        if (!err1 ) {
            $('#form-photo-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editErrorMsg + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editErrorMsg + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-errorMsg-trans');
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
        }, '<b>SaveErrorMsg:</b> ' + e.message, 4);
    }
}

/*
 * lưu thông tin của errorMgs bằng ngôn ngữ khác
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveErrorMsgTrans() {
    try {
        if (!validate("#form-errorMsg-trans")) {
            $('#form-errorMsg-trans').ajaxSubmit({
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
                        fillError(res.ListError, '#form-errorMsg-trans');
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
        }, '<b>SaveErrorMsgTrans:</b> ' + e.message, 4);
    }
}

/*
 * xóa ErrorMgs
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function DeleteErrorMsg() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteErrorMsg,
                    dataType: 'json',
                    data: {
                        ids: [$('#idErrorMsg').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createErrorMsg;
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
        }, '<b>DeleteErrorMsg:</b> ' + e.message, 4);
    }
}