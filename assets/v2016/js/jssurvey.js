
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    return {
        'total': t,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            $('.btn_bieuquyet').show();
            $('#clockdiv').hide();

            $('#surveyshow input').each(function () {
                $(this).attr('checked', false);
                $(this).attr('disabled', false);
            });

        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

// Vote
function postVote(sid) {
    var type = $('#vote-' + sid).attr('data-component-type');
    var dataopt = '';

    $('input:checked').each(function () {
        var optionId = $(this).attr('data-optionid');
        if (dataopt != '') dataopt += ';';
        dataopt += optionId;
    });
    if (dataopt == '') return alert("Bạn cần chọn một mục trước khi biểu quyết!");

    var params = {
        surveyid: sid,
        optionid: dataopt,
        sessionid: '',
        ip: ''
    };
    $.ajax({
        url: '/ajax/surveys/post/data.jsx',
        data: params,
        success: function (result) {
            if (!result) return;
            var data = $.parseJSON(result);
            if (data && data.message) {
                $('#surveyshow input').each(function () {
                    $(this).attr('checked', false);
                    $(this).attr('disabled', true)
                });
                //show timer post again
                var deadline = new Date(Date.parse(new Date()) + 30 * 1000);
                initializeClock('clockdiv', deadline);
                $('.btn_bieuquyet').hide();
                $('#clockdiv').show();

                alert("Bạn đã biểu quyết thành công!");
            }
        }
    });
}

var tmpResult = '{{#.}}' +
    '<div id="SexyAlertBox-InBox">' +
            '<div id="SexyAlertBox-BoxContent">' +
                '<div id="SexyAlertBox-BoxContenedor">' +
                    '<div id="SexyAlertBox-Buttons">' +
                        '<div class="login-form" id="login-vne7">' +
                            '<div class="ttOline">Kết quả bình chọn</div>' +
                            '<div class="rs_vote">' +
                                '<p class="question_vote">' +
                                    '{{question}}' +
                                '</p>' +
                                '<p class="p_infoVote">' +
                                    '<span class="time_vote">Ngày:&nbsp;{{startdate}}</span> <span class="total_vote">' +
                                        'Tổng cộng:&nbsp;<label><b>{{totalquantity}}</b></label>' +
                                   '</span>' +
                                '</p>' +
                            '</div>' +
                            '<div class="complete-form">' +
                                '<div class="list_rs width_common">' +
                                    '<ul class="scroll_thongke">' +
                                      '{{#surveyresultitems}}' +
                                        '<li>' +
                                            '<div class="info_result">' +
                                                '<div class="rsV_left">{{optionname}}</div>' +
                                                '<div class="rsV_right"><label><b>{{quantity}}</b></label>&nbsp;phiếu</div>' +
                                                '<div class="scroll_color">' +
                                                    '<span percent="57" class="bg_center_scroll" style="width: ' + '{{tyle}}' + '%;">' +
                                                        '<label class="txt_number_ketqua">{{tyle}}%</label>' +
                                                    '</span>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                      '{{/surveyresultitems}}' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                            '<div class="close-lb"></div>' +
                            '<br class="clear" />' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
      '{{/.}}';

function animateResults(sid) {
    if (sid == '') return alert("Thăm dò chưa có kết quả!");

    $.ajax({
        url: '/ajax/surveys/results/data.jsx',
        data: { surveyid: sid },
        success: function (result) {
            if (!result) return;
            var datav = $.parseJSON(result);
            //bind comments
            var sshtml = $.mustache(tmpResult, datav.surveys);
            $('#alertBox-Box *').off();
            $('#alertBox-Box').empty().html(sshtml);

            $('#boxOverlay').show();
            $('#alertBox-Box').show();
            window.scrollTo(0, 400);

            $('.close-lb').on('click', function () {
                $('#boxOverlay').hide();
                $('#alertBox-Box').hide();
            });
        }
    });


}

