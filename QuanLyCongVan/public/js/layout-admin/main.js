/*
 * Các xử lý cho phần _TopMenu và _LeftMenu
 * Author       :   HoangNM - 16/08/2018 - create
 * Package      :   public/layout-admin
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    InitAdmin();
    InitEventAdmin();
});

/*
 * Khởi tạo các giá trị ban đầu
 * Author       :   HoangNM - 16/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitAdmin() {
    try {
        
        var lang = getLang();
        Lang(lang);

    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Admin :</b> ' + e.message, 4);
    }
}

/*
 * Khởi tạo các sự kiện của cho trang 
 * Author       :   HoangNM - 15/08/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventAdmin() {
    try {
        $('#btn-logout-left').on('click', function () {
            logoutAdmin(this);
        });
        $('#btn-logout-top').on('click', function () {
            logoutAdmin(this);
        });
        
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Admin:</b> ' + e.message, 4);
    }
}


function logoutAdmin(id) {
    var token = $.cookie("token");
    $.removeCookie("token");
    window.location = $(id).attr('link') + '?token=' + token;
}

/*
 * Dùng để hiển thị khi chọn ngôn ngữ nào
 * Author       :   HoangNM - 15/08/2018 - create
 * Param        :   
 * Output       :   
 */
function Lang(lang) {
    if (lang == "vi") {
        $("#left-vi").css("background", "#425567");
        $("#top-vi").css("background", "#f5f5f5");
    } else {
        $("#left-en").css("background", "#425567");
        $("#top-en").css("background", "#f5f5f5");
    }
}
/*
 * Dùng để hiển thị phần chọn ngôn ngữ ở phía top_menu
 * Author       :   HoangNM - 15/08/2018 - create
 * Param        :   
 * Output       :   
 */
//function displayLangTop() {
//    if ($('body').hasClass('nav-md')) {
//        $('#top-lang').css('display', 'none');
//    } else {
//        $('#top-lang').css('display', 'inline');
//    }
//}
