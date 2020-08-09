chrome.contextMenus.create({
    title: "Twitle Lan Beni it!!",
    contexts: ["selection", "image", "link", "page"],
    onclick: myFunction
});

function myFunction(data) {
    console.log(data);


    var item;
    if ("undefined" !== typeof data.selectionText) {
        item = data.selectionText;
    } else if ("undefined" !== typeof data.srcUrl) {
        item = data.srcUrl;
    } else {
        item = data.linkUrl;
    }

    var item2 = {
        text: 'adda',
        b: 'bbdd'
    };
    console.log(item);

    //  chrome.storage.sync.get('Lobador', function (result) {
    //        console.log(result);

    //  });
    // chrome.storage.sync.set({res: item2}, function() {

    //});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {});  
});
    
};
