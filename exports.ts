export const gameBoard = document.querySelector("#gameBoard") as HTMLCanvasElement;
export const ctx = gameBoard.getContext("2d");
export type coordinate = [number, number]// barrier | fruit | null
export type content = barrier | fruit | null
export type barrier = string
export type fruit = string 
export type snake = { cords: Array<coordinate>, direction: "up" | "down" | "left" | "right"}
export type map = Array<Array<content>>
const map_size = 20;
const tick_rate = 100;

export const map_: map = make_empty_map(map_size);

window.addEventListener("keydown", turn)

export function make_empty_map(size: number): map {
    const map: content[][] = [];
    for (let i = 0; i < size; i++) {
        const row: content[] = [];
        for (let j = 0; j < size; j++) {
            row.push(null);
        }
        map.push(row);
    }
    return map;
}

export function is_empty(coordinate: coordinate): boolean {
    return coordinate === null      
        ? true
        : false;
}

export function is_fruit(content: content): boolean {
    return content === "fruit"
        ? true
        : false;
}

export function is_barrier(content: content): boolean {
    return content === "barrier"
        ? true
        : false;
}
/** 
export function turn_right(): void {
    const right_coord: coordinate = Map;
    if (is_barrier(right_coord)) {

    }
}*/

export function turn(event): void {
    const key = event.keyCode
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch(key) {
        case LEFT:
            snake_.direction = snake_.direction === "up" || snake_.direction === "down" ? "left" : snake_.direction;
            break;
        case UP:
            snake_.direction = snake_.direction === "left" || snake_.direction === "right" ? "up" : snake_.direction;
            break;
        case RIGHT:
            snake_.direction = snake_.direction === "up" || snake_.direction === "down" ? "right" : snake_.direction;
            break;
        case DOWN:
            snake_.direction = snake_.direction === "left" || snake_.direction === "right" ? "down" : snake_.direction;
            break;
    }
}

export function move_snake(snake: snake) : void {
    let empty_slot = snake.cords[0];
    
    if (snake.direction === "up") {
        snake.cords[0] = [snake.cords[0][0], snake.cords[0][1] - 1];
    } else if (snake.direction === "down") {
        snake.cords[0] = [snake.cords[0][0], snake.cords[0][1] + 1];
    } else if (snake.direction === "left") {
        snake.cords[0] = [snake.cords[0][0] - 1, snake.cords[0][1]]
    } else if (snake.direction === "right") {
        snake.cords[0] = [snake.cords[0][0] + 1, snake.cords[0][1]]
    } 

    
    for (let i = 1; i < snake.cords.length; i++) {
        const temp = snake.cords[i]
        snake.cords[i] = empty_slot;
        empty_slot = temp;
    }
}

export function clear_canvas() {
    for (let i = 0; i < map_size; i++) {
        for (let j = 0; j < map_size; j++) {
            ctx.clearRect(i * 25, j * 25, 25, 25);
        }
    }
}

// Dålig funktion :(
export function spawn_fruit(snake) {
    let fruit_cords = [Math.floor(Math.random() * (map_size+ 1))]

    return fruit_cords;
}

export function game_over() : void {
    ctx.font = `40px Verdana`
    ctx.fillText("GAME OVER", 130, 250)
}

// Main function to call
function update() {
    //clear_canvas()
    move_snake(snake_)
    if (snake_.cords[0][0] >= map_size || snake_.cords[0][1] >= map_size) {
        game_over()
        clearInterval(interval)
    } else {
        ctx.clearRect(0, 0, map_size * 25, map_size * 25)
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        for (let i = 0; i < snake_.cords.length; i++) {
            ctx.fillRect(snake_.cords[i][0] * 25, snake_.cords[i][1] * 25, 25, 25)
        }
    }  
}


let snake_: snake = {cords: [[0, 2], [0, 1], [0,0]], direction: "down"}



const interval = setInterval(update, tick_rate);