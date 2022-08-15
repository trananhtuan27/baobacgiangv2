function loadAdv(adv, holder, width, height){
    var pos = Math.floor(Math.random()*adv.length);

    var cur = adv[pos];

    if (cur.type == 'image') {
        var img = $('<img />').css({ 'width': width, 'height': height }).attr('src', cur.file)
        var a = $('<a></a>').attr('target', '_blank').attr('href', cur.link).append(img);
        $(holder).append(a);
    }else if (cur.type == 'flash') {
        $(holder).html('<object width="' + width + '" height="' + height + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0">'+
                        '<param name="movie" value="' + cur.file + '">'+
                        '<param name="quality" value="high">'+
                        '<param name="WMode" value="Transparent">'+
                        '<embed width="' + width + '" height="' + height +'" src="' + cur.file +'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">'+
                        '</object>');
    }
}