/*
 * IDB Programming: Code Playground
 *
 */

// (o)

import * as Util from "./util.js";


let speed = 0.007;
let jump = 0.005;
let lastKeyPressed = null;
let score = 0;
let currentTime;
let pastTime;

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
function isOverlapping(elOne, elTwo) { //
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

/* const funkApps = [
  
 
];

for (const funkApp of funkApps) {
  console.log(funkApp);
}

const list = document.getElementById("myList");

for (let i = 1; i <= 5; i++) {
  const li = document.createElement("li");
  li.textContent = "Item " + i;
  list.appendChild(li);
} */

  let angle = 0;          // keeps track of the animation phase
  let time = 'timeSpaceIsHeldDown'
  const amplitude = 'number(max100)*time';  // how far it moves up and down
  const speedMove = 0.02;     // how fast it moves

  function animateJump() {
    // Calculate new Y position using a sine wave
    const jumpY = Math.sin(angle) * amplitude;

    // Apply translation to the element
    Util.setPosition(manOneObj.x, jumpY,manOne)

    // Increment angle for the next frame
    angle += speedMove;
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
      score+=1
      lastKeyPressed = 'KeyL';
      console.log('score: '+score)
    }
    if(lastKeyPressed === 'KeyL' && event.code === 'KeyD'){
      ObstecalObj.x=ObstecalObj.x-speed;
      gameOverObj.x=ObstecalObj.x
      score+=1
      lastKeyPressed = 'KeyD';
      console.log('score: '+score)
    }
  lastKeyPressed = event.code 

  document.addEventListener("keydown", (event)=> {    
   if (event.code === 'Space' && !event.repeat){
      currentTime = Date.now()
     }
  })
  document.addEventListener("keyup", (event)=> {    
   if (event.code === 'Space' && !event.repeat){
      pastTime = Date.now() - currentTime
      console.log('time '+pastTime)
    }
  })

  
});

  
  window.requestAnimationFrame(loop);
}

setup();