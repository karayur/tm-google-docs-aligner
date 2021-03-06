// ==UserScript==
// @name         Google Docs pair scrolling aligner
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Align scrolling for two google docs. You get a small button on the left bottom of your screen.
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


if (currentDocID === "Doc1") {
    currentDocScrollPositionVar = "scrollPositionDoc1";
    otherDocScrollPositionVar = "scrollPositionDoc2";
    currentDocScrollHeightVar = "scrollHeightDoc1";
    otherDocScrollHeightVar = "scrollHeightDoc2";
   }
    else
    {
        currentDocScrollPositionVar = "scrollPositionDoc2";
        otherDocScrollPositionVar = "scrollPositionDoc1";
        currentDocScrollHeightVar = "scrollHeightDoc2";
        otherDocScrollHeightVar = "scrollHeightDoc1";
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
    otherDocScrollPosition = GM_getValue(otherDocScrollPositionVar);
    otherDocScrollHeight = GM_getValue(otherDocScrollHeightVar, scrollHeight);
    scrollAdjustIdx = scrollHeight / otherDocScrollHeight;
    $(".kix-appview-editor").scrollTo({left:0, top:otherDocScrollPosition * scrollAdjustIdx});

});













