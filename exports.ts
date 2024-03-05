// This type describes the snake the player will control
export type snake = {snake_direction: "up" | "down" | "left" | "right",
                     velocity_x: number,
                     velocity_y: number,
                     has_turned: boolean,
                     snake_body: Array<cords>,
                     head_x: number,
                     head_y: number,
                     head_last_cords: cords}

// A simple type to store coordinates
export type cords = [number, number];

/**
 * Updates the score and displays it on the screen.
 *
 * @param {HTMLDivElement} score_counter - The HTML element where the score
 *                                         is displayed
 * @param {number} score - The current score
 * @returns {number} - The updated score
 */
export function score_update(score_counter: HTMLDivElement,
                            score: number): number {
    let new_score = score + Math.floor(Math.random() * 5 + 5);
    score_counter.textContent = "SCORE: " + new_score;
    return new_score;
}

/**
 * Draws the snake in single-player game-modes
 *
 * @param {snake} player - the snake to draw
 * @param {HTMLImageElement} head_up - picture of head's snake facing up
 * @param {HTMLImageElement} head_down- picture of head's snake facing down
 * @param {HTMLImageElement} head_left- picture of head's snake facing left
 * @param {HTMLImageElement} head_right - picture of head's snake facing right
 * @param {number} block_size - Size of the blocks in the game gride in pixels
 */
