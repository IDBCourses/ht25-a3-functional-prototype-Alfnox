/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";
let hue = 40;
let sat = 25;

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

function setup() {
  Util.createThing("thingOne","thing");
  document.addEventListener("keydown", (event) => {
    if (event.key === 'w' || event.key === 'W') {
      thingOneObj.y=thingOneObj.y-0.01;
      console.log("keydown:"+event.key)
    }
    if (event.key === 's' || event.key === 'S') {
      thingOneObj.y=thingOneObj.y+0.01;
      console.log("keydown:"+event.key)
    }
    if (event.key === 'a' || event.key === 'A') {
      thingOneObj.x=thingOneObj.x-0.01;
      console.log("keydown:"+event.key)
    }
    if (event.key === 'd' || event.key === 'D') {
      thingOneObj.x=thingOneObj.x+0.01;
      console.log("keydown:"+event.key)
    }
  })
  
  
  window.requestAnimationFrame(loop);
}

setup();  