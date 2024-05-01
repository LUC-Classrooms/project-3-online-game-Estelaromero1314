/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Estela Romero
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

var gameState = "splash"; // Game state set to splash
var player1; // Global variable for player
var timer; // Timer variable
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array


function setup() {
  createCanvas(600, 400);
  player1 = new Player(width / 2, height * 4 / 5); // player position
  timer = new Timer(30000); // 30 second timer
  dropTimer = new Timer(1000);
  testBox = new Box(width/2, height/3);
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
  testBox.display();
testBox.spin();
}

function play() {
  // Display play screen
  background(0, 200, 0);
  player1.angle = 0; // Reset rotation angle
  player1.x = mouseX;
  player1.display(); // Display player
  player1.move(); // Move player

  if (dropTimer.isFinished()) {
    let p = new Box(random(width), -40); // Create a new present
    presents.push(p); // Add to the array
    dropTimer.start(); // Restart timer for next drop
  }

  // Manage presents
  for (let i = 0; i < presents.length; i++) {
    presents[i].display(); // Draw each present on the canvas
    presents[i].move(); // Make each present drop
    presents[i].spin(); // Make each present rotate

    // Check for collision
    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if (d < 50) {
      presents.splice(i, 1); // If collision detected, remove the present
      i--;
      continue; 
    }

    if (presents[i].y > height) {
      // Present went below the canvas
      presents.splice(i, 1); // Remove from array
      i--; 
    }
  }

  if (timer.isFinished()) {
    gameState = "gameOver"; // Check timer and switch to game over if time is up
  }



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
  fill(255); 
  
  let displayTime = (timer.elapsedTime / 1000).toFixed(1);
  text("Elapsed time: " + displayTime + " s", 40, 100); //  time in top left corner

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
    dropTimer.start();
  } else if (gameState == "play") { 
    // gameState = "gameOver";  // Transition from play to game over 
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
