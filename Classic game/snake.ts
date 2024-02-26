// Board variables
const blockSize: number = 25;

    //Board dimensions
const rows: number = 20;
const cols: number = 20;

    //The board (drawable region in HTML)
let board: HTMLCanvasElement;

    //Provides the 2D rendering context for the drawing surface the canvas element. 
    //Contains methods and properties that allow drawing shapes, text, images, etc. 
let context: CanvasRenderingContext2D;

// Snake variables
type cords = [number, number];
type snake = {snake_direction: "up" | "down" | "left" | "right", 
              velocityX: number,
              velocityY: number,
              has_turned: boolean,
              snake_body: Array<cords>,
              headX: number
              headY: number}

let player: snake = {snake_direction: "up", 
                     velocityX: 0, 
                     velocityY: 0, 
                     has_turned: false, 
                     snake_body: [],
                     headX: 9,
                     headY: 9}


    //Pictures of the snake's head
const HeadUp: HTMLImageElement = new Image();
const HeadDown: HTMLImageElement = new Image();
const HeadLeft: HTMLImageElement = new Image();
const HeadRight: HTMLImageElement = new Image();

    //The source for the images
HeadUp.src = "Bilder/HeadUp.png"
HeadRight.src = "Bilder/HeadRight.png"
HeadDown.src = "Bilder/HeadDown.png"
HeadLeft.src = "Bilder/HeadLeft.png"

// Food position on board
let foodX: number;
let foodY: number;

// Game logic
    //HTML div element created dynamically. Will be used to display the score of the game
const scoreCounter: HTMLDivElement = document.createElement("div");

    //Initiated score 0
let score: number = 0;

    //Game will stop when true
let GameOver: boolean = false;

//This will run once when the entire HTML document has finished loading.
window.onload = function () {

    //Retrieves the HTML element with the ID "board"
    board = document.getElementById("board") as HTMLCanvasElement;

    //Height and width of the board
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    
    //retrieves the 2D drawing context of the canvas and provides 2D drawing functions for the canvas.
    context = board.getContext("2d") as CanvasRenderingContext2D; 
    
    //Spawns the food
    spawnFood();

    //When a key is pressed down, changeDirection() will be called.
    document.addEventListener("keydown", changeDirection);

    //Frame rate and speed of snake
    setInterval(update, 1000 / 10);

    //Visuals for score counter
    scoreCounter.style.position = "absolute";
    scoreCounter.style.top = "90px";
    scoreCounter.style.left = "400px";
    scoreCounter.style.color = "white";
    scoreCounter.style.fontFamily = "Press Start 2P, monospace";
    scoreCounter.style.fontSize = "20px";

    scoreCounter.textContent = "SCORE: " + score;

    // Append the score counter element to the board container
    document.body.appendChild(scoreCounter);

    //Create reastartbutton and vishuals
    const restartButton: HTMLButtonElement = document.createElement("button");
    restartButton.textContent = "RESTART";
    restartButton.style.position = "absolute";
    restartButton.style.top = "90px";
    restartButton.style.right = "395px";
    restartButton.style.padding = "5px 10px";
    restartButton.style.fontSize = "16px";
    restartButton.style.cursor = "pointer";
    restartButton.style.color = "white";
    restartButton.style.backgroundColor = "transparent";

    //Event listener detecting click on restartbutton
    restartButton.addEventListener("click", function () {
        location.reload(); // Reload the page to restart the game
    });

    // Append the restart button element to the board container
    document.body.appendChild(restartButton);
}

