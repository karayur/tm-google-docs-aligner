// ==UserScript==
// @name         Align scrolling
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Align scrolling for two specific google docs. You get a small button on the left bottom of your screen.
// @include      https://docs.google.com/document/d/1selOlaEB9_RcmPrSjCnlTNF7BfT15rtN*
// @include      https://docs.google.com/document/d/1vP_H8kiNQ5Im19ai7viyVUPf0wOyDUVbHZf2DaoLN20*
// @include      https://docs.google.com/document/d/1KcrbowMVfIxNgwdb_mDumHRNWSxcBYSP3Oa-PbCG-QA*
// @include      https://docs.google.com/document/d/19byg5gfiXPDiFYACTSbYwaGWCNUe49MezIXAkOvYOd0*
// @author       karayur
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.3/jquery.scrollTo.min.js
// @grant        GM_setValue
// @grant        GM_getValue

// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */
//'use strict';

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
document.getElementsByTagName("HEAD")[0].appendChild(link);

$("body").append (''
    + '<div class="gmPersistentButton" style="position:fixed;bottom:1em;left:2em;z-index:6666;">'
    + '<button class="material-icons" id="gmVerticalAlignBtn" title="align scrolling">vertical_align_center</button>'
    + '</div>'
);


var currentDocID = "Doc1";
if ($(".docs-title-input").val().slice(26)==="RUS") currentDocID = "Doc2";

var currentDocScrollPositionVar;
var currentDocScrollHeightVar;
var otherDocScrollPositionVar;
var otherDocScrollHeightVar;

// Alignment pointers was gotten from chapters + additional pointer for chapter "Alpha teams"
var alignmentPointersDoc1 = [0, 9167, 54923, 73346, 112682, 160326, 189889, 221782, 250456, 261415, 303541, 324096, 337997, 358552];
var alignmentPointersDoc2 = [0, 9758, 62565, 82897, 127251, 180860, 213819, 249113, 281081, 293287, 339867, 363258, 379156, 401483];
//var alignmentPointersDoc1 = [0, 2100-300, 4474-300, 5591-300, 10505]; // for test docs EN
//var alignmentPointersDoc2 = [0, 2656-300, 4735-300, 5416-300, 11785]; // for test docs RUS
var currentDocAlignmentPointers;
var otherDocAlignmentPointers;


if (currentDocID === "Doc1") {
    currentDocScrollPositionVar = "scrollPositionDoc1";
    otherDocScrollPositionVar = "scrollPositionDoc2";
    currentDocScrollHeightVar = "scrollHeightDoc1";
    otherDocScrollHeightVar = "scrollHeightDoc2";
    currentDocAlignmentPointers = alignmentPointersDoc1;
    otherDocAlignmentPointers = alignmentPointersDoc2;
   }
    else
    {
        currentDocScrollPositionVar = "scrollPositionDoc2";
        otherDocScrollPositionVar = "scrollPositionDoc1";
        currentDocScrollHeightVar = "scrollHeightDoc2";
        otherDocScrollHeightVar = "scrollHeightDoc1";
        currentDocAlignmentPointers = alignmentPointersDoc2;
        otherDocAlignmentPointers = alignmentPointersDoc1;
    }

var scrollPosition;
scrollPosition = $(".kix-appview-editor").scrollTop();
GM_setValue(currentDocScrollPositionVar, scrollPosition);

var scrollHeight;
scrollHeight = $(".kix-appview-editor")[0].scrollHeight;
GM_setValue(currentDocScrollHeightVar, scrollHeight);


$(".kix-appview-editor").scroll (function(){
    scrollPosition = $(".kix-appview-editor").scrollTop();
    GM_setValue(currentDocScrollPositionVar, scrollPosition);

    scrollHeight = $(".kix-appview-editor")[0].scrollHeight;
    GM_setValue(currentDocScrollHeightVar, scrollHeight);
});

var otherDocScrollPosition
var otherDocScrollHeight
var scrollAdjustIdx;

$("#gmVerticalAlignBtn").click ( function () {
    //otherDocScrollPosition = GM_getValue(otherDocScrollPositionVar);
    //otherDocScrollHeight = GM_getValue(otherDocScrollHeightVar, scrollHeight);
    scrollAdjustIdx = scrollHeight / otherDocScrollHeight;
    //$(".kix-appview-editor").scrollTo({left:0, top:otherDocScrollPosition * scrollAdjustIdx}); // for simple adjustment over all document
    $(".kix-appview-editor").scrollTo({left:0, top:getAlegnedScrollPosition()});

});



function getAlegnedScrollPosition() {
    otherDocScrollPosition = GM_getValue(otherDocScrollPositionVar);
    otherDocScrollHeight = GM_getValue(otherDocScrollHeightVar, scrollHeight);


    var i;
    for (i = 0; i < otherDocAlignmentPointers.length; i++) {
        //baseOtherDocScrollPosition = otherDocAlignmentPointers[i];
        if (otherDocScrollPosition < otherDocAlignmentPointers[i]) break;
    }

    var newScrollPosition = 0;
    scrollAdjustIdx = (currentDocAlignmentPointers[i] - currentDocAlignmentPointers[i-1]) / (otherDocAlignmentPointers[i] - otherDocAlignmentPointers[i-1])
    newScrollPosition = currentDocAlignmentPointers[i-1] + scrollAdjustIdx* (otherDocScrollPosition - otherDocAlignmentPointers[i-1])

    //console.log ("i = " + i);
    //console.log ("otherDocScrollPosition = " + otherDocScrollPosition);
    //console.log ("newScrollPosition = " + newScrollPosition);
    return newScrollPosition;
}















