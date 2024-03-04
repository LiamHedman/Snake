import { snake,
         cords,
         changeDirection,
         scoreUpdate,
         spawnFood,
         ResumeGame,
         color_in_snake,
         paint_board,
         paint_menu_button,
         paint_restart_button,
         food_eaten,
         display_score,
         print_pause,
         move_snake,
         is_game_over,
         print_game_over,
         paint_food_color
        } from "../exports";
    
let interval: NodeJS.Timeout;

//Board dimensions

const blockSize: number = 25;
const rows: number = 20;
const cols: number = 20;

//The board (drawable region in HTML)
let board: HTMLCanvasElement;

//Provides the 2D rendering context for the drawing surface the canvas element. 
//Contains methods and properties that allow drawing shapes, text, images, etc. 
let context: CanvasRenderingContext2D;

let player: snake = {snake_direction: "up", 
                     velocityX: 0, 
                     velocityY: 0, 
                     has_turned: false, 
                     snake_body: [],
                     headX: 9,
                     headY: 9,
                     head_last_cords: [9, 9]};


    //Pictures of the snake's head
const HeadUp: HTMLImageElement = new Image();
const HeadDown: HTMLImageElement = new Image();
const HeadLeft: HTMLImageElement = new Image();
const HeadRight: HTMLImageElement = new Image();

    //The source for the images
HeadUp.src = "../Bilder/HeadUp.png"
HeadRight.src = "../Bilder/HeadRight.png"
HeadDown.src = "../Bilder/HeadDown.png"
HeadLeft.src = "../Bilder/HeadLeft.png"

// Food position on board
let foodX: number;
let foodY: number;

let blue_foodX: number; 
let blue_foodY: number; 

let yellow_foodX: number; 
let yellow_foodY: number; 

let orange_foodX: number; 
let orange_foodY: number;

let green_foodX: number;
let green_foodY: number;

let purple_foodX: number;
let purple_foodY: number;

// HTML div element created dynamically. Will be used to display the score of the game
const scoreCounter: HTMLDivElement = document.createElement("div");

// Create reastartbutton and visuals
const restartButton: HTMLButtonElement = document.createElement("button");

// Create menu button
const menuButton: HTMLButtonElement = document.createElement("button");

// Create pause menu
const PauseMenu: HTMLDivElement = document.createElement("div");

// Initiated score 0
let score: number = 0;

// Game will stop when true
    let dead: boolean = false;

    let pause: boolean = false;

/**
 * This will run once when the entire HTML document has finished loading.  
 *
 * no input or output
 */ 
const onload = function() {

    //Retrieves the HTML element with the ID "board"
    board = document.getElementById("board") as HTMLCanvasElement;

    //Height and width of the board
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    
    //retrieves the 2D drawing context of the canvas and provides 2D drawing functions for the canvas.
    context = board.getContext("2d") as CanvasRenderingContext2D; 
    
    //Spawns the food
    [foodX, foodY] = spawnFood(player, cols, rows);
    [blue_foodX, blue_foodY] = spawnFood(player, cols, rows);
    [yellow_foodX, yellow_foodY] = spawnFood(player, cols, rows);
    [orange_foodX, orange_foodY] = spawnFood(player, cols, rows);
    [green_foodX, green_foodY] = spawnFood(player, cols, rows);
    [purple_foodX, purple_foodY] = spawnFood(player, cols, rows);

    //When a key is pressed down, changeDirection() will be called.
    document.addEventListener("keydown", (e: KeyboardEvent) => {
        changeDirection(e, player); // Passing both the event and the player object
    });

    //Frame rate and speed of snake if not paused
    interval = setInterval(update, 1000 / 10);

    display_score(scoreCounter, score);

    paint_restart_button(restartButton);

    PauseMenu.innerText = "Press SPACE to pause";
    print_pause(PauseMenu);


    //Event listener detecting click on restartbutton
    restartButton.addEventListener("click", function () {
        location.reload(); // Reload the page to restart the game
    });

    paint_menu_button(menuButton);

    // Event listener for menu
    menuButton.addEventListener("click", function () {
        window.location.href = "../index.html";
    });
}
window.onload = onload;

// Will run every "frame"
function update(): void {
    //Game does not update when paused
    if (pause) {
        return;
    }

    if (dead) {
        print_game_over(document, interval);
        return;
    }
    
    paint_board(board, context);

    paint_food_color(blockSize, foodX, foodY, "red", context);
    paint_food_color(blockSize, blue_foodX, blue_foodY, "blue", context);
    paint_food_color(blockSize, yellow_foodX, yellow_foodY, "yellow", context);
    paint_food_color(blockSize, orange_foodX, orange_foodY, "orange", context);
    paint_food_color(blockSize, green_foodX, green_foodY, "green", context);
    paint_food_color(blockSize, purple_foodX, purple_foodY, "purple", context);



    if (food_eaten(player, foodX, foodY)) {
        score = scoreUpdate(scoreCounter, score);
        [foodX, foodY] = spawnFood(player, cols, rows);
    }

    if (food_eaten(player, blue_foodX, blue_foodY)) {
        score = scoreUpdate(scoreCounter, score);
        [blue_foodX, blue_foodY] = spawnFood(player, cols, rows);
    }

    if (food_eaten(player, yellow_foodX, yellow_foodY)) {
        score = scoreUpdate(scoreCounter, score);
        [yellow_foodY, yellow_foodY] = spawnFood(player, cols, rows);
    }

    if (food_eaten(player, orange_foodX, orange_foodY)) {
        score = scoreUpdate(scoreCounter, score);
        [orange_foodX, orange_foodY] = spawnFood(player, cols, rows);
    }
    
    if (food_eaten(player, green_foodX, green_foodY)) {
        score = scoreUpdate(scoreCounter, score);
        [green_foodX, green_foodY] = spawnFood(player, cols, rows);
    }

    if (food_eaten(player, purple_foodX, purple_foodY)) {
        score = scoreUpdate(scoreCounter, score);
        [purple_foodX, purple_foodY] = spawnFood(player, cols, rows);
    }

    move_snake(player,
               context,
               HeadUp,
               HeadDown,
               HeadLeft,
               HeadRight,
               blockSize,);

    color_in_snake(context, player, blockSize);

    dead = is_game_over(player, rows, cols);
    
    player.has_turned = false;
}

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
       if (pause) {
           interval = setInterval(update, 1000 / 10);
           PauseMenu.innerText= "Press SPACE to pause";
       } 
       else {
           clearInterval(interval);
           PauseMenu.innerText= "Press SPACE to resume";
       }
       pause = !pause; // Toggle pause
    }
    });