/*
 * Các xử lý cho phần thêm danh sách lịch học
 * Author       :   HoangNM -07/10/2018 - create
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
 * Author       :   HoangNM - 07/10/2018 - create
 * Param        :   
 * Output       :   
 */
function Init() {
    try {
        setTabIndexMenu();

        $('.clockpicker').clockpicker({
            placement: 'top',
            align: 'left',
            donetext: 'Done'
        });

        $('[tabindex=1]').focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HoangNM - 07/10/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveSchedule();
        });
        $('#btn-delete').on('click', function () {
            DeleteSchedule();
        });
        $(document).on('change', '#KhoaHoc', function () {
            FillClassByKhoaHoc($('#KhoaHoc').val());
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}
/*
 * lưu thông tin của lịch học
 * Author       :   HoangNM - 07/10/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveSchedule() {
    try {
        var err1 = validate("#form-schedule-main");
        if (!err1) {
            $('#form-schedule-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code == 200) {
                        jMessage(15, function () {
                            console.log(url.editSchedule + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editSchedule + (isInsert == 'I' ? ('/' + res.ThongTinBoSung1) : '');
                        });
                    }
                    else if (res.Code == 201) {
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
        }, '<b>SaveSchedule:</b> ' + e.message, 4);
    }
}
/*
 * xóa lịch học
 * Author       :   HoangNM - 07/10/2018 - create
 * Param        :   
 * Output       :   
 */
function DeleteSchedule() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.DeleteSchedule,
                    dataType: 'json',
                    data: {
                        ids: [$('#idSchedule').val()]
                    },
                    success: function (res) {
                        if (res.Code == 200) {
                            window.location = url.createSchedule;
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
        }, '<b>DeleteSchedule:</b> ' + e.message, 4);
    }
}
/*
 * Tiến hành gửi thông tin khóa học lên server để danh sách lớp học về và fill ra selectbox
 * Author       :   HoangNM - 07/10/2018 - create
 * Param        :   idKhoaHoc - id khóa học lấy từ select box
 * Output       :
 */
function FillClassByKhoaHoc(idKhoaHoc) {
    try {
        var templateOfAll = $('#templateOfAll').html();
        if ($('#KhoaHoc').val() == 0) {
            $('#LopHoc').html(templateOfAll);
            $('#LopHoc').attr('disabled', 'disabled');
        }
        else {
            $('#LopHoc').removeAttr('disabled', 'disabled');
            $.ajax({
                url: url.getClasses + "?idKhoaHoc=" + idKhoaHoc,
                type: 'GET',
                success: function (res) {
                    if (res.Code == 200) {
                        var listClasses = res.ThongTinBoSung4;
                        var options = templateOfAll;
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
        }
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>FillClassByKhoaHoc:</b> ' + e.message, 4);
    }
}
