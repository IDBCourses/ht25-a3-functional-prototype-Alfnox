/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.

// Settings variables should contain all of the "fixed" parts of your programs

// Code that runs over and over again
function loop() {

  window.requestAnimationFrame(loop);
}

function setup() {
  
  window.requestAnimationFrame(loop);
}

setup();  