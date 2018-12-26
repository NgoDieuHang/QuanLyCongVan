var msg_err_file = [MsgNo.ChuaChonFile];
/*
 * Các xử lý cho trang information
 * Author       :   HoangNM - 05/07/2018 - create
 * Package      :   public/information
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    InitLogin();
    InitEventLogin();
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HoangNM - 05/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitLogin() {
    try {
        $('[tabindex="1"]').first().focus();
        CheckShowInfoGuardian('#tenNguoiGiamHo');
        LoadDiaChi('#TinhGiamHo', 1);
        LoadDiaChi('#TinhHocVien', 1);
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Login:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HoangNM - 05/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventLogin() {
    try {
        $('#btn-change').on('click', function () {
            changePassword();
        });
        $('#btn-save-user').on('click', function () {
            SaveUsername();
        });
        $('#btn-save').on('click', function () {
            update();
        });
        $('#btn-change-email').on('click', function () {
            $('#btn-change-email').hide();
            changeEmail();
        });
        $('#btn-change-email-thoat').on('click', function () {
            $('#btn-change-email').show();
            exitChange();
        });
        $('.tinh-ht').on('change', function () {
            LoadDiaChi(this, 1);
        });
        $('.huyen-ht').on('change', function () {
            LoadDiaChi(this, 2);
        });
        $('#nguoiGiamHo').on('change', function () {
            nguoiGiamHo(this);
        });
        $('#btn-change-email-xacnhan').on('click', function () {
            xacNhanChangeEmail();
        });
        $('#btn-send-email').on('click', function () {
            sendEmail();
        });

        $('#username').on('blur', function () {
            CheckExistAccount(this);
        });

    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Login:</b> ' + e.message, 4);
    }
}
/*
 * Tiến hành gửi thông tin lên server để update thông tin cá nhân
 * Author       :   HoangNM - 05/07/2018 - create
 * Param        :   
 * Output       :
 */
function update() {
    try {
        var formData = new FormData();
        var err1 = validate("#form-information");
        var err2 = ValidateFile(0);
        var err3 = ValidateFile(1);
        if (!err1 && !err2 && !err3) {
            var tenGiamHo = $('#tenNguoiGiamHo').val();
            var hoGiamHo = $('#hoNguoiGiamHo').val();
            if (!$('#nguoiGiamHo').is(":checked")) {
                tenGiamHo = "null";
                hoGiamHo = "null";
            }

            formData.append("FileImg", $('#FileImg0')[0].files[0]);
            formData.append("FileImgNGH", $('#FileImg1')[0].files[0]);
            formData.append("Avatar", $('#imageName').val());
            formData.append("AvatarNguoiGiamHo", $('#imageNameNGH').val());
            formData.append("Ho", $('#ho').val());
            formData.append("Ten", $('#ten').val());
            formData.append("GioiTinh", $('#GioiTinh').val());
            formData.append("NgaySinh", $('#NgaySinh').val());
            formData.append("SDT", $('#sdt').val());
            formData.append("CMND", $('#cmnd').val());
            formData.append("DiaChi", $('#diachi').val());
            formData.append("Tinh", $('#TinhHocVien').val());
            formData.append("Huyen", $('#HuyenHocVien').val());
            formData.append("Xa", $('#XaHocVien').val());
            formData.append("nguoiGiamHo", $('#nguoiGiamHo').is(":checked") ? true : false);
            formData.append("HoNguoiGiamHo", hoGiamHo);
            formData.append("TenNguoiGiamHo", tenGiamHo);
            formData.append("SDTNguoiGiamHo", $('#sdtNguoiGiamHo').val());
            formData.append("DiaChiNguoiGiamHo", $('#diachiNguoiGiamHo').val());
            formData.append("CMNDNguoiGiamHo", $('#cmndNguoiGiamHo').val());
            formData.append("GioiTinhNguoiGiamHo", $('#GioiTinhNguoiGiamHo').val());
            formData.append("NgaySinhNguoiGiamHo", $('#NgaySinhNguoiGiamHo').val());
            formData.append("TinhNguoiGiamHo", $('#TinhGiamHo').val());
            formData.append("HuyenNguoiGiamHo", $('#HuyenGiamHo').val());
            formData.append("XaNguoiGiamHo", $('#XaGiamHo').val());

            $.ajax({
                type: $('#form-information').attr('method'),
                url: $('#form-information').attr('action'),
                dataType: 'json',
                contentType: false,
                processData: false,
                data: formData,
                success: function (res) {
                    if (res.Code == 200) {
                        jMessage(14);
                        location.reload();
                    } else {
                        jMessage(res.MsgNo, function (ok) { });
                    }
                }
            });
        }
        else {
            var lang = getLang();

            $('.item-error').first().focus();
        }
    }
    catch (e) {

    }
}

