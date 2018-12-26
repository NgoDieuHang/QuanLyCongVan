var msg_err_file = [MsgNo.ChuaChonFile];
/*
 * Các xử lý thêm,sửa ,xóa danh sách hình ảnh
 * Author       :   HoangNM - 13/08/2018 - create
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
        if ($('#imageName').val() != '') {
            msg_err_file[0] = 0;
        }
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
            SavePhotos();
        });
        $('#btn-save-trans').on('click', function () {
            SavePhotoTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });
        $('#btn-delete').on('click', function () {
            DeletePhotos();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}
/*
 * lấy dữ liệu khi thay đổi ngôn ngữ
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
                id: $('#IdPhoto_Trans').val(),
                lang: $('#LanguageTrans').val()
            },
            success: function (res) {
                SetDataTrans('#form-photo-trans', res);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslate:</b> ' + e.message, 4);
    }
}

/*
 * lưu thông tin thay đổi hoặc thêm mới
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SavePhotos() {
    try {
        var err1 = validate("#form-photo-main");
        var err2 = ValidateFile(0);
        if (!err1 && !err2) {
            $('#form-photo-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editPhotos + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editPhotos + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-photo-trans');
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
        }, '<b>SavePhotos:</b> ' + e.message, 4);
    }
}
/*
 * lưu thông tin bằng ngôn ngữ khác
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SavePhotoTrans() {
    try {
        if (!validate("#form-photo-trans")) {
            $('#form-photo-trans').ajaxSubmit({
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
                        fillError(res.ListError, '#form-photo-trans');
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
        }, '<b>SavePhotoTrans:</b> ' + e.message, 4);
    }
}
/*
 * xóa hình ảnh
 * Author       :   HoangNM - 13/08/2018 - create
 * Param        :   
 * Output       :   
 */
function DeletePhotos() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deletePhotos,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdPhotos').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createPhotos;
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
        }, '<b>DeletePhotos:</b> ' + e.message, 4); 
    }
}