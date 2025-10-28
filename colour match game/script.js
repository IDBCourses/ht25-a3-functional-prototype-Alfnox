/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";
let hue = 40;
let sat = 25;
let hues = [];
let keys = ['1','2','3','4','5','6','7','8','9']



//hue: 40->360
// 100 1 -> 9
// 75  q -> o
// 50  a -> l
// 25  z -> .
//  ^
// Sat:

const thingOneObj = {
  x: 0.5,
  y: 0.5,
  width: 100,
  height: 100,
  r: 1,
  h: 200,
  s: 80,
  l: 80,
  a: 1,
}


// State variables are the parts of your program that change over time.

// Settings variables should contain all of the "fixed" partsr
function setAppearanceProperties (obj,name) {
  const {x,y,width,height,r,h,s,l,a} = obj
  Util.setPosition(x, y, name)
  Util.setSize(width, height, name)
  Util.setRoundedness(r,name)
  Util.setColour(h,s,l,a,name)
}


// Code that runs over and over again
function loop() {
  setAppearanceProperties(thingOneObj,thingOne);
  
  
  window.requestAnimationFrame(loop);
}

// Setup

function setup() {
  Util.createThing("thingOne","thing");
  document.addEventListener("keydown", (event) => {
    if (event.key === '1' || event.key === '2' || event.key === '3'|| event.key === '4'|| event.key === '5'|| event.key === '6'|| event.key === '7'|| event.key === '8'|| event.key === '9') {
      thingOneObj.h=40;
      console.log("keydown:"+event.key)
    }
    
  })
  document.addEventListener('keydown', function(event) {
  console.log('Key pressed:', event.keyCode);
});
  
  window.requestAnimationFrame(loop);
}

setup();  