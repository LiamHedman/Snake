
//Board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake head
var snakeDirection = "up";
var snakeX = blockSize * 9;
var snakeY = blockSize * 9;

var velocityX = 0;
var velocityY = 0;

//Snake body
var snakebody = [];

//Food
var foodX;
var foodY;

//Game logic
var scoreCounter = document.createElement("div");
var score = 0;
var hasTurned = true;
var gameOver = false;

var HeadUp = new Image();
var HeadDown = new Image();
var HeadLeft = new Image();
var HeadRight = new Image();

HeadUp.src = "Bilder/HeadUp.png"
HeadRight.src = "Bilder/HeadRight.png"
HeadDown.src = "Bilder/HeadDown.png"
HeadLeft.src = "Bilder/HeadLeft.png"

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //Draws on the board

    spawnFood();
    if (hasTurned){
        hasTurned = false;
        document.addEventListener("keydown", changeDirection);
    }
    setInterval(update, 1000/10);

    scoreCounter.style.position = "absolute";
    scoreCounter.style.top = "90px";
    scoreCounter.style.left = "400px";
    scoreCounter.style.color = "white";
    scoreCounter.style.fontFamily = "Press Start 2P, monospace";
    scoreCounter.style.fontSize = "20px";
    
    scoreCounter.textContent = "SCORE: " + score;

    // Append the score counter element to the board container
    document.body.appendChild(scoreCounter);

    var restartButton = document.createElement("button");
    restartButton.textContent = "RESTART";
    restartButton.style.position = "absolute";
    restartButton.style.top = "90px";
    restartButton.style.right = "395px";
    restartButton.style.padding = "5px 10px";
    restartButton.style.fontSize = "16px";
    restartButton.style.cursor = "pointer";
    restartButton.style.color = "white";
    restartButton.style.backgroundColor = "transparent"; // Set background color to transparent


    restartButton.addEventListener("click", function() {
        location.reload(); // Reload the page to restart the game
    });

    document.body.appendChild(restartButton);
}

function update() {
    if (gameOver) {
        return;
    }

    //Make the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height)

    //Paint the food
    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX, foodY, blockSize / 2, 0, Math.PI * 2);
    context.fill();

    //Eat the food
    if (snakeX == foodX - blockSize / 2 && snakeY == foodY - blockSize / 2) {
        snakebody.push([foodX, foodY]);
        scoreUpdate();
        spawnFood();
    }

    //Make body follow head
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    if (snakebody.length) {
        snakebody[0] = [snakeX, snakeY];
    }

    //Paint snake body
    for (let i = 0; i < snakebody.length; i++) {
        let color = gradient(i);
        context.fillStyle = color;
        context.fillRect(snakebody[i][0], snakebody[i][1], blockSize, blockSize);
    }

    //Paint snake head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    drawSnakeHead();

    /**
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    */

    if (snakeX < 0 || snakeX > (cols - 1) * blockSize || snakeY < 0 || snakeY > (cols - 1) * blockSize) {
        gameOver = true;
        alert("Game over: Out of bounds!");
    }
    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            gameOver = true;
            alert("Game over: Collided with body!");
        }
    }
    hasTurned = true;
}

function scoreUpdate() {
    score += Math.floor(Math.random() * 5 + 5);
    scoreCounter.textContent = "SCORE: " + score;
}

function drawSnakeHead() {
    switch(snakeDirection) {
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

function changeDirection(e) {
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

function spawnFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize + blockSize / 2;
    foodY = Math.floor(Math.random() * rows) * blockSize + blockSize / 2;
    for (let i = snakebody.length; i > 0; i--) {
        if (foodX == snakebody[i][0] && foodY == snakebody[i][1] || foodX == snakeX && foodY == snakeY) {
            spawnFood();
        }
    }
}

function gradient(distanceFromHead) {
    let green = 150 - distanceFromHead * 3;
    let red = Math.min(100, distanceFromHead * 3);
    return `rgb(${red}, ${green}, 0)`;
}