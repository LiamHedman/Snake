var interval;
//Board dimensions
var blockSize = 25;
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
var foodX;
var foodY;
// Game logic
//HTML div element created dynamically. Will be used to display the score of the game
var scoreCounter = document.createElement("div");
//Create reastartbutton and visuals
var restartButton = document.createElement("button");
//Create menu button
var menuButton = document.createElement("button");
//Initiated score 0
var score = 0;
//Game will stop when true
var dead = false;
var pause = false;
//This will run once when the entire HTML document has finished loading.
window.onload = function () {
    var _a;
    //Retrieves the HTML element with the ID "board"
    board = document.getElementById("board");
    //Height and width of the board
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    //retrieves the 2D drawing context of the canvas and provides 2D drawing functions for the canvas.
    context = board.getContext("2d");
    //Spawns the food
    _a = spawnFood(player), foodX = _a[0], foodY = _a[1];
    //When a key is pressed down, changeDirection() will be called.
    document.addEventListener("keydown", function (e) {
        changeDirection(e, player); // Passing both the event and the player object
    });
    //Frame rate and speed of snake if not paused
    interval = setInterval(update, 1000 / 10);
    display_score(scoreCounter, score);
    paint_restart_button(restartButton);
    //Event listener detecting click on restartbutton
    restartButton.addEventListener("click", function () {
        location.reload(); // Reload the page to restart the game
    });
    paint_menu_button(menuButton);
    menuButton.addEventListener("click", function () {
        window.location.href = "../index.html";
    });
};
//Will run every "frame"
function update() {
    var _a;
    //Game does not update when paused
    if (pause) {
        return;
    }
    if (dead) {
        print_game_over(document, interval);
        return;
    }
    paint_board(board, context);
    paint_food(blockSize, foodX, foodY, context);
    if (food_eaten(player, foodX, foodY)) {
        score = scoreUpdate(scoreCounter, score);
        _a = spawnFood(player), foodX = _a[0], foodY = _a[1];
    }
    move_snake(player);
    color_in_snake(context, player, blockSize);
    dead = is_game_over(player, rows, cols);
    player.has_turned = false;
}
//Functions:
//Increases the score with a random number between 5 and 10
function scoreUpdate(scoreCounter, score) {
    var new_score = score + Math.floor(Math.random() * 5 + 5);
    scoreCounter.textContent = "SCORE: " + new_score;
    return new_score;
}
//Loads the correct imiage of the snake head depending on the direction
function drawSnakeHead(player, context, HeadUp, HeadDown, HeadLeft, HeadRight, blockSize) {
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
function changeDirection(e, player) {
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
function spawnFood(player) {
    var foodX;
    var foodY;
    // Generate random coordinates for food
    foodX = Math.floor(Math.random() * cols);
    foodY = Math.floor(Math.random() * rows);
    // Check if food spawns on the snake's body or head
    for (var i = 0; i < player.snake_body.length; i++) {
        if ((foodX === player.snake_body[i][0] && foodY === player.snake_body[i][1]) ||
            (foodX === player.headX && foodY === player.headY)) {
            // If food spawns on the snake, regenerate it
            return spawnFood(player); // Recursively call the function to get new coordinates
        }
    }
    // Return the tuple with food coordinates
    return [foodX, foodY];
}
//Changes the gradient of the snake body
function gradient(distanceFromHead) {
    var green = 150 - distanceFromHead * 3;
    var red = Math.min(100, distanceFromHead * 3);
    return "rgb(".concat(red, ", ").concat(green, ", 0)");
}
//Checks and executes pause
window.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (pause) {
            ResumeGame(); // Resume game if paused 
        }
        else {
            PauseGame(); // Pause game if not paused
        }
        pause = !pause; // Toggle pause
    }
});
//Mechanics for Pause
function PauseGame() {
    clearInterval(interval);
    var PauseMenu = document.createElement("div");
    PauseMenu.innerText = "Press SPACE to resume";
    document.body.appendChild(PauseMenu);
}
//Mechanics for Resume
function ResumeGame() {
    interval = setInterval(update, 1000 / 10);
}
function color_in_snake(context, player, blockSize) {
    for (var i = 0; i < player.snake_body.length; i++) {
        var color = gradient(i);
        context.fillStyle = color;
        context.fillRect(player.snake_body[i][0] * blockSize, player.snake_body[i][1] * blockSize, blockSize, blockSize);
    }
}
function print_game_over(document, interval) {
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
}
function paint_board(board, context) {
    // Color in the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height);
}
function paint_food(blockSize, foodX, foodY, context) {
    // Color in the food
    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX * blockSize + blockSize / 2, foodY * blockSize + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();
}
function food_eaten(player, foodX, foodY) {
    // Eat the food
    if (player.headX == foodX && player.headY == foodY) {
        player.snake_body.push([foodX, foodY]);
        return true;
    }
    else {
        return false;
    }
}
function move_snake(player) {
    // Make body follow head
    for (var i = player.snake_body.length - 1; i > 0; i--) {
        player.snake_body[i] = player.snake_body[i - 1];
    }
    if (player.snake_body.length) {
        player.snake_body[0] = [player.headX, player.headY];
    }
    // Move the head
    player.headX += player.velocityX;
    player.headY += player.velocityY;
    drawSnakeHead(player, context, HeadUp, HeadDown, HeadLeft, HeadRight, blockSize);
}
function is_game_over(player, rows, cols) {
    //Set game to game over if relevant
    for (var i = 0; i < player.snake_body.length; i++) {
        if (player.headX == player.snake_body[i][0] && player.headY == player.snake_body[i][1]) {
            return true;
        }
    }
    if (player.headX < 0 || player.headX > (cols - 1) || player.headY < 0 || player.headY > (rows - 1)) {
        return true;
    }
    else {
        return false;
    }
}
function display_score(scoreCounter, score) {
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
}
function paint_restart_button(restartButton) {
    //Vishuals for restart button
    restartButton.textContent = "RESTART";
    restartButton.style.position = "relative";
    restartButton.style.top = "-520px";
    restartButton.style.right = "-180px";
    restartButton.style.padding = "5px 10px";
    restartButton.style.fontSize = "16px";
    restartButton.style.cursor = "pointer";
    restartButton.style.color = "white";
    restartButton.style.backgroundColor = "transparent";
    // Append the restart button element to the board container
    document.body.appendChild(restartButton);
}
function paint_menu_button(menuButton) {
    //Visuals for menu button
    menuButton.textContent = "MENU";
    menuButton.style.position = "fixed"; // Change position to "fixed"
    menuButton.style.top = "20px"; // Position from the top
    menuButton.style.left = "20px"; // Position from the left
    menuButton.style.padding = "5px 10px";
    menuButton.style.fontSize = "20px";
    menuButton.style.cursor = "pointer";
    menuButton.style.color = "white";
    menuButton.style.backgroundColor = "#003366";
    menuButton.style.borderRadius = "5px";
    // Append the menu button element to the body
    document.body.appendChild(menuButton);
}
