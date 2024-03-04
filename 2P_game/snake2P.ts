import { snake,
         cords,
         changeDirection2P,
         spawnFood,
         color_in_snake,
         paint_food,
         paint_menu_button,
         draw_snake_head2P,
         print_game_over,
         print_pause,
         paint_restart_button,
         move_snake,
         paint_board,
         color_in_snake_red,
         food_eaten,
   } from "../exports";

let interval: NodeJS.Timeout;
let winner: "player1" | "player2" | "tie" | "none" = "none";

// Board variables
const blockSize: number = 25;

//Board dimensions
const rows: number = 20;
const cols: number = 20;

const restartButton: HTMLButtonElement = document.createElement("button");
const menuButton: HTMLButtonElement = document.createElement("button");

//The board (drawable region in HTML)
let board: HTMLCanvasElement;

//Provides the 2D rendering context for the drawing surface the canvas element. 
//Contains methods and properties that allow drawing shapes, text, images, etc. 
let context: CanvasRenderingContext2D;

// Pause Menu
const PauseMenu: HTMLDivElement = document.createElement("div");

let pause = false;

let player1: snake = {snake_direction: "right", 
                velocityX: 0, 
                velocityY: 0, 
                has_turned: false, 
                snake_body: [],
                headX: 0,
                headY: 0,
                head_last_cords: [0, 0]}

let player2: snake = {snake_direction: "left", 
                velocityX: 0, 
                velocityY: 0, 
                has_turned: false, 
                snake_body: [],
                headX: 19,
                headY: 0,
                head_last_cords: [19, 0]}

//Pictures of the snake's head
const HeadUp: HTMLImageElement = new Image();
const HeadDown: HTMLImageElement = new Image();
const HeadLeft: HTMLImageElement = new Image();
const HeadRight: HTMLImageElement = new Image();

const HeadUpRed: HTMLImageElement = new Image();
const HeadDownRed: HTMLImageElement = new Image();
const HeadLeftRed: HTMLImageElement = new Image();
const HeadRightRed: HTMLImageElement = new Image();

//The source for the images
HeadUp.src = "../Bilder/HeadUp.png"
HeadRight.src = "../Bilder/HeadRight.png"
HeadDown.src = "../Bilder/HeadDown.png"
HeadLeft.src = "../Bilder/HeadLeft.png"

HeadUpRed.src = "../Bilder/HeadUp(red).png"
HeadRightRed.src = "../Bilder/HeadRight(red).png"
HeadDownRed.src = "../Bilder/HeadDown(red).png"
HeadLeftRed.src = "../Bilder/HeadLeft(red).png"

// Food position on board
let foodX: number;
let foodY: number;

// Game logic
//Game will stop when true
let GameOver: boolean = false;

let tie: boolean = false;

//This will run once when the entire HTML document has finished loading.
window.onload = function () {
//Retrieves the HTML element with the ID "board"
board = document.getElementById("board") as HTMLCanvasElement;

//Height, width and style of the baord
board.height = rows * blockSize;
board.width = cols * blockSize;

//retrieves the 2D drawing context of the canvas and provides 2D drawing functions for the canvas.
context = board.getContext("2d") as CanvasRenderingContext2D; 

//Spawns the food
[foodX, foodY] = spawnFood(player1, rows, cols);

//When a key is pressed down, changeDirection2P() will be called.
document.addEventListener("keydown", (e: KeyboardEvent) => {
   changeDirection2P(e, player1, player2); // Passing both the event and the player object
});

//Frame rate and speed of snake
interval = setInterval(update2P, 1000 / 10);

paint_restart_button(restartButton);

// Append the restart button element to the board container
document.body.appendChild(restartButton);

PauseMenu.innerText = "Press SPACE to pause";
print_pause(PauseMenu);

//Event listener detecting click on restartbutton
restartButton.addEventListener("click", function () {
   location.reload(); // Reload the page to restart the game
});

paint_menu_button(menuButton);

menuButton.addEventListener("click", function () {
   window.location.href = "../index.html";
});

// Append the restart button element to the board container
document.body.appendChild(restartButton);
}

