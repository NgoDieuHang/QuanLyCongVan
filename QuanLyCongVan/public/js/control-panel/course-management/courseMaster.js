/*
 * Các xử lý cho thêm và sửa khóa học
 * Author       :   TramHTD - 10/08/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
var msg_err_file = [MsgNo.ChuaChonFile];
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
 * Author       :   TramHTD - 10/08/2018 - create
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
        $('#TenKhoaHoc').on('change', function () {
            if (isInsert == 'I') {
                $('#BeautyId').val(getStringWithoutDiacritics($('#TenKhoaHoc').val()));
                CheckExistBeautyId($('#BeautyId'));
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   TramHTD - 10/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveCourse();
        });
        $('#btn-save-trans').on('click', function () {
            SaveCourseTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });
        $('#btn-delete').on('click', function () {
            DeleteCourse();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}
/*
 * Lưu thông tin của khóa học
 * Author       :   TramHTD - 10/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveCourse() {
    try {
        $('#ChiTiet').val(CKEDITOR.instances['ChiTiet'].getData());
        $('#HocPhi').val($('#HocPhi').val().replace(/,/g, ''));
        var err1 = validate("#form-course-main");
        var err2 = ValidateFile(0);
        if (!err1 && !err2) {
            $('#form-course-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editCourse + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editCourse + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-course-main');
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
        }, '<b>SaveCourse:</b> ' + e.message, 4);
    }
}
/*
 * Lưu thông tin của khóa học bằng ngôn ngữ khác
 * Author       :   TramHTD - 10/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveCourseTrans() {
    try {
        $('#ChiTiet_Trans').val(CKEDITOR.instances['ChiTiet_Trans'].getData());
        if (!validate("#form-course-trans")) {
            $('#form-course-trans').ajaxSubmit({
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
                        fillError(res.ListError, '#form-course-trans');
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
        }, '<b>SaveCourseTrans:</b> ' + e.message, 4);
    }
}
/*
 * Hiển thị thông tin khi thay đổi ngôn ngữ
 * Author       :   TramHTD - 10/08/2018 - create
 * Param        :   
 * Output       :   
 */
function ReferTranslate() {
    try {
        $.ajax({
            type: 'GET',
            url: url.referCourseWithLang,
            data: {
                id: $('#IdCourse_Trans').val(),
                lang: $('#LanguageTrans').val()
            },
            success: function (res) {
                SetDataTrans('#form-course-trans', res);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslate:</b> ' + e.message, 4);
    }
}
/*
 * Xóa khóa học
 * Author       :   TramHTD - 10/08/2018 - create
 * Param        :   
 * Output       :   
 */
function DeleteCourse() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteCourse,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdCourse').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createCourse;
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
        }, '<b>DeleteCourse:</b> ' + e.message, 4);
    }
}
/*
 * Sinh chuỗi BeautyId khi biết tên khóa học
 * Author       :   TramHTD - 10/08/2018 - create
 * Param        :   
 * Output       :   
 */
function getStringWithoutDiacritics(str) {
    var strTemp = str;

    strTemp = strTemp.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    strTemp = strTemp.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    strTemp = strTemp.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    strTemp = strTemp.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    strTemp = strTemp.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    strTemp = strTemp.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    strTemp = strTemp.replace(/đ/g, "d");
    strTemp = strTemp.replace(/[^a-zA-Z0-9---]/g, "-")
    strTemp = strTemp.replace(/----/g, "-");
    strTemp = strTemp.replace(/---/g, "-");
    strTemp = strTemp.replace(/--/g, "-");
    return strTemp;
}

/*
 * Kiểm tra beautyId đã tồn tại trong hệ thống hay chưa
 * Author       :   TramHTD - 10/08/2018 - create
 * Param        :   input - text box nhập beautyId
 * Output       :   true nếu có lỗi - false nếu không có lỗi
 */
function CheckExistBeautyId(input) {
    try {
        if ($(input).val() == '') {
            return;
        }
        var lang = getLang();
        var idcourse = $("#IdCourse").val();
        $.ajax({
            type: 'GET',
            url: url.checkExistBeautyId + '?value=' + $(input).val() + '&&id=' + idcourse,
            success: function (res) {
                if (res == 'True') {
                    $(input).errorStyle(_text[lang][61]);
                    error = true;
                }
                else {
                error = false;
                }
            },
            global: false
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>CheckExistBeautyId:</b> ' + e.message, 4);
    }
}