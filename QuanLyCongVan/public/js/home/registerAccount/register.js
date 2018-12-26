/*
 * Các xử lý cho trang đăng ký tài khoản
 * Author       :   QuyPN - 16/06/2018 - create
 * Package      :   public/home
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
var errorUsername = false;
var errorEmail = false;
$(document).ready(function () {
    InitRegister();
    InitEventRegister();
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   QuyPN - 27/05/2018 - create
 * Param        :   
 * Output       :   
 */
function InitRegister() {
    try {
        $('[tabindex="1"]').first().focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Register:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   QuyPN - 27/05/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventRegister() {
    try {
        $('#btn-regist').on('click', function () {
            DangKyTaiKhoan();
        });
        $('#Username').on('blur', function () {
            CheckExistAccount(this, 1);
        });
        $('#Email').on('blur', function () {
            CheckExistAccount(this, 2);
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Register:</b> ' + e.message, 4);
    }
}
/*
 * Tiến hành gửi thông tin lên server để đăng ký tài khoản
 * Author       :   QuyPN - 16/06/2018 - create
 * Param        :   
 * Output       :   
 */
function DangKyTaiKhoan() {
    try {
        var error1 = validate('#form-register');
        var error2 = validateValue();
        if (!error1 && !error2 && !errorUsername && !errorEmail) {
            $.ajax({
                type: $('#form-register').attr('method'),
                url: $('#form-register').attr('action'),
                dataType: 'json',
                data: {
                    Username: $('#Username').val(),
                    Ho: $('#Ho').val(),
                    Ten: $('#Ten').val(),
                    GioiTinh: $('#GioiTinh').val(),
                    NgaySinh: $('#NgaySinh').val(),
                    Email: $('#Email').val(),
                    Password: calcMD5($('#Password').val()),
                    ConfirmPassword: calcMD5($('#ConfirmPassword').val()),
                    Agree: $('#Agree').is(":checked") ? true : false
                },
                success: CreateAccountResponse
            });
        }
        else {
            var lang = getLang();
            if (errorUsername) {
                $('#Username').errorStyle(_text[lang][MsgNo.TenDangNhapDaTonTai]);
            }
            if (errorEmail) {
                $('#Email').errorStyle(_text[lang][MsgNo.EmailDaTonTai]);
            }
            $('.item-error').first().focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>DangKyTaiKhoan:</b> ' + e.message, 4);
    }
}

/*
 * Kiểm tra tên đăng nhập hoặc email đã tồn tại trong hệ thống hay chưa
 * Author       :   QuyPN - 20/06/2018 - create
 * Param        :   input - text box nhập username hoặc email
 * Param        :   type - 1. check username; 2. check email
 * Output       :   true nếu có lỗi - false nếu không có lỗi
 */
function CheckExistAccount(input, type) {
    try {
        if ($(input).val() == '') {
            return;
        }
        var lang = getLang();
        $.ajax({
            type: 'GET',
            url: url.checkExistAccount + '?value=' + $(input).val() + '&&type=' + type,
            success: function (res) {
                if (res == 'True') {
                    $(input).errorStyle(_text[lang][type == 1 ? MsgNo.TenDangNhapDaTonTai : MsgNo.EmailDaTonTai]);
                    if (type == 1) {
                        errorUsername = true;
                    }
                    else {
                        errorEmail = true;
                    }
                    
                }
                else {
                    if (type == 1) {
                        errorUsername = false;
                    }
                    else {
                        errorEmail = false;
                    }
                }
            },
            global: false
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>CheckExistAccount:</b> ' + e.message, 4);
    }
}

/*
 * Kiểm tra các điều kiện ràng buộc khắc về dữ liệu của trang đăng ký
 * Author       :   QuyPN - 16/06/2018 - create
 * Param        :   
 * Output       :   true nếu có lỗi - false nếu không có lỗi
 */
function validateValue() {
    try {
        var error = false;
        var lang = getLang();
        var regUsername = /^[a-zA-Z0-9_.-]{6,50}$/;
        var resPassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,50}$/;
        if ($('#Username').val() != '' && !regUsername.test($('#Username').val())) {
            error = true;
            $('#Username').errorStyle(_text[lang][MsgNo.TenDangNhapSai]);
        }
        if ($('#Password').val() != '' && !resPassword.test($('#Password').val())) {
            error = true;
            $('#Password').errorStyle(_text[lang][MsgNo.SaiFormatMatKhau]);
        }
        if ($('#ConfirmPassword').val() != '' && $('#Password').val() != $('#ConfirmPassword').val()) {
            error = true;
            $('#ConfirmPassword').errorStyle(_text[lang][MsgNo.XacNhanMatKhauSai]);
        }
        if (!$('#Agree').is(":checked")) {
            error = true;
            $('#Agree').parents(".custom-check").find(".checkmark").first().errorStyle(_text[lang][MsgNo.ChuaDongYVoiDieuKhoan]);
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
 * Xử lý sau khi đăng ký tài khoản
 * Author       :   QuyPN - 17/06/2018 - create
 * Param        :   res - đối tượng response trả về từ server
 * Output       :  
 */
function CreateAccountResponse(res) {
    try{
        if (res.Code == 200) {
            callLoading();
            $.cookie('tokenAccount', res.ThongTinBoSung1, { expires: timeToken, path: '/' });
            window.location = url.createAccountSuccess;
        } else if (res.Code == 201) {
            fillError(res.ListError);
            $('.item-error').first().focus();
        } else {
            jMessage(res.MsgNo, function (ok) { });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Create Account Response:</b> ' + e.message, 4);
        return true;
    }
}