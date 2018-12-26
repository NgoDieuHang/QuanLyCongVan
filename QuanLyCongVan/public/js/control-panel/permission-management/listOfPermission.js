/*
 * Các xử lý cho hiển thị danh sách phân quyền
 * Author       :   AnTM - 13/08/2018 - create
 * Package      :   public/control-panel
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    try {
        InitalizePermissions();
        InitEventPermissions();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>ready:</b> ' + e.message, 4);
    }
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   AnTM - 13/08/2018 - create
 * Param        :
 * Output       :
 */
function InitalizePermissions() {
    try {
        setTabIndexTable('#div-table-permission');
        setTabIndexMenu();
        $('[tabindex=1]').focus();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitalizePermissions:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   AnTM - 13/08/2018 - create
 * Param        :
 * Output       :
 */
function InitEventPermissions() {
    try {
        $('#Group').on('change', function () {
            Search($(this));
        });
        $(document).on('change', '.is-enable', function () {
            if ($(this).attr('update') == '1') {
                UpdateEnablePermission($(this));
            }
            else {
                $(this).attr('update', 1);
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEventPermissions:</b> ' + e.message, 4);
    }
}
/*
 * Tạo các checkbox có giao diện phù hợp
 * Author       :   AnTM - 13/08/2018 - create
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
 * Cập nhật trạng thái kích hoạt của permission lên server, nếu permission là view index thì tắt các quyền kèm theo
 * Author       :   AnTM - 13/08/2018 - create
 * Param        :   element-checkBox
 * Output       :
 */
function UpdateEnablePermission(element) {
    try {
        if ($(element).attr('istoviewindex') == '1') {
            if (!$(element).is(':checked')) {
                var listCheck = $(element).parents('tbody.area-screen').find('.is-enable[istoviewindex="0"]');
                $.each(listCheck, function (i, value) {
                    if ($(value).is(':checked')) {
                        $(value).trigger('click');
                    }
                });
            }
        }
        $.ajax({
            type: 'POST',
            url: $(element).parents('.table-result').attr('link-update-enable'),
            dataType: 'json',
            data: {
                id: $(element).attr('id-permission')
            },
            success: function (res) {
                if (res.Code != 200) {
                    jMessage(res.MsgNo, function (ok) {
                        $(element).attr('update', 0);
                        $(element).trigger('click');
                    });
                }
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>UpdateEnablePermission:</b> ' + e.message, 4);
    }
}
/*
 * Tìm kiếm dữ liệu phân quyền theo nhóm khi chọn ở selectBox
 * Author       :   AnTM - 25/08/2018 - create
 * Param        :   element-selectBox
 * Output       :
 */
function Search(element) {
    try {
        $.ajax({
            type: 'GET',
            url: $(element).attr('link-search'),
            data: {
                idGroupFromClient: $(element).val()
            },
            success: function (res) {
                $('#div-table-permission').html(res);
                InitCheckBox();
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Search:</b> ' + e.message, 4);
    }
}