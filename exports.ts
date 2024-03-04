// This type describes the snake the player will control
export type snake = {snake_direction: "up" | "down" | "left" | "right", 
                     velocityX: number,
                     velocityY: number,
                     has_turned: boolean,
                     snake_body: Array<cords>,
                     headX: number,
                     headY: number,
                     head_last_cords: cords}

// A simple type to store coordinates
export type cords = [number, number];

/**
 * Updates the score and displays it on the screen.
 * 
 * @param {HTMLDivElement} scoreCounter - The HTML element where the score is displayed
 * @param {number} score - The current score
 * @returns {number} - The updated score
 */
export function scoreUpdate(scoreCounter: HTMLDivElement, score: number): number {
    let new_score = score + Math.floor(Math.random() * 5 + 5);
    scoreCounter.textContent = "SCORE: " + new_score;
    return new_score;
}

/**
 * Draws the snake in single-player game-modes
 * 
 * @param {snake} player - the snake to draw
 * @param {HTMLImageElement} HeadUp - picture of head's snake facing up
 * @param {HTMLImageElement} HeadDown- picture of head's snake facing down
 * @param {HTMLImageElement} HeadLeft- picture of head's snake facing left
 * @param {HTMLImageElement} HeadRight - picture of head's snake facing right
 * @param {number} blockSize - the size of the blocks in the game gride in pixels
 */
