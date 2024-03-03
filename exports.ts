export type snake = {snake_direction: "up" | "down" | "left" | "right", 
                    velocityX: number,
                    velocityY: number,
                    has_turned: boolean,
                    snake_body: Array<cords>,
                    headX: number,
                    headY: number}

export type cords = [number, number];

export function scoreUpdate(scoreCounter: HTMLDivElement ,score: number): number {
    let new_score = score + Math.floor(Math.random() * 5 + 5);
    scoreCounter.textContent = "SCORE: " + new_score;
    return new_score;
}

//Loads the correct imiage of the snake head depending on the direction
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

//Chnges the direction of the snake 
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

//Spawns food in random position
export function spawnFood(player: snake): [number, number] {
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
            return spawnFood(player); // Recursively call the function to get new coordinates
        }
    }

    // Return the tuple with food coordinates
    return [foodX, foodY];
}


//Changes the gradient of the snake body
export function gradient(distanceFromHead: number): string {
    let green: number = 150 - distanceFromHead * 3;
    let red: number = Math.min(100, distanceFromHead * 3);
    return `rgb(${red}, ${green}, 0)`;
}

//Mechanics for Pause
export function PauseGame(PauseMenu: HTMLDivElement) {
    clearInterval(interval);
                PauseMenu.innerText = "Press SPACE to resume";
                print_pause(document, interval);
            }

//Mechanics for Resume
export function ResumeGame() {
    interval = setInterval(update, 1000 / 10);
    PauseMenu.innerText = "Press SPACE to pause";
    print_pause(document, interval);
}

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

export function print_pause(document: Document, interval: intervalID): void {
    document.body.appendChild(PauseMenu);
}

export function print_game_over(document: Document, interval): void {
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

export function paint_board(board: HTMLCanvasElement, context: CanvasRenderingContext2D): void {

    // Color in the board
    context.fillStyle = "rgb(0, 51, 102)";
    context.fillRect(0, 0, board.width, board.height);
}

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

export function food_eaten(player: snake, foodX: number, foodY: number): boolean {

    // Eat the food
    if (player.headX == foodX && player.headY == foodY) {
        player.snake_body.push([foodX, foodY]);
        return true;
    } else {
        return false;
    }
}

export function move_snake(player: snake): void {

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