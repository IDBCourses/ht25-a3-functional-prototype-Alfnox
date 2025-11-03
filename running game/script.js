/*
 * IDB Programming: Code Playground
 *
 */

// (o)

import * as Util from "./util.js";

let gameActive = true;

let obstacles = [];
let gameOvers = [];
let keyPressCount = 0;
let lastKeyPressed = null;
let speed = 0.007;

const keysRequiredPerObstacle = 50;

let score = 0;
let timer = 30;   // timer add minus value
let timerInterval = null;  // time between updates
const timerDisplay = document.getElementById("timer-display");
const scoreDisplay = document.getElementById("score-display");


let airMulti = 0.3;

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





// "for" loop functions are here for my sanity
function createNewObstacle() {
  const gameOverId = "GameOver_" + Date.now();
  const obstacleId = "Obstacle_" + Date.now();
  

  const creatObstacle = {
    id: obstacleId,
    x: barOneObj.x+(barOneObj.width+70)/window.innerWidth/2,  
    y: 0.7,
    width: 90,
    height: 80,
    r: 0,
    h: 100,
    s: 80,
    l: 50,
    a: 0,
    rot: 0,
    
  };

  const creatgameOver = { 
    id: gameOverId,
    x: barOneObj.x+(barOneObj.width+70)/window.innerWidth/2,
    y: 0.7188,
    width: 65,
    height: 5,
    r: 1,
    h: 0, 
    s: 100,
    l: 50,
    a: 0,
    rot: 1,
    
  };
  
  Util.createThing(obstacleId, "thingTwo");
   Util.createThing(gameOverId, "thingOne");
   
  creatObstacle.element = document.getElementById(obstacleId);
  creatgameOver.element = document.getElementById(gameOverId);

  // to make sure they are behind anythign else
if (creatObstacle.element) {
  creatObstacle.element.style.zIndex = "-1";
}
if (creatgameOver.element) {
  creatgameOver.element.style.zIndex = "-1";
}
   
  obstacles.push(creatObstacle);
  gameOvers.push(creatgameOver);

}
function removeOffscreenObstacles() {
  
  //remove obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    
    if (obstacle.x < barOneObj.x-(barOneObj.width+70)/window.innerWidth/2) {
      if (obstacle.element && obstacle.element.parentNode) {
        obstacle.element.parentNode.removeChild(obstacle.element);
      }
      obstacles.splice(i, 1);      
    }
  }
  //remove game over
  for (let i = gameOvers.length - 1; i >= 0; i--) {
    const gameOver = gameOvers[i];
    if (gameOver.x < barOneObj.x-barOneObj.width/window.innerWidth/2) {
      if (gameOver.element && gameOver.element.parentNode) {
        gameOver.element.parentNode.removeChild(gameOver.element);
      }
      gameOvers.splice(i, 1);      
    }
  }
}

// Functions
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
function allAppearance () {
  setAppearanceProperties(barOneObj,barOne);
  setAppearanceProperties(barTwoObj,barTwo);  
  setAppearancePropertiesNoPos(manOneShadowObj,manOneShadow);
  Util.setPositionPixels(barOneObj.x*window.innerWidth-manOneObj.width,manOneShadowObj.y*window.innerHeight,manOneShadow)
  setAppearancePropertiesNoPos(trapziodLeftObj,trapziodLeft);
  Util.setPositionPixels(barOneObj.x*window.innerWidth-barOneObj.width/2-trapziodLeftObj.width-36, trapziodLeftObj.y, trapziodLeft)
  setAppearancePropertiesNoPos(trapziodRightObj,trapziodRight);
  Util.setPositionPixels(barOneObj.x*window.innerWidth+barOneObj.width/2-trapziodRightObj.width+36, trapziodRightObj.y, trapziodRight)
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
      isJumping = false;
    }
  }

  requestAnimationFrame(jump);
}
function startTimer() {
  timerDisplay.textContent = `Time: ${timer}`; // had issues with it not updating propperly
  
  timerInterval = setInterval(() => {
    if (!gameActive) return; // Don't update timer if game is over
    
    timer--;
    timerDisplay.textContent = `Time: ${timer}`;

    if (timer <= 0) {
      timer = 0;
      timerDisplay.textContent = "Time's Up!";
      shutUpYouLoseYouLoser();
    }
  }, 1000);
}
function shutUpYouLoseYouLoser () {
   gameActive = false; 
  clearInterval(timerInterval);
  if (timer <= 0) {
    timerDisplay.textContent = "time's Up!";
  } else {
    timerDisplay.textContent = "you suck!";
  }
  freezePage();
}


