import $ from 'jquery';
import Tw from './vendor/TweenMax.min.js';
import TwSplit from './vendor/utils/SplitText.min.js';

//require('script-loader!./vendor/plugins/TextPlugin.min.js');

$(document).ready(function(){
  console.log("test");
  typewriter()


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

  $(window).scroll(function() {
    let windScroll = $(window)
    adaptMenu(windScroll)
    animationHero(windScroll)
  })
  ////////////////////////////////////////////////////////////
  //Start Project Cover
  ////////////////////////////////////////////////////////////

  /*
  const $panel = $(".panel-project")
  $panel.on("mouseover", function(){
    Tw.to($this.children(".panel-info"), 0.2,{autoAlpha: 1, zIndex: 1})
  })

  $panel.on("mouseleave", function(){
    Tw.to($this.children(".panel-info"), 0.2,{autoAlpha: 0, zIndex: 0})
  })
  */


});


function translateText (data ){
  $.each(data, function(key, val) {
    let temp = $("." + key)
    temp.text(val)
    let mySplitText = new SplitText(temp, {type:"lines"})
    let lines = mySplitText.lines;

    let tl = new TimelineLite
    tl.set(lines, {transformOrigin: "left center", autoAlpha:0})

    tl.staggerTo(lines, 0.3, {autoAlpha:1}, 0.03, "+0")


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


function adaptMenu(windScroll){
  let scroll = windScroll.scrollTop() -  $(".section-hero").height()
  const menu = $('.main-nav')
  const isFixed = $('.is-fixed')
  const isStatic = $('.is-static')

  if (scroll < (0 - menu.height())) {

    if(menu.hasClass("is-fixed")) {
      //menu.removeClass("is-fixed")
      let tl = new TimelineLite
      tl.to(menu, 0.3,{top:-100})
      tl.set(menu,{className:"-=is-fixed"})
      tl.set(menu,{top:0})
    }else {

    }

  } else {
    if(menu.hasClass("is-fixed")) {

    }else{
      //menu.addClass('is-fixed')
      let tl = new TimelineLite
      tl.set($("header"),{height: menu.height()})
      tl.set(menu,{className:"+=is-fixed"})
      tl.fromTo(menu, 0.3,{top:-100},{top:0})
    }
  }

}


function rotate(name, rotation){
  const titel = $(name)
  Tw.to(titel, 2, {rotation: rotation})
}


function animationHero(windScroll) {
    let scroll = windScroll.scrollTop()
    console.log(scroll)
    if (scroll == 0){
      typewriter()
    }

}

function typewriter(){
  const revealInterval = 0.1,
  mySplitText = new SplitText(".titel-hero", {type:"words,chars", charsClass:"char"}),
  $chars = $(".char"),
  tl =  new TimelineMax({});

  tl.set($chars, {autoAlpha: 0})
  // this makes the cursor resume blinking after reversing

  //loop throug all the chars and make them visible AND set cursor to their right at same time

  $chars.each(function(index, element){
    var $element = $(element);

    tl.set($element, {autoAlpha:1}, (index +1) * revealInterval)
  })
}
