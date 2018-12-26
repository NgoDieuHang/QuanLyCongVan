(
    function ($) {
    "use strict";
    
    $('#btn-logout').on('click', function () {
        var token = $.cookie("token");
        $.removeCookie("token");
        window.location = $(this).attr('link') + '?token=' + token
    });
/*-----------------------------
	Menu Stick
---------------------------------*/
    if ($(".sticker")[0]){
        $('.sticker');
        $(window).scroll(function(){
            var wind_scr = $(window).scrollTop();
            var window_width = $(window).width();
            var head_w = $('.sticker').height();
            if (window_width >= 10) {
                if(wind_scr < 130){
                    if($('.sticker').data('stick') === true){
                        $('.sticker').data('stick', false);
                        $('.sticker').stop(true).animate({opacity : 0}, 0, function(){
                            $('.sticker').removeClass('stick slideDown');
                            $('.sticker').stop(true).animate({opacity : 1}, 0);
                        });
                        $('.header-top').removeClass('header-top-padding');
                    }
                } else {
                    if($('.sticker').data('stick') === false || typeof $('.sticker').data('stick') === 'undefined'){
                        $('.sticker').data('stick', true);
                        $('.sticker').stop(true).animate({opacity : 0}, 0,function(){
                            $('.sticker').addClass('stick slideDown');
                            $('.sticker.stick').stop(true).animate({opacity : 1}, 0);
                        });
                        $('.header-top').addClass('header-top-padding');
                    }
                }
            }
        });
    };	
    
/*----------------------------
    Toogle Search
------------------------------ */
    // Handle click on toggle search button
    $('.header-search').on('click', function() {
        $('.search').toggleClass('open');
        return false;
    });
    
    // Handle click on search submit button
    $('#search-form input[type=submit]').on('click', function() {
        $('.search').toggleClass('open');
        return true;
    });
    
    // Clicking outside the search form closes it
    $(document).on('click', function(event) {
        var target = $(event.target);
        
        if (!target.is('.header-search') && !target.closest('.search').size()) {
            $('.search').removeClass('open');
        }
    });
    
/*----------------------------
    jQuery MeanMenu
------------------------------ */
	jQuery('nav#dropdown').meanmenu();	
	
/*----------------------------
    Wow js active
------------------------------ */
    new WOW().init();
 
///*----------------------------
//    Single Latest Carousel
//------------------------------ */  
//    $('.latest-carousel').owlCarousel({
//		loop:true,
//		margin:0,
//		nav:true,		
//		autoplay:false,
//		smartSpeed:2000,
//		navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
//		responsive:{
//			0:{
//				items:1
//			},
//			600:{
//				items:2
//			},
//			1000:{
//				items:2
//			}
//		}
//	});	 
//    
///*----------------------------
//    Single Product Carousel
//------------------------------ */  
//    $('.single-product-carousel').owlCarousel({
//		loop:true,
//		margin:0,
//		nav:true,		
//		autoplay:false,
//		smartSpeed:2000,
//		navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
//		responsive:{
//			0:{
//				items:1
//			},
//			600:{
//				items:3
//			},
//			1000:{
//				items:4
//			}
//		}
//	});	
//    
/*--------------------------
    ScrollUp
---------------------------- */	
	$.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    }); 	   
    
/*--------------------------
    Counter Up
---------------------------- */	
    $('.counter').counterUp({
        delay: 70,
        time: 5000
    }); 
    
/*------------------------------------
	Testimonial Slick Carousel as Nav
--------------------------------------*/
    $('.testimonial-image-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.testimonial-text-slider',
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '10px',
        responsive: [
            {
              breakpoint: 450,
              settings: {
                dots: false,
                slidesToShow: 3,  
                centerPadding: '0px',
                }
            },
            {
              breakpoint: 420,
              settings: {
                autoplay: true,
                dots: false,
                slidesToShow: 1,
                centerMode: false,
                }
            }
        ]
    });
