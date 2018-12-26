/*
 * Các xử lý cho trang đăng ký khóa học
 * Author       :   AnTM - 24/06/2018 - create
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
 * Author       :   AnTM - 24/06/2018 - create
 * Param        :   
 * Output       :   
 */
function InitRegister() {
    try {
        $('[tabindex="1"]').first().focus();
        InitData();
        CheckShowInfoGuardian($('#ShowInfoGuardian'));
        
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Register:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   AnTM - 24/06/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventRegister() {
    try {
        $(document).on('change', '#ShowInfoGuardian', function () {
            CheckShowInfoGuardian(this);
        });
        $(document).on('change', '#ShowInfoRegisterAccount', function () {
            CheckShowInfoToRegisterAccount(this);
        });
        $('#Username').on('blur', function () {
            CheckExistAccount(this, 1);
        });
        $('#EmailHocVien').on('blur', function () {
            CheckExistAccount(this, 2);
        });
        $(document).on('change', '#KhoaHoc', function () {
            FillClassByKhoaHoc($('#KhoaHoc').val());
        });
        $('#btn-register-course').on('click', function () {
            DangKyHoc();
        });
        $('.tinh-ht').on('change', function () {
            GetDistrict(this);
        });
        $('.huyen-ht').on('change', function () {
            GetWard(this);
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Register:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo dữ liệu cho các form control
 * Author       :   AnTM - 24/06/2018 - create
 * Param        :   
 * Output       :   
 */
function InitData() {
    try {
        GetAllCourse();
        GetProvinces($('#TinhHocVien'));
        GetProvinces($('#TinhGiamHo'));
        if (coTaiKhoan == true) $('.infomation').find('input, select').not('#GhiChu').attr('disabled', 'disabled');
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Register:</b> ' + e.message, 4);
    }
}
/*
 * Tiến hành lấy thông tin khóa học từ server và fill ra selectbox
 * Author       :   AnTM - 08/07/2018 - create
 * Param        :   
 * Output       :   
 */
function GetAllCourse() {
    try {
        var idKhoaHoc = idSelected.KhoaHoc;
        $.ajax({
            url: url.getClasses + "?idKhoaHoc=-1&&type=0",
            type: 'GET',
            success: function (response) {
                if (response.Code == 200) {
                    var listCourse = response.ThongTinBoSung4;
                    var options = '';
                    if (listCourse != null) {
                        if (idKhoaHoc != -1) {
                            $('#KhoaHoc').attr('disabled','disabled')
                        }
                        for (var i = 0; i < listCourse.length; i++) {
                            if (idKhoaHoc!=-1) {
                                options += '<option value="' + listCourse[i].IDKhoaHoc
                                if (listCourse[i].IDKhoaHoc == idKhoaHoc) {
                                    options += '" selected="selected"';
                                }
                                else {
                                    options += '" disabled="disabled"';
                                }
                                options += '">' + listCourse[i].TenKhoaHoc + '</option>';
                            }
                            else {
                                options += '<option value="' + listCourse[i].IDKhoaHoc + '">' + listCourse[i].TenKhoaHoc + '</option>';
                            }
                        }
                        $('#KhoaHoc').html(options);
                        $('#KhoaHoc').trigger("change");
                    }
                }
                else {
                    jMessage(0, function (ok) {
                    }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
                }
            }
        });
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>FillClassByKhoaHoc:</b> ' + e.message, 4);
    }
}
/*
 * Tiến hành gửi thông tin khóa học lên server để danh sách lớp học về và fill ra selectbox
 * Author       :   AnTM - 07/07/2018 - create
 * Param        :   idKhoaHoc - id khóa học lấy từ select box
 * Output       :   
 */
function FillClassByKhoaHoc(idKhoaHoc) {
    try {
        $.ajax({
            url: url.getClasses + "?idKhoaHoc=" + idKhoaHoc +"&&type=1",
            type: 'GET',
            success: function (res) {
                if (res.Code == 200) {
                    var listClasses = res.ThongTinBoSung4;
                    var options = '';
                    if (listClasses != null) {
                        for (var i = 0; i < listClasses.length; i++) {
                            options += '<option value="' + listClasses[i].IDLopHoc + '">' + listClasses[i].TenLopHoc + '</option>';
                        }
                        $('#LopHoc').html(options);
                    }
                }
                else {
                    jMessage(0, function (ok) {
                    }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
                }
            }
        });
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>FillClassByKhoaHoc:</b> ' + e.message, 4);
    }
}
/*
 * Tiến hành request lên server để lấy danh sách tỉnh về và fill ra selectbox
 * Author       :   AnTM - 07/07/2018 - create
 * Param        :   input - selectbox cần load dữ liệu
 * Output       :   
 */
function GetProvinces(input) {
    try {
        var element = $('#TinhHocVien');
        var idTinh = idSelected.TinhHocVien;
        if ($(input).attr('id')=='TinhGiamHo') {
            element = $('#TinhGiamHo');
            idTinh = idSelected.TinhGiamHo;
        }
        $.ajax({
            url: url.getAddress + "?id=0&&type=0",
            type: 'GET',
            success: function (res) {
                if (res.Code == 200) {
                    var cacTinh = res.ThongTinBoSung4;
                    var options = '';
                    if (cacTinh != null) {
                        for (var i = 0; i < cacTinh.length; i++) {
                            options += '<option value="' + cacTinh[i].IDTinh
                            if (cacTinh[i].IDTinh == idTinh) {
                                options += '" selected="selected">' + cacTinh[i].TenTinh + '</option>';
                            }
                            else {
                                options += '">' + cacTinh[i].TenTinh + '</option>';
                            }
                        }
                        $(element).html(options);
                        $(element).trigger("change");
                    }
                }
                else {
                    jMessage(0, function (ok) {
                    }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
                }
            }
        });
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>GetProvinces:</b> ' + e.message, 4);
    }
}
/*
 * Tiến hành request lên server để lấy danh sách huyện về và fill ra selectbox
 * Author       :   AnTM - 07/07/2018 - create
 * Param        :   input - selectbox cần load dữ liệu
 * Output       :   
 */
function GetDistrict(input) {
    try {
        var element = $('#HuyenHocVien');
        var idHuyen = idSelected.HuyenHocVien;
        if ($(input).attr('id') == 'TinhGiamHo') {
            element = $('#HuyenGiamHo');
            idHuyen = idSelected.HuyenGiamHo;
        }
        var id = $(input).val();
        $.ajax({
            url: url.getAddress + "?id=" + id + "&&type=1",
            type: 'GET',
            success: function (res) {
                if (res.Code == 200) {
                    var cacHuyen = res.ThongTinBoSung4;
                    var options = '';
                    if (cacHuyen != null) {
                        for (var i = 0; i < cacHuyen.length; i++) {
                            options += '<option value="' + cacHuyen[i].IDHuyen
                            if (cacHuyen[i].IDHuyen == idHuyen) {
                                options += '" selected="selected"';
                            }
                            options += '">' + cacHuyen[i].TenHuyen + '</option>';
                        }
                        $(element).html(options);
                        $(element).trigger("change");
                    }
                }
                else {
                    jMessage(0, function (ok) {
                    }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
                }
            }
        });
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>GetDistrict:</b> ' + e.message, 4);
    }
}

/*
 * Tiến hành request lên server để lấy danh sách xã về và fill ra selectbox
 * Author       :   AnTM - 07/07/2018 - create
 * Param        :   input - selectbox cần load dữ liệu
 * Output       :   
 */
function GetWard(input) {
    try {
        var element = $('#XaHocVien');
        var idXa = idSelected.XaHocVien;
        if ($(input).attr('id') == 'HuyenGiamHo') {
            element = $('#XaGiamHo');
            idXa = idSelected.XaGiamHo;
        }
        var id = $(input).val();
        $.ajax({
            url: url.getAddress + "?id="+id+"&&type=2",
            type: 'GET',
            success: function (res) {
                if (res.Code == 200) {
                    var cacXa = res.ThongTinBoSung4;
                    var options = '';
                    if (cacXa != null) {
                        for (var i = 0; i < cacXa.length; i++) {
                            options += '<option value="' + cacXa[i].IDXa
                            if (cacXa[i].IDXa == idXa) {
                                options += '" selected="selected"';
                            }
                            options += '">' + cacXa[i].TenXa + '</option>';
                        }
                        $(element).html(options);
                    }
                }
                else {
                    jMessage(0, function (ok) {
                    }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
                }
            }
        });
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>GetWard:</b> ' + e.message, 4);
    }
}
/*
 * Xử lý sau khi nhấn vào nút đăng ký lớp học
 * Author       :   AnTM - 24/06/2018 - create
 * Param        :   
 * Output       :  
 */
function DangKyHoc() {
    try {
        var error1 = validate('#form-register-course');
        var error2 = validateValue();
        if (!error1 && !error2 && !errorUsername && !errorEmail) {
            var NgaySinhGiamHo = $('#NgaySinhGiamHo').val();
            $.ajax({
                type: $('#form-register-course').attr('method'),
                url: $('#form-register-course').attr('action'),
                dataType: 'json',
                data: {
                    IDLopHoc: $('#LopHoc').val(),
                    HoHocVien: $('#HoHocVien').val(),
                    TenHocVien: $('#TenHocVien').val(),
                    GioiTinhHocVien: $('#GioiTinhHocVien').val(),
                    NgaySinhHocVien: $('#NgaySinhHocVien').val(),
                    DiaChiHocVien: $('#DiaChiHocVien').val(),
                    IdXaHocVien: $('#XaHocVien').val(),
                    SoCMNDHocVien: $('#SoCMNDHocVien').val(),
                    SoDienThoaiHocVien: $('#SoDienThoaiHocVien').val(),
                    EmailHocVien: ($('#EmailHocVien').val()),
                    GhiChu: $('#GhiChu').val(),

                    HoGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#HoGiamHo').val() : '',
                    TenGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#TenGiamHo').val() : '',
                    GioiTinhGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#GioiTinhGiamHo').val() : false,
                    NgaySinhGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#NgaySinhGiamHo').val() : '',
                    DiaChiGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#DiaChiGiamHo').val() : '',
                    IdXaGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#XaGiamHo').val() : '',
                    SoCMNDGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#SoCMNDGiamHo').val() : '',
                    SoDienThoaiGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#SoDienThoaiGiamHo').val() : '',
                    EmailGiamHo: $('#ShowInfoGuardian').is(':checked') ? $('#EmailGiamHo').val() : '',
                    CoGiamHo: $('#ShowInfoGuardian').is(':checked') ? true : false,

                    Username: $('#ShowInfoRegisterAccount').is(':checked') ? $('#Username').val() : '',
                    Password: $('#ShowInfoRegisterAccount').is(':checked') ? calcMD5($('#Password').val()) : '',
                    ConfirmPassword: $('#ShowInfoRegisterAccount').is(':checked') ? calcMD5($('#ConfirmPassword').val()) : ''
                },
                success: registerCourseSuccess
            });
        }
        else {
            var lang = getLang();
            if (errorUsername) {
                $('#Username').errorStyle(_text[lang][MsgNo.TenDangNhapDaTonTai]);
            }
            if (errorEmail) {
                $('#EmailHocVien').errorStyle(_text[lang][MsgNo.EmailDaTonTai]);
            }
            $('.item-error').first().focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>DangKyKhoaHoc</b> ' + e.message, 4);
    }
}
/*
 * Xử lý sau khi đăng ký khoa hoc
 * Author       :   AnTM - 24/06/2018 - create
 * Param        :   res - đối tượng response trả về từ server
 * Output       :  
 */
function registerCourseSuccess(res) {
    try {
        if (res.Code == 200) {
            if (res.MsgNo == 47) {
                $.cookie('tokenAccount', res.ThongTinBoSung1, { expires: timeToken, path: '/' });
                jMessage(res.MsgNo, function (r) {
                    if (r) {
                        window.location = url.createAccountSuccess;
                    }
                });
            }
            else {
                jMessage(42, function (r) {
                    if (r) {
                        window.location = '/';
                    }
                });
            }
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
/*
 * Kiểm tra xem người dùng có chọn nhập thông tin người giám hộ hay không, nếu có thì hiển thị form để nhập, nếu không ẩn form nhập đi
 * Author       :   AnTM - 06/07/2018 - create
 * Param        :   checkbox
 * Output       :   
 */
function CheckShowInfoGuardian(checkbox) {
    try {
        if ($(checkbox).is(':checked')) {
            $('#guardian-info').removeClass('hide-area');
            $('.gh-required').addClass('required');
            $('#SoDienThoaiHocVien').removeClass('required');
            $('#SoDienThoaiHocVien').parent().find('.text-required').addClass('hide-area');
        }
        else {
            $('#guardian-info').addClass('hide-area');
            $('.gh-required').removeClass('required');
            $('#SoDienThoaiHocVien').addClass('required');
            $('#SoDienThoaiHocVien').parent().find('.text-required').removeClass('hide-area');
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>CheckShowInfoGuardian:</b> ' + e.message, 4);
    }
}
/*
 * Kiểm tra xem người dùng có chọn nhập thông tin đăng ký tài khoản hay không, nếu có thì hiển thị form để nhập, nếu không ẩn form nhập đi
 * Author       :   AnTM - 23/07/2018 - create
 * Param        :   checkbox
 * Output       :   
 */
function CheckShowInfoToRegisterAccount(checkbox) {
    try {
        if ($(checkbox).is(':checked')) {
            $('.register-account-info').removeClass('hide-area');
            $('.custom-validate').addClass('required');
            $('#EmailHocVien').parent().find('.text-required').removeClass('hide-area');
        }
        else {
            $('.register-account-info').addClass('hide-area');
            $('.custom-validate').removeClass('required item-error');
            $('.custom-validate').removeAttr('has-balloontip-message');
            $('.register-account-info').find('input').val('');
            $('#EmailHocVien').parent().find('.text-required').addClass('hide-area');
            errorEmail = false;
            errorUsername = false;
        }
        $('#EmailHocVien').trigger('blur');
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>CheckShowInfoGuardian:</b> ' + e.message, 4);
    }
}
/*
 * Kiểm tra tên đăng nhập hoặc email đã tồn tại trong hệ thống hay chưa
 * Author       :   AnTM - 23/07/2018 - create
 * Param        :   input - text box nhập username hoặc email
 * Param        :   type - 1. check username; 2. check email
 * Output       :   true nếu có lỗi - false nếu không có lỗi
 */
function CheckExistAccount(input, type) {
    try {
        if ($(input).val() == '') {
            return;
        }
        if (!$('#ShowInfoRegisterAccount').is(':checked')) {
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
 * Author       :   AnTM - 23/07/2018 - create
 * Param        :   
 * Output       :   true nếu có lỗi - false nếu không có lỗi
 */
function validateValue() {
    try {
        if (!$('#ShowInfoRegisterAccount').is(':checked')) {
            return false;
        }
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
        return error;
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Validate Value:</b> ' + e.message, 4);
        return true;
    }
}