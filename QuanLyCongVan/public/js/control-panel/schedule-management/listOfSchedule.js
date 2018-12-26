/*
 * Các xử lý cho hiển thị danh sách liên hệ
 * Author       :   HoangNM -06/10/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    try {
        InitalizeSchedule();
        InitEventSchedule();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ready:</b> ' + e.message, 4);
    }
});

/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HoangNM - 06/10/2018 - create
 * Param        :   
 * Output       :   
 */
function InitalizeSchedule() {
    try {
        InitPage();
        setTabIndexTable('#div-table-slide');
        setTabIndexMenu();
        $('[tabindex=1]').focus();

    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitalizeSchedule:</b> ' + e.message, 4);
    }
}

/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HoangNM - 06/10/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventSchedule() {
    try {
        $('#btn-search').on('click', function () {
            $('#CurrentPage').val(1);
            Search();
        });
        $(document).on('change', '#page-size', function () {
            $('#PageSize').val($(this).val());
            Search();
        });
        $(document).on('change', '#KhoaHoc', function () {
            FillClassByKhoaHoc($('#KhoaHoc').val());
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEventSchedule:</b> ' + e.message, 4);
    }
}

/*
 * Tạo list hiển thị thông tin phân trang
 * Author       :   HoangNM - 06/10/2018 - create
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
 * Author       :   HoangNM - 06/10/2018 - create
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
 * Cập nhật trạng thái của lịch học lên server
 * Author       :   HoangNM - 06/10/2018 - create
 * Param        :   
 * Output       :   
 */
function UpdateShowSchedule(element) {
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

                $("#contactChuaXem").html(res.ThongTinBoSung2);
                if (res.ThongTinBoSung2 == "0") {
                    $("#contactChuaXem").hide();
                } else {
                    $("#contactChuaXem").show();
                }
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>UpdateShowContact:</b> ' + e.message, 4);
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
            idPhongHoc: $('#idPhongHoc').val(),
            NgayHoc: $('#NgayHoc').val(),
            idKhoaHoc: $('#KhoaHoc').val(),
            idLopHoc: $('#LopHoc').val(),
            CurrentPage: $('#CurrentPage').val(),
            PageSize: $('#PageSize').val()
        }
        $.ajax({
            type: 'GET',
            url: $('#btn-search').attr('link-search'),
            data: data,
            success: function (res) {
                $('#div-table-schedule').html(res);
                // Tạo lại số trang
                InitPage();
                // Tạo lại các checkbox và switch
                InitCheckBox();
                // Thay đổi url mak không load lại trang
                ChangeUrl('list-of-schedule', getLastOfUrl(url) + '?' + serialize(data));
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Search:</b> ' + e.message, 4);
    }
}

/*
 * Tiến hành gửi thông tin khóa học lên server để danh sách lớp học về và fill ra selectbox
 * Author       :   HoangNM - 06/10/2018 - create
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