/*--------------------------------
        Testimonial Slick Carousel
-----------------------------------*/
    $('.testimonial-text-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: true,
        asNavFor: '.testimonial-image-slider',
    });
 
})(jQuery); 


/*--------------------------------
        Plugin Facebook
-----------------------------------*/
/*
 * Các xử lý cho phần Like FanPage Ipro
 * Author       :   HaLTH - 21/07/2018 - create
 * Package      :   public/layout-user
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.0&appId=221894621737077&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


/*--------------------------------
        Email Subscription
-----------------------------------*/
/*
 * Các xử lý cho phần Đăng ký theo dõi qua email
 * Author       :   HaLTH - 03/07/2018 - create
 * Package      :   public/home
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    InitSubscribe();
    InitEventSubscribe();
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HaLTH - 03/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitSubscribe() {
    try {

    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Subscribe:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HaLTH - 03/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventSubscribe() {
    try {
        $('#btn-subscribe').on('click', function () {
            SubmitSubscribe();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Subscribe:</b> ' + e.message, 4);
    }
}
/*
 * Thực hiện kiểm tra thông tin email do người dung cung cấp
 * Author       :   HaLTH - 03/07/2018 - create
 * Param        :   
 * Output       :   
 */
function SubmitSubscribe() {
    try {
        var url1 = $('#form-subscribe').attr('action') + "?Email=" + $('#Email').val();
        var url2 = $('#form-subscribe').attr('action');
        var error1 = validate('#form-subscribe');
        if (!error1) {
            $.ajax({
                type: 'GET',
                url: url1,
                success: SubscribeEmailResponse
            });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Submit Subscribe:</b> ' + e.message, 4);
    }
}
/*
 * Xử lý sau khi đăng ký theo dõi
 * Author       :   HaLTH - 03/07/2018 - create
 * Param        :   res - đối tượng response trả về từ server
 * Output       :  
 */
function SubscribeEmailResponse(res) {
    try {
        if (res.Code == 200) {
            callLoading();
            jMessage(res.MsgNo, function (ok) { });
        }
        else {
            jMessage(res.MsgNo, function (ok) { });
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Subscribe Email Response:</b> ' + e.message, 4);
        return true;
    }
}

//--------------------------------------------------------------


$(document).on('ready', function () {
    $('.fileImg').on('click', function () {
        var lang = getLang();
        clearErrorItem('#' + $(this).attr('id-view'), _text[lang][msg_err_file[$(this).attr('err-idx')]])
    });
    $('.fileImg').on('change', function (e) {
        CheckFileImg(this, e);
    });
});
/*
 * Lấy phần đuôi của 1 url
 * Author       :   HoangNM - 20/08/2018 - create
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
function readImage(file, width_height, idImage, previewImg) {
    try {
        if (previewImg == undefined || previewImg == null) {
            previewImg = true;
        }
        window.URL = window.URL || window.webkitURL;
        var useBlob = false && window.URL; // set to `true` to use Blob instead of Data-URL
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            var image = new Image();
            image.addEventListener("load", function () {
                // set widht, height
                if (width_height !== '') {
                    $('#' + width_height).attr('data-width', image.width);
                    $('#' + width_height).attr('data-height', image.height);
                }
                // preview image
                if (previewImg) {
                    $('#' + idImage).attr('src', image.src);
                } else {
                    $('#' + idImage).attr('src', '');
                }
                if (useBlob) {
                    // Free some memory
                    window.URL.revokeObjectURL(image.src);
                }
            });
            image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
        });
        reader.readAsDataURL(file);
    } catch (e) {
        console.log('readImage: ' + e.message);
    }
}
function CheckFileImg(btn, e) {
    try {
        var lang = getLang();
        var idx = $(btn).attr('err-idx');
        var idView = $(btn).attr('id-view');
        var typeFiles = $(btn).attr('accept').split(',');
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            $('#' + idView).val('');
            msg_err_file[idx] = MsgNo.ChuaChonFile;
            $('#' + idView).errorStyle(_text[lang][MsgNo.ChuaChonFile]);
            $('#imgPreview' + idx).attr('src', '');
            return;
        }
        var extension = '.' + files[0].name.split('.').pop();
        if (typeFiles.indexOf(extension) == -1) {
            msg_err_file[idx] = MsgNo.FileSaiDinhDang;
            $('#' + idView).errorStyle(_text[lang][MsgNo.FileSaiDinhDang]);
            $('#imgPreview' + idx).attr('src', '');
            $('#' + idView).val(files[0].name);
            return;
        }
        if (files[0].size / 1024 / 1024 > 10) {
            msg_err_file[idx] = MsgNo.FileQuaDungLuong;
            $('#' + idView).errorStyle(_text[lang][MsgNo.FileQuaDungLuong]);
        }
        else {
            msg_err_file[idx] = 0;
            readImage(files[0], 'size' + idx, 'imgPreview' + idx);
        }
        $('#' + idView).val(files[0].name);
    } catch (e) {
        jMessage(0, function (ok) {
        }, '<b>CheckFile:</b> ' + e.message, 4);
    }
}
function checkRateImg(idx) {
    try {
        var lang = getLang();
        if (msg_err_file[idx] == MsgNo.AnhSaiKichThuoc) {
            msg_err_file[idx] = 0;
        }
        var $size = $('#size' + idx);
        var min_width = parseInt($size.attr('min-of-width'));
        var min_rate = parseFloat($size.attr('min-rate'));
        var max_rate = parseFloat($size.attr('max-rate'));
        
        if ($size.data('height') != undefined && $size.data('width') != undefined) {
            var width = parseInt($size.attr('data-width'));
            var height = parseInt($size.attr('data-height'));
            var rate = parseFloat(width / height);
            if (!(width >= min_width && rate >= min_rate && rate <= max_rate)) {
                $('#' + $size.attr('id-view')).errorStyle(_text[lang][MsgNo.AnhSaiKichThuoc]);
                msg_err_file[idx] = MsgNo.AnhSaiKichThuoc;
                return false;
            }
        }
        return true;
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>checkRateImg:</b> ' + e.message, 4);
    }
}
function ValidateFile(idx) {
    try {
        var $size = $('#size' + idx);
        if ($size.data('height') != undefined && $size.data('width') != undefined) {
            var lang = getLang();
            checkRateImg(idx);
            if (msg_err_file[idx] != 0) {
                $('#' + $('#size' + idx).attr('id-view')).errorStyle(_text[lang][msg_err_file[idx]]);
                return true;
            }
            clearErrorItem('#' + $('#size' + idx).attr('id-view'), _text[lang][msg_err_file[idx]])
        }
        
        return false;
    }
    catch (e) {
        return true;
        jMessage(0, function (ok) {
        }, '<b>ValidateFile:</b> ' + e.message, 4);
    }
}

$(document).ready(
    function () {
        var t = {
            delay: 125,
            overlay: $(".fb-overlay"),
            widget: $(".fb-widget"),
            button: $(".fb-button")
        };
        setTimeout(function ()
        { $("div.fb-livechat").fadeIn() }, 8 * t.delay),
            $(".ctrlq").on("click",
            function (e) {
                e.preventDefault(),
                    t.overlay.is(":visible") ? (t.overlay.fadeOut(t.delay),
                    t.widget.stop().animate({
                        bottom: 0, opacity: 0
                    }, 2 * t.delay,
                        function () {
                            $(this).hide("slow"), t.button.show()
                        })) : t.button.fadeOut("medium",

                        function () {
                            t.widget.stop().show().animate({
                                bottom: "30px", opacity: 1
                            }, 2 * t.delay), t.overlay.fadeIn(t.delay)
                        })
            })
    });
