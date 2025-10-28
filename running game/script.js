/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";


let speed = 0.005
// let lastKeyPressed = 



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
    event.key === 'r'||event.key === 'f';
    if (!event.repeat){
    thingOneObj.x=thingOneObj.x+speed;  
  }
  console.log('lastkey '+event.key)
});
  
  window.requestAnimationFrame(loop);
}

setup();  