//Will run every "frame"
function update(): void {

    if (GameOver) {
        
        //Creates game over text and vishuals
        const gameOver: HTMLDivElement = document.createElement("div");
        gameOver.textContent = "GAME OVER";
        gameOver.style.position = "absolute";
        gameOver.style.top = "250px";
        gameOver.style.left = "420px";
        gameOver.style.color = "white";
        gameOver.style.fontFamily = "Press Start 2P, monospace";
        gameOver.style.fontSize = "100px";

        // Append the game over text element to the board container
        document.body.appendChild(gameOver);

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
    if (player.headX == foodX && player.headY == foodY) {
        
        player.snake_body.push([foodX, foodY]);
        scoreUpdate();
        spawnFood();
    }

    // Make body follow head
    for (let i = player.snake_body.length - 1; i > 0; i--) {
        player.snake_body[i] = player.snake_body[i - 1];
    }
    if (player.snake_body.length) {
        player.snake_body[0] = [player.headX, player.headY];
    }

    // Color in the snake body
    for (let i = 0; i < player.snake_body.length; i++) {
        let color: string = gradient(i);
        context.fillStyle = color;
        context.fillRect(player.snake_body[i][0] * blockSize, 
                         player.snake_body[i][1] * blockSize, 
                         blockSize, 
                         blockSize);
    }

    // Move the head
    player.headX += player.velocityX;
    player.headY += player.velocityY;
    drawSnakeHead();

    //Set game to game over if relevant
    if (player.headX < 0 || player.headX > (cols - 1) || player.headY < 0 || player.headY > (cols - 1)) {
        GameOver = true;
    }
    for (let i = 0; i < player.snake_body.length; i++) {
        if (player.headX == player.snake_body[i][0] && player.headY == player.snake_body[i][1]) {
            GameOver = true;
        }
    }
    
    player.has_turned = false;
}

//Increases the score with a random number between 5 and 10
function scoreUpdate(): void {
    score += Math.floor(Math.random() * 5 + 5);
    scoreCounter.textContent = "SCORE: " + score;
}

//Loads the correct imiage of the snake head depending on the direction
function drawSnakeHead(): void {
    switch (player.snake_direction) {
        case "up":
            context.drawImage(HeadUp, player.headX * blockSize, 
                              player.headY * blockSize, 
                              blockSize, 
                              blockSize);
            break;
        case "down":
            context.drawImage(HeadDown, player.headX * blockSize, 
                              player.headY * blockSize, 
                              blockSize, 
                              blockSize);
            break;
        case "left":
            context.drawImage(HeadLeft, 
                              player.headX * blockSize,
                              player.headY * blockSize,
                              blockSize,
                              blockSize);
            break;
        case "right":
            context.drawImage(HeadRight,
                              player.headX * blockSize,
                              player.headY * blockSize,
                              blockSize,
                              blockSize);
            break;
    }
}

//Chnges the direction of the snake 
function changeDirection(e: KeyboardEvent): void {
    if (!player.has_turned) {
        if (e.code == "ArrowUp" && player.velocityY != 1) {
            player.snake_direction = "up";
            player.velocityX = 0;
            player.velocityY = -1;
        }
        else if (e.code == "ArrowDown" && player.velocityY != -1) {
            player.snake_direction = "down";
            player.velocityX = 0;
            player.velocityY = 1;
        }
        else if (e.code == "ArrowRight" && player.velocityX != -1) {
            player.snake_direction = "right";
            player.velocityX = 1;
            player.velocityY = 0;
        }
        else if (e.code == "ArrowLeft" && player.velocityX != 1) {
            player.snake_direction = "left";
            player.velocityX = -1;
            player.velocityY = 0;
        }
    }
    player.has_turned = true;
}

//Spawns food in random position
function spawnFood(): void {
    foodX = Math.floor(Math.random() * cols);
    foodY = Math.floor(Math.random() * rows);

    for (let i = 0; i < player.snake_body.length; i++) {
        if ((foodX == player.snake_body[i][0] && foodY == player.snake_body[i][1]) || 
            (foodX == player.headX && foodY == player.headY)) {
            spawnFood();
        }
    }
}

//Changes the gradient of the snake body
function gradient(distanceFromHead: number): string {
    let green: number = 150 - distanceFromHead * 3;
    let red: number = Math.min(100, distanceFromHead * 3);
    return `rgb(${red}, ${green}, 0)`;
}
