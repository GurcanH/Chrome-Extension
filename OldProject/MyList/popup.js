//
//chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
//  // Tab opened.
//});
//
var starCount = 0;
var itemm;
var activeItemm;

$(document).ready(function () {
    $("#btnShowSimple").click(function (e) {
        ShowDialog(false);
        e.preventDefault();
    });

    $("#btnShowModal").click(function (e) {
        ShowDialog(true);
        e.preventDefault();
    });

    $("#btnClose").click(function (e) {
        HideDialog();
        e.preventDefault();
    });

    $("#btnSubmit").click(function (e) {
        var brand = $("#brands input:radio:checked").val();
        $("#output").html("<b>Your favorite mobile brand: </b>" + brand);
        HideDialog();
        e.preventDefault();
    });

    $("#btnCheck3").click(function (e) {
        HideDialog();
    });
    $("#btnCheck2").click(function (e) {
        for (i = 0; i < itemm.length; i++) {
            if (itemm[i].$$hashKey == activeItemm.$$hashKey) {
                console.log(activeItemm.$$hashKey);

                var star = $("input:checked[name='ratingnesly']").attr("value")
                var tStar = Array(Number(star) + 1).join("★")
                itemm[i].exp = $("#styledgrcn").val()
                itemm[i].star = tStar
                var storageItem = {
                    "itemArr": []
                }
                storageItem.itemArr = itemm;

                console.log(itemm)
                chrome.storage.local.set(storageItem, function () {
                    HideDialog();
                    var scope = angular.element($("#idpopup")).scope();
                    scope.$apply()
                });
            }
        }
    });



});

function ShowDialog(modal) {
    $("#overlay").show();
    $("#dialog").fadeIn(300);

    if (modal) {
        $("#overlay").unbind("click");
    } else {
        $("#overlay").click(function (e) {
            HideDialog();
        });
    }
}


function HideDialog() {
    $("#overlay").hide();
    $("#dialog").fadeOut(300);
}



var app = angular.module('myApp', ['ui.directives', 'ui.filters']);



//document.getElementById("idrank").addEventListener("click", callit);





chrome.storage.local.get(function (items) {

    //    $("#idrank").keypress(function (evt) {
    //        var str = $('#idrank').val();
    //        event.preventDefault()
    //        $('#idrank').val(str + '★');
    //    });


    console.log(items.itemArr)
    console.log(items);
    if (undefined !== items.itemArr) {
        allitems = items.itemArr;


        /*        var lineStart = '<table><tr><th>Domain</th><th>Comments</th><th>Rank</th><th>Link</th></tr>';
                var line = '';
                for (i = 0; i < allitems.length; i++) {
                    console.log(allitems)
                    var star = Array(Number(allitems[i].star)).join("★")
                    line = line + '<tr><td>' + allitems[i].domain + '</td><td>' + allitems[i].exp + '</td><td>' + star + '</td><td><a href="' + allitems[i].link + '">click </a></td></tr>'
                }
                line = lineStart + line;
                $(line).appendTo('#idpopup');*/
        for (i = 0; i < allitems.length; i++) {
            //allitems[i].star = Array(Number(allitems[i].star)).join("★")
            //allitems[i].star = allitems[i].star
        }

        app.controller('customersCtrl', function ($scope) {
            $scope.changeValue = function (value) {
                $scope.search.star = value.replace(/./g, '★')
            }
            $scope.allitems = allitems;
            $scope.orderByField = "domain";
            $scope.reverseSort = false;

            $scope.UpdateRecord = function () {
                CreateModal(this.x, $scope.allitems);
            };
            $scope.OpenPage = function () {
                window.open(this.x.link, '_blank');
            };
            $scope.DeleteRecord = function () {
                itemm = $scope.allitems
                activeItemm = this.x
                DeleteRecord()
            };

        });

    }

    function CreateModal(x, allitems) {
        itemm = allitems
        activeItemm = x
        console.log(x);
        console.log(allitems);
        $("#styledgrcn").val(x.exp);
        var xx = x.star.length;
        for (i = 1; i < 6; i++) {
            $("#ratingnesly" + i).attr('checked', false)
        };

        $("#ratingnesly" + xx).attr('checked', true)
        ShowDialog(true);

    };

    function DeleteRecord() {
        var storageItem = {
            "itemArr": []
        }
        var allitems = [];


        chrome.storage.local.clear(function () {});

        for (i = 0; i < itemm.length; i++) {
            if (itemm[i].$$hashKey == activeItemm.$$hashKey) {
                itemm.splice(i, 1)
                storageItem.itemArr = itemm;
                chrome.storage.local.set(storageItem, function () {
                    var scope = angular.element($("#idpopup")).scope();
                    scope.$apply()
                });
            }
        }

    }

});
