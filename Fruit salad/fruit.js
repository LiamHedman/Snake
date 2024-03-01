var interval;
var frameCount = 0;
// Board variables
var blockSize = 25;
//Board dimensions
var rows = 20;
var cols = 20;
//The board (drawable region in HTML)
var board;
//Provides the 2D rendering context for the drawing surface the canvas element. 
//Contains methods and properties that allow drawing shapes, text, images, etc. 
var context;
var player = { snake_direction: "up",
    velocityX: 0,
    velocityY: 0,
    has_turned: false,
    snake_body: [],
    headX: 9,
    headY: 9 };
//Pictures of the snake's head
var HeadUp = new Image();
var HeadDown = new Image();
var HeadLeft = new Image();
var HeadRight = new Image();
//The source for the images
HeadUp.src = "../Bilder/HeadUp.png";
HeadRight.src = "../Bilder/HeadRight.png";
HeadDown.src = "../Bilder/HeadDown.png";
HeadLeft.src = "../Bilder/HeadLeft.png";
// Food position on board
var red_food_x;
var red_food_y;
//Fast food
var fast_food_x;
var fast_food_y;
// Game logic
//HTML div element created dynamically. Will be used to display the score of the game
var scoreCounter = document.createElement("div");
//Initiated score 0
var score = 0;
//Game will stop when true
var GameOver = false;
//This will run once when the entire HTML document has finished loading.
window.onload = function () {
    //Retrieves the HTML element with the ID "board"
    board = document.getElementById("board");
    //Height and width of the board
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    //retrieves the 2D drawing context of the canvas and provides 2D drawing functions for the canvas.
    context = board.getContext("2d");
    //Spawns the food
    spawnFood("red");
    spawnFood("fast");
    //When a key is pressed down, changeDirection() will be called.
    document.addEventListener("keydown", changeDirection);
    //Frame rate and speed of snake
    interval = setInterval(update, 1000 / 10);
    //Visuals for score counter
    scoreCounter.style.position = "relative";
    scoreCounter.style.top = "0";
    scoreCounter.style.left = "0";
    scoreCounter.style.color = "black";
    scoreCounter.style.fontFamily = "Press Start 2P, monospace";
    scoreCounter.style.fontSize = "20px";
    scoreCounter.textContent = "SCORE: " + score;
    // Append the score counter element to the board container
    document.body.appendChild(scoreCounter);
    //Create reastartbutton and vishuals
    var restartButton = document.createElement("button");
    restartButton.textContent = "RESTART";
    restartButton.style.position = "relative";
    restartButton.style.top = "-520px";
    restartButton.style.right = "-180px";
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
};
//Will run every "frame"
function update() {
    if (frameCount === 10) {
        clearInterval(interval);
        interval = setInterval(update, 1000 / 10);
    }
    if (GameOver) {
        clearInterval(interval); // Stop the game loop
        //Creates game over text and vishuals
        var gameOver = document.createElement("div");
        gameOver.textContent = "GAME OVER";
        gameOver.style.position = "relative";
        gameOver.style.top = "-380px";
        gameOver.style.left = "0";
        gameOver.style.color = "white";
        gameOver.style.fontFamily = "Press Start 2P, monospace";
        gameOver.style.fontSize = "100px";
        // Append the game over text element to the board container
        document.body.appendChild(gameOver);
        return;
    }
    // Color in the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height);
    // Color in red food
    context.fillStyle = "red";
    context.beginPath();
    context.arc(red_food_x * blockSize + blockSize / 2, red_food_y * blockSize + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(fast_food_x * blockSize + blockSize / 2, fast_food_y * blockSize + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();
    // Eat red food
    if (player.headX == red_food_x && player.headY == red_food_y) {
        player.snake_body.push([red_food_x, red_food_y]);
        scoreUpdate();
        spawnFood("red");
    }
    // Eat fast food
    if (player.headX == fast_food_x && player.headY == fast_food_y) {
        player.snake_body.push([fast_food_x, fast_food_y]);
        scoreUpdate();
        spawnFood("fast");
        // Increase the speed
        interval = setInterval(update, 1000 / 12);
        frameCount = 0;
    }
    // Make body follow head
    for (var i = player.snake_body.length - 1; i > 0; i--) {
        player.snake_body[i] = player.snake_body[i - 1];
    }
    if (player.snake_body.length) {
        player.snake_body[0] = [player.headX, player.headY];
    }
    // Color in the snake body
    for (var i = 0; i < player.snake_body.length; i++) {
        var color = gradient(i);
        context.fillStyle = color;
        context.fillRect(player.snake_body[i][0] * blockSize, player.snake_body[i][1] * blockSize, blockSize, blockSize);
    }
    // Move the head
    player.headX += player.velocityX;
    player.headY += player.velocityY;
    drawSnakeHead();
    //Set game to game over if relevant
    if (player.headX < 0 || player.headX > (cols - 1) || player.headY < 0 || player.headY > (cols - 1)) {
        GameOver = true;
    }
    for (var i = 0; i < player.snake_body.length; i++) {
        if (player.headX == player.snake_body[i][0] && player.headY == player.snake_body[i][1]) {
            GameOver = true;
        }
    }
    frameCount++;
    player.has_turned = false;
}
//Increases the score with a random number between 5 and 10
function scoreUpdate() {
    score += Math.floor(Math.random() * 5 + 5);
    scoreCounter.textContent = "SCORE: " + score;
}
//Loads the correct imiage of the snake head depending on the direction
function drawSnakeHead() {
    switch (player.snake_direction) {
        case "up":
            context.drawImage(HeadUp, player.headX * blockSize, player.headY * blockSize, blockSize, blockSize);
            break;
        case "down":
            context.drawImage(HeadDown, player.headX * blockSize, player.headY * blockSize, blockSize, blockSize);
            break;
        case "left":
            context.drawImage(HeadLeft, player.headX * blockSize, player.headY * blockSize, blockSize, blockSize);
            break;
        case "right":
            context.drawImage(HeadRight, player.headX * blockSize, player.headY * blockSize, blockSize, blockSize);
            break;
    }
}
//Chnges the direction of the snake 
function changeDirection(e) {
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
function spawnFood(food) {
    if (food == "red") {
        red_food_x = Math.floor(Math.random() * cols);
        red_food_y = Math.floor(Math.random() * rows);
        for (var i = 0; i < player.snake_body.length; i++) {
            if ((red_food_x == player.snake_body[i][0] && red_food_y == player.snake_body[i][1]) ||
                (red_food_x == player.headX && red_food_y == player.headY)) {
                spawnFood("red");
            }
        }
    }
    else if (food == "fast") {
        fast_food_x = Math.floor(Math.random() * cols);
        fast_food_y = Math.floor(Math.random() * rows);
        for (var i = 0; i < player.snake_body.length; i++) {
            if ((fast_food_x == player.snake_body[i][0] && fast_food_y == player.snake_body[i][1]) ||
                (fast_food_x == player.headX && fast_food_y == player.headY)) {
                spawnFood("fast");
            }
        }
    }
}
//Changes the gradient of the snake body
function gradient(distanceFromHead) {
    var green = 150 - distanceFromHead * 3;
    var red = Math.min(100, distanceFromHead * 3);
    return "rgb(".concat(red, ", ").concat(green, ", 0)");
}
