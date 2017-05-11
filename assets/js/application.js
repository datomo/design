import $ from 'jquery';
import Tw from './vendor/TweenMax.min.js';
import TwSplit from './vendor/utils/SplitText.min.js';
require('script-loader!./vendor/plugins/ScrollToPlugin.min.js');

//require('script-loader!./vendor/plugins/TextPlugin.min.js');

$(document).ready(function(){
  console.log("test");
  typewriter();
  placeHire();
  animateHire()
  debug()


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


  $(window).resize(function() {
    placeHire()
  })

  ////////////////////////////////////////////////////////////
  //Start Scroll Animation
  ////////////////////////////////////////////////////////////

  var wrapper = $(".content"),
    $menu = $(".menu"),
    $window = $(window);

$menu.on("click","a", function(){
    var $this = $(this),
        href = $this.attr("href"),
        topY = $(href).offset().top - $menu.height();

    TweenMax.to($window, 1, {
        scrollTo:{
            y: topY,
            autoKill: true
        },
        ease:Power3.easeOut
     });

  return false;
});


});


function translateText (data ){
  $.each(data, function(key, val) {
    let temp = $("." + key)
    temp.text(val)
    let mySplitText = new SplitText(temp, {type:"chars"})
    let lines = mySplitText.chars;

    let tl = new TimelineLite
    //tl.set(lines, {transformOrigin: "left center"})

    //$.each(lines, function(){
      let split = new SplitText(lines, {type: "chars"})
      let duration = 2/lines.length
      //console.log(duration)
      tl.set(lines,{autoAlpha:0})
      tl.staggerTo(lines, 0.01, {autoAlpha:1}, duration, "+0")

      /* some swich animations
      const $switch = $(".switch")
      $switch.on("click", function(){
        let tl = new TimelineLite
        tl.to($this, 0.2,{css:{background: none}})

      })
      */


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
  let scroll = windScroll.scrollTop() -  $("#section-hero").height()
  let menuSc = $('.main-nav')
  const isFixed = $('.is-fixed')
  const isStatic = $('.is-static')

  if (scroll < (0 - menuSc.height())) {

    if(menuSc.hasClass("is-fixed")) {
      //menu.removeClass("is-fixed")
      let tl = new TimelineLite
      tl.to(menuSc, 0.3,{top:-100})
      tl.set(menuSc,{className:"-=is-fixed"})
      tl.set(menuSc,{top:0})
    }else {

    }

  } else {
    if(menuSc.hasClass("is-fixed")) {

    }else{
      //menu.addClass('is-fixed')
      let tl = new TimelineLite
      tl.set($("header"),{height: menuSc.height()})
      tl.set(menuSc,{className:"+=is-fixed"})
      tl.fromTo(menuSc, 0.3,{top:-100},{top:0})
    }
  }

}


function rotate(name, rotation){
  const titel = $(name)
  Tw.to(titel, 2, {rotation: rotation})
}


function animationHero(windScroll) {
    let scroll = windScroll.scrollTop()
    const $secSocial= $('#section-hero')
    const secSocial = ($(".main-nav").height() + $("#section-hero").height() + $("#section-projects").height() )
    if (scroll == 0){
      typewriter()
    }else if (scroll >= (secSocial)) {
      animateHire()
      //console.log("hire")
    }else if (scroll < secSocial) {
      removeHire()
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


function placeHire() {
  const $hire = $('#hire');
  const $panel = $('.panel-social');
  let leftPanel = (($panel.position().left + $panel.width()) - ($(window).width()/20))
  let topPanel = ($panel.position().top - ($hire.height()/2) - ($(window).height()/20))
  TweenMax.set($hire,{x: leftPanel, y: topPanel});
  TweenMax.set($hire,{rotation:-45})
}

function animateHire(){
  const $hire = $('#hire');
  const $panel = $('.panel-social');
  if ($hire.hasClass("animated")){

  } else {
    $hire.addClass("animated")
    TweenMax.set($hire, {force3D: false })
    hideScale($hire)
    TweenMax.to($hire, 0.3, {autoAlpha: 1, scale: 1, z: 20})
  }
}

function hideScale(element){
  TweenMax.set(element, {autoAlpha:0, scale: 3})
}

function removeHire(){
  const $hire = $('#hire');
  if ($hire.hasClass("animated")){
    $hire.removeClass("animated")
    hideScale($hire)
  }
}

function debug(){
  const $secHero= $('#section-hero')
  const $secProjects = $('#section-projects')
  const $secSocial = $('#section-social')

  console.log($secHero.height())
  console.log($secProjects.height())
  console.log($secSocial.height())
}
