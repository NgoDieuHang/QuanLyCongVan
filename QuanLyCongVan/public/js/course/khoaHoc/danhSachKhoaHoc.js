/*
 * Các xử lý cho hiển thị danh sách khóa học
 * Author       :   QuyPN -09/07/2018 - create
 * Package      :   public/course
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    Init();
    InitEvents();
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   QuyPN - 09/07/2018 - create
 * Param        :   
 * Output       :   
 */
function Init() {
    try {
        $('.pagination').pagination({
            items: $('#TotalPages').val(),
            itemOnPage: 3,
            currentPage: $('#CurrentPage').val(),
            prevText: '<i class="zmdi zmdi-chevron-left"></i>',
            nextText: '<i class="zmdi zmdi-chevron-right"></i>',
            onPageClick: function (page, evt) {
                $('#CurrentPage').val(page);
                LoadPage();
            }
        });
        $('#btn-search').on('click', function () {
            $('#CurrentPage').val(1);
            LoadPage();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   QuyPN - 09/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}

/*
 * Phân Trang
 * Author       :   TramHTD - 06/08/2018 - create
 * Param        :   
 * Output       :   
 */
function LoadPage() {
    try {
        var data = {
            KeySearch: $('#KeySearch').val(),
            IdChuyenNganh: $('#IdChuyenNganh').val(),
            CurrentPage: $('#CurrentPage').val(),
        }
        $.ajax({
            type: 'GET',
            url: url.danhSachKhoaHoc,
            data: data,
            success: function (res) {
                $('#div-list-coures').html(res);
                // Tạo lại số trang
                Init();
                // Thay đổi url mak không load lại trang
                ChangeUrl('danh-sach-khoa-hoc', getLastOfUrl(url) + '?' + serialize(data));
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Search:</b> ' + e.message, 4);
    }
}
/*
 * Lấy phần đuôi của 1 url
 * Author       :   QuyPN - 09/07/2018 - create
 * Param        :   
 * Output       :   
 */
function getLastOfUrl(url) {
    try {
        var url_arr = url.split('/');
        return url_arr[url_arr.length - 1];
    }
    catch (e) {
        return '';
    }
}
/*
 * Tạo query string từ object
 * Author       :   QuyPN - 09/07/2018 - create
 * Param        :   
 * Output       :   
 */
function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}