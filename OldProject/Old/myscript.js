var url = chrome.extension.getURL('toolbar.html');

var height = "35px";

var iframe = "<iframe src='" + url + "' id='myOwnCustomFirstToolbar12345' style='height:" + height + "'></iframe>";

$('html').append(iframe);

$('body').css({
    'transform': 'translateY(' + height + ')'
});

