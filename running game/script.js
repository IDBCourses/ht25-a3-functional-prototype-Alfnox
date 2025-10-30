/*
 * IDB Programming: Code Playground
 *
 */

// (o)

import * as Util from "./util.js";



let speed = 0.007;

let lastKeyPressed = null;
let score = 0;

let isJumping = false;
let jumpStartTime = 0;
let jumpHoldTime = 0;

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
const ObstecalObj = {
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
function setAppearancePropertiesNoPos (obj,name) {
  const {x,y,width,height,r,h,s,l,a,rot} = obj
  Util.setRotation(rot,name)
  Util.setSize(width, height, name)
  Util.setRoundedness(r,name)
  Util.setColour(h,s,l,a,name)
}
function isOverlapping(nameOne, nameTwo) { //
  const rect1 = nameOne.getBoundingClientRect();
  const rect2 = nameTwo.getBoundingClientRect();

  const overlap = !(
    rect1.right < rect2.left ||  // checks if man and gameover
    rect1.left > rect2.right ||  // is in the same place or not
    rect1.bottom < rect2.top || 
    rect1.top > rect2.bottom   
  );

  return overlap; 
}
function animateJump(height, duration) {
  if (isJumping) return;
  isJumping = true;

  const startY = 0.65; // ground level
  const startTime = performance.now();

  function jump(time) {
    const elapsed = time - startTime;
    const progress = elapsed / duration;

    if (progress < 1) {
      // Smooth parabolic motion (up and down)
      const yOffset = -4 * height * (progress - 0.5) ** 2 + height;
      manOneObj.y = startY - yOffset;

      requestAnimationFrame(jump);
    } else {
      // Land
      manOneObj.y = startY;
      manOneShadowObj.a = 0.61;
      manOneShadowObj.width = 70;
      isJumping = false;
    }
  }

  requestAnimationFrame(jump);
}

// Code that runs over and over again
function loop() {
  
  setAppearancePropertiesNoPos(manOneObj,manOne);
  Util.setPositionPixels(barOneObj.x*window.innerWidth-manOneObj.width,manOneObj.y*window.innerHeight,manOne)
  setAppearancePropertiesNoPos(manOneShadowObj,manOneShadow);
   Util.setPositionPixels(barOneObj.x*window.innerWidth-manOneObj.width,manOneShadowObj.y*window.innerHeight,manOneShadow)
   
  setAppearanceProperties(ObstecalObj,Obstecal);
  setAppearanceProperties(gameOverObj,gameOver);
  
  setAppearanceProperties(barOneObj,barOne);
  setAppearanceProperties(barTwoObj,barTwo);
  setAppearancePropertiesNoPos(trapziodLeftObj,trapziodLeft);
   Util.setPositionPixels(barOneObj.x*window.innerWidth-barOneObj.width/2-trapziodLeftObj.width-36, trapziodLeftObj.y, trapziodLeft)
  setAppearancePropertiesNoPos(trapziodRightObj,trapziodRight);
   Util.setPositionPixels(barOneObj.x*window.innerWidth+barOneObj.width/2-trapziodRightObj.width+36, trapziodRightObj.y, trapziodRight)
  
  
 
  if (isOverlapping(manOne, gameOver)) {
  console.log("overlapping");
} else {
  console.log("No overlap");
}
 
  window.requestAnimationFrame(loop);
}

// Setup

function setup() {
  Util.createThing("barTwo","thingThree");
  Util.createThing("barOne","thingThree");
  Util.createThing("Obstecal","thingTwo");
  Util.createThing("manOneShadow","thingOne");
  Util.createThing("manOne","thingOne");
  Util.createThing("gameOver","thingOne");
  Util.createThing("trapziodLeft","thingFive");
  Util.createThing("trapziodRight","thingFour");
  
  document.addEventListener("keydown", (event) => {
    if(lastKeyPressed === 'KeyD' && event.code === 'KeyL'){
      ObstecalObj.x=ObstecalObj.x-speed; // moves obsticles to the left
      gameOverObj.x=ObstecalObj.x
      score+=1 // keeps score
      lastKeyPressed = 'KeyL';
      console.log('score: '+score)
    }
    if(lastKeyPressed === 'KeyL' && event.code === 'KeyD'){
      ObstecalObj.x=ObstecalObj.x-speed; // moves obsticles to the left
      gameOverObj.x=ObstecalObj.x
      score+=1 // keeps score
      lastKeyPressed = 'KeyD';
      console.log('score: '+score)
    }
    lastKeyPressed = event.code // records last key pressed
  });
  

  document.addEventListener("keydown", (event) => { // Jump animation call timer start
  if (event.code === "Space" && !event.repeat && !isJumping) {
    jumpStartTime = performance.now(); // Start measuring how long Space is held
  }
});

document.addEventListener("keyup", (event) => { // Jump animation call timer stop
  if (event.code === "Space" && jumpStartTime > 0) {
    // holdTime also rests startTime
    jumpHoldTime = performance.now() - jumpStartTime;
    jumpStartTime = 0;

    // Clamp, max jump 
    if (jumpHoldTime>=1000){
      jumpHoldTime = 1000;
    }
    // makes holdTime into jump hight and airtime
    const airTime = 2000 + (jumpHoldTime / 0.5); 
    const jumpHeight = 0.15 + (jumpHoldTime / 1000) * 0.15; 

    animateJump(jumpHeight, airTime);
  }
});
  

  


  
  window.requestAnimationFrame(loop);
}

setup();