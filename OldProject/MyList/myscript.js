chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    var itemExist = false;

    if (msg.action == 'SendIt') {

        var storageItem = {
            "itemArr": []
        }



        var allitems = [];
        //                chrome.storage.local.clear(function(){
        //                        console.log('clea');
        //                })

        chrome.storage.local.get(function (items) {
            if (undefined !== items.itemArr) {
                for (i = 0; i < items.itemArr.length; i++) {
                    var tempItem = {
                        "domain": items.itemArr[i].domain,
                        "link": items.itemArr[i].link,
                        "exp": items.itemArr[i].exp,
                        "star": items.itemArr[i].star,
                        "title": items.itemArr[i].title
                    }
                    if (msg.value == items.itemArr[i].link) {
                        itemExist = true;
                    }
                    allitems.push(tempItem);
                };
            }

            ////
            ///

            if (itemExist == true) {
                alert("This link has already been added!")
            } else {
                CreateModuleScreen()
            }
        });





        function CreateModuleScreen() {
            var capt;
            console.log(msg.itemtype)
            if (msg.itemtype == 'SelectedText') {
                capt = "Selected Text:"

            } else {
                capt = "Selected Link:"
            }


            var divItem;
            var iframeItem;
            var divCaption;

            divCaption = '';
            divCaption = '<div id="subtitle">' + document.domain + '</div><p></p><div id="subcaption"></div> '

            //                iframeItem = ''
            //                iframeItem = iframeItem + '<html><body><div style="display:none"> <iframe id="frame-grcn" src="' + msg.value + '"></div></body></html>'

            divItem = ''
            divItem = divItem + ' <div id="controlsdiv">'
            divItem = divItem + ' </div>'
            divItem = divItem + ' <div class="ratinggrcn">'
            divItem = divItem + ' <input id="ratinggrcn5" type="radio" name="ratinggrcn" value="5">'
            divItem = divItem + ' <label for="ratinggrcn5">5</label>'
            divItem = divItem + ' <input id="ratinggrcn4" type="radio" name="ratinggrcn" value="4">'
            divItem = divItem + ' <label for="ratinggrcn4">4</label>'
            divItem = divItem + ' <input id="ratinggrcn3" type="radio" name="ratinggrcn" value="3">'
            divItem = divItem + ' <label for="ratinggrcn3">3</label>'
            divItem = divItem + ' <input id="ratinggrcn2" type="radio" name="ratinggrcn" value="2" checked>'
            divItem = divItem + ' <label for="ratinggrcn2">2</label>'
            divItem = divItem + ' <input id="ratinggrcn1" type="radio" name="ratinggrcn" value="1">'
            divItem = divItem + ' <label for="ratinggrcn1">1</label>'
            divItem = divItem + ' </div>'
            divItem = divItem + ' <br><br>'
            divItem = divItem + ' <div>'
            divItem = divItem + ' <textarea style="backgroud: papayawhip;" name="styled-textarea" id="styled">  Enter your comment here...</textarea>'
            //style="z-index: auto; position: relative; line-height:' //divItem=divItem +'normal; font-size: 13.3333px; transition: none; background: white;">Enter your comment here...</textarea>'
            divItem = divItem + ' </div>'
            divItem = divItem + ' <br>'
            divItem = divItem + ' <div>'
            divItem = divItem + ' <button id="btnCheck">Submit</button>'
            divItem = divItem + ' </div>'


            var divModal;

            divModal = ''

            divModal = divModal + ' <div id="myModalgrcn" class="modal-grcn overlay-grcn">'
            divModal = divModal + ' <div id="myModalgrcnContent" class="modal-grcn-content">'
            divModal = divModal + ' <span id="btnclose" class="close">&times;</span>'
            divModal = divModal + ' </div>'
            divModal = divModal + ' </div>'

            $("#myModalgrcn").remove();
            var $div = $(divModal).appendTo('body');


            // Get the modal
            var modal = document.getElementById('myModalgrcn');

            modal.style.display = "block";
            //$(".navlinkk").hide()

            $(divCaption).appendTo('#myModalgrcnContent');
            //$(iframeItem).appendTo('#myModalgrcnContent');
            $(divItem).appendTo('#myModalgrcnContent');


            var span = document.getElementById("btnclose");

            var textarea = document.getElementById("styled");
            // When the user clicks on <span> (x), close the modal

            span.onclick = function () {
                modal.style.display = "none";
                //$(".navlinkk").show()
            }

            textarea.onfocus = function () {
                textarea.value = "";
                textarea.style.background = "#fffcf8";

            }

            textarea.onblur = function () {
                textarea.style.background = "white";

            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    //$(".navlinkk").show()
                }
            }
            var txttitle = document.title;
            divCaption = '';
            divCaption = '<span>' + txttitle + '</span>'
            $(divCaption).appendTo('#subcaption');

            //                $("iframe").on('load', function () {
            //                    title = document.getElementById("frame-grcn").contentDocument.title;
            //                    divCaption = '';
            //                    divCaption = '<h3>' + title + '</h3>'
            //                    $(divCaption).appendTo('#subcaption');
            //                    $('#btnCheck').prop('disabled', false);
            //                });
            document.getElementById("btnCheck").addEventListener("click", buttonclicked);


            console.log(allitems);

            function buttonclicked() {
                var tempItem = {}
                var star = $("input:checked[name='ratinggrcn']").attr("value")

                var tStar = Array(Number(star) + 1).join("★")
                console.log(tStar)
                tempItem = {
                    "domain": document.domain,
                    "link": msg.value,
                    "exp": textarea.value,
                    "star": tStar,
                    "title": txttitle
                }
                //console.log(allitems);
                allitems.push(tempItem);
                //console.log(allitems);
                storageItem.itemArr = allitems;
                console.log('storageItem');
                console.log(storageItem);
                chrome.storage.local.clear(function () {});
                chrome.storage.local.set(storageItem, function () {
                    modal.style.display = "none";
                    //$(".navlinkk").show()
                });
            };
        }
    }
});
