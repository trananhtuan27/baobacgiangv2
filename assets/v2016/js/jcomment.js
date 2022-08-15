var tmpComment = '{{#.}}' +
    '<div class="comment-item">' +
        '<div class="comment_ask " id="c{{id}}" data-name="{{name}}">' +
            '<i class="iconcom-user">{{shortname}}</i><strong onclick="selCmt({{id}})">{{name}}</strong><b class="datetime m-l-5 m-r-5 f-8">●</b><b class="datetime">{{createdAt}}</b>' +
            '<div class="infocom_ask">{{subject}}</div>' +
            '<div class="relate_infocom" data-cl="0">' +
            '<span class="reply" onclick="cmtaddreplyclick({{id}},{{pId}})">Trả lời phản hồi</span></span></div>' +
        '</div>' +
        '<div class="comment_reply hidenode" id="r{{id}}" data-totalitems="{{totalReplyItems}}">' +
            '{{#listCommentItems}}' +
                '<div class="comment_ask hidenode" id="c{{id}}" data-parent="{{pId}}" data-totalitems="{{totalReplyChileItems}}" data-name="{{name}}">' +
                    '<i class="iconcom-user">{{shortname}}</i><strong onclick="selCmt({{id}})">{{name}}</strong><b class="dot datetime m-l-5 m-r-5 f-8">●</b><b class="datetime">{{createdAt}}</b>' +
                    '<div class="infocom_ask">' +
                        '<div class="conticon">' +
                            '<div class="content_s">{{subject}}</div>' +
                            '<div class="relate_infocom" data-cl="0">' +
                                '<span class="btnreply" onclick="cmtaddreplyclick({{id}},{{pId}})">Trả lời phản hồi</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<br class="clear" />' +
                '</div>' +
            '{{/listCommentItems}}' +
            '<div class="totalcomment-reply btnshow" id="show{{id}}" style="display:none;" onclick="showFullCmt({{id}})" data-totalitems="{{totalReplyItems}}">' +
'            <i class="iconcom-comment"></i>' +
                'Xem tiếp <span></span> câu trả lời khác ▾' +
            '</div>' +
            '<div class="totalcomment-reply btnhide" id="hide{{id}}" style="display:none;" onclick="hideFullCmt({{id}})" data-totalitems="{{totalReplyItems}}">' +
'            <i class="iconcom-comment"></i>' +
                'Ẩn <span></span> câu trả lời khác ▾' +
            '</div>' +
        '</div>' +
    '</div>' +
    '{{/.}}';

var templatePaging = '{{#prev}}<li><a href="javascript:void(0)">&laquo;</a></li>{{/prev}}'
        + '{{^prev}}<li class="disabled"><a href="javascript:void(0)">&laquo;</a></li>{{/prev}}'
        + '{{#pages}}{{#current}}<li class="active"><a href="javascript:void(0)">{{index}}</a></li>{{/current}}'
        + '{{^current}}<li><a href="javascript:void(0)">{{index}}</a></li>{{/current}}{{/pages}}'
        + '{{#next}}<li><a href="javascript:void(0)">&raquo;</a></li>{{/next}}'
        + '{{^next}}<li class="disabled"><a href="javascript:void(0)">&raquo;</a></li>{{/next}}';

