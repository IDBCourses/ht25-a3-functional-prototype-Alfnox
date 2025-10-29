/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";


let speed = 0.007;
let jump = 0.005;
let lastKeyPressed = ' ';
let score = 0;

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
const trapziodOneObj = {
  x: 0.6,
  y: 0.7,
  width: 90,
  height: 80,
  r: 0,
  h: 100,
  s: 0,
  l: 50,
  a: 0,
  rot: 0,
}
const trapziodLeftObj = {
  x: 0,
  y: 420,
  width: 130,
  height: 80,
  r: 0,
  h: 100,
  s: 0,
  l: 50,
  a: 0,
  rot: 180,
}
const trapziodRightObj = {
  x: 0,
  y: 420,
  width: 130,
  height: 80,
  r: 0,
  h: 100,
  s: 0,
  l: 50,
  a: 0,
  rot: 180,
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
  rot: 0,
}
const barOneObj = {
  x: 0.5,
  y: 0.754,
  width: 464,
  height: 5,
  r: 0,
  h: 100,
  s: 0,
  l: 0,
  a: 1,
  rot: 0,
}
const barTwoObj = {
  x: 0.5,
  y: 0.646,
  width: 415,
  height: 5,
  r: 0,
  h: 100,
  s: 0,
  l: 0,
  a: 1,
  rot: 0,
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
  rot: 0,
}


// State variables are the parts of your program that change over time.

// Settings variables should contain all of the "fixed" partsr
function setAppearanceProperties (obj,name) {
  const {x,y,width,height,r,h,s,l,a,rot} = obj
  Util.setRotation(rot,name)
  Util.setPosition(x, y, name)
  Util.setSize(width, height, name)
  Util.setRoundedness(r,name)
  Util.setColour(h,s,l,a,name)
}
function setAppearancePropertiesPixels (obj,name) {
  const {x,y,width,height,r,h,s,l,a,rot} = obj
  Util.setRotation(rot,name)
  Util.setSize(width, height, name)
  Util.setRoundedness(r,name)
  Util.setColour(h,s,l,a,name)
}
function isOverlapping(elOne, elTwo) {
  const rect1 = elOne.getBoundingClientRect();
  const rect2 = elTwo.getBoundingClientRect();

  const overlap = !(
    rect1.right < rect2.left ||   // elOne is to the left of elTwo
    rect1.left > rect2.right ||   // elOne is to the right of elTwo
    rect1.bottom < rect2.top ||   // elOne is above elTwo
    rect1.top > rect2.bottom      // elOne is below elTwo
  );

  return overlap; 
}


// Code that runs over and over again
function loop() {
  setAppearancePropertiesPixels(manOneShadowObj,manOneShadow);
   Util.setPositionPixels(barOneObj.x*window.innerWidth-manOneObj.width,manOneObj.y*window.innerHeight,manOne)
  setAppearancePropertiesPixels(manOneObj,manOne);
   Util.setPositionPixels(barOneObj.x*window.innerWidth-manOneObj.width,manOneShadowObj.y*window.innerHeight,manOneShadow)
  setAppearanceProperties(trapziodOneObj,trapziodOne);
  setAppearanceProperties(barOneObj,barOne);
  setAppearanceProperties(barTwoObj,barTwo);
  setAppearanceProperties(gameOverObj,gameOver);
  setAppearancePropertiesPixels(trapziodLeftObj,trapziodLeft);
  setAppearancePropertiesPixels(trapziodRightObj,trapziodRight);
   Util.setPositionPixels(barOneObj.x*window.innerWidth+barOneObj.width/2-trapziodRightObj.width+36, trapziodRightObj.y, trapziodRight)
   Util.setPositionPixels(barOneObj.x*window.innerWidth-barOneObj.width/2-trapziodLeftObj.width-36, trapziodLeftObj.y, trapziodLeft)
 
  if (isOverlapping(manOne, gameOver)) {
  console.log("Boxes are overlapping!");
} else {
  console.log("No overlap detected.");
}
 
  window.requestAnimationFrame(loop);
}

// Setup

function setup() {
  Util.createThing("barTwo","thingThree");
  Util.createThing("barOne","thingThree");
  Util.createThing("trapziodOne","thingTwo");
  Util.createThing("manOneShadow","thingOne");
  Util.createThing("manOne","thingOne");
  Util.createThing("gameOver","thingOne");
  Util.createThing("trapziodLeft","thingFive");
  Util.createThing("trapziodRight","thingFour");

  document.addEventListener("keydown", (event) => {
    if(lastKeyPressed === 'KeyY' && event.code === 'KeyH'){
      trapziodOneObj.x=trapziodOneObj.x-speed; // moves obsticles to the left
      gameOverObj.x=trapziodOneObj.x
      score+=1
      lastKeyPressed = 'KeyH';
      console.log('score: '+score)
    }
    if(lastKeyPressed === 'KeyH' && event.code === 'KeyY'){
      trapziodOneObj.x=trapziodOneObj.x-speed;
      gameOverObj.x=trapziodOneObj.x
      score+=1
      lastKeyPressed = 'KeyY';
      console.log('score: '+score)
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