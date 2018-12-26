/*aaaaaa
 * Các xử lý cho trang tntuc
 * Author       :   HangNTD - 12/07/2018 - create
 * Package      :   public/home
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    InitLogin();
    InitEventLogin();
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   HangNTD - 12/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitLogin() {
    try {
        if (parseInt($('#count-all-comment').val()) <= parseInt($('#count-comment').val())) {
            $('#see-more-comment-news').addClass('hidden');
        };
        $('#stars li').on('mouseover', function () {
            var onStar = parseInt($(this).data('value'), 10);
            $(this).parent().children('li.star').each(function (e) {
                if (e < onStar) {
                    $(this).addClass('hover');
                }
                else {
                    $(this).removeClass('hover');
                }
            });
        }).on('mouseout', function () {
            $(this).parent().children('li.star').each(function (e) {
                $(this).removeClass('hover');
            });
            });
        starRating();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Login:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   HangNTD - 12/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventLogin() {
    try {
        $(document).on('click', '.reply-comment', function () {
            ReplyComment(this);
        });
        $(document).on('click', '.see-more-child',function () {
            SeeMoreChildComment(this);
        });
        $(document).on('click', '.btn-send-comment-reply',function () {
            SendCommentReply(this);
        });
        $(document).on('click', '.btn-cancel-reply', function () {
            $(this).parents('.comment-reply').addClass("hidden");
        });
        $(document).on('click', '#btn-send-comment', function () {
            SendComment();
        })
        $(document).on('click', '#see-more-comment', function () {
            SeeMoreComment();
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Login:</b> ' + e.message, 4);
    }
}

function starRating() {
    $('#stars li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }
        
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);

    });
}

function SendComment() {
    try {
        var ratingValue = 0;
        var idUser = parseInt($('#idUser').val());
        if (idUser != 0) {
            ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        }
        if (!(ratingValue > 0)) {
            ratingValue = 0;
        }
        if ((idUser != 0 && (ratingValue > 0 || !validate('#form-comment'))) || (!validate('#form-comment'))) {
           $.ajax({
                type: 'POST',
                url: $('#form-comment').attr('action'),
                data: {
                    idUser: idUser,
                    idTintuc: parseInt($('#idTinTuc').val()),
                    Content: $('#content-comment').val(),
                    Rating: ratingValue
                },
               success: function (res) {
                    if ($('#content-comment').val().length > 0) {
                        $('#Comment').prepend(res);
                        $('#content-comment').val('');
                        $("html, body").animate({ scrollTop: $('#Comments').offset().top }, "slow");
                        var stars = $('#stars').children('li.star');
                        for (i = 0; i < stars.length; i++) {
                            $(stars[i]).removeClass('selected');
                        }
                    }
                } 
            });
        }
        else {
            $('.item-error').first().focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Submit Login:</b> ' + e.message, 4);
    }
}

function SendCommentReply(element) {
    try {
        if (!validate($(element).parents('#form-comment-reply'))) {
        var idcomment = parseInt($(element).parents('.comment').children('.idCommentParrent').val());
        var idCommentParrent = parseInt($(element).parents('.comment').children('.idCommentParrent').val());
        var content = $(element).parent().parent().children('.commnent-reply-content').val();
            $.ajax({
                type: 'POST',
                url: $('#form-comment-reply').attr('action'),
                data: {
                    idUser: parseInt($('#idUser').val()),
                    idTintuc: parseInt($('#idTinTuc').val()),
                    Content: content,
                    idComment: idcomment
                },
                success: function (res) {
                    $(element).parents('.comment').children('.area-comment-reply').append(res);
                    $(element).parents('.comment').find('#reply-content').val('');
                } 
            });
        }
        else {
            $('.item-error').first().focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Submit Login:</b> ' + e.message, 4);
    }
}

function SeeMoreComment() {
    var countComment = $('#count-comment').val();
    $.ajax({
        type: 'POST',
        url: $('#see-more-comment').attr('link-see-more'),
        data:
            {
                idTintuc: parseInt($('#idTinTuc').val()),
                countComment: countComment,
                idCommentParrent: 0,
                countCommentChild: 0
            },
        success: function (res) {
            $('.comments').append(res);
            countComment = parseInt(countComment) + 5;
            $("#count-comment").attr("value", countComment);
            if (parseInt($('#count-all-comment').val()) <= parseInt($('#count-comment').val())) {
                $('#see-more-comment-news').addClass('hidden');
            };
        },
        error: function (res) {
            console.log(res);
        }
    });

}

function SeeMoreChildComment(element) {
    var idCommentParrent = parseInt($(element).parents('.comment').children('.idCommentParrent').val());
    var countComment = $('#count-comment').val();
    var countCommentChild = parseInt($(element).parents('.comment').children('.count-comment-child').val());
    var commentChild = parseInt($(element).parents('.comment').children('.comment-child').val());
    $.ajax({
        type: 'POST',
        url: $('#see-more-comment').attr('link-see-more'),
        data:
            {
                idTintuc: parseInt($('#idTinTuc').val()),
                countComment: countComment,
                idCommentParrent: idCommentParrent,
                countCommentChild: countCommentChild 
            },
        success: function (res) {
            $('#commentParrent-' + idCommentParrent).append(res);
            countCommentChild = countCommentChild + 2;
            $(element).parents('.comment').children('.count-comment-child').attr("value", countCommentChild);
            if (commentChild <= countCommentChild + 2) {
                $(element).addClass("hidden");
            }
        },
        error: function (res) {
            console.log(res);
        }  
    });
        
}

function ReplyComment(element) {
    try {
        var content = $(element).parents('.comment').find('#reply-content');
        if (content.length > 0) {
            $(element).parents('.comment').find('.comment-reply').removeClass("hidden");
            content.focus();
        } else {
            var idCommentParrent = parseInt($(element).parents('.comment').children('.idCommentParrent').val());
            var html = $('#area-comment-reply').html();
            (idCommentParrent != 0) ? $(element).parents('.comment').append(html) : $('.comments').append(html);
            $(element).parents('.comment').find('#reply-content').focus();
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Comment Success:</b> ' + e.message, 4);
    }
}