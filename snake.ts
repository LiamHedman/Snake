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
let snakeDirection: string = "up";
let has_turned: boolean = false;

    //Snake head
let snakeX: number = blockSize * 9;
let snakeY: number = blockSize * 9;

    //Snake body (array of coordinates)
const snakebody: [number, number][] = [];

    //Directional movement of snake
let velocityX: number = 0;
let velocityY: number = 0;

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
    context.arc(foodX, foodY, blockSize / 2, 0, Math.PI * 2);
    context.fill();

    // Eat the food
    if (snakeX == foodX - blockSize / 2 && snakeY == foodY - blockSize / 2) {
        snakebody.push([foodX, foodY]);
        scoreUpdate();
        spawnFood();
    }

    // Make body follow head
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    if (snakebody.length) {
        snakebody[0] = [snakeX, snakeY];
    }

    // Color in the snake body
    for (let i = 0; i < snakebody.length; i++) {
        let color: string = gradient(i);
        context.fillStyle = color;
        context.fillRect(snakebody[i][0], snakebody[i][1], blockSize, blockSize);
    }

    // Color in the snake head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    drawSnakeHead();

    //Set game to game over if relevant
    if (snakeX < 0 || snakeX > (cols - 1) * blockSize || snakeY < 0 || snakeY > (cols - 1) * blockSize) {
        GameOver = true;
    }
    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            GameOver = true;
        }
    }
    
    has_turned = false;
}

//Increases the score with a random number between 5 and 10
function scoreUpdate(): void {
    score += Math.floor(Math.random() * 5 + 5);
    scoreCounter.textContent = "SCORE: " + score;
}

//Loads the correct imiage of the snake head depending on the direction
function drawSnakeHead(): void {
    switch (snakeDirection) {
        case "up":
            context.drawImage(HeadUp, snakeX, snakeY, blockSize, blockSize);
            break;
        case "down":
            context.drawImage(HeadDown, snakeX, snakeY, blockSize, blockSize);
            break;
        case "left":
            context.drawImage(HeadLeft, snakeX, snakeY, blockSize, blockSize);
            break;
        case "right":
            context.drawImage(HeadRight, snakeX, snakeY, blockSize, blockSize);
            break;
    }
}

//Chnges the direction of the snake 
function changeDirection(e: KeyboardEvent): void {
    if (!has_turned) {
        if (e.code == "ArrowUp" && velocityY != 1) {
            snakeDirection = "up";
            velocityX = 0;
            velocityY = -1;
        }
        else if (e.code == "ArrowDown" && velocityY != -1) {
            snakeDirection = "down";
            velocityX = 0;
            velocityY = 1;
        }
        else if (e.code == "ArrowRight" && velocityX != -1) {
            snakeDirection = "right";
            velocityX = 1;
            velocityY = 0;
        }
        else if (e.code == "ArrowLeft" && velocityX != 1) {
            snakeDirection = "left";
            velocityX = -1;
            velocityY = 0;
        }
    }
    has_turned = true;
}

//Spawns food in random position
function spawnFood(): void {
    foodX = Math.floor(Math.random() * cols) * blockSize + blockSize / 2;
    foodY = Math.floor(Math.random() * rows) * blockSize + blockSize / 2;
    for (let i = snakebody.length; i > 0; i--) {
        if (foodX == snakebody[i][0] && foodY == snakebody[i][1] || foodX == snakeX && foodY == snakeY) {
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
