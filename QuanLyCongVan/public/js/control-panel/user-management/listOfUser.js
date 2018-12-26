/*
 * Các xử lý cho hiển thị danh sách user
 * Author       :   TramHTD - 06/08/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    try {
        InitalizeUsers();
        InitEventUsers();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitalizeUsers:</b> ' + e.message, 4);
    }
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   TramHTD - 06/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitalizeUsers() {
    try {
        InitPage();
        setTabIndexTable('#div-table-user');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitalizeUsers:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   TramHTD - 06/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventUsers() {
    try {
        $('#btn-search').on('click', function () {
            $('#CurrentPage').val(1);
            Search();
        });
        $(document).on('change', '#page-size', function () {
            $('#PageSize').val($(this).val());
            Search();
        });
        $(document).on('click', '.btn-reset', function () {
            ResetPassWord(this);
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEventUsers:</b> ' + e.message, 4);
    }
}
/*
 * Tạo list hiển thị thông tin phân trang
 * Author       :   TramHTD - 06/08/2018 - create
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
        }, '<b>InitEventUsers:</b> ' + e.message, 4);
    }
}
/*
 * Tạo các checkbox có giao diện phù hợp
 * Author       :   TramHTD - 06/08/2018 - create
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
 * Thay đổi mật khẩu của account lên server
 * Author       :   TramHTD - 06/08/2018 - create
 * Param        :   
 * Output       :   
 */
function ResetPassWord(element) {
    try {
        $.ajax({
            type: 'POST',
            url: $(element).parents('.table-result').attr('link-reset-password'),
            dataType: 'json',
            data: {
                id: $(element).attr('id-account')
            },
            success: function (res) {
                if (res.Code == 200) {
                    jMessage(18, function(ok) {});
                } else {
                    jMessage(res.MsgNo, function (ok) { });
                }
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ResetPassWord:</b> ' + e.message, 4);
    }
}
/*
 * Tìm kiếm dữ liệu theo điều kiện tìm kiếm
 * Author       :   TramHTD - 06/08/2018 - create
 * Param        :   
 * Output       :   
 */
function Search() {
    try {
        // Lấy dữ liệu tìm kiếm
        var data = {
            Ho: $('#Ho').val(),
            Ten: $('#Ten').val(),
            UserName: $('#TenDangNhap').val(),
            SoDienThoai: $('#SoDienThoai').val(),
            Email: $('#Email').val(),
            IdGroup: $('#IdGroup').val(),
            CurrentPage: $('#CurrentPage').val(),
            PageSize: $('#PageSize').val(),
        }
        $.ajax({
            type: 'GET',
            url: $('#btn-search').attr('link-search'),
            data: data,
            success: function (res) {
                $('#div-table-user').html(res);
                // Tạo lại số trang
                InitPage();
                // Tạo lại các checkbox và switch
                InitCheckBox();
                // Thay đổi url mak không load lại trang
                ChangeUrl('list-of-user', getLastOfUrl(url) + '?' + serialize(data));
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Search:</b> ' + e.message, 4);
    }
}