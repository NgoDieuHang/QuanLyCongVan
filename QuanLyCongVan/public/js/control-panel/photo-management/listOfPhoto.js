/*
 * Các xử lý cho hiển thị danh sách hình ảnh
 * Author       :   HaLTH - 06/08/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    try {
        InitalizePhotos();
        InitEventPhotos();

    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Ready:</b> ' + e.message, 4);
    }
});

/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HaLTH - 06/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitalizePhotos() {
    try {
        InitPage();
        setTabIndexTable('#div-table-slide');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitalizePhotos:</b> ' + e.message, 4);
    }
}

/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HaLTH - 06/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventPhotos() {
    try {
        $('#btn-search').on('click', function () {
            $('#CurrentPage').val(1);
            Search();
        });
        $(document).on('change', '#page-size', function () {
            $('#PageSize').val($(this).val());
            Search();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEventPhotos:</b> ' + e.message, 4);
    }
}

/*
 * Tạo list hiển thị thông tin phân trang
 * Author       :   HaLTH - 06/08/2018 - create
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
 * Author       :   HaLTH - 06/08/2018 - create
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
 * Author       :   HaLTH - 06/08/2018 - create
 * Param        :   
 * Output       :   
 */
function Search() {
    try {
        // Lấy dữ liệu tìm kiếm
        var data = {
            KeySearch: $('#KeySearch').val(),
            CurrentPage: $('#CurrentPage').val(),
            PageSize: $('#PageSize').val()
        }
        $.ajax({
            type: 'GET',
            url: $('#btn-search').attr('link-search'),
            data: data,
            success: function (res) {
                $('#div-table-slide').html(res);
                // Tạo lại số trang
                InitPage();
                // Tạo lại các checkbox và switch
                InitCheckBox();
                // Thay đổi url mak không load lại trang
                ChangeUrl('list-of-photo', getLastOfUrl(url) + '?' + serialize(data));
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Search:</b> ' + e.message, 4);
    }
}