export function drawSnakeHead(player: snake, 
                        context: CanvasRenderingContext2D, 
                        HeadUp: HTMLImageElement, 
                        HeadDown: HTMLImageElement,
                        HeadLeft: HTMLImageElement, 
                        HeadRight: HTMLImageElement, 
                        blockSize: number): void {
    
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

/**
 * Draws the snake head for both players in 2-player game mode.
 * 
 * @param {snake} player1 - The first player's snake
 * @param {snake} player2 - The second player's snake
 * @param {CanvasRenderingContext2D} context - The 2D rendering context of the canvas
 * @param {HTMLImageElement} HeadUp - Image of snake head facing up for player 1
 * @param {HTMLImageElement} HeadDown - Image of snake head facing down for player 1
 * @param {HTMLImageElement} HeadLeft - Image of snake head facing left for player 1
 * @param {HTMLImageElement} HeadRight - Image of snake head facing right for player 1
 * @param {HTMLImageElement} HeadUpRed - Image of snake head facing up for player 2
 * @param {HTMLImageElement} HeadDownRed - Image of snake head facing down for player 2
 * @param {HTMLImageElement} HeadLeftRed - Image of snake head facing left for player 2
 * @param {HTMLImageElement} HeadRightRed - Image of snake head facing right for player 2
 * @param {number} blockSize - The size of blocks in the game grid in pixels
 */
export function draw_snake_head2P(player1: snake,
                                  player2: snake,
                                  context: CanvasRenderingContext2D,
                                  HeadUp: HTMLImageElement, 
                                  HeadDown: HTMLImageElement,
                                  HeadLeft: HTMLImageElement, 
                                  HeadRight: HTMLImageElement,
                                  HeadUpRed: HTMLImageElement, 
                                  HeadDownRed: HTMLImageElement,
                                  HeadLeftRed: HTMLImageElement, 
                                  HeadRightRed: HTMLImageElement, 
                                  blockSize: number): void {
    switch (player1.snake_direction) {
        case "up":
            context.drawImage(HeadUp, player1.headX * blockSize, 
                              player1.headY * blockSize, 
                              blockSize, 
                              blockSize);
            break;
        case "down":
            context.drawImage(HeadDown, player1.headX * blockSize, 
                              player1.headY * blockSize, 
                              blockSize, 
                              blockSize);
            break;
        case "left":
            context.drawImage(HeadLeft, 
                              player1.headX * blockSize,
                              player1.headY * blockSize,
                              blockSize,
                              blockSize);
            break;
        case "right":
            context.drawImage(HeadRight,
                              player1.headX * blockSize,
                              player1.headY * blockSize,
                              blockSize,
                              blockSize);
            break;
    }

    switch (player2.snake_direction) {
        case "up":
            context.drawImage(HeadUpRed, player2.headX * blockSize, 
                              player2.headY * blockSize, 
                              blockSize, 
                              blockSize);
            break;
        case "down":
            context.drawImage(HeadDownRed, player2.headX * blockSize, 
                              player2.headY * blockSize, 
                              blockSize, 
                              blockSize);
            break;
        case "left":
            context.drawImage(HeadLeftRed, 
                              player2.headX * blockSize,
                              player2.headY * blockSize,
                              blockSize,
                              blockSize);
            break;
        case "right":
            context.drawImage(HeadRightRed,
                              player2.headX * blockSize,
                              player2.headY * blockSize,
                              blockSize,
                              blockSize);
            break;
    }
}

/**
 * Changes the direction of the snake based on keyboard input for single-player mode.
 * 
 * @param {KeyboardEvent} e - The keyboard event
 * @param {snake} player - The snake to change direction
 */
export function changeDirection(e: KeyboardEvent, player: snake): void {
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

/**
 * Changes the direction of both snakes based on keyboard input for 2-player mode.
 * 
 * @param {KeyboardEvent} e - The keyboard event
 * @param {snake} player1 - The snake of player 1
 * @param {snake} player2 - The snake of player 2
 */
export function changeDirection2P(e: KeyboardEvent, player1: snake, player2: snake): void {
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

/**
 * Checks if the 2 player game results in a tie
 * 
 * @param {snake} player1 - The snake of player 1
 * @param {snake} player2 - The snake of player 2
 */
export function tie_check(player1: snake, player2: snake): boolean {
    if ((player1.snake_direction == "left" && player2.snake_direction == "right") &&
        (player1.headY == player2.headY) &&
        (player1.headX == (player2.headX || player2.headX - 1))) {
            return true;
    } else if ((player1.snake_direction == "right" && player2.snake_direction == "left") &&
                (player1.headY == player2.headY) &&
                (player1.headX == (player2.headX || player2.headX + 1))) {
                    return true;
    } else if ((player1.snake_direction == "up" && player2.snake_direction == "down") &&
                (player1.headX == player2.headX) &&
                (player1.headY == (player2.headY || player2.headY + 1))) {
                    return true;
    } else if ((player1.snake_direction == "down" && player2.snake_direction == "up") &&
                (player1.headX == player2.headX) &&
                (player1.headY == (player2.headY || player2.headY - 1))) {
                    return true;       
    } else {
        return false;
    }
}   

/**
 * Spawns food in a random position on the game grid.
 * 
 * @param {snake} player - The snake 
 * @param {number} cols - The number of columns in the game grid
 * @param {number} rows - The number of rows in the game grid
 * @returns {[number, number]} - The coordinates of the spawned food
 */
export function spawnFood(player: snake, cols: number, rows: number): [number, number] {
    let foodX: number;
    let foodY: number;

    // Generate random coordinates for food
    foodX = Math.floor(Math.random() * cols);
    foodY = Math.floor(Math.random() * rows);

    // Check if food spawns on the snake's body or head
    for (let i = 0; i < player.snake_body.length; i++) {
        if ((foodX === player.snake_body[i][0] && foodY === player.snake_body[i][1]) || 
            (foodX === player.headX && foodY === player.headY)) {
            // If food spawns on the snake, regenerate it
            return spawnFood(player, cols, rows); // Recursively call the function to get new coordinates
        }
    }

    // Return the tuple with food coordinates
    return [foodX, foodY];
}


/**
 * Determines the color gradient for the snake body based on distance from the head.
 * 
 * @param {number} distanceFromHead - The distance of the body segment from the head
 * @returns {string} - The color gradient in RGB format
 */
export function gradient(distanceFromHead: number): string {
    let green: number = 150 - distanceFromHead * 3;
    let red: number = Math.min(100, distanceFromHead * 3);
    return `rgb(${red}, ${green}, 0)`;
}
/**
 * Determines the color gradient for the red (player 2) snake body based on distance from the head.
 * 
 * @param {number} distanceFromHead - The distance of the body segment from the head
 * @returns {string} - The color gradient in RGB format
 */
export function red_gradient(distanceFromHead: number): string {
    let red: number = 150 - distanceFromHead * 3;
    let green: number = Math.min(100, distanceFromHead * 3);
    return `rgb(${red}, ${green}, 0)`;
}

/**
 * Pauses the game
 * 
 * @param {HTMLDivElement} PauseMenu  - The pause menu element
 * @param {NodeJS.Timeout} interval - The interval that calls the main function of the game
 */
export function PauseGame(PauseMenu: HTMLDivElement, interval: NodeJS.Timeout) {
    clearInterval(interval);
                PauseMenu.innerText = "Press SPACE to resume";
                print_pause(PauseMenu);
            }

/**
 * Pauses the game
 * 
 * @param {function} update - The main function of the game
 * @param {HTMLDivElement} PauseMenu  - The pause menu element
 * @param {NodeJS.Timeout} interval - The interval that calls the main function of the game
 */
export function ResumeGame(update: () => void, PauseMenu: HTMLDivElement, interval: NodeJS.Timeout) {
    interval = setInterval(update, 1000 / 10);
    PauseMenu.innerText = "Press SPACE to pause";
    print_pause(PauseMenu);
}

/**
 * Draws the snake
 * 
 * @param {CanvasRenderingContext2D} context - The rendering context
 * @param {snake} player - The snake
 * @param {number} blockSize - The size of the blocks in the game grid
 */
export function color_in_snake(context: CanvasRenderingContext2D, player: snake, blockSize: number): void {
    for (let i = 0; i < player.snake_body.length; i++) {
        let color: string = gradient(i);
        context.fillStyle = color;
        context.fillRect(player.snake_body[i][0] * blockSize, 
                            player.snake_body[i][1] * blockSize,
                            blockSize, 
                            blockSize);
    }
}

/**
 * Displays the pause menu
 * 
 * @param {HTMLDivElement} PauseMenu - The pause menu element
 */
export function print_pause(PauseMenu: HTMLDivElement): void {
    document.body.appendChild(PauseMenu);
}

/**
 * Displays game over screen
 * 
 * @param {Document} document - The HTML document
 * @param {NodeJS.Timeout} interval - The interval that calls the main function of the game
 */
export function print_game_over(document: Document, interval: NodeJS.Timeout): void {
    //Creates game over text and vishuals
    const gameOver: HTMLDivElement = document.createElement("div");
    gameOver.textContent = "GAME OVER";
    gameOver.style.position = "relative";
    gameOver.style.top = "-380px";
    gameOver.style.left = "0";
    gameOver.style.color = "white";
    gameOver.style.fontFamily = "Press Start 2P, monospace";
    gameOver.style.fontSize = "100px";

    // Append the game over text element to the board container
    document.body.appendChild(gameOver);
    
    clearInterval(interval)
}

/**
 * Paints the board
 * 
 * @param {HTMLCanvasElement} board - The board as a canvas element
 * @param {CanvasRenderingContext2D} context - The canvas 2D rendering context
 */
export function paint_board(board: HTMLCanvasElement, context: CanvasRenderingContext2D): void {

    // Color in the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height);
}

/**
 * Paints the food
 * 
 * @param {number} blockSize - The size of the blocks in the game grid
 * @param {number} foodX - The X coordinate of the food
 * @param {number} foodY - The Y coordinate of the food
 * @param {CanvasRenderingContext2D} context - The rendering context
 */
export function paint_food(blockSize: number, foodX: number, foodY: number, context: CanvasRenderingContext2D): void {
    // Color in the food
    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX * blockSize + blockSize / 2,
                foodY * blockSize + blockSize / 2, 
                blockSize / 2,
                0,
                Math.PI * 2);
    context.fill();
}

/**
 * Paints the food with a specified color
 * 
 * @param {number} blockSize - The size of the blocks in the game grid
 * @param {number} foodX - The X coordinate of the food
 * @param {number} foodY - The Y coordinate of the food
 * @param {string} color - The desired color of the food
 * @param {CanvasRenderingContext2D} context - The rendering context
 */
export function paint_food_color(blockSize: number,
    foodX: number,
    foodY: number,
    color: string,
    context: CanvasRenderingContext2D): void {

    // Color in the food
    context.fillStyle = color;
    context.beginPath();
    context.arc(foodX * blockSize + blockSize / 2,
                foodY * blockSize + blockSize / 2, 
                blockSize / 2,
                0,
                Math.PI * 2);
    context.fill();
}

/**
 * Checks if the snake has eaten the food.
 * 
 * @param {snake} player - The snake object
 * @param {number} foodX - The X coordinate of the food
 * @param {number} foodY - The Y coordinate of the food
 * @returns {boolean} - True if the snake has eaten the food, false otherwise
 */
export function food_eaten(player: snake, foodX: number, foodY: number): boolean {

    // Eat the food
    if (player.headX == foodX && player.headY == foodY) {
        player.snake_body.push([foodX, foodY]);
        return true;
    } else {
        return false;
    }
}

/**
 * Moves the snake
 * 
 * @param {snake} player 
 * @param {CanvasRenderingContext2D} context - The rendering context
 * @param {HTMLImageElement} HeadUp - Image of the snake heading up
 * @param {HTMLImageElement} HeadDown  - Image of the snake heading down
 * @param {HTMLImageElement} HeadLeft  - Image of the snake heading left
 * @param {HTMLImageElement} HeadRight  - Image of the snake heading right
 * @param {number} blockSize - The size of the blocks in the game grid
 */
export function move_snake(player: snake,
                           context: CanvasRenderingContext2D,
                           HeadUp: HTMLImageElement,
                           HeadDown: HTMLImageElement,
                           HeadLeft: HTMLImageElement,
                           HeadRight: HTMLImageElement,
                           blockSize: number): void {

    // Make body follow head
    for (let i = player.snake_body.length - 1; i > 0; i--) {
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

/**
 * Checks if the game is over.
 * 
 * @param {snake} player - The snake object
 * @param {number} rows - The number of rows in the game grid
 * @param {number} cols - The number of columns in the game grid
 * @returns {boolean} - True if the game is over, false otherwise
 */
export function is_game_over(player: snake, rows: number, cols: number): boolean {

    //Set game to game over if relevant
    for (let i = 0; i < player.snake_body.length; i++) {
        if (player.headX == player.snake_body[i][0] && player.headY == player.snake_body[i][1]) {
            return true;
        }
    } 

    if (player.headX < 0 || player.headX > (cols - 1) || player.headY < 0 || player.headY > (rows - 1)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Displays the score
 * 
 * @param {HTMLDivElement} scoreCounter - The element that displays the score
 * @param {number} score - The current score of the game
 */
export function display_score(scoreCounter: HTMLDivElement , score: number): void {

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

/**
 * Displays the restart button
 * 
 * @param {HTMLButtonElement} restartButton - The restart button
 */
export function paint_restart_button(restartButton: HTMLButtonElement): void {

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

/**
 * Displays the menu button.
 * 
 * @param {HTMLButtonElement} menuButton - The menu button
 */
export function paint_menu_button(menuButton: HTMLButtonElement): void {

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