import { snake,
         cords,
         changeDirection2P,
         spawnFood,
         ResumeGame,
         color_in_snake,
         paint_food,
         gradient,
         red_gradient,
         paint_menu_button,
         tie_check,
         draw_snake_head2P,
         print_game_over,
         print_pause,
         PauseGame,
        
        } from "../exports";

let interval: NodeJS.Timeout;
let winner: "player1" | "player2" | "tie" | "none" = "none";

// Board variables
const blockSize: number = 25;

    //Board dimensions
const rows: number = 20;
const cols: number = 20;
const menuButton: HTMLButtonElement = document.createElement("button");

    //The board (drawable region in HTML)
let board: HTMLCanvasElement;

    //Provides the 2D rendering context for the drawing surface the canvas element. 
    //Contains methods and properties that allow drawing shapes, text, images, etc. 
let context: CanvasRenderingContext2D;


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
    board.style.display = "block";
    board.style.marginLeft = "auto";
    board.style.marginRight = "auto";
    
    //retrieves the 2D drawing context of the canvas and provides 2D drawing functions for the canvas.
    context = board.getContext("2d") as CanvasRenderingContext2D; 
    
    //Spawns the food
    spawnFood(player1, rows, cols);

    //When a key is pressed down, changeDirection2P() will be called.
    document.addEventListener("keydown", (e: KeyboardEvent) => {
        changeDirection2P(e, player1, player2); // Passing both the event and the player object
    });

    //Frame rate and speed of snake
    interval = setInterval(update2P, 1000 / 10);

    //Create reastartbutton and vishuals
    const restartButton: HTMLButtonElement = document.createElement("button");
    restartButton.textContent = "RESTART";
    restartButton.style.position = "relative";
    restartButton.style.top = "-492.5px";
    restartButton.style.right = "-180px";
    restartButton.style.padding = "5px 10px";
    restartButton.style.fontSize = "16px";
    restartButton.style.cursor = "pointer";
    restartButton.style.color = "white";
    restartButton.style.backgroundColor = "transparent";

    // Append the restart button element to the board container
    document.body.appendChild(restartButton);

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

//Will run every "frame"
function update2P(): void {
    if (GameOver || tie) {
        
        //Creates game over text and vishuals
        const gameOver: HTMLDivElement = document.createElement("div");
        if (winner == "player1") {
            gameOver.textContent ="Player one wins!";
        } else if (winner == "player2") {
            gameOver.textContent ="Player two wins!";
        } else if (winner == "tie") {
            gameOver.textContent = winner;
        }
        gameOver.style.position = "relative";
        gameOver.style.top = "-345px";
        gameOver.style.left = "0";
        gameOver.style.color = "white";
        gameOver.style.fontFamily = "Press Start 2P, monospace";
        gameOver.style.fontSize = "70px";

        // Append the game over text element to the board container
        document.body.appendChild(gameOver);
        
        clearInterval(interval)

        //Stops the game loop
        return;
    }

    // Color in the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height)

    // Color in the food
    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX * blockSize + blockSize / 2,
                foodY * blockSize + blockSize / 2, 
                blockSize / 2,
                0,
                Math.PI * 2);
    context.fill();

    // Eat the food
    if (player1.headX == foodX && player1.headY == foodY) {
        player1.snake_body.push([foodX, foodY]);
        spawnFood(player1, cols, rows);
    } else if (player2.headX == foodX && player2.headY == foodY) {
        player2.snake_body.push([foodX, foodY]);
        spawnFood(player2, cols, rows);
    }

    // Make body follow head
    for (let i = player1.snake_body.length - 1; i > 0; i--) {
        player1.snake_body[i] = player1.snake_body[i - 1];
    }
    if (player1.snake_body.length) {
        player1.snake_body[0] = [player1.headX, player1.headY];
    }

    for (let i = player2.snake_body.length - 1; i > 0; i--) {
        player2.snake_body[i] = player2.snake_body[i - 1];
    }
    if (player2.snake_body.length) {
        player2.snake_body[0] = [player2.headX, player2.headY];
    }

    // Color in the snake body
    for (let i = 0; i < player1.snake_body.length; i++) {
        let color: string = gradient(i);
        context.fillStyle = color;
        context.fillRect(player1.snake_body[i][0] * blockSize, 
                         player1.snake_body[i][1] * blockSize, 
                         blockSize, 
                         blockSize);
    }
    for (let i = 0; i < player2.snake_body.length; i++) {
        let color: string = red_gradient(i);
        context.fillStyle = color;
        context.fillRect(player2.snake_body[i][0] * blockSize, 
                         player2.snake_body[i][1] * blockSize, 
                         blockSize, 
                         blockSize);
    }

    // Move the head
    player1.headX += player1.velocityX;
    player1.headY += player1.velocityY;
    player2.headX += player2.velocityX;
    player2.headY += player2.velocityY;
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
    
    //Checks for tie 
    tie = tie_check(player1, player2);

    player1.head_last_cords = [player1.headX, player1.headY];
    player2.head_last_cords = [player2.headX, player2.headY];
    
    player1.has_turned = false;
    player2.has_turned = false;
}