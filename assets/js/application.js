import $ from 'jquery';

$(document).ready(function(){
  console.log("test");


  ////////////////////////////////////////////////////////////
  //Translations Tool
  ////////////////////////////////////////////////////////////
  //change the text on click to german, if it's not active
  $('#en-button').on("click", function(){
    if ($('#en-button').hasClass("is-active")){

    }else {
      $.getJSON("assets/js/translations/english.json", function (data) {
        $.each(data, function(key, val) {
          $("." + key).text(val)
        })
      })
      $("#de-button").removeClass("is-active")
      $("#en-button").addClass("is-active");
    }
  })

  //change the text back to english, if it's not active
  $('#de-button').on("click", function(){
    if ($('#de-button').hasClass("is-active")){

    }else {
      $.getJSON("assets/js/translations/german.json", function (data) {
        $.each(data, function(key, val) {
          $("." + key).text(val)
        })
      })
      $("#en-button").removeClass("is-active")
      $("#de-button").addClass("is-active");
    }
  })

  ////////////////////////////////////////////////////////////
  //end
  ////////////////////////////////////////////////////////////
});
