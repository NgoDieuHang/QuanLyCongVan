/*
 * Các xử lý cho trang gửi liên hệ
 * Author       :   HaLTH - 03/07/2018 - create
 * Package      :   public/home
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    InitContact();
    InitEventContact();
});

/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HaLTH - 03/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitContact() {
    try {
        $('[tabindex="1"]').first().focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Contact:</b> ' + e.message, 4);
    }
}

/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HaLTH - 03/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventContact() {
    try {
        $('#btn-contact').on('click', function () {
            SaveContact();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Contact:</b> ' + e.message, 4);
    }
}

/*
 * Tiến hành gửi thông tin lên server để lưu thông tin người dùng cung cấp để liên hệ
 * Author       :   HaLTH - 03/07/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveContact() {
    try {
        var error1 = validate('#form-contact');
        if (!error1) {
            $.ajax({
                type: $('#form-contact').attr('method'),
                url: $('#form-contact').attr('action'),
                dataType: 'json',
                data: {
                    HoTen: $('#HoTen').val(),
                    Email: $('#Email').val(),
                    SoDienThoai: $('#SoDienThoai').val(),
                    NoiDung: $('#NoiDung').val()
                },
                success: SaveContactResponse
            });
        }
        else {
            $('.item-error').first().focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Save Contact:</b> ' + e.message, 4);
    }
}

/*
 * Xử lý sau khi đăng ký tài khoản
 * Author       :   HaLTH - 03/07/2018 - create
 * Param        :   res - đối tượng response trả về từ server
 * Output       :  
 */
function SaveContactResponse(res) {
    try {
        if (res.Code == 200) {
            callLoading();
            jMessage(res.MsgNo, function (ok) { });
            location.reload();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Save Contact Response:</b> ' + e.message, 4);
        return true;
    }
}

