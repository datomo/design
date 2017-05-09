import $ from 'jquery';
import Tw from './vendor/TweenMax.min.js';

function hero(){
  const titel = $(".titel-hero")
  Tw.to(titel, 0.2, {rotate: 300})
}