// Code that runs over and over again
function loop() {
  setAppearancePropertiesNoPos(manOneObj,manOne);
  Util.setPositionPixels(barOneObj.x*window.innerWidth-manOneObj.width,manOneObj.y*window.innerHeight,manOne)
  
   //sets apperance fore evry new obstecal
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    setAppearanceProperties(obstacle, obstacle.element);

  for (let i = 0; i < gameOvers.length; i++) {
    const gameOver = gameOvers[i];
    setAppearanceProperties(gameOver, gameOver.element);
    
    if (isOverlapping(manOne, gameOver.element)) {
      console.log("Overlapping obstacle");
      shutUpYouLoseYouLoser();
    }
   }
  }
  // remove obstacles and gameover behind white boxes
  removeOffscreenObstacles();
  removeOffscreenObstacles();
  
  window.requestAnimationFrame(loop);
}

// Setup

function setup() {
  startTimer();

  Util.createThing("barTwo","thingThree");
  Util.createThing("barOne","thingThree");  
  Util.createThing("manOneShadow","thingOne");
  Util.createThing("manOne","thingOne");  
  Util.createThing("trapziodLeft","thingFive");
  Util.createThing("trapziodRight","thingFour");

  allAppearance();
  
  createNewObstacle();
//MOVING
  document.addEventListener("keydown", (event) => {
  if(!gameActive) return;
  if(lastKeyPressed === 'KeyD' && event.code === 'KeyL'){
    // move ALL obstacles
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].x = obstacles[i].x - speed;
    } 
    for (let i = 0; i < gameOvers.length; i++) { 
      gameOvers[i].x = gameOvers[i].x - speed;
    }   
    score += 1;
    keyPressCount += 1;
    lastKeyPressed = 'KeyL';
    console.log('score: '+score);
    scoreDisplay.textContent = `Score: ${score}`;  // updates score visually
    // create new obstecals and game over with enoght "keyPressCount"
    // also sets i back to zero
    if (keyPressCount >= keysRequiredPerObstacle) {
      createNewObstacle();
      keyPressCount = 0;
    }
  }
  
  if(lastKeyPressed === 'KeyL' && event.code === 'KeyD'){
    // Move ALL obstacles
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].x = obstacles[i].x - speed;
    }   
    for (let i = 0; i < gameOvers.length; i++) { 
      gameOvers[i].x = gameOvers[i].x - speed;
    }
    score += 1;
    keyPressCount += 1;
    lastKeyPressed = 'KeyD';
    console.log('score: '+score);
    scoreDisplay.textContent = `Score: ${score}`;  // updates score visually
    // same as above but for the other key
    if (keyPressCount >= keysRequiredPerObstacle) {
      createNewObstacle();
      keyPressCount = 0;
    }
  }
  lastKeyPressed = event.code;
});
  
/// JUMPING
  document.addEventListener("keydown", (event) => { // Jump animation call timer start
    if(!gameActive) return;
    if (event.code === "Space" && !event.repeat && !isJumping) {
    jumpStartTime = performance.now(); // Start timer
  }})
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
    const airTime = 1000 + (jumpHoldTime / airMulti); 
    const jumpHeight = 0.15 + (jumpHoldTime / 1000) * 0.15; 

    animateJump(jumpHeight, airTime);
  }
});
  
  window.requestAnimationFrame(loop);
}

setup();



// TODO
// Fail window and stop game
// scorse counter on screen
// timer that fails you after a sertain time (30sec)
// make obstecals appear at a radom amout of key klicks smth like math.random(50-70)