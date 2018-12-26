/*
 * Các xử lý cho thêm và sửa lớp học
 * Author       :   TramHTD - 04/09/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
var error = false;
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
 * Author       :   TramHTD - 04/09/2018 - create
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
 * Author       :   TramHTD - 04/09/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveClass();
        });
        $('#btn-save-trans').on('click', function () {
            SaveClassTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });
        $('#btn-delete').on('click', function () {
            DeleteClass();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}
/*
 * Lưu thông tin của lớp học
 * Author       :   TramHTD - 04/09/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveClass() {
    try {
        if (!validate("#form-class-main")) {
            $('#form-class-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editClass + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editClass + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-class-main');
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
        }, '<b>SaveClass:</b> ' + e.message, 4);
    }
}
/*
 * Lưu thông tin của lớp học bằng ngôn ngữ khác
 * Author       :   TramHTD - 04/09/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveClassTrans() {
    try {
        if (!validate("#form-class-trans")) {
            $('#form-class-trans').ajaxSubmit({
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
                        fillError(res.ListError, '#form-class-trans');
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
        }, '<b>SaveClassTrans:</b> ' + e.message, 4);
    }
}
/*
 * Hiển thị thông tin khi thay đổi ngôn ngữ
 * Author       :   TramHTD - 04/09/2018 - create
 * Param        :   
 * Output       :   
 */
function ReferTranslate() {
    try {
        $.ajax({
            type: 'GET',
            url: url.referClassWithLang,
            data: {
                id: $('#IdClass_Trans').val(),
                lang: $('#LanguageTrans').val()
            },
            success: function (res) {
                SetDataTrans('#form-class-trans', res);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslate:</b> ' + e.message, 4);
    }
}
/*
 * Xóa lớp học
 * Author       :   TramHTD - 04/09/2018 - create
 * Param        :   
 * Output       :   
 */
function DeleteClass() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteClass,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdClass').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createClass;
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
        }, '<b>DeleteClass:</b> ' + e.message, 4);
    }
}
