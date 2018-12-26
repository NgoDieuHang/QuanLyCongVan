/*
 * Các xử lý cho hiển thị bảng khóa học
 * Author       :   HaLTH - 23/08/2018 - create
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
        }, '<b>Ready:</b> ' + e.message, 4);
    }
});

/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HaLTH - 23/08/2018 - create
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
 * Author       :   HaLTH - 23/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveConfiguration();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}

/*
 * Lưu chỉnh sửa cho bảng Cấu Hình
 * Author       :   HaLTH - 23/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveConfiguration() {
    try {
        var err1 = validate("#form-configuration-main");
        if (!err1) {
            var data = {
                SoLanChoPhepDangNhapSai: $('#SoLanChoPhepDangNhapSai').val(),
                ThoiGianKhoa: $('#ThoiGianKhoa').val(),
                ThoiGianTonTaiToken: $('#ThoiGianTonTaiToken').val(),
                FbAppId: $('#FbAppId').val(),
                GgClientId: $('#GgClientId').val()
            }
            $.ajax({
                type: 'POST',
                url: $('#form-configuration-main').attr('action'),
                data: data,
                success: function (res) {
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editConfiguration);
                            callLoading();
                            window.location = url.editConfiguration;
                        });
                    }
                    else {
                        jMessage(res.MsgNo, function () {
                            $('[tabindex=1]').focus();
                        });
                    }
                }
            });
        }
        else {
            $('.item-error').first().focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>SaveConfiguration:</b> ' + e.message, 4);
    }
}
