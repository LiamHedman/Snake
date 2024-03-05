import { snake,
         cords,
         change_direction,
         score_update,
         spawn_food,
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

const block_size: number = 25;
const rows: number = 20;
const cols: number = 20;

//The board (drawable region in HTML)
let board: HTMLCanvasElement;

//Provides the 2D rendering context for the drawing surface the canvas element. 
//Contains methods and properties that allow drawing shapes, text, images, etc. 
let context: CanvasRenderingContext2D;

let player: snake = {snake_direction: "up", 
                     velocity_x: 0, 
                     velocity_y: 0, 
                     has_turned: false, 
                     snake_body: [],
                     head_x: 9,
                     head_y: 9,
                     head_last_cords: [9, 9]};


    //Pictures of the snake's head
const head_up: HTMLImageElement = new Image();
const head_down: HTMLImageElement = new Image();
const head_left: HTMLImageElement = new Image();
const head_right: HTMLImageElement = new Image();

    //The source for the images
head_up.src = "../Bilder/HeadUp.png"
head_right.src = "../Bilder/HeadRight.png"
head_down.src = "../Bilder/HeadDown.png"
head_left.src = "../Bilder/HeadLeft.png"

// Food position on board
let food_x: number;
let food_y: number;

let blue_food_x: number; 
let blue_food_y: number; 

let yellow_food_x: number; 
let yellow_food_y: number; 

let orange_food_x: number; 
let orange_food_y: number;

let green_food_x: number;
let green_food_y: number;

let purple_food_x: number;
let purple_food_y: number;

// HTML div element created dynamically. Will be used to display the score of the game
const score_counter: HTMLDivElement = document.createElement("div");

// Create reastartbutton and visuals
const restart_button: HTMLButtonElement = document.createElement("button");

// Create menu button
const menu_button: HTMLButtonElement = document.createElement("button");

// Create pause menu
const pause_menu: HTMLDivElement = document.createElement("div");

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
    board.height = rows * block_size;
    board.width = cols * block_size;
    
    //retrieves the 2D drawing context of the canvas and provides 2D drawing functions for the canvas.
    context = board.getContext("2d") as CanvasRenderingContext2D; 
    
    //Spawns the food
    [food_x, food_y] = spawn_food(player, cols, rows);
    [blue_food_x, blue_food_y] = spawn_food(player, cols, rows);
    [yellow_food_x, yellow_food_y] = spawn_food(player, cols, rows);
    [orange_food_x, orange_food_y] = spawn_food(player, cols, rows);
    [green_food_x, green_food_y] = spawn_food(player, cols, rows);
    [purple_food_x, purple_food_y] = spawn_food(player, cols, rows);

    //When a key is pressed down, change_direction() will be called.
    document.addEventListener("keydown", (e: KeyboardEvent) => {
        change_direction(e, player); // Passing both the event and the player object
    });

    //Frame rate and speed of snake if not paused
    interval = setInterval(update, 1000 / 10);

    display_score(score_counter, score);

    paint_restart_button(restart_button);

    pause_menu.innerText = "Press SPACE to pause";
    print_pause(pause_menu);


    //Event listener detecting click on restart_button
    restart_button.addEventListener("click", function () {
        location.reload(); // Reload the page to restart the game
    });

    paint_menu_button(menu_button);

    // Event listener for menu
    menu_button.addEventListener("click", function () {
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

    paint_food_color(block_size, food_x, food_y, "red", context);
    paint_food_color(block_size, blue_food_x, blue_food_y, "blue", context);
    paint_food_color(block_size, yellow_food_x, yellow_food_y, "yellow", context);
    paint_food_color(block_size, orange_food_x, orange_food_y, "orange", context);
    paint_food_color(block_size, green_food_x, green_food_y, "green", context);
    paint_food_color(block_size, purple_food_x, purple_food_y, "purple", context);



    if (food_eaten(player, food_x, food_y)) {
        score = score_update(score_counter, score);
        [food_x, food_y] = spawn_food(player, cols, rows);
    }

    if (food_eaten(player, blue_food_x, blue_food_y)) {
        score = score_update(score_counter, score);
        [blue_food_x, blue_food_y] = spawn_food(player, cols, rows);
    }

    if (food_eaten(player, yellow_food_x, yellow_food_y)) {
        score = score_update(score_counter, score);
        [yellow_food_y, yellow_food_y] = spawn_food(player, cols, rows);
    }

    if (food_eaten(player, orange_food_x, orange_food_y)) {
        score = score_update(score_counter, score);
        [orange_food_x, orange_food_y] = spawn_food(player, cols, rows);
    }
    
    if (food_eaten(player, green_food_x, green_food_y)) {
        score = score_update(score_counter, score);
        [green_food_x, green_food_y] = spawn_food(player, cols, rows);
    }

    if (food_eaten(player, purple_food_x, purple_food_y)) {
        score = score_update(score_counter, score);
        [purple_food_x, purple_food_y] = spawn_food(player, cols, rows);
    }

    move_snake(player,
               context,
               head_up,
               head_down,
               head_left,
               head_right,
               block_size,);

    color_in_snake(context, player, block_size);

    dead = is_game_over(player, rows, cols);
    
    player.has_turned = false;
}

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
       if (pause) {
           interval = setInterval(update, 1000 / 10);
           pause_menu.innerText= "Press SPACE to pause";
       } 
       else {
           clearInterval(interval);
           pause_menu.innerText= "Press SPACE to resume";
       }
       pause = !pause; // Toggle pause
    }
    });