
function changePassword() {
    try {
        if (!validate('#form-changePassword')) {
            $.ajax({
                type: 'POST',
                url: $('#form-changePassword').attr('action') + '?pass=' + calcMD5($('#changePassword').val()) ,
                success: exactPassWord,
                global: false
            });
        } else {
            
            $('.item-error').first().focus();
        }  
    }
    catch (e) {
        
    }

}
function exactPassWord(res) {
    if (res == 'True') {
        var error1 = validate('#form-changePassword');
        var error2 = validateValue();
        if (!error1 && !error2) {
            $.ajax({
                type: $('#form-changePassword').attr('method'),
                url: url.changeMail,
                dataType: 'json',
                data: {
                    newPassword: calcMD5($('#newPassword').val()),
                    ConfirmPassword: calcMD5($('#ConfirmPassword').val())
                },
                success: changePasswordSuccess
            });
        }
        else {
            $('.item-error').first().focus();
        }
    } else {
        $('#changePassword').errorStyle("bạn nhập mật khẩu không đúng,vui lòng nhập lại");
    }
}

/*
 * Kiểm tra các điều kiện ràng buộc khắc về dữ liệu của phần thay đổi password
 * Author       :   HoangNM - 05/07/2018 - create
 * Param        :   
 * Output       :   true nếu có lỗi - false nếu không có lỗi
 */
function validateValue() {
    try {
        var error = false;
        var lang = getLang();
        var resPassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,50}$/;
        var regUsername = /^[a-zA-Z0-9_.-]{6,50}$/;
        if ($('#changePassword').val() != '' && !resPassword.test($('#changePassword').val())) {
            error = true;
            $('#changePassword').errorStyle(_text[lang][MsgNo.SaiFormatMatKhau]);
        }
        if ($('#newPassword').val() != '' && !resPassword.test($('#newPassword').val())) {
            error = true;
            $('#newPassword').errorStyle(_text[lang][MsgNo.SaiFormatMatKhau]);
        }
        if ($('#newPassword').val() != '' && $('#changePassword').val() == $('#newPassword').val()) {
            error = true;
            $('#newPassword').errorStyle("mat khau trung vơi mat khau cu");
        }
        if ($('#ConfirmPassword').val() != '' && $('#newPassword').val() != $('#ConfirmPassword').val()) {
            error = true;
            $('#ConfirmPassword').errorStyle("mật khẩu xác nhận không đúng");
        }
        return error;
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Validate Value:</b> ' + e.message, 4);
        return true;
    }
}
/*
 * Xử lý dữ liệu trả về sau khi request lên server để thay đổi password
 * Author       :   HoangNM - 05/07/2018 - create
 * Param        :   res - Đối tượng trả về từ server
 * Output       :   
 */
function changePasswordSuccess(res) {
    try {
        if (res.Code == 200) {
            jMessage(22);
            location.reload();
        } else {
            jMessage(res.MsgNo, function (ok) { });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>changePasswordSuccess:</b> ' + e.message, 4);
    }
}


function SaveUsername() {
    try {
        var error1 = validate('#form-saveUsername');
        var error2 = validateValue2();
        if (!error1 && !error2) {
            $.ajax({
                type: $('#form-saveUsername').attr('method'),
                url: $('#form-saveUsername').attr('action'),
                dataType: 'json',
                data: {
                    Username: $('#username').val(),
                    Password: calcMD5($('#Password').val())
                },
                success: SaveSuccess
            });
        }
        else {
            $('.item-error').first().focus();
        }
    }
    catch (e) {

    }
}

/*
 * Xử lý dữ liệu trả về sau khi lưu Username thành công
 * Author       :   HoangNM - 05/07/2018 - create
 * Param        :   res - Đối tượng trả về từ server
 * Output       :   
 */
function SaveSuccess(res) {
    try {
        if (res.Code == 200) {
            jMessage(15);
            location.reload();
        } else {
            jMessage(res.MsgNo, function (ok) { });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>SaveUsername:</b> ' + e.message, 4); 
    }
}

/*
 * Kiểm tra các điều kiện ràng buộc khắc về dữ liệu của phần lưu username
 * Author       :   HoangNM - 06/07/2018 - create
 * Param        :   
 * Output       :   true nếu có lỗi - false nếu không có lỗi
 */
function validateValue2() {
    try {
        var error = false;
        var lang = getLang();
        var resPassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,50}$/;
        var regUsername = /^[a-zA-Z0-9_.-]{6,50}$/;
        if ($('#username').val() != '' && !regUsername.test($('#username').val())) {
            error = true;
            $('#username').errorStyle(_text[lang][MsgNo.TenDangNhapSai]);
        }
        if ($('#Password').val() != '' && !resPassword.test($('#Password').val())) {
            error = true;
            $('#Password').errorStyle(_text[lang][MsgNo.SaiFormatMatKhau]);
        }
        return error;
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Validate Value:</b> ' + e.message, 4);
        return true;
    }
}