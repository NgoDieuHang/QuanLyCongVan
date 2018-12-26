/*
 * Các xử lý cho phần cài đặt hệ thống
 * Author       :   HoangNM -18/08/2018 - create
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
 * Author       :   HoangNM - 18/08/2018 - create
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
 * Author       :   HoangNM - 18/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveSetting();
        });
        $('#btn-save-trans').on('click', function () {
            SaveSettingTrans();
        });
        $('#LanguageTrans').on('change', function () {
            ReferTranslate();
        });

        //sự kiện của một số phần cài đặt hệ thống khác --------------
        //-----------------------------------------------------------

        $('#btn-save-otherSetting').on('click', function () {
            SaveOtherSetting();
        });

        $('#btn-save-other-setting-trans').on('click', function () {
            SaveOtherSettingsTrans();
        });
        $('#LanguageTransOtherSetting').on('change', function () {
            ReferTranslateOtherSettings();
        });
        
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}

/*
* kiểm tra nếu trường rỗng thì xóa class url đi
* Author       :   HoangNM - 29/08/2018 - create
* Param        :   
* Output       :   
*/
function remove(id) {
    if ($(id).val() == "") {
        $(id).removeClass("url");
    }
}

/*
 * lưu thay đổi của Cài đặt hệ thống
 * Author       :   HoangNM - 29/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveSetting() {
    try {
        //dùng để tránh trường hợp bắt url khi để trống vẫn bắt lỗi (vì trường này cho phép lỗi)
        remove("#LinkFB");
        remove("#LinkGoogle");
        remove("#Skype");
        remove("#Link");
        if (!validate("#form-setting-main")) {
            var data = {
                DiaChi: $('#DiaChi').val(),
                SoDienThoai: $('#Sdt').val(),
                LinkFB: $('#LinkFB').val(),
                LinkGoogle: $('#LinkGoogle').val(),
                Email: $('#Email').val(),
                Skype: $('#Skype').val(),
                MucBaoHiemXH: $('#MucBaoHiemXH').val(),
                ThueTNCN1: $('#ThueTNCN1').val(),
                ThueTNCN2: $('#ThueTNCN2').val(),
                ThueTNCN3: $('#ThueTNCN3').val(),
                GioiHanThueTNCN1: $('#GioiHanThueTNCN1').val().replace(/,/g, ''),
                GioiHanThueTNCN2: $('#GioiHanThueTNCN2').val().replace(/,/g, ''),
                GioiHanThueTNCN3: $('#GioiHanThueTNCN3').val().replace(/,/g, ''),
                About: CKEDITOR.instances['About'].getData(),
                WhyUs: CKEDITOR.instances['WhyUs'].getData(),
                TomTat: CKEDITOR.instances['TomTat'].getData(),
                Keyword: $('#Keyword').val(),
                Author: $('#Author').val(),
                Link: $('#Link').val(),
                KinhDo: $('#KinhDo').val(),
                ViDo: $('#ViDo').val(),
                GioiThieuChungKhoaHoc: CKEDITOR.instances['GTCKH'].getData(),
                EmailHeThong: $('#EmailHeThong').val(),
                MatKhauEmail: $('#MatKhauEmail').val()
            }
            $.ajax({
                type: 'POST',
                url: $('#form-setting-main').attr('action'),
                data: data,
                success: function (res) {
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            
                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-setting-trans');
                        $('.item-error').first().focus();
                    } else {
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
        }, '<b>SaveSetting:</b> ' + e.message, 4);
    }
}
/*
 * lưu thay đổi của cài đặt hệ thống phần ngôn ngữ khác
 * Author       :   HoangNM - 18/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveSettingTrans() {
    try {
        if (!validate("#form-setting-trans")) {

            var data = {
                DiaChi: $('#diaChi_Trans').val(),
                About: CKEDITOR.instances['About_Trans'].getData(),
                WhyUs: CKEDITOR.instances['WhyUs_Trans'].getData(),
                TomTat: CKEDITOR.instances['TomTat_Trans'].getData(),
                GioiThieuChungKhoaHoc: CKEDITOR.instances['GioiThieuChungKhoaHoc_Trans'].getData(),
                LanguageTrans: $('#LanguageTrans').val()
            }
            $.ajax({
                type: 'POST',
                url: $('#form-setting-trans').attr('action'),
                data: data,
                success: function (res) {
                    if (res.Code == 200) {
                        jMessage(15, function () {

                        });
                    }
                    else if (res.Code == 201) {
                        fillError(res.ListError, '#form-setting-trans');
                        $('.item-error').first().focus();
                    } else {
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
        }, '<b>SaveSettingTrans:</b> ' + e.message, 4);
    }
}
/*
 * dùng để thay đổi dữ liệu khi thay đổi ngôn ngữ
 * Author       :   HoangNM - 29/08/2018 - create
 * Param        :   
 * Output       :   
 */

function ReferTranslate() {
    try {
        $.ajax({
            type: 'GET',
            url: url.ReferSettingWithLang,
            data: {
                lang: $('#LanguageTrans').val()
            },
            success: function (res) {
                SetDataTrans('#form-setting-trans', res);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslate:</b> ' + e.message, 4);
    }
}

//các phần cài đặt hệ thống khác --------------------------------------------------------------------------------------------------------------------
//    ----------------------------------------------------------------------------------------------------------------------------------


/*
 * lưu thay đổi của phần chính sách bảo mật, hướng dẫn sử dụng hoặc điều khoản sử dụng
 * Author       :   HoangNM - 29/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveOtherSetting() {
    try {
        $('#data').val(CKEDITOR.instances['data'].getData());
        $('#form-other-setting-main').ajaxSubmit({
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
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>SaveOtherSetting:</b> ' + e.message, 4);
    }
}

/*
 * lưu thay đổi của phần chính sách bảo mật, hướng dẫn sử dụng hoặc điều khoản sử dụng với ngôn ngữ khác
 * Author       :   HoangNM - 29/08/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveOtherSettingsTrans() {
    try {
        $('#OtherSetting_Trans').val(CKEDITOR.instances['OtherSetting_Trans'].getData());
        $('#form-other-setting-trans').ajaxSubmit({
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
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>SaveOtherSettingsTrans:</b> ' + e.message, 4);
    }
}

/*
* dùng để thay đổi dữ liệu chính sách bảo mật, hướng dẫn sử dụng hoặc điều khoản sử dụng khi thay đổi ngôn ngữ
* Author       :   HoangNM - 29/08/2018 - create
* Param        :   
* Output       :   
*/

function ReferTranslateOtherSettings() {
    try {
        $.ajax({
            type: 'GET',
            url: url.ReferOtherSettingWithLang,
            data: {
                lang: $('#LanguageTransOtherSetting').val(),
                typeSettingTrans: $('#typeSetting').val()
            },
            success: function (res) {
                if (res != "null") {
                    CKEDITOR.instances["OtherSetting_Trans"].setData(res);
                }
                
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ReferTranslateOtherSettings:</b> ' + e.message, 4);
    }
}