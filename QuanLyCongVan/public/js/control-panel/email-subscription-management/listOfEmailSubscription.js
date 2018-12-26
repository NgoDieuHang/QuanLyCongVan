/*
 * Các xử lý cho hiển thị danh sách đăng ký theo dõi
 * Author       :   HaLTH - 21/07/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */

var select_emails = [];

$(document).ready(function () {
    $(document).on('ifToggled', '.table-result input.flat', handleClickCheckboxEmail);
    $('#btn-copy-email').click(copySelectEmails);
    try {
        InitalizeEmailSubscription();
        InitEventEmailSubscription();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Ready:</b> ' + e.message, 4);
    }
});

/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HaLTH - 21/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitalizeEmailSubscription() {
    try {
        InitPage();
        setTabIndexTable('#div-table-slide');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitalizeEmailSubscription:</b> ' + e.message, 4);
    }
}

/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   QuyPN - 09/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventEmailSubscription() {
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
        }, '<b>InitEventEmailSubscription:</b> ' + e.message, 4);
    }
}

/*
 * Tạo list hiển thị thông tin phân trang
 * Author       :   HaLTH - 21/07/2018 - create
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
 * Author       :   HaLTH - 21/07/2018 - create
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
 * Author       :   HaLTH - 21/07/2018 - create
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
                // Thay đổi url mà không load lại trang
                ChangeUrl('list-of-email', getLastOfUrl(url) + '?' + serialize(data));
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Search:</b> ' + e.message, 4);
    }
}

/*
 * Tiến hành lấy dữ liệu nội dung email
 * Author       :   HaLTH - 04/08/2018 - create
 * Param        :   checked - lấy dữ liệu email bỏ vào textbox
 * Param        :   unchecked - lấy dữ liệu email ra khỏi textbox
 * Output       :   
 */
function handleClickCheckboxEmail() {
    var selectEmail = $(this).data('email');
    var index = select_emails.findIndex(function (email)
    {
        return email === selectEmail;
    });

    if ($(this).is(":checked")) {
        if (index === -1) select_emails.push($(this).data('email'));
    } else {
        if (index !== -1) select_emails.splice(index, 1);
    }
    updateTextBox();
}

/*
 * Update danh sách các email vào textbox sao chép email
 * Author       :   HaLTH - 04/08/2018 - create
 * Param        :   
 * Output       :   
 */
function updateTextBox() {
    $('#CopyEmails').val(select_emails.join(', '));
}

/*
 * Tiến hành copy toàn bộ nội dung trong textbox để gửi email
 * Author       :   HaLTH - 21/07/2018 - create
 * Param        :   
 * Output       :   
 */
function copySelectEmails() {
    $('#CopyEmails').select();
    document.execCommand("copy");
}