/*
 * Các xử lý thêm,sửa ,xóa danh sách loại văn bản
 * Author       :   HoangNM - 27/12/2018 - create
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
 * Author       :   HoangNM - 27/12/2018 - create
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
 * Author       :   HoangNM - 27/12/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEvents() {
    try {
        $('#btn-save').on('click', function () {
            SaveDocument();
        });
        
        $('#btn-delete').on('click', function () {
            DeleteDocument();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>InitEvents:</b> ' + e.message, 4);
    }
}


/*
 * lưu thông tin thay đổi hoặc thêm mới
 * Author       :   HoangNM - 27/12/2018 - create
 * Param        :   
 * Output       :   
 */
function SaveDocument() {
    try {
        var err1 = validate("#form-document-main");
        //var err2 = ValidateFile(0);
        if (!err1 ) {
            alert('vào');
            $('#form-document-main').ajaxSubmit({
                beforeSubmit: function (a, f, o) {
                    o.dataType = 'json';
                },
                complete: function (XMLHttpRequest, textStatus) {
                    var res = XMLHttpRequest.responseJSON;
                    if (res.Code === 200) {
                        jMessage(15, function () {
                            console.log(url.editPhotos + (isInsert === 'I' ? ('/' + res.ThongTinBoSung1) : ''));
                            window.location = url.editPhotos + (isInsert === 'I' ? ('/' + res.ThongTinBoSung1) : '');
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
        }, '<b>SaveDocument:</b> ' + e.message, 4);
    }
}

/*
 * xóa loại văn bản
 * Author       :   HoangNM - 27/12/2018 - create
 * Param        :   
 * Output       :   
 */
function DeleteDocument() {
    try {
        jMessage(10, function (ok) {
            if (ok) {
                $.ajax({
                    type: 'POST',
                    url: url.deletePhotos,
                    dataType: 'json',
                    data: {
                        ids: [$('#IdDocument').val()]
                    },
                    success: function (res) {
                        if (res.Code === 200) {
                            window.location = url.createPhotos;
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
        }, '<b>DeleteDocument:</b> ' + e.message, 4);
    }
}