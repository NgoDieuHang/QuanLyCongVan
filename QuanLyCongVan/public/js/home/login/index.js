/*
 * Các xử lý cho trang login
 * Author       :   QuyPN - 27/05/2018 - create
 * Package      :   public/home
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    InitLogin();
    InitEventLogin();
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   QuyPN - 27/05/2018 - create
 * Param        :   
 * Output       :   
 */
function InitLogin() {
    try {
        FillRemember();
        $('[tabindex="1"]').first().focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Login:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   QuyPN - 27/05/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventLogin() {
    try {
        $('#btn-login').on('click', function () {
            SubmitLogin();
        });
        $('#btn-login-FB').on('click', function () {
            loginByFB();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Login:</b> ' + e.message, 4);
    }
}
/*
 * Thực hiện kiểm tra thông tin login
 * Author       :   QuyPN - 27/05/2018 - create
 * Param        :   
 * Output       :   
 */
function SubmitLogin() {
    try {
        if (!validate('#form-login')) {
            $.ajax({
                type: 'POST',
                url: $('#form-login').attr('action'),
                dataType: 'json',
                data: {
                    Username: $('#Username').val(),
                    Password: calcMD5($('#Password').val())
                },
                success: CheckLoginSuccess
            });
        }
        else {
            $('.item-error').first().focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Submit Login:</b> ' + e.message, 4);
    }
}
/*
 * Xử lý dữ liệu trả về sau khi request lên server để kiểm tra tài khoản login
 * Author       :   QuyPN - 28/05/2018 - create
 * Param        :   res - Đối tượng trả về từ server
 * Output       :   
 */
function CheckLoginSuccess(res) {
    try {
        if (res.Code == 200) {
            callLoading();
            $.cookie('token', res.ThongTinBoSung1, { expires: timeToken, path: '/' });
            CheckRemember();
            window.location = "/";
        } else if (res.Code == 201) {
            fillError(res.ListError);
            $('.item-error').first().focus();
        } else if (res.Code == 203 || res.Code == 205) {
            jMessage(0, function (ok) {
            }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
        } else {
            jMessage(res.MsgNo, function (ok) { });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Check Login Success:</b> ' + e.message, 4);
    }
}
/*
 * Điền trước giá trị username và password nếu người dùng có chọn remmeber trước đó
 * Author       :   QuyPN - 28/05/2018 - create
 * Param        :   
 * Output       :   
 */
function FillRemember() {
    try {
        if (window.localStorage.getItem("Username")) {
            $('#Username').val(Base64.decode(window.localStorage.getItem("Username")));
            $('#Password').val(Base64.decode(window.localStorage.getItem("Password")));
            $('#Remember').prop('checked', true);
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Fill Remember:</b> ' + e.message, 4);
    }
}
/*
 * Kiểm tra xem người dùng có chọn remmember hay không, nếu có thì lưu thông tin đăng nhập, nếu không thì xóa dữ liệu đã lưu
 * Author       :   QuyPN - 28/05/2018 - create
 * Param        :   
 * Output       :   
 */
function CheckRemember() {
    try {
        if ($('#Remember').is(':checked')) {
            window.localStorage.setItem("Username", Base64.encode($('#Username').val()));
            window.localStorage.setItem("Password", Base64.encode($('#Password').val()));
        }
        else {
            window.localStorage.removeItem("Username");
            window.localStorage.removeItem("Password");
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Check Remember:</b> ' + e.message, 4);
    }
}