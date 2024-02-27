var interval;
var winner = "none";
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
var player1 = { snake_direction: "right",
    velocityX: 0,
    velocityY: 0,
    has_turned: false,
    snake_body: [],
    headX: 0,
    headY: 0 };
var player2 = { snake_direction: "left",
    velocityX: 0,
    velocityY: 0,
    has_turned: false,
    snake_body: [],
    headX: 19,
    headY: 0 };
//Pictures of the snake's head
var HeadUp = new Image();
var HeadDown = new Image();
var HeadLeft = new Image();
var HeadRight = new Image();
//The source for the images
HeadUp.src = "../Classic game/Bilder/HeadUp.png";
HeadRight.src = "../Classic game/Bilder/HeadRight.png";
HeadDown.src = "../Classic game/Bilder/HeadDown.png";
HeadLeft.src = "../Classic game/Bilder/HeadLeft.png";
// Food position on board
var foodX;
var foodY;
// Game logic
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
    spawnFood();
    //When a key is pressed down, changeDirection() will be called.
    document.addEventListener("keydown", changeDirection);
    //Frame rate and speed of snake
    interval = setInterval(update, 800 / 10);
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
    if (GameOver) {
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
        clearInterval(interval);
        //Stops the game loop
        return;
    }
    // Color in the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height);
    // Color in the food
    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX * blockSize + blockSize / 2, foodY * blockSize + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();
    // Eat the food
    if (player1.headX == foodX && player1.headY == foodY) {
        player1.snake_body.push([foodX, foodY]);
        spawnFood();
    }
    else if (player2.headX == foodX && player2.headY == foodY) {
        player2.snake_body.push([foodX, foodY]);
        spawnFood();
    }
    // Make body follow head
    for (var i = player1.snake_body.length - 1; i > 0; i--) {
        player1.snake_body[i] = player1.snake_body[i - 1];
    }
    if (player1.snake_body.length) {
        player1.snake_body[0] = [player1.headX, player1.headY];
    }
    for (var i = player2.snake_body.length - 1; i > 0; i--) {
        player2.snake_body[i] = player2.snake_body[i - 1];
    }
    if (player2.snake_body.length) {
        player2.snake_body[0] = [player2.headX, player2.headY];
    }
    // Color in the snake body
    for (var i = 0; i < player1.snake_body.length; i++) {
        var color = gradient(i);
        context.fillStyle = color;
        context.fillRect(player1.snake_body[i][0] * blockSize, player1.snake_body[i][1] * blockSize, blockSize, blockSize);
    }
    for (var i = 0; i < player2.snake_body.length; i++) {
        var color = gradient(i);
        context.fillStyle = color;
        context.fillRect(player2.snake_body[i][0] * blockSize, player2.snake_body[i][1] * blockSize, blockSize, blockSize);
    }
    // Move the head
    player1.headX += player1.velocityX;
    player1.headY += player1.velocityY;
    player2.headX += player2.velocityX;
    player2.headY += player2.velocityY;
    draw_snake_heads();
    // Checks if player 1 collides with wall
    if (player1.headX < 0 || player1.headX > (cols - 1) || player1.headY < 0 || player1.headY > (cols - 1)) {
        winner = "player2";
        GameOver = true;
    }
    // Checks if player1 collides with themselves, or with the player 2
    for (var i = 0; i < player1.snake_body.length; i++) {
        if (player1.headX == player1.snake_body[i][0] && player1.headY == player1.snake_body[i][1]) {
            winner = "player2";
            GameOver = true;
        }
    }
    for (var i = 0; i < player2.snake_body.length; i++) {
        if (player1.headX == player2.snake_body[i][0] && player1.headY == player2.snake_body[i][1]) {
            winner = "player2";
            GameOver = true;
        }
    }
    // Checks if player2 collides with wall
    if (player2.headX < 0 || player2.headX > (cols - 1) || player2.headY < 0 || player2.headY > (cols - 1)) {
        winner = "player1";
        GameOver = true;
    }
    // Checks if player1 collides with themselves, or with the player 2
    for (var i = 0; i < player2.snake_body.length; i++) {
        if (player2.headX == player2.snake_body[i][0] && player2.headY == player2.snake_body[i][1]) {
            winner = "player1";
            GameOver = true;
        }
    }
    for (var i = 0; i < player1.snake_body.length; i++) {
        if (player2.headX == player1.snake_body[i][0] && player2.headY == player1.snake_body[i][1]) {
            winner = "player1";
            GameOver = true;
        }
    }
    player1.has_turned = false;
    player2.has_turned = false;
}
//Loads the correct imiage of the snake head depending on the direction
function draw_snake_heads() {
    switch (player1.snake_direction) {
        case "up":
            context.drawImage(HeadUp, player1.headX * blockSize, player1.headY * blockSize, blockSize, blockSize);
            break;
        case "down":
            context.drawImage(HeadDown, player1.headX * blockSize, player1.headY * blockSize, blockSize, blockSize);
            break;
        case "left":
            context.drawImage(HeadLeft, player1.headX * blockSize, player1.headY * blockSize, blockSize, blockSize);
            break;
        case "right":
            context.drawImage(HeadRight, player1.headX * blockSize, player1.headY * blockSize, blockSize, blockSize);
            break;
    }
    switch (player2.snake_direction) {
        case "up":
            context.drawImage(HeadUp, player2.headX * blockSize, player2.headY * blockSize, blockSize, blockSize);
            break;
        case "down":
            context.drawImage(HeadDown, player2.headX * blockSize, player2.headY * blockSize, blockSize, blockSize);
            break;
        case "left":
            context.drawImage(HeadLeft, player2.headX * blockSize, player2.headY * blockSize, blockSize, blockSize);
            break;
        case "right":
            context.drawImage(HeadRight, player2.headX * blockSize, player2.headY * blockSize, blockSize, blockSize);
            break;
    }
}
//Chnges the direction of the snake 
function changeDirection(e) {
    if (!player1.has_turned) {
        if (e.code == "KeyW" && player1.velocityY != 1) {
            player1.snake_direction = "up";
            player1.velocityX = 0;
            player1.velocityY = -1;
            player1.has_turned = true;
        }
        else if (e.code == "KeyS" && player1.velocityY != -1) {
            player1.snake_direction = "down";
            player1.velocityX = 0;
            player1.velocityY = 1;
            player1.has_turned = true;
        }
        else if (e.code == "KeyD" && player1.velocityX != -1) {
            player1.snake_direction = "right";
            player1.velocityX = 1;
            player1.velocityY = 0;
            player1.has_turned = true;
        }
        else if (e.code == "KeyA" && player1.velocityX != 1) {
            player1.snake_direction = "left";
            player1.velocityX = -1;
            player1.velocityY = 0;
            player1.has_turned = true;
        }
    }
    if (!player2.has_turned) {
        if (e.code == "ArrowUp" && player2.velocityY != 1) {
            player2.snake_direction = "up";
            player2.velocityX = 0;
            player2.velocityY = -1;
            player2.has_turned = true;
        }
        else if (e.code == "ArrowDown" && player2.velocityY != -1) {
            player2.snake_direction = "down";
            player2.velocityX = 0;
            player2.velocityY = 1;
            player2.has_turned = true;
        }
        else if (e.code == "ArrowRight" && player2.velocityX != -1) {
            player2.snake_direction = "right";
            player2.velocityX = 1;
            player2.velocityY = 0;
            player2.has_turned = true;
        }
        else if (e.code == "ArrowLeft" && player2.velocityX != 1) {
            player2.snake_direction = "left";
            player2.velocityX = -1;
            player2.velocityY = 0;
            player2.has_turned = true;
        }
    }
}
//Spawns food in random position
function spawnFood() {
    foodX = Math.floor(Math.random() * cols);
    foodY = Math.floor(Math.random() * rows);
    // Tries again if food spawns under snake
    for (var i = 0; i < player1.snake_body.length; i++) {
        if ((foodX == player1.snake_body[i][0] && foodY == player1.snake_body[i][1]) ||
            (foodX == player1.headX && foodY == player1.headY)) {
            spawnFood();
        }
    }
}
//Changes the gradient of the snake body
function gradient(distanceFromHead) {
    var green = 150 - distanceFromHead * 3;
    var red = Math.min(100, distanceFromHead * 3);
    return "rgb(".concat(red, ", ").concat(green, ", 0)");
}
