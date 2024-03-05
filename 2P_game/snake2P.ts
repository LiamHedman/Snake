import { snake,
         cords,
         change_direction_2p,
         spawn_food,
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
const block_size: number = 25;

//Board dimensions
const rows: number = 20;
const cols: number = 20;

const restart_button: HTMLButtonElement = document.createElement("button");
const menu_button: HTMLButtonElement = document.createElement("button");

//The board (drawable region in HTML)
let board: HTMLCanvasElement;

// Provides the 2D rendering context
// for the drawing surface the canvas element.
// Contains methods and properties that allow
// drawing shapes, text, images, etc.
let context: CanvasRenderingContext2D;

// Pause Menu
const pause_menu: HTMLDivElement = document.createElement("div");

let pause = false;

let player1: snake = {snake_direction: "right",
                velocity_x: 0,
                velocity_y: 0,
                has_turned: false,
                snake_body: [],
                head_x: 0,
                head_y: 0,
                head_last_cords: [0, 0]}

let player2: snake = {snake_direction: "left",
                velocity_x: 0,
                velocity_y: 0,
                has_turned: false,
                snake_body: [],
                head_x: 19,
                head_y: 0,
                head_last_cords: [19, 0]}

//Pictures of the snake's head
const head_up: HTMLImageElement = new Image();
const head_down: HTMLImageElement = new Image();
const head_left: HTMLImageElement = new Image();
const head_right: HTMLImageElement = new Image();

const head_up_red: HTMLImageElement = new Image();
const head_down_red: HTMLImageElement = new Image();
const head_left_red: HTMLImageElement = new Image();
const head_right_red: HTMLImageElement = new Image();

//The source for the images
head_up.src = "../Bilder/HeadUp.png"
head_right.src = "../Bilder/HeadRight.png"
head_down.src = "../Bilder/HeadDown.png"
head_left.src = "../Bilder/HeadLeft.png"

head_up_red.src = "../Bilder/HeadUp(red).png"
head_right_red.src = "../Bilder/HeadRight(red).png"
head_down_red.src = "../Bilder/HeadDown(red).png"
head_left_red.src = "../Bilder/HeadLeft(red).png"

// Food position on board
let food_x: number;
let food_y: number;

// Game logic
//Game will stop when true
let game_over: boolean = false;

let tie: boolean = false;

/**
 * This will run once when the entire HTML document has finished loading.
 *
 * no input or output
 */
const onload = function() {
   //Retrieves the HTML element with the ID "board"
   board = document.getElementById("board") as HTMLCanvasElement;

   //Height, width and style of the baord
   board.height = rows * block_size;
   board.width = cols * block_size;

   // retrieves the 2D drawing context of the canvas and provides 2D
   // drawing functions for the canvas.
   context = board.getContext("2d") as CanvasRenderingContext2D;

   //Spawns the food
   [food_x, food_y] = spawn_food(player1, rows, cols);

   //When a key is pressed down, change_direction_(2p) will be called.
   document.addEventListener("keydown", (e: KeyboardEvent) => {
      change_direction_2p(e, player1, player2); // Passing both the event and
                                                // the player object
   });


   //Frame rate and speed of snake
   interval = setInterval(update_2p, 1000 / 10);

   paint_restart_button(restart_button);

   // Append the restart button element to the board container
   document.body.appendChild(restart_button);

   pause_menu.innerText = "Press SPACE to pause";
   print_pause(pause_menu);

   //Event listener detecting click on restart_button
   restart_button.addEventListener("click", function () {
      location.reload(); // Reload the page to restart the game
   });

   paint_menu_button(menu_button);

   menu_button.addEventListener("click", function () {
      window.location.href = "../index.html";
   });

   // Append the restart button element to the board container
   document.body.appendChild(restart_button);
}
window.onload = onload;

/**
* The main function that runs every tick/frame
*
* Has no input or ouput
*/
function update_2p(): void {
//Game does not update when paused
if (pause) {
   return;
}

if (game_over) {
   print_game_over(document, interval);
   return;
}

paint_board(board, context);

paint_food(block_size, food_x, food_y, context);

// Eat the food
if (food_eaten(player1, food_x, food_y)) {
   [food_x, food_y] = spawn_food(player1, cols, rows);
} else if (food_eaten(player2, food_x, food_y)) {
   [food_x, food_y] = spawn_food(player2, cols, rows);
}

move_snake(player1,
          context,
          head_up,
          head_down,
          head_left,
          head_right,
          block_size);

          move_snake(player2,
           context,
           head_up_red,
           head_down_red,
           head_left_red,
           head_right_red,
           block_size);


// Color in the snakes' bodies
color_in_snake(context, player1, block_size);
color_in_snake_red(context, player2, block_size);

draw_snake_head2P(player1,
                 player2,
                 context,
                 head_up,
                 head_down,
                 head_left,
                 head_right,
                 head_up_red,
                 head_down_red,
                 head_left_red,
                 head_right_red,
                 block_size)

draw_snake_head2P(player1,
                 player2,
                 context,
                 head_up,
                 head_down,
                 head_left,
                 head_right,
                 head_up_red,
                 head_down_red,
                 head_left_red,
                 head_right_red,
                 block_size);

// Checks for tie
if (player1.head_last_cords == player2.head_last_cords ||
   player1.head_x == player2.head_x && player1.head_y == player2.head_y ||
   player1.head_last_cords[0] == player2.head_x &&
      player1.head_last_cords[1] == player2.head_y ||
   player2.head_last_cords[0] == player1.head_x &&
      player2.head_last_cords[1] == player1.head_y ||
   player1.head_last_cords == player2.snake_body[1] ||
   player2.head_last_cords == player1.snake_body[1]) {
       winner = "tie";
       game_over = true;
   }

// Checks if player 1 collides with wall
if (player1.head_x < 0 ||
   player1.head_x > (cols - 1) ||
   player1.head_y < 0 ||
   player1.head_y > (cols - 1)) {
   winner = "player2"
   game_over = true;
}
// Checks if player1 collides with themselves, or with the player 2
for (let i = 0; i < player1.snake_body.length; i++) {
   if (player1.head_x == player1.snake_body[i][0] &&
         player1.head_y == player1.snake_body[i][1]) {
       winner = "player2"
       game_over = true;
   }
}
for (let i = 0; i < player2.snake_body.length; i++) {
   if (player1.head_x == player2.snake_body[i][0] &&
         player1.head_y == player2.snake_body[i][1]) {
       winner = "player2";
       game_over = true;
   }
}

// Checks if player2 collides with wall
if (player2.head_x < 0 ||
    player2.head_x > (cols - 1) ||
    player2.head_y < 0 ||
    player2.head_y > (cols - 1)) {
   winner = "player1"
   game_over = true;
}
// Checks if player1 collides with themselves, or with the player 2
for (let i = 0; i < player2.snake_body.length; i++) {
   if (player2.head_x == player2.snake_body[i][0] &&
         player2.head_y == player2.snake_body[i][1]) {
       winner = "player1"
       game_over = true;
   }
}
for (let i = 0; i < player1.snake_body.length; i++) {
   if (player2.head_x == player1.snake_body[i][0] &&
         player2.head_y == player1.snake_body[i][1]) {
       winner = "player1";
       game_over = true;
   }
}

player1.head_last_cords = [player1.head_x, player1.head_y];
player2.head_last_cords = [player2.head_x, player2.head_y];

player1.has_turned = false;
player2.has_turned = false;
}
//Checks and executes pause
window.addEventListener("keydown", (event) => {
if (event.code === "Space") {
   if (pause) {
       // Resume game if paused
       interval = setInterval(update_2p, 1000 / 10);
       pause_menu.innerText= "Press SPACE to pause";
   }
   else {
       clearInterval(interval);
       pause_menu.innerText= "Press SPACE to resume";
   }
   pause = !pause; // Toggle pause
}
});