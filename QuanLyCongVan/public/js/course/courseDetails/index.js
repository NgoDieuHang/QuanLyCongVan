/*
 * Các xử lý cho trang chi tiết khóa học
 * Author       :   TramHDT - 12/07/2018 - create
 * Package      :   public/js/courseDetails
 * Copyright    :   Team Noname
 * Version      :   1.0.0
 */
$(document).ready(function () {
    InitCourseDetails();
    InitEventCourseDetails();
});
/*
 * Khởi tạo các giá trị ban đầu cho trang
 * Author       :   TramHDT - 12/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitCourseDetails() {
    try {
        StarRatingClick();
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Course Details:</b> ' + e.message, 4);
    }
}
/*
 * Khởi tạo các sự kiện của cho trang
 * Author       :   TramHDT - 12/07/2018 - create
 * Param        :   
 * Output       :   
 */
function InitEventCourseDetails() {
    try {
        $(document).on('click', '.link-reply', function () {
            LoadFormCommentReply(this);
        });

        $(document).on('click', '.see-more-reply', function () {
            LoadCommentReply(this);
        });

        $(document).on('click', '#see-more-comment', function () {
            LoadComment();
        });
        $(document).on('click', '.btn-send-reply', function () {
            ReplyComment(this);
        });
        $(document).on('click', '#btn-send', function () {
            Comment();
        });
        $(document).on('click', '.btn-close', function () {
            $(this).parents('.comment').find('#form-reply-area').addClass('hidden');
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Init Event Course Details:</b> ' + e.message, 4);
    }
}

/*
 * xử lý sau khi nhấn nút trả lời
 * Author       :   TramHDT - 23/07/2018 - create
 * Param        :   
 * Output       :   
 */
function LoadFormCommentReply(element) {
    var content = $(element).parents('.comment').find('#reply-content');
    if (content.length > 0) {
        $(element).parents('.comment').find('#form-reply-area').removeClass('hidden');
        content.focus();
    } else {
        var html = $('#commnent-reply-area').html();
        $(element).parents('.comment').find('#form-reply-area').append(html);
        $(element).parents('.comment').find('#reply-content').focus();
    }

}

/*
 * Tiến hành gửi thông tin lên server để người dùng trả lời bình luận
 * Author       :   TramHDT - 12/07/2018 - create
 * Param        :   
 * Output       :   
 */
function ReplyComment(element) {
    try {
        if (!validate($(element).parents('.comment').find('form'))) {
        var idParentComment = $(element).parents('.comment').find('#id-parent-comment').val();
        var contentReply = $(element).parents('.comment').find('#reply-content').val();
            $.ajax({
                type: 'POST',
                url: $('#form-comment').attr('action'),
                data: {
                    idParentComment: idParentComment,
                    contentReply: contentReply,
                    idKhoaHoc: idKhoaHoc,
                    IdUser: idUser,
                    starRating: 0
                },
                success: function (res) {
                    $(element).parents('.comment').find('#reply-area').removeClass('hidden');
                    $(element).parents('.comment').find('#reply-area').append(res);
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
        }, '<b>Reply Comment:</b> ' + e.message, 4);
    }
}

/*
 * Tiến hành gửi thông tin lên server để người dùng trả lời bình luận
 * Author       :   TramHDT - 12/07/2018 - create
 * Param        :   
 * Output       :   
 */
function Comment() {
    try {
        var ratingValue = 0;
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
                    idParentComment: 0,
                    contentReply: $('#commnent-content').val(),
                    idKhoaHoc: idKhoaHoc,
                    starRating: ratingValue,
                    IdUser: idUser
                },
                success: function (res) {
                    if ($('#commnent-content').val().length > 0) {
                        $('#list-comment').prepend(res);
                        $('#commnent-content').val('');
                        $("html, body").animate({ scrollTop: $('#Comments').offset().top }, "slow");
                    }
                }
            });
        }
        else {
            $('.comment-error').removeClass("hidden");
        }
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Reply Comment:</b> ' + e.message, 4);
    }
}

/*
 * Tiến hành gửi thông tin lên server để xem thêm bình luận lớn
 * Author       :   TramHDT - 23/07/2018 - create
 * Param        :   
 * Output       :   
 */
function LoadComment() {
    try {
        var countComment = $('#see-more-comment').parents('.comments').find('.comment-area').length;
        $.ajax({
            type: 'POST',
            url: $('#see-more-comment').attr('link-see-more'),
            data:
            {
                countComment: countComment,
                childComment: 0,
                idParentComment: 0,
                idKhoaHoc: idKhoaHoc
            },
            success: function (res) {
                $('#list-comment').append(res);
                if ($('#see-more-comment').parent().find('#count-comment').val() <= countComment +5) {
                    $('#see-more-comment').parent().addClass('hidden');
                }
            }
            });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Load Comment:</b> ' + e.message, 4);
    }
}



/*
 * Tiến hành gửi thông tin lên server để xem thêm bình luận con
 * Author       :   TramHDT - 23/07/2018 - create
 * Param        :   
 * Output       :   
 */
function LoadCommentReply(element) {
    try {
        var idParentComment = $(element).parents('.comment').find('#id-parent-comment').val();
        var childComment = $(element).parents('.comment').find('.child-comment').length;
        $.ajax({
            type: 'POST',
            url: $('#see-more-comment').attr('link-see-more'),
            data:
            {
                countComment: 0,
                childComment: childComment,
                idParentComment: idParentComment,
                idKhoaHoc: idKhoaHoc
            },
            success: function (res) {
                $(element).parents('.comment').find('#list-comment-reply').prepend(res);
                if ($(element).parent().find('#count-comment-reply').val() <= childComment + 2) {
                    $(element).parent().addClass('hidden');
                }
            }
        });
    }
    catch (e) {
        jMessage(0, function (ok) {
        }, '<b>Load Comment:</b> ' + e.message, 4);
    }
}


/*
 *Xử lý khi rê và kích chuột vào ngôi sao đánh giá
 * Author       :   TramHDT - 12/07/2018 - create
 * Param        :   
 * Output       :   
 */
function StarRatingClick() {
    $('#stars li').on('mouseover', function () {
        $('.comment-error').hide();
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

    $('#stars li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10);
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }
    });
}
