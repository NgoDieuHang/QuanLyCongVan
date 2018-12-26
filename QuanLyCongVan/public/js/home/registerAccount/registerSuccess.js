/*
 * Các xử lý cho trang thông báo đăng ký tài khoản thành công
 * Author       :   QuyPN - 20/06/2018 - create
 * Package      :   public/home
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    InitPage();
    InitEventOfPage();
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   QuyPN - 20/06/2018 - create
 * Param        :   
 * Output       :   
 */
function InitPage() {
    try {
        $('[tabindex="1"]').first().focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitPage:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   QuyPN - 20/06/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventOfPage() {
    try {
        $('#btn-send-email').on('click', function () {
            SendEmail();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEventOfPage:</b> ' + e.message, 4);
    }
}
function SendEmail() {
    try{
        $.ajax({
            type: 'GET',
            url: url.sendEmail + "?idAccount=" + $('#idAccount').val(),
            success: function (res) {
                if (res.Code == 200) {
                    $.cookie('tokenAccount', res.ThongTinBoSung1, { expires: timeToken, path: '/' });
                }
                jMessage(res.MsgNo, function (ok) { });
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>SendEmail:</b> ' + e.message, 4);
    }
}