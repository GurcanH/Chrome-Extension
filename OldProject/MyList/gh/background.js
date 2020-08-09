chrome.contextMenus.create({
   title:"Twitle Lan Beni it!!",
    contexts:["selection","image","link","page"],
    onclick:myFunction
});

function myFunction(data){
    console.log(data)
//    chrome.storage.sync.get('value', function (result) {
//        console.log(result);
//        //channels = result.value;
//        //alert(result.value);
//    });
    
    var item;
     if ("undefined" !== typeof data.selectionText){
        item = data.selectionText;
    }else if ("undefined" !== typeof data.srcUrl){
         item = data.srcUrl; 
    }else
        {
           item = data.linkUrl;
        }
    //var item = data.mediaType;
    //alert(item);
    

    chrome.tabs.create({url:"https://twitter.com/intent/tweet?text="+item})
    
   // chrome.storage.sync.set({'value': item}, function() {
          // Notify that we saved.
         
     //   });
};