/*
 * Tiến hành xử lý khi click vào nút thay đổi
 * Author       :   HoangNM - 07/07/2018 - create
 * Param        :   
 * Output       :
 */
function changeEmail() {
    try {
        $('#change-email').css('display', 'block');
        $('#email').removeAttr('readonly');
    } catch (e) {

    }
}

/*
 * Tiến hành xử lý khi click vào nút thoat
 * Author       :   HoangNM - 07/07/2018 - create
 * Param        :   
 * Output       :
 */
function exitChange() {
    try {
        $('#change-email').css('display', 'none');
        $('#email').attr('readonly', 'readonly');
        $.ajax({
            type: 'GET',
            url: url.getemail,
            success: function (email) {
                $("#email").val(email);
            }
        });

    } catch (e) {

    }
}

/*
 * Load huyện và xã cho hê thống
 * Author       :   HoangNM - 07/07/2018 - create
 * Param        :   input - option nhập tỉnh hoặc huyện
 * Param        :   type - 1. load huyện; 2. load xã
 * Output       :   
 */
function LoadDiaChi(input, type) {
    try {

        var lang = getLang();
        if (type == "1") {
            var element = $('#HuyenHocVien');
            var idHuyen = idSelected.HuyenHocVien;
            if ($(input).attr('id') == 'TinhGiamHo') {
                element = $('#HuyenGiamHo');
                idHuyen = idSelected.HuyenGiamHo;
            }
            $.ajax({
                type: 'GET',
                url: url.checkDiaChi + '?id=' + $(input).val() + '&&type=' + type,
                success: function (res) {
                    if (res.Code == 200) {
                        var cacHuyen = res.ThongTinBoSung4;
                        var options = '';
                        if (cacHuyen != null) {
                            for (var i = 0; i < cacHuyen.length; i++) {
                                options += '<option value="' + cacHuyen[i].IdHuyen
                                if (cacHuyen[i].IdHuyen == idHuyen) {
                                    options += '" selected="selected"';
                                }
                                options += '">' + cacHuyen[i].tenHuyen + '</option>';
                            }
                            $(element).html(options);
                            $(element).trigger("change");
                        }

                    } else {
                        jMessage(0, function (ok) {
                        }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
                    }

                }
            });

        } else {
            var element = $('#XaHocVien');
            var idXa = idSelected.XaHocVien;
            if ($(input).attr('id') == 'HuyenGiamHo') {
                element = $('#XaGiamHo');
                idXa = idSelected.XaGiamHo;
            }
            $.ajax({
                type: 'GET',
                url: url.checkDiaChi + '?id=' + $(input).val() + '&&type=' + type,
                success: function (res) {
                    if (res.Code == 200) {
                        var cacXa = res.ThongTinBoSung4;
                        var options = '';
                        if (cacXa != null) {
                            for (var i = 0; i < cacXa.length; i++) {
                                options += '<option value="' + cacXa[i].IdXa
                                if (cacXa[i].IdXa == idXa) {
                                    options += '" selected="selected"';
                                }
                                options += '">' + cacXa[i].tenXa + '</option>';
                            }
                            $(element).html(options);
                        }

                    } else {
                        jMessage(0, function (ok) {
                        }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
                    }


                }
            });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>LoadDiaChi:</b> ' + e.message, 4);
    }
}

/*
 * Kiểm tra tên đăng nhập đã tồn tại trong hệ thống hay chưa
 * Author       :   HoangNM - 08/07/2018 - create
 * Param        :   input - text box nhập username
 * Output       :   true nếu có lỗi - false nếu không có lỗi
 */
function CheckExistAccount(input) {
    try {
        if ($(input).val() == '') {
            return;
        }
        var lang = getLang();
        $.ajax({
            type: 'GET',
            url: url.checkExistUser + '?value=' + $(input).val(),
            success: function (res) {
                if (res == 'True') {
                    $(input).errorStyle(_text[lang][MsgNo.TenDangNhapDaTonTai]);
                    errorUsername = true;
                }
                else {
                    errorUsername = false;
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
 * xử lý khi checkbox vào việc có đăng ký người giảm hộ
 * Author       :   HoangNM - 07/07/2018 - create
 * Param        :   checkbox - đối tượng checkbox
 * Output       :   
 */
function nguoiGiamHo(checkbox) {
    if ($(checkbox).is(':checked')) {
        $('.nguoigiamho').css('display', 'inline');
        $('.requiredGH').addClass('required');
    } else {
        $('.nguoigiamho').css('display', 'none');
        $('.requiredGH').removeClass('required');
    }
}

/*
 * Xử lý phần thay đổi email khi ajax thành công
 * Author       :   HoangNM - 08/07/2018 - create
 * Param        :   res - đối tượng response trả về từ server
 * Output       :  
 */

function updatesusscess(res) {
    try {
        if (res.Code == 200) {
            jMessage(44);
            location.reload();
        } else if (res.Code == 201) {
            fillError(res.ListError);
            $('.item-error').first().focus();
        } else {
            jMessage(res.MsgNo, function (ok) { });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>XacNhanChangeEmail:</b> ' + e.message, 4);
        return true;
    }
}

/*
 * kiểm tra xem email đã có tài khoản chưa
 * Author       :   HoangNM - 04/09/2018 - create
 * Param        :   
 * Output       :
 */
function xacNhanChangeEmail() {
    try {
        if (!validate('#form-changeEmail')) {
            $.ajax({
                type: 'POST',
                url: url.checkEmail + '?value=' + $('#email').val(),
                success: chageMail,
                global: false
            });
        } else {

            $('.item-error').first().focus();
        }
    }
    catch (e) {

    }

}

/*
 * Thay đổi email
 * Author       :   HoangNM - 07/07/2018 - create
 * Param        :   
 * Output       :
 */
function chageMail(res) {
    try {
        if (res != "True") {
            var error1 = validate('#form-changeEmail');
            if (!error1) {
                $.ajax({
                    type: $('#form-changeEmail').attr('method'),
                    url: $('#form-changeEmail').attr('action'),
                    dataType: 'json',
                    data: {
                        Email: $('#email').val(),
                        token: $.cookie('token')
                    },
                    success: updatesusscess
                });
            }
            else {
                var lang = getLang();

                $('.item-error').first().focus();
            }
        } else {
            $('#email').errorStyle("email đã dùng cho tài khoản khác ,bạn vui lòng chọn email khác");
        }
    }
    catch (e) {

    }
}


/*
 * kiểm tra email đã dùng cho tài khoản nào chưa
 * Author       :   HoangNM - 04/09/2018 - create
 * Param        :   
 * Output       :
 */
function sendEmail() {
    try {
        if (!validate('#form-changeEmail')) {
            $.ajax({
                type: 'POST',
                url: url.checkEmail + '?value=' + $('#email').val(),
                success: agreeSendEmail,
                global: false
            });
        } else {

            $('.item-error').first().focus();
        }
    }
    catch (e) {

    }
   
}

/*
 * gửi  email lại
 * Author       :   HoangNM - 08/07/2018 - create
 * Param        :   
 * Output       :
 */
function agreeSendEmail(res) {
    try {
        if (res != "True") {
            var error1 = validate('#form-changeEmail');
            if (!error1) {
                $.ajax({
                    type: $('#form-changeEmail').attr('method'),
                    url: url.sendEmail + '?email=' + $('#email').val(),
                    dataType: 'json',
                    success: function (res) {
                        if (res.Code == 200) {
                            jMessage(44);

                        } else {
                            jMessage(res.MsgNo, function (ok) { });
                        }
                    }
                });
            }
            else {
                var lang = getLang();

                $('.item-error').first().focus();
            }

        } else {
            $('#email').errorStyle("email đã dùng cho tài khoản khác ,bạn vui lòng chọn email khác");
        }
        

    }
    catch (e) {

    }
}
/*
 * Kiểm tra xem người dùng có chọn nhập thông tin người giám hộ hay không, nếu có thì hiển thị form để nhập, nếu không ẩn form nhập đi
 * Author       :   HoangNM - 20/07/2018 - create
 * Param        :   checkbox
 * Output       :   
 */
function CheckShowInfoGuardian(checkbox) {
    try {
        if ($(checkbox).val() != '') {
            $('.nguoigiamho').css('display', 'inline');
            $('#nguoiGiamHo').prop('checked', true);
        } else {
            $('.nguoigiamho').css('display', 'none');
            $('#nguoiGiamHo').prop('checked', false);
        }
        nguoiGiamHo('#nguoiGiamHo');
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>CheckShowInfoGuardian:</b> ' + e.message, 4);
    }
}

