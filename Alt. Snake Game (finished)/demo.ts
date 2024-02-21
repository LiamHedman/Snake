// Board
const blockSize: number = 25;
const rows: number = 20;
const cols: number = 20;
let board: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

// Snake head
let snakeDirection: string = "up";
let snakeX: number = blockSize * 9;
let snakeY: number = blockSize * 9;

let velocityX: number = 0;
let velocityY: number = 0;

// Snake body
const snakebody: [number, number][] = [];

// Food
let foodX: number;
let foodY: number;

// Game logic
const scoreCounter: HTMLDivElement = document.createElement("div");
let score: number = 0;
let hasTurned: boolean = true;
let GameOver: boolean = false;

const HeadUp: HTMLImageElement = new Image();
const HeadDown: HTMLImageElement = new Image();
const HeadLeft: HTMLImageElement = new Image();
const HeadRight: HTMLImageElement = new Image();

HeadUp.src = "Bilder/HeadUp.png"
HeadRight.src = "Bilder/HeadRight.png"
HeadDown.src = "Bilder/HeadDown.png"
HeadLeft.src = "Bilder/HeadLeft.png"

window.onload = function () {
    board = document.getElementById("board") as HTMLCanvasElement;
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // Draws on the board

    spawnFood();
    if (hasTurned) {
        hasTurned = false;
        document.addEventListener("keydown", changeDirection);
    }
    setInterval(update, 1000 / 10);

    scoreCounter.style.position = "absolute";
    scoreCounter.style.top = "90px";
    scoreCounter.style.left = "400px";
    scoreCounter.style.color = "white";
    scoreCounter.style.fontFamily = "Press Start 2P, monospace";
    scoreCounter.style.fontSize = "20px";

    scoreCounter.textContent = "SCORE: " + score;

    // Append the score counter element to the board container
    document.body.appendChild(scoreCounter);

    const restartButton: HTMLButtonElement = document.createElement("button");
    restartButton.textContent = "RESTART";
    restartButton.style.position = "absolute";
    restartButton.style.top = "90px";
    restartButton.style.right = "395px";
    restartButton.style.padding = "5px 10px";
    restartButton.style.fontSize = "16px";
    restartButton.style.cursor = "pointer";
    restartButton.style.color = "white";
    restartButton.style.backgroundColor = "transparent"; // Set background color to transparent

    restartButton.addEventListener("click", function () {
        location.reload(); // Reload the page to restart the game
    });

    document.body.appendChild(restartButton);
}

function update(): void {
    if (GameOver) {
        const gameOver: HTMLDivElement = document.createElement("div");
        gameOver.textContent = "GAME OVER";
        gameOver.style.position = "absolute";
        gameOver.style.top = "250px";
        gameOver.style.left = "420px";
        gameOver.style.color = "white";
        gameOver.style.fontFamily = "Press Start 2P, monospace";
        gameOver.style.fontSize = "100px";

        document.body.appendChild(gameOver);

        return;
    }

    // Make the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height)

    // Paint the food
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

    // Paint snake body
    for (let i = 0; i < snakebody.length; i++) {
        let color: string = gradient(i);
        context.fillStyle = color;
        context.fillRect(snakebody[i][0], snakebody[i][1], blockSize, blockSize);
    }

    // Paint snake head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    drawSnakeHead();

    if (snakeX < 0 || snakeX > (cols - 1) * blockSize || snakeY < 0 || snakeY > (cols - 1) * blockSize) {
        GameOver = true;
        alert("Game over: Out of bounds!");
    }
    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            GameOver = true;
            alert("Game over: Collided with body!");
        }
    }
    hasTurned = true;
}

function scoreUpdate(): void {
    score += Math.floor(Math.random() * 5 + 5);
    scoreCounter.textContent = "SCORE: " + score;
}

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

function changeDirection(e: KeyboardEvent): void {
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

function spawnFood(): void {
    foodX = Math.floor(Math.random() * cols) * blockSize + blockSize / 2;
    foodY = Math.floor(Math.random() * rows) * blockSize + blockSize / 2;
    for (let i = snakebody.length; i > 0; i--) {
        if (foodX == snakebody[i][0] && foodY == snakebody[i][1] || foodX == snakeX && foodY == snakeY) {
            spawnFood();
        }
    }
}

function gradient(distanceFromHead: number): string {
    let green: number = 150 - distanceFromHead * 3;
    let red: number = Math.min(100, distanceFromHead * 3);
    return `rgb(${red}, ${green}, 0)`;
}
