import $ from 'jquery';
import Tw from './vendor/TweenMax.min.js';
import TwSplit from './vendor/utils/SplitText.min.js';

//require('script-loader!./vendor/plugins/TextPlugin.min.js');

$(document).ready(function(){
  console.log("test");


  ////////////////////////////////////////////////////////////
  //Translations Tool
  ////////////////////////////////////////////////////////////
  //change the text on click to english, if it's not active
  $('#en-button').on("click", function(){
    if ($('#en-button').hasClass("is-active")){

    }else {
      $.getJSON("assets/js/translations/english.json", function (data) {
        translateText(data)
      })
      switchActiveClass("#de-button","#en-button")
    }
  })

  //change the text to german, if it's not active
  $('#de-button').on("click", function(){
    if ($('#de-button').hasClass("is-active")){

    }else {
      $.getJSON("assets/js/translations/german.json", function (data) {
        translateText(data)
      })
      switchActiveClass("#en-button", "#de-button")
    }
  })
  ////////////////////////////////////////////////////////////
  //end
  ////////////////////////////////////////////////////////////

  scrollWatcher()


});


function translateText (data ){
  $.each(data, function(key, val) {
    let temp = $("." + key)
    temp.text(val)
    let mySplitText = new SplitText(temp,{type:"lines, chars"}),
    lines = mySplitText.lines;


    let tl = new TimelineLite
    tl.set(lines, {transformOrigin: "left center", autoAlpha:0})
    tl.staggerTo(lines, 0.3, {autoAlpha:1}, 0.03, "start")
  })
}

function switchActiveClass(active, passive){
  const actDiv = $(active)
  const pasDiv = $(passive)
  actDiv.removeClass("is-active")
  pasDiv.addClass("is-active")
}

function switchClass(div1, div2, class1, class2){
  const sel1 = $(div1)
  const sel2 = $(div2)
  sel1.removeClass(class1)
  sel2.removeClass(class2)
  sel1.addClass(class2)
  sel2.addClass(class1)
}

function scrollWatcher(){
  $(window).scroll(function() {
    adaptMenu()

  })
}

function adaptMenu(){
  let scroll = $(window).scrollTop() -  $(".hero-section").height()
  const menu = $('.main-nav')
  const isFixed = $('.is-fixed')
  const isStatic = $('.is-static')

  if (scroll < (0 - menu.height())) {

    if(menu.hasClass("is-fixed")) {
      menu.removeClass("is-fixed")
    }else {

    }

  } else {
    if(menu.hasClass("is-fixed")) {

    }else{
      menu.addClass('is-fixed')

    }
  }

  console.log(scroll)
}