export function draw_snake_head(player: snake,
                        context: CanvasRenderingContext2D,
                        head_up: HTMLImageElement,
                        head_down: HTMLImageElement,
                        head_left: HTMLImageElement,
                        head_right: HTMLImageElement,
                        block_size: number): void {

    switch (player.snake_direction) {
        case "up":
            context.drawImage(head_up,
                              player.head_x * block_size,
                              player.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "down":
            context.drawImage(head_down,
                              player.head_x * block_size,
                              player.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "left":
            context.drawImage(head_left,
                              player.head_x * block_size,
                              player.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "right":
            context.drawImage(head_right,
                              player.head_x * block_size,
                              player.head_y * block_size,
                              block_size,
                              block_size);
            break;
    }
}

/**
 * Draws the snake head for both players in 2-player game mode.
 *
 * @param {snake} player1 - The first player's snake
 * @param {snake} player2 - The second player's snake
 * @param {CanvasRenderingContext2D} context - The 2D rendering context of
 *                                             the canvas
 * @param {HTMLImageElement} head_up - Image of snake head facing up for
 *                                     player 1
 * @param {HTMLImageElement} head_down - Image of snake head
 *                                       facing down for player 1
 * @param {HTMLImageElement} head_left - Image of snake head facing left for
 *                                       player 1
 * @param {HTMLImageElement} head_right - Image of snake head facing right for
 *                                        player 1
 * @param {HTMLImageElement} head_upRed - Image of snake head facing up for
 *                                        player 2
 * @param {HTMLImageElement} head_downRed - Image of snake head facing down for
 *                                          player 2
 * @param {HTMLImageElement} head_leftRed - Image of snake head facing left for
 *                                          player 2
 * @param {HTMLImageElement} head_rightRed - Image of snake head facing right
 *                                           for player 2
 * @param {number} block_size - The size of blocks in the game grid in pixels
 */
export function draw_snake_head2P(player1: snake,
                                  player2: snake,
                                  context: CanvasRenderingContext2D,
                                  head_up: HTMLImageElement,
                                  head_down: HTMLImageElement,
                                  head_left: HTMLImageElement,
                                  head_right: HTMLImageElement,
                                  head_upRed: HTMLImageElement,
                                  head_downRed: HTMLImageElement,
                                  head_leftRed: HTMLImageElement,
                                  head_rightRed: HTMLImageElement,
                                  block_size: number): void {
    switch (player1.snake_direction) {
        case "up":
            context.drawImage(head_up, player1.head_x * block_size,
                              player1.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "down":
            context.drawImage(head_down, player1.head_x * block_size,
                              player1.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "left":
            context.drawImage(head_left,
                              player1.head_x * block_size,
                              player1.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "right":
            context.drawImage(head_right,
                              player1.head_x * block_size,
                              player1.head_y * block_size,
                              block_size,
                              block_size);
            break;
    }

    switch (player2.snake_direction) {
        case "up":
            context.drawImage(head_upRed, player2.head_x * block_size,
                              player2.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "down":
            context.drawImage(head_downRed, player2.head_x * block_size,
                              player2.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "left":
            context.drawImage(head_leftRed,
                              player2.head_x * block_size,
                              player2.head_y * block_size,
                              block_size,
                              block_size);
            break;
        case "right":
            context.drawImage(head_rightRed,
                              player2.head_x * block_size,
                              player2.head_y * block_size,
                              block_size,
                              block_size);
            break;
    }
}

/**
 * Changes the direction of the snake based on keyboard input for
 * single-player mode.
 *
 * @param {KeyboardEvent} e - The keyboard event
 * @param {snake} player - The snake to change direction
 */
export function change_direction(e: KeyboardEvent, player: snake): void {
    if (!player.has_turned) {
        if (e.code == "ArrowUp" && player.velocity_y != 1) {
            player.snake_direction = "up";
            player.velocity_x = 0;
            player.velocity_y = -1;
        }
        else if (e.code == "ArrowDown" && player.velocity_y != -1) {
            player.snake_direction = "down";
            player.velocity_x = 0;
            player.velocity_y = 1;
        }
        else if (e.code == "ArrowRight" && player.velocity_x != -1) {
            player.snake_direction = "right";
            player.velocity_x = 1;
            player.velocity_y = 0;
        }
        else if (e.code == "ArrowLeft" && player.velocity_x != 1) {
            player.snake_direction = "left";
            player.velocity_x = -1;
            player.velocity_y = 0;
        }
    }
    player.has_turned = true;
}

/**
 * Changes the direction of both snakes based on keyboard input for 2-player
 * mode.
 *
 * @param {KeyboardEvent} e - The keyboard event
 * @param {snake} player1 - The snake of player 1
 * @param {snake} player2 - The snake of player 2
 */
export function change_direction_2p(e: KeyboardEvent,
                                   player1: snake,
                                   player2: snake): void {
    if (!player1.has_turned) {
        if (e.code == "KeyW" && player1.velocity_y != 1) {
            player1.snake_direction = "up";
            player1.velocity_x = 0;
            player1.velocity_y = -1;
            player1.has_turned = true;
        }
        else if (e.code == "KeyS" && player1.velocity_y != -1) {
            player1.snake_direction = "down";
            player1.velocity_x = 0;
            player1.velocity_y = 1;
            player1.has_turned = true;
        }
        else if (e.code == "KeyD" && player1.velocity_x != -1) {
            player1.snake_direction = "right";
            player1.velocity_x = 1;
            player1.velocity_y = 0;
            player1.has_turned = true;
        }
        else if (e.code == "KeyA" && player1.velocity_x != 1) {
            player1.snake_direction = "left";
            player1.velocity_x = -1;
            player1.velocity_y = 0;
            player1.has_turned = true;
        }
    }

    if (!player2.has_turned) {
        if (e.code == "ArrowUp" && player2.velocity_y != 1) {
            player2.snake_direction = "up";
            player2.velocity_x = 0;
            player2.velocity_y = -1;
            player2.has_turned = true;
        }
        else if (e.code == "ArrowDown" && player2.velocity_y != -1) {
            player2.snake_direction = "down";
            player2.velocity_x = 0;
            player2.velocity_y = 1;
            player2.has_turned = true;
        }
        else if (e.code == "ArrowRight" && player2.velocity_x != -1) {
            player2.snake_direction = "right";
            player2.velocity_x = 1;
            player2.velocity_y = 0;
            player2.has_turned = true;
        }
        else if (e.code == "ArrowLeft" && player2.velocity_x != 1) {
            player2.snake_direction = "left";
            player2.velocity_x = -1;
            player2.velocity_y = 0;
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
    if ((player1.snake_direction == "left" &&
         player2.snake_direction == "right") &&
        (player1.head_y == player2.head_y) &&
        (player1.head_x == (player2.head_x || player2.head_x - 1))) {
            return true;
    } else if ((player1.snake_direction == "right" &&
                    player2.snake_direction == "left") &&
                (player1.head_y == player2.head_y) &&
                (player1.head_x == (player2.head_x || player2.head_x + 1))) {
                    return true;
    } else if ((player1.snake_direction == "up" &&
                    player2.snake_direction == "down") &&
                (player1.head_x == player2.head_x) &&
                (player1.head_y == (player2.head_y || player2.head_y + 1))) {
                    return true;
    } else if ((player1.snake_direction == "down" &&
                    player2.snake_direction == "up") &&
                (player1.head_x == player2.head_x) &&
                (player1.head_y == (player2.head_y || player2.head_y - 1))) {
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
export function spawn_food(player: snake,
                           cols: number,
                           rows: number): [number, number] {
    let food_x: number;
    let food_y: number;

    // Generate random coordinates for food
    food_x = Math.floor(Math.random() * cols);
    food_y = Math.floor(Math.random() * rows);

    // Check if food spawns on the snake's body or head
    for (let i = 0; i < player.snake_body.length; i++) {
        if ((food_x === player.snake_body[i][0] &&
                food_y === player.snake_body[i][1]) ||
            (food_x === player.head_x && food_y === player.head_y)) {
            // If food spawns on the snake, regenerate it
            return spawn_food(player, cols, rows); // Recursively call the
                                                   // function to get new
                                                   // coordinates
        }
    }

    // Return the tuple with food coordinates
    return [food_x, food_y];
}


/**
 * Determines the color gradient for the snake body based on distance from
 * the head.
 *
 * @param {number} distance_from_head - The distance of the body segment from
 *                                      the head
 * @returns {string} - The color gradient in RGB format
 */
export function gradient(distance_from_head: number): string {
    let green: number = 150 - distance_from_head * 3;
    let red: number = Math.min(100, distance_from_head * 3);
    return `rgb(${red}, ${green}, 0)`;
}
/**
 * Determines the color gradient for the red (player 2) snake
 * body based on distance from the head.
 *
 * @param {number} distance_from_head - The distance of the body segment
 *                                      from the head
 * @returns {string} - The color gradient in RGB format
 */
export function red_gradient(distance_from_head: number): string {
    let red: number = 150 - distance_from_head * 3;
    let green: number = Math.min(100, distance_from_head * 3);
    return `rgb(${red}, ${green}, 0)`;
}

/**
 * Pauses the game
 *
 * @param {HTMLDivElement} pause_menu  - The pause menu element
 * @param {NodeJS.Timeout} interval - The interval that calls the main
 *                                    function of the game
 */
export function pause_game(pause_menu: HTMLDivElement,
                           interval: NodeJS.Timeout) {
    clearInterval(interval);
                pause_menu.innerText = "Press SPACE to resume";
                print_pause(pause_menu);
            }

/**
 * Pauses the game
 *
 * @param {function} update - The main function of the game
 * @param {HTMLDivElement} pause_menu  - The pause menu element
 * @param {NodeJS.Timeout} interval - The interval that calls the main
 *                                    function of the game
 */
export function resume_game(update: () => void,
                            pause_menu: HTMLDivElement,
                            interval: NodeJS.Timeout) {
    interval = setInterval(update, 1000 / 10);
    pause_menu.innerText = "Press SPACE to pause";
    print_pause(pause_menu);
}

/**
 * Draws the snake
 *
 * @param {CanvasRenderingContext2D} context - The rendering context
 * @param {snake} player - The snake
 * @param {number} block_size - The size of the blocks in the game grid
 */
export function color_in_snake(context: CanvasRenderingContext2D,
                               player: snake,
                               block_size: number): void {
    for (let i = 0; i < player.snake_body.length; i++) {
        let color: string = gradient(i);
        context.fillStyle = color;
        context.fillRect(player.snake_body[i][0] * block_size,
                            player.snake_body[i][1] * block_size,
                            block_size,
                            block_size);
    }
}

/**
 * Draws the red snake
 *
 * @param {CanvasRenderingContext2D} context - The rendering context
 * @param {snake} player - The snake to color in
 * @param {number} block_size - Size of blocks in the gam egrid
 */
export function color_in_snake_red(context: CanvasRenderingContext2D,
                                   player: snake,
                                   block_size: number): void {
    for (let i = 0; i < player.snake_body.length; i++) {
        let color: string = red_gradient(i);
        context.fillStyle = color;
        context.fillRect(player.snake_body[i][0] * block_size,
                            player.snake_body[i][1] * block_size,
                            block_size,
                            block_size);
    }
}
/**
 * Displays the pause menu
 *
 * @param {HTMLDivElement} pause_menu - The pause menu element
 */
export function print_pause(pause_menu: HTMLDivElement): void {
    document.body.appendChild(pause_menu);
}

/**
 * Displays game over screen
 *
 * @param {Document} document - The HTML document
 * @param {NodeJS.Timeout} interval - The interval that calls the main
 *                                    function of the game
 */
export function print_game_over(document: Document,
                                interval: NodeJS.Timeout): void {
    //Creates game over text and vishuals
    const game_over: HTMLDivElement = document.createElement("div");
    game_over.textContent = "GAME OVER";
    game_over.style.position = "relative";
    game_over.style.top = "-380px";
    game_over.style.left = "0";
    game_over.style.color = "white";
    game_over.style.fontFamily = "Press Start 2P, monospace";
    game_over.style.fontSize = "100px";

    // Append the game over text element to the board container
    document.body.appendChild(game_over);

    clearInterval(interval)
}

export function print_game_over_2p(document: Document,
                                   interval: NodeJS.Timeout,
                                   winner: string) : void {

    const game_over: HTMLDivElement = document.createElement("div");
    if (winner == "tie") {
        game_over.textContent = "Tie!";
    } else if (winner == "player1") {
        game_over.textContent = "Winner is player one!";
    } else if (winner == "player2") {
        game_over.textContent = "Winner is player two!";
    }

    game_over.style.position = "relative";
    game_over.style.top = "-380px";
    game_over.style.left = "0";
    game_over.style.color = "white";
    game_over.style.fontFamily = "Press Start 2P, monospace";
    game_over.style.fontSize = "55px";

    // Append the game over text element to the board container
    document.body.appendChild(game_over);

    clearInterval(interval)
    }

/**
 * Paints the board
 *
 * @param {HTMLCanvasElement} board - The board as a canvas element
 * @param {CanvasRenderingContext2D} context - The canvas 2D rendering context
 */
export function paint_board(board: HTMLCanvasElement,
                            context: CanvasRenderingContext2D): void {

    // Color in the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height);
}

/**
 * Paints the food
 *
 * @param {number} block_size - The size of the blocks in the game grid
 * @param {number} food_x - The X coordinate of the food
 * @param {number} food_y - The Y coordinate of the food
 * @param {CanvasRenderingContext2D} context - The rendering context
 */
export function paint_food(block_size: number,
                           food_x: number,
                           food_y: number,
                           context: CanvasRenderingContext2D): void {
    // Color in the food
    context.fillStyle = "red";
    context.beginPath();
    context.arc(food_x * block_size + block_size / 2,
                food_y * block_size + block_size / 2,
                block_size / 2,
                0,
                Math.PI * 2);
    context.fill();
}

/**
 * Paints the food with a specified color
 *
 * @param {number} block_size - The size of the blocks in the game grid
 * @param {number} food_x - The X coordinate of the food
 * @param {number} food_y - The Y coordinate of the food
 * @param {string} color - The desired color of the food
 * @param {CanvasRenderingContext2D} context - The rendering context
 */
export function paint_food_color(block_size: number,
    food_x: number,
    food_y: number,
    color: string,
    context: CanvasRenderingContext2D): void {

    // Color in the food
    context.fillStyle = color;
    context.beginPath();
    context.arc(food_x * block_size + block_size / 2,
                food_y * block_size + block_size / 2,
                block_size / 2,
                0,
                Math.PI * 2);
    context.fill();
}

/**
 * Checks if the snake has eaten the food.
 *
 * @param {snake} player - The snake object
 * @param {number} food_x - The X coordinate of the food
 * @param {number} food_y - The Y coordinate of the food
 * @returns {boolean} - True if the snake has eaten the food, false otherwise
 */
export function food_eaten(player: snake,
                           food_x: number,
                           food_y: number): boolean {

    // Eat the food
    if (player.head_x == food_x && player.head_y == food_y) {
        player.snake_body.push([food_x, food_y]);
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
 * @param {HTMLImageElement} head_up - Image of the snake heading up
 * @param {HTMLImageElement} head_down  - Image of the snake heading down
 * @param {HTMLImageElement} head_left  - Image of the snake heading left
 * @param {HTMLImageElement} head_right  - Image of the snake heading right
 * @param {number} block_size - The size of the blocks in the game grid
 */
export function move_snake(player: snake,
                           context: CanvasRenderingContext2D,
                           head_up: HTMLImageElement,
                           head_down: HTMLImageElement,
                           head_left: HTMLImageElement,
                           head_right: HTMLImageElement,
                           block_size: number): void {

    // Make body follow head
    for (let i = player.snake_body.length - 1; i > 0; i--) {
        player.snake_body[i] = player.snake_body[i - 1];
    }
    if (player.snake_body.length) {
        player.snake_body[0] = [player.head_x, player.head_y];
    }
        // Move the head
        player.head_x += player.velocity_x;
        player.head_y += player.velocity_y;
        draw_snake_head(player,
                      context,
                      head_up,
                      head_down,
                      head_left,
                      head_right,
                      block_size);
}

/**
 * Checks if the game is over.
 *
 * @param {snake} player - The snake object
 * @param {number} rows - The number of rows in the game grid
 * @param {number} cols - The number of columns in the game grid
 * @returns {boolean} - True if the game is over, false otherwise
 */
export function is_game_over(player: snake,
                             rows: number,
                             cols: number): boolean {

    //Set game to game over if relevant
    for (let i = 0; i < player.snake_body.length; i++) {
        if (player.head_x == player.snake_body[i][0] &&
                player.head_y == player.snake_body[i][1]) {
            return true;
        }
    }

    if (player.head_x < 0 ||
        player.head_x > (cols - 1) ||
        player.head_y < 0 ||
        player.head_y > (rows - 1)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Displays the score
 *
 * @param {HTMLDivElement} score_counter - The element that displays the score
 * @param {number} score - The current score of the game
 */
export function display_score(score_counter: HTMLDivElement,
                              score: number): void {

    //Visuals for score counter
    score_counter.style.position = "relative";
    score_counter.style.top = "0";
    score_counter.style.left = "0";
    score_counter.style.color = "black";
    score_counter.style.fontFamily = "Press Start 2P, monospace";
    score_counter.style.fontSize = "20px";
    score_counter.textContent = "SCORE: " + score;

    // Append the score counter element to the board container
    document.body.appendChild(score_counter);
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