chrome.contextMenus.create({
    title: "Add to My Lists",
    contexts: [ "page"],
    onclick: myFunction
});

        //chrome.identity.getAuthToken(function(userInfo) {
 /* Use userInfo.email, or better (for privacy) userInfo.id
    They will be empty if user is not signed in in Chrome */
    //console.log(userInfo);
//});
chrome.browserAction.onClicked.addListener(function(tab) { 
chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
  // Tab opened.
});

});


function myFunction(data) {
    console.log(data);


    var item;
    var itemtype;
    
    if ("undefined" !== typeof data.selectionText) {
        itemtype = 'SelectedText';
        item = data.selectionText;
    } else if ("undefined" !== typeof data.srcUrl) {
        itemtype = 'Image';
        item = data.srcUrl;
    } else if ("undefined" !== typeof data.linkUrl)  {
        itemtype = 'Link';
        item = data.linkUrl;
    } else {
        itemtype = 'Page';
        item = data.pageUrl;
    }

 
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "SendIt",
            value: item,
            itemtype: itemtype
        }, function (response) {});
    });

};