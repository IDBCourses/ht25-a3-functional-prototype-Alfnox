/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";


let speed = 0.007;
let jump = 0.005
let lastKeyPressed = ' ';

//Objects

const manOneObj = {
  x: 0.4,
  y: 0.65,
  width: 70,
  height: 100,
  r: 0,
  h: 200,
  s: 80,
  l: 80,
  a: 1,
}
const thingTwoObj = {
  x: 0.6,
  y: 0.7,
  width: 90,
  height: 80,
  r: 0,
  h: 100,
  s: 0,
  l: 50,
  a: 0,
}
const manOneShadowObj = {
  x: 0.4,
  y: 0.717,
  width: 70,
  height: 20,
  r: 1,
  h: 100,
  s: 0,
  l: 60,
  a: 0.61,
}
const barOneObj = {
  x: 0.5,
  y: 0.754,
  width: 460,
  height: 5,
  r: 0,
  h: 100,
  s: 0,
  l: 0,
  a: 1,
}
const BarTwoObj = {
  x: 0.5,
  y: 0.646,
  width: 415,
  height: 5,
  r: 0,
  h: 100,
  s: 0,
  l: 0,
  a: 1,
}
const gameOverObj = {
  x: 0.6,
  y: 0.717,
  width: 70,
  height: 20,
  r: 1,
  h: 0,
  s: 100,
  l: 50,
  a: 0.61,
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
  setAppearanceProperties(manOneShadowObj,thingThree);
  setAppearanceProperties(manOneObj,thingOne);
  setAppearanceProperties(thingTwoObj,thingTwo);
  setAppearanceProperties(barOneObj,thingFour);
  setAppearanceProperties(BarTwoObj,thingFive);
  setAppearanceProperties(gameOverObj,thingSix);
 
  
  
  window.requestAnimationFrame(loop);
}

// Setup

function setup() {
  Util.createThing("thingFive","thingThree");
  Util.createThing("thingFour","thingThree");
  Util.createThing("thingTwo","thingTwo");
  Util.createThing("thingThree","thingOne");
  Util.createThing("thingOne","thingOne");
  Util.createThing("thingSix","thingOne")

  document.addEventListener("keydown", (event) => {
    if(lastKeyPressed === 'KeyY' && event.code === 'KeyH'){
      thingTwoObj.x=thingTwoObj.x-speed; // moves obsticles to the left
      gameOverObj.x=thingTwoObj.x
      lastKeyPressed = 'KeyH';
    }
    if(lastKeyPressed === 'KeyH' && event.code === 'KeyY'){
      thingTwoObj.x=thingTwoObj.x-speed;
      gameOverObj.x=thingTwoObj.x
      lastKeyPressed = 'KeyY';
    }

  document.addEventListener("keydown", (event)=> {    
   if (event.code === 'Space' && !event.repeat){
      manOneObj.y=0.50
     }
  })
  document.addEventListener("keyup", (event)=> {    
   if (event.code === 'Space'){
      manOneObj.y=0.65      
    }
  })
/*     if (!event.repeat &&!(lastKeyPressed === event.key)&&(event.key === 'r'||event.key === 'f')){
    thingOneObj.x=thingOneObj.x+speed;  
  } */
  lastKeyPressed = event.code
  console.log('lastkey '+event.code)
  console.log('lastkey string '+lastKeyPressed)
});
  
  window.requestAnimationFrame(loop);
}

setup();  