function cmtaddreplyclick(id, pid) {
    var _this = $('#c' + id);
    var tmpinputnopid =
        '<div class="reply_form" data-id="' + id + '" style="background-color: #eaeaea;border: 1px solid #d7d7d7;padding: 5px;">' +
            '<textarea id="txtEditor_' + id + '"' + ' class="dropfirst textarea txtEditor"></textarea>' +
            '<div class="showfirst wrap-attaddsend">' +
            '<div class="sendnow">' +             
            //'<input class="infoname hidenode" name="sendwithphone" type="text" placeholder="Phone" autocomplete="off" id="sendwithphone_' + id + '"  tabindex="3" />' +                       
            '<input  class="infoname" name="sendwithname" type="text" placeholder="Họ tên (bắt buộc)" maxlength="50" autocomplete="off"  id="sendwithname_' + id + '"  tabindex="1" />' +
            '<input class="infoname" name="sendwithemail" type="text" placeholder="Email (bắt buộc)" autocomplete="off"  id="sendwithemail_' + id + '"  tabindex="2" />' +
            '<input class="infoname" name="sendwithphone" type="text" placeholder="Phone" autocomplete="off" id="sendwithphone_' + id + '"  tabindex="3" />' +
            '<a class="finalpost" href="javascript:void(0)" id="btnSendCmtNoLogin"  onclick="sendChildCommentLevel1();">Gửi</a>' +
            '</div>' +
            '</div>' +
            '</div>';

    var tmpinputpid =
        '<div class="reply_form" data-id="' + id + '"' + ' data-pid="' + pid + '" >' +
            '<textarea id="txtEditor_' + id + '"' + ' class="dropfirst textarea txtEditor" ></textarea>' +
            '<div class="showfirst wrap-attaddsend">' +
            '<div class="sendnow">' +            
            //'<input class="infonamechild hidenode" name="sendwithphone" type="text" placeholder="Phone" autocomplete="off"  id="sendwithphone_' + id + '"  tabindex="3" />' +
            '<input  class="infonamechild" name="sendwithname" type="text" placeholder="Họ tên (bắt buộc)" maxlength="50" autocomplete="off"  id="sendwithname_' + id + '"  tabindex="1" />' +
            '<input class="infonamechild" name="sendwithemail" type="text" placeholder="Email (bắt buộc)" autocomplete="off"  id="sendwithemail_' + id + '"  tabindex="2" />' +
            '<input class="infonamechild" name="sendwithphone" type="text" placeholder="Điện thoại" autocomplete="off"  id="sendwithphone_' + id + '"  tabindex="3" />' +
            '<a class="finalpost" href="javascript:void(0)" id="btnSendCmtNoLogin"  onclick="sendChildCommentLevel2();">Gửi</a>' +
            '</div>' +
            '</div>' +
            '</div>';

    $(".comment-item .reply_form").each(function () { $(this).remove(); });
    $('#input_firt').hide();
    if (parseInt(pid) == 0) {
        $(_this).append(tmpinputnopid);
    } else {
        $(_this).append(tmpinputpid);
    }
    var setname = '@' + $('#c' + id).attr('data-name') + ': ';
    $('#txtEditor_' + id).html(setname);
}

function cmtClick() {
    $('.comment-item .reply_form').each(function () { $(this).remove(); });
    $('#input_firt').show();

}
// Send main comment
function getCommentTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    return {
        'total': t,
        'seconds': seconds
    };
}

function initializeCommentClock(id, endtime) {
    //    $('.cseconds span').val('');
    var clock = document.getElementById(id);
    var secondsSpan = clock.querySelector('.cseconds');

    function updateCommentClock() {
        var t = getCommentTimeRemaining(endtime);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            $('#btnSendCmtNoLogin').show();
            $('#cmclockdiv').hide();

            $('#comment input').each(function () {
                $(this).attr('disabled', false);
            });
        }
    }

    updateCommentClock();
    var timeinterval = setInterval(updateCommentClock, 1000);
}

function validateEmail(n) { return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(n); }
function validateName(n) { return n.match(/[a-z]/i) ? !0 : !1; }

function sendPostComment(params, commentId) {
    var timesub = $('.cseconds').text();
    if (timesub == "00" || timesub == " ") {
        var deadline = new Date(Date.parse(new Date()) + 30 * 1000);
        //show timer post again
        initializeCommentClock('cmclockdiv', deadline);
        $('#btnSendCmtNoLogin').hide();
        $('#cmclockdiv').show();

        $.ajax({
            url: '/ajax/comment/post/data.jsx',
            data: params,
            beforeSend: function () {
                $('#listcomments .loading').show();
            },
            success: function (result) {
                $('#listcomments .loading').hide();
                if (!result) return;
                var data = $.parseJSON(result);
                if (data && data.message) {
                    if (commentId == 0) {
                        $('#txtEditor').val('');
                        $('#sendwithphone').val('');
                        $('#sendwithname').val('');
                        $('#sendwithemail').val('');
                        return alert("Bạn đã gửi Phản hồi thành công!");

                    } else {
                        $('#txtEditor_' + commentId).val('');
                        $('#sendwithphone_' + commentId).val('');
                        $('#sendwithemail_' + commentId).val('');
                        $('#sendwithname_' + commentId).val('');
                        $(".comment-item .reply_form").each(function () { $(this).remove(); });

                        return alert("Bạn đã gửi Phản hồi thành công!");
                    }
                }
            }
        });
    } else {
        var html = "Bạn cần đợi " + timesub + " giây nữa để gửi bình luận tiếp theo!";
        return alert(html);
    }
}