/**
* The main function that runs every tick/frame
* 
* Has no input or ouput
*/
function update2P(): void {
//Game does not update when paused
if (pause) {
   return;
}

if (GameOver) {
   print_game_over(document, interval);
   return;
}

paint_board(board, context);

paint_food(blockSize, foodX, foodY, context);

// Eat the food
if (food_eaten(player1, foodX, foodY)) {
   [foodX, foodY] = spawnFood(player1, cols, rows);
} else if (food_eaten(player2, foodX, foodY)) {
   [foodX, foodY] = spawnFood(player2, cols, rows);
}

move_snake(player1,
          context,
          HeadUp,
          HeadDown,
          HeadLeft,
          HeadRight,
          blockSize);

          move_snake(player2,
           context,
           HeadUpRed,
           HeadDownRed,
           HeadLeftRed,
           HeadRightRed,
           blockSize);


// Color in the snakes' bodies
color_in_snake(context, player1, blockSize);
color_in_snake_red(context, player2, blockSize);

draw_snake_head2P(player1,
                 player2,
                 context,
                 HeadUp,
                 HeadDown,
                 HeadLeft,
                 HeadRight,
                 HeadUpRed,
                 HeadDownRed,
                 HeadLeftRed,
                 HeadRightRed,
                 blockSize)

draw_snake_head2P(player1,
                 player2,
                 context,
                 HeadUp,
                 HeadDown,
                 HeadLeft,
                 HeadRight,
                 HeadUpRed,
                 HeadDownRed,
                 HeadLeftRed,
                 HeadRightRed,
                 blockSize);

// Checks for tie
if (player1.head_last_cords == player2.head_last_cords ||
   player1.headX == player2.headX && player1.headY == player2.headY ||
   player1.head_last_cords[0] == player2.headX && player1.head_last_cords[1] == player2.headY ||
   player2.head_last_cords[0] == player1.headX && player2.head_last_cords[1] == player1.headY ||
   player1.head_last_cords == player2.snake_body[1] ||
   player2.head_last_cords == player1.snake_body[1]) {
       winner = "tie";
       GameOver = true;
   }

// Checks if player 1 collides with wall
if (player1.headX < 0 || player1.headX > (cols - 1) || player1.headY < 0 || player1.headY > (cols - 1)) {
   winner = "player2"
   GameOver = true;
}
// Checks if player1 collides with themselves, or with the player 2
for (let i = 0; i < player1.snake_body.length; i++) {
   if (player1.headX == player1.snake_body[i][0] && player1.headY == player1.snake_body[i][1]) {
       winner = "player2"
       GameOver = true;
   }
}
for (let i = 0; i < player2.snake_body.length; i++) {
   if (player1.headX == player2.snake_body[i][0] && player1.headY == player2.snake_body[i][1]) {
       winner = "player2";
       GameOver = true;
   }
}

// Checks if player2 collides with wall
if (player2.headX < 0 || player2.headX > (cols - 1) || player2.headY < 0 || player2.headY > (cols - 1)) {
   winner = "player1"
   GameOver = true;
}
// Checks if player1 collides with themselves, or with the player 2
for (let i = 0; i < player2.snake_body.length; i++) {
   if (player2.headX == player2.snake_body[i][0] && player2.headY == player2.snake_body[i][1]) {
       winner = "player1"
       GameOver = true;
   }
}
for (let i = 0; i < player1.snake_body.length; i++) {
   if (player2.headX == player1.snake_body[i][0] && player2.headY == player1.snake_body[i][1]) {
       winner = "player1";
       GameOver = true;
   }
}

player1.head_last_cords = [player1.headX, player1.headY];
player2.head_last_cords = [player2.headX, player2.headY];

player1.has_turned = false;
player2.has_turned = false;
}
//Checks and executes pause
window.addEventListener("keydown", (event) => {
if (event.code === "Space") {
   if (pause) {
       //ResumeGame(update, PauseMenu, interval); // Resume game if paused 
       interval = setInterval(update2P, 1000 / 10);
       PauseMenu.innerText= "Press SPACE to pause";
   } 
   else {
       clearInterval(interval);
       PauseMenu.innerText= "Press SPACE to resume";
   }
   pause = !pause; // Toggle pause
}
});