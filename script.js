/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Estela Romero
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

var gameState = "splash"; // Game state set to splash
var player1; // Global variable for player
var timer; // Timer variable

function setup() {
  createCanvas(600, 400);
  player1 = new Player(width / 2, height * 4 / 5); // player position
  timer = new Timer(5000); // 5 second timer
}

function draw() {
  background(200);

  // Switch between game states
  switch (gameState) {
    case "splash":
      splash(); // Display splash screen
      break;
    case "play":
      play(); // Display play screen
      if (timer.isFinished()) {
        gameState = "gameOver"; //  timer and switch to game over if time is up
      }
      break;
    case "gameOver":
      gameOver(); // Display game over screen
      break;
    default:
      console.log("No match found - check your game state logic!"); 
  }
}

function splash() {
  // Display splash screen
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(Click the mouse to continue)", width / 2, height / 2 + 30);
}

function play() {
  // Display play screen
  background(0, 200, 0);
  player1.angle = 0; // Reset rotation angle
  player1.x = mouseX;
  player1.display(); // Display player
  player1.move(); // Move player

  if (keyIsPressed) {
    switch(keyCode) {
      case UP_ARROW:
        player1.y -= 30; // Move up 30px
        player1.angle = 0; // No rotation
        if (player1.y < 0) player1.y = height; // Wrap to bottom
        break;
      case DOWN_ARROW:
        player1.y += 30; // Move down 30px
        player1.angle = PI; // Point down 
        if (player1.y > height) player1.y = 0; // Wrap to top
        break;
      case LEFT_ARROW:
        player1.x -= 30; // Move left 30px
        player1.angle = -HALF_PI; // Point left 
        if (player1.x < 0) player1.x = width; // Wrap to right
        break;
      case RIGHT_ARROW:
        player1.x += 30; // Move right 30px
        player1.angle = HALF_PI; // Point right 
        if (player1.x > width) player1.x = 0; // Wrap to left
        break;
      default:
        console.log("Press the arrow keys to move player1");
    }
  }

  // Display timer
  textAlign(LEFT);
  textSize(16);
  fill(255); // Set text color to white for better visibility
  
  let displayTime = (timer.elapsedTime / 1000).toFixed(1);
  text("Elapsed time: " + displayTime + " s", 40, 100); // Show elapsed time in top left corner

  if (timer.isFinished()) {
    gameState = "gameOver"; // Check timer and switch to game over if time is up
  }
}


function gameOver() {
  // Display game over screen
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
}

function mousePressed() {
  console.log("click!");
  if (gameState == "splash") { 
    gameState = "play";  // Transition from splash to play state
    timer.start(); // Start the timer
  } else if (gameState == "play") { 
    // gameState = "gameOver";  // Transition from play to game over state 
  } else if (gameState == "gameOver") { 
    gameState = "splash";  // Reset to splash state
  }
} 

if(keyIsPressed) {
  switch(keyCode) {
    case UP_ARROW:
      player1.thrust(); // accelerate
      break;
    case DOWN_ARROW:
      player1.brake();
      break;
    case LEFT_ARROW:
      player1.angle -= .02; //turn left
      break;
    case RIGHT_ARROW:
      player1.angle += .02; //turn right
      break;
    default:
      console.log("use the arrow keys to move");
   }
}
