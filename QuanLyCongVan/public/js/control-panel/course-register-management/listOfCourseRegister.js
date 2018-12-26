/*
 * Các xử lý cho hiển thị danh sách đăng ký khóa học
 * Author       :   HoangNM -24/07/2018 - create
 * Author       :   AnTM -08/07/2018 - update
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    try {
        InitalizeCourseRegister();
        InitEventCourseRegister();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ready:</b> ' + e.message, 4);
    }
});

/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HoangNM - 24/07/2018 - create
 * Author       :   AnTM -  08/07/2018 - update
 * Param        :
 * Output       :
 */
function InitalizeCourseRegister() {
    try {
        InitPage();
        setTabIndexTable('#div-table-register');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitalizeCourseRegister:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HoangNM - 24/07/2018 - create
 * Param        :
 * Output       :
 */
function InitEventCourseRegister() {
    try {
        $('#btn-search').on('click', function () {
            $('#CurrentPage').val(1);
            Search();
        });
        $('.btn-info').on('click', function () {
            ViewDetailRow(this);
        });
        $(document).on('change', '#page-size', function () {
            $('#PageSize').val($(this).val());
            Search();
        });
        $(document).on('change', '.show-contact', function () {
            UpdateStatusCourseRegister(this);
        });
        $(document).on('change', '#KhoaHoc', function () {
            FillClassByKhoaHoc($('#KhoaHoc').val());
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEventCourseRegister:</b> ' + e.message, 4);
    }
}
/*
* Xem chi tiết dòng đã chọn
* Author       :   AnTM - 08/08/2018 - create
* Param        :   id- id của đăng ký học
* Param        :   button - button được nhấn
* Output       :
*/
function ViewDetailRow(button) {
    try {
        // Lấy link serve để gửi lên server
        var linkDetail = $(button).parents('.table-result').attr('link-detail');
        var id = $(button).attr('id-detail');
        $.ajax({
            type: 'POST',
            url: linkDetail,
            data: {
                id: id
            },
            success: function (res) {
                $("#my-modal").html(res);
                $("#my-modal").modal();
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>DeleteRows:</b> ' + e.message, 4);
    }
}
/*
 * Tiến hành gửi thông tin khóa học lên server để danh sách lớp học về và fill ra selectbox
 * Author       :   AnTM - 07/08/2018 - create
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
/*
 * Cập nhật trạng thái của danh sách đăng ký khóa học lên server
 * Author       :   HoangNM - 23/07/2018 - create
 * Param        :
 * Output       :
 */
function UpdateStatusCourseRegister(element) {
    try {
        $.ajax({
            type: 'POST',
            url: $(element).parents('.table-result').attr('link-update-show'),
            dataType: 'json',
            data: {
                id: $(element).attr('id-contact'),
                idTrangThai: $(element).val()
            },
            success: function (res) {
                if (res.Code == 200) {
                    if (res.ThongTinBoSung5 > 0) {
                        $('#dangKyMoi').addClass('numBerChuaXem');
                        $('#dangKyMoi').html(res.ThongTinBoSung5);
                    } else {
                        $('#dangKyMoi').html('');
                        $('#dangKyMoi').removeClass('numBerChuaXem');
                    }
                }
                else {
                    jMessage(0, function (ok) {
                    }, createMessage(res.MsgNo, res.ThongTinBoSung1, res.ThongTinBoSung2, res.ThongTinBoSung3), 4);
                }
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>UpdateStatusCourseRegister:</b> ' + e.message, 4);
    }
}

/*
 * Tạo list hiển thị thông tin phân trang
 * Author       :   HoangNM - 24/07/2018 - create
 * Param        :
 * Output       :
 */
function InitPage() {
    try {
        $('.table-result .pagination').pagination({
            items: $('#TotalPages').val(),
            itemOnPage: $('#NumberOfRecord').val(),
            currentPage: $('#CurrentPage').val(),
            onPageClick: function (page, evt) {
                $('#CurrentPage').val(page);
                Search();
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitPage:</b> ' + e.message, 4);
    }
}

/*
 * Tạo các checkbox có giao diện phù hợp
 * Author       :   HoangNM - 24/07/2018 - create
 * Param        :
 * Output       :
 */
function InitCheckBox() {
    try {
        // Tạo ô check box
        if ($(".table-result input.flat")[0]) {
            $('.table-result input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        }
        // Tạo nút switch từ checkbox
        if ($(".table-result .js-switch")[0]) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.table-result .js-switch'));
            elems.forEach(function (html) {
                var switchery = new Switchery(html, {
                    color: '#26B99A'
                });
            });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitCheckBox:</b> ' + e.message, 4);
    }
}

/*
 * Tìm kiếm dữ liệu theo điều kiện tìm kiếm
 * Author       :   HoangNM - 23/07/2018 - create
 * Param        :
 * Output       :
 */
function Search() {
    try {
        // Lấy dữ liệu tìm kiếm
        var data = {
            KeySearch: $('#KeySearch').val(),
            idTrangThai: $('#TrangThai').val(),
            CurrentPage: $('#CurrentPage').val(),
            PageSize: $('#PageSize').val(),
            idKhoaHoc: $('#KhoaHoc').val(),
            idLopHoc: $('#LopHoc').val(),
            tuNgay: $('#tuNgay').val(),
            toiNgay: $('#toiNgay').val()
        }
        $.ajax({
            type: 'GET',
            url: $('#btn-search').attr('link-search'),
            data: data,
            success: function (res) {
                $('#div-table-register').html(res);
                // Tạo lại số trang
                InitPage();
                // Tạo lại các checkbox và switch
                InitCheckBox();
                // Thay đổi url ma không load lại trang
                ChangeUrl('list-of-course-register', getLastOfUrl(url.mainURL) + '?' + serialize(data));
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Search:</b> ' + e.message, 4);
    }
}