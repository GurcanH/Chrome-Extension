
var item = document.body.innerText
//console.log(item)
var i1 = item.indexOf("Hoşgeldin,");
var i2 = item.indexOf("Profiliniz");
var res = item.substring(i1+10, i2);
res = res.replace(/[^a-zA-Z ]/g, "")
console.log(res);
res="'Lobador'"
var item2 = {a:'adda',b:'bbdd'};
console.log(item2);
var value = res 
    //chrome.storage.sync.set({res: item2}, function() {
         
      //  });

//chrome.storage.sync.remove('Lobador',function(){
    
//});
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedEl = event.target;
        var pp = clickedEl.getElementsByTagName("a");
        console.log(clickedEl);
    }
}, true);

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.action == 'SendIt') {
      window.open("background.html");
   }
});



