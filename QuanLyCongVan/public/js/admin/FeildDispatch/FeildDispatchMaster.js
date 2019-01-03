/*
 * Các xử lý thêm,sửa ,xóa danh sách lĩnh vực
 * Author       :   HoangNM - 30/12/2018 - create
 * Package      :   public/admin
 * Copyright    :   Team An_Hang_Hoang
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
 * Author       :   HoangNM - 30/12/2018 - create
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
 * Author       :   HoangNM - 30/12/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveFeildDispatch();
        });

        $('#btn-delete').on('click', function () {
            DeleteFeildDispatch();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}


/*
 * lưu thông tin thay đổi hoặc thêm mới
 * Author       :   HoangNM - 30/12/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveFeildDispatch() {
    try {
        var err1 = validate("#form-feild-dispatch-main");
        if (!err1) {
            $('#form-feild-dispatch-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code === 200) {
                        jMessage(15, function () {
                            console.log(url.listOfFeildDispatch);
                            window.location = url.listOfFeildDispatch;
                        });
                    }
                    else {
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
        }, '<b>SaveFeildDispatch:</b> ' + e.message, 4);
    }
}

/*
 * xóa loại công văn
 * Author       :   HoangNM - 29/12/2018 - create
 * Param        :   
 * Output       :   
 */
function DeleteFeildDispatch() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deleteFeildDispatch,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdFeildDispatch').val()]
                    },
                    success: function (res) {
                        if (res.Code === 200) {
                            window.location = url.listOfFeildDispatch;
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
        }, '<b>DeleteFeildDispatch:</b> ' + e.message, 4);
    }
}