function sendComment() {
    var aId = parseInt($('#comment').attr('data-id'));
    var content = $('#txtEditor').val();
    var sendwithphone = $('#sendwithphone').val();
    var sendwithemail = $('#sendwithemail').val();
    var sendwithname = $('#sendwithname').val();

    if (content == '') {
        return $('#txtEditor').focus(), $('#txtEditor').html("Vui lòng nhập nội dung!"), setTimeout(function () { $('#txtEditor').html(""); }, 1000);
    }
    if (content.length < 5 || content.length > 1000) {
        $('#txtEditor').focus();
        return alert("Cần nhập đầy đủ Nội dung (từ 5 đến không quá 1000 ký tự)!");
    }
    if (sendwithname == '') {
        $('#sendwithname').focus();
        return alert("Bạn cần nhập Họ tên!");
    } else {
        if (validateName(sendwithname) == !1) return alert("Vui lòng nhập Họ tên đúng định dạng (phải có ký tự a-z)!");
    }
    if (sendwithemail == '') {
        $('#sendwithemail').focus();
        return alert("Bạn cần nhập Địa chỉ Email!");
    } else {
        if (sendwithemail != '' && validateEmail(sendwithemail) == !1) return alert("Email không đúng định dạng!");
	}
	var params = {
		name: sendwithname,
		phone: sendwithphone,
		email: sendwithemail,
		subject: content,
		pid: 0,
		articleId: aId
	};
	sendPostComment(params, 0);    
}

function sendChildCommentLevel1() {
    var aId = parseInt($('#comment').attr('data-id'));
    var commentId = parseInt($('.reply_form').attr('data-id'));

    var content = $('#txtEditor_' + commentId).val();
    var sendwithphone = $('#sendwithphone_' + commentId).val();
    var sendwithemail = $('#sendwithemail_' + commentId).val();
    var sendwithname = $('#sendwithname_' + commentId).val();

    if (content == '') {
        return $('#txtEditor_' + commentId).focus(), $('#txtEditor_' + commentId).html("Vui lòng nhập nội dung!"), setTimeout(function () { $('#txtEditor_' + commentId).html(""); }, 1000);
    }
    if (content.length < 5 || content.length > 1000) {
        $('#txtEditor_' + commentId).focus();
        return alert("Cần nhập đầy đủ Nội dung (từ 5 đến không quá 1000 ký tự)!");
    }
    if (sendwithname == '') {
        $('#sendwithname').focus();
        return alert("Bạn cần nhập Họ tên!");
    } else {
        if (validateName(sendwithname) == !1) return alert("Vui lòng nhập Họ tên đúng định dạng (phải có ký tự a-z)!");
    }
        if (sendwithemail == '') {
        $('#sendwithemail').focus();
        return alert("Bạn cần nhập Địa chỉ Email!");
    } else {
    if (sendwithemail != '' && validateEmail(sendwithemail) == !1) return alert("Email không đúng định dạng!");
	}
	
    var params = {
        name: sendwithname,
        phone: sendwithphone,
        email: sendwithemail,
        subject: content,
        pid: commentId,
        articleId: aId
    };
    sendPostComment(params, commentId);
    }

function sendChildCommentLevel2() {
    var aId = parseInt($('#comment').attr('data-id'));
    var commentId = parseInt($('.reply_form').attr('data-id'));
    var pId = parseInt($('.reply_form').attr('data-pid'));

    if (pId == 0) pId = commentId;

    var content = $('#txtEditor_' + commentId).val();
    var sendwithphone = $('#sendwithphone_' + commentId).val();
    var sendwithemail = $('#sendwithemail_' + commentId).val();
    var sendwithname = $('#sendwithname_' + commentId).val();

    if (content == '') {
        return $('#txtEditor_' + commentId).focus(), $('#txtEditor_' + commentId).html("Vui lòng nhập nội dung!"), setTimeout(function () { $('#txtEditor_' + commentId).html(""); }, 1000);
    }
    if (content.length < 5 || content.length > 1000) {
        $('#txtEditor_' + commentId).focus();
        return alert("Cần nhập đầy đủ Nội dung (từ 5 đến không quá 1000 ký tự)!");
    }
    if (sendwithname == '') {
        $('#sendwithname').focus();
        return alert("Bạn cần nhập Họ tên!");
    } else {
        if (validateName(sendwithname) == !1) return alert("Vui lòng nhập Họ tên đúng định dạng (phải có ký tự a-z)!");
    }
        if (sendwithemail == '') {
        $('#sendwithemail').focus();
        return alert("Bạn cần nhập Địa chỉ Email!");
    } else {
    if (sendwithemail != '' && validateEmail(sendwithemail) == !1) return alert("Email không đúng định dạng!");
	}
	
    var params = {
        name: sendwithname,
        phone: sendwithphone,
        email: sendwithemail,
        subject: content,
        pid: pId,
        articleId: aId
    };
    sendPostComment(params, commentId);
    }

// show full count -2 comments
function showFullCmt(id) {
    $('#show' + id).hide();
    $('#hide' + id).show();
    var node = $('#r' + id);
    node.find('.comment_ask').show();
}
// hide full count -2 comments
function hideFullCmt(id) {
    $('#show' + id).show();
    $('#hide' + id).hide();
    var node = $('#r' + id);
    node.find('.comment_ask').hide();

    var count = parseInt(node.attr('data-totalitems'));
    if (count >= 2) {
        node.find('.comment_ask:eq(0)').show();
        node.find('.comment_ask:eq(1)').show();
    }
    if (count == 1) {
        node.find('.comment_ask:eq(0)').show();
    }
}

// function list comments
function getComments(page, so) {
    var aId = parseInt($('#comment').attr('data-id'));
    if ($('#comments-data:visible').length == 0) return;

    $('#sortid').attr('data-sort', so);
    $('#pagenumber').attr('data-number', page);

    //show button moi nhat, hay nhat
    if (so == 0) {
        $('#tNew').addClass('activedsort');
        $('#tBest').removeClass('activedsort');
    } else {
        $('#tBest').addClass('activedsort');
        $('#tNew').removeClass('activedsort');
    }

    // list comments
    var curPage = 0;
    if (!page || page == 0) curPage = 1;
    else curPage += page;
    $('#listcomments .loading').show();
    $.ajax({
        url: '/ajax/comment/getdata/data.jsx',
        data: $.extend({ aId: aId }, { sort: so }, { p: curPage }),
        beforeSend: function () {
            $('#listcomments .loading').show();
        },
        success: function (result) {
            $('#listcomments .loading').hide();
            if (!result) return;
            var data = $.parseJSON(result);
            if (!data || !data.message) return;

            //bind comments
            var commentshtml = $.mustache(tmpComment, data.comments);
            $('#comments-data *').off();
            $('#comments-data').empty().html(commentshtml);

            //bind total items
            var tmpTotalItems = '<span><b>Ý kiến bạn đọc</b></span> (' + (data.paging.totalItems) + ')';
            $('#id-comment-title *').off();
            $('#id-comment-title').html(tmpTotalItems);

            //bind paging
            data.paging.prev = data.paging.currentPage > 1;
            data.paging.next = data.paging.currentPage < data.paging.totalPages;
            data.paging.pages = [];
            for (var idx = 0; idx < data.paging.totalPages; idx++) {
                if (idx >= data.paging.currentPage - 5 && idx <= data.paging.currentPage + 4) {
                    data.paging.pages.push({
                        index: (idx + 1),
                        current: (data.paging.currentPage == idx + 1)
                    });
                }
            }
            var paging = $.mustache(templatePaging, data.paging);
            $('#comments-paging *').off();
            $('#comments-paging').empty().html(paging);

            if (data.paging.totalPages >= 2) {
                $('#pagcomment').show();
            }
            if (data.paging.totalItems > 0) {
                $('#sortcomment').show();
            }

            //hide count -2 reply comment
            $('.comment_reply').each(function () {
                var count = parseInt($(this).find('.comment_ask').attr('data-totalitems'));
                var countend = count - 2;
                if (count >= 2) {
                    $(this).show();
                    $(this).find('.comment_ask:eq(0)').show();
                    $(this).find('.comment_ask:eq(1)').show();

                }
                if (count == 1) {
                    $(this).show();
                    $(this).find('.comment_ask:eq(0)').show();
                }
                if (count > 2) {
                    $(this).find('.totalcomment-reply span').html(countend);
                    $(this).find('.btnshow').show();
                }
            });
            //paging click
            $('a', $('#comments-paging')).on('click', function (e) {
                e.preventDefault();
                var cp = parseInt($('#pagenumber').attr('data-number'));
                var s = parseInt($('#sortid').attr('data-sort'));

                //check active & disabled
                if ($(this).parent().hasClass('active') || $(this).parent().hasClass('disabled')) return;

                //search
                var p = $(this).html();
                if (p == '«') p = cp - 1;
                if (p == '»') p = cp + 1;
                if (p <= 0) p = 1;
                getComments(p, s);
            });
        }
    });
}


// ready
$(function () {
    $('#input_firt').hide();
    $('#txtEditor').val('');
    $('.cseconds').text('00');
    var so = parseInt($('#sortid').attr('data-sort'));
    var cpage = parseInt($('#pagenumber').attr('data-number'));

    //get list comment
    getComments(cpage, so);

    //show button moi nhat, hay nhat
    if (so == 0) {
        $('#tNew').addClass('activedsort');
        $('#tBest').removeClass('activedsort');
    } else {
        $('#tBest').addClass('activedsort');
        $('#tNew').removeClass('activedsort');

    }

});
