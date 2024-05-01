/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Estela Romero
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

var gameState = "splash"; // Game state set to splash
var player1; // Global variable for player

function setup() {
  createCanvas(600, 400);
  player1 = new Player(width / 2, height * 4 / 5); //  player position
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

  // Display game message
  fill(0, 0, 200);
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);
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
  } else if (gameState == "play") { 
    gameState = "gameOver";  // Transition from play to game over state
  } else if (gameState == "gameOver") { 
    gameState = "splash";  // Reset to splash state
  }
} 


if(keyIsPressed)
{
  switch(keyCode)
  {
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