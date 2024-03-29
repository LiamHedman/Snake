import {snake,
        change_direction,
        tie_check,
        score_update,
        change_direction_2p,
        spawn_food,
        gradient,
        red_gradient,
        food_eaten,
        is_game_over,
        pause_game,
        resume_game,
        move_snake} from "./exports";
import { JSDOM } from "jsdom";

jest.useFakeTimers(); // Use fake timers for setTimeout and setInterval

global.Image = jest.fn().mockImplementation(() => ({
    // Mock the onload method
    onload: null,
}));

describe("Testing all functions that can be tested in jest", () => {
    test("change_direction", () => {
        const dom = new JSDOM();
        const window = dom.window;

        let player: snake = { snake_direction: "up",
                              velocity_x: 0,
                              velocity_y: -1,
                              has_turned: false,
                              snake_body: [[4, 4]],
                              head_x: 4,
                              head_y: 4,
                              head_last_cords: [4, 4]};

        const arrow_right = new window.KeyboardEvent('keydown',
                                                    {code: "ArrowRight"});
        
        change_direction(arrow_right, player);
        expect(player.snake_direction).toBe("right");
        expect(player.has_turned).toBe(true);
        // Try to turn again, should not be possible and continue heading right
        const arrow_up = new window.KeyboardEvent('keydown',
                                                  {code: "ArrowUp"});
        change_direction(arrow_right, player);
        expect(player.snake_direction).toBe("right");
        // Try to do a 180, reset has_turned to false to test this
        player.has_turned = false;
        const arrow_left = new window.KeyboardEvent('keydown',
                                                    {code: "ArrowLeft"});
        change_direction(arrow_left, player);
        expect(player.snake_direction).toBe("right");
    });
    
    test("tie_check", () => {
        let player1: snake = {
            snake_direction: "right",
            velocity_x: 1,
            velocity_y: 0,
            has_turned: false,
            snake_body: [[3, 5], [3, 4], [3, 3]],
            head_x: 5,
            head_y: 3,
            head_last_cords: [3, 4]
        };

        let player2: snake = {
            snake_direction: "left",
            velocity_x: 1,
            velocity_y: 0,
            has_turned: false,
            snake_body: [[3, 5], [3, 6], [3, 7]],
            head_x: 5,
            head_y: 3,
            head_last_cords: [3, 6]
        };

        expect(tie_check(player1, player2)).toBe(true);

        player1 = {
            snake_direction: "right",
            velocity_x: 1,
            velocity_y: 0,
            has_turned: false,
            snake_body: [[4, 5], [4, 4], [4, 3]],
            head_x: 4,
            head_y: 4,
            head_last_cords: [4, 4]
        };

        expect(tie_check(player1, player2)).toBe(false);
    });

    test("score_update", () => {
        const dom = new JSDOM('<!DOCTYPE html><div id="scoreCounter"></div>');
        global.document = dom.window.document;
        const scoreCounter = document.getElementById("scoreCounter") as HTMLDivElement;

        let score = 10;
        score = score_update(scoreCounter, score);
        
        expect(score).toBeGreaterThan(10); 
        expect(scoreCounter.textContent).toBe("SCORE: " + score);
    });

    test("change_direction_2p", () => {
        const dom = new JSDOM();
        global.document = dom.window.document;

        let player1: snake = {
            snake_direction: "up",
            velocity_x: 0,
            velocity_y: -1,
            has_turned: false,
            snake_body: [[4, 4]],
            head_x: 4,
            head_y: 4,
            head_last_cords: [4, 4]
        };

        let player2: snake = {
            snake_direction: "right",
            velocity_x: 1,
            velocity_y: 0,
            has_turned: false,
            snake_body: [[8, 4]],
            head_x: 8,
            head_y: 4,
            head_last_cords: [8, 4]
        };

    
        const keyEventPlayer1 = new dom.window.KeyboardEvent('keydown', { code: "ArrowUp" });

        change_direction_2p(keyEventPlayer1, player1, player2);

        // Expect player 1's snake direction to not change
        expect(player1.snake_direction).toBe("up");
        expect(player1.velocity_x).toBe(0);
        expect(player1.velocity_y).toBe(-1);
        expect(player1.has_turned).toBe(false);

        // Ensure player 2's snake direction changes
        expect(player2.snake_direction).toBe("up");
        expect(player2.velocity_x).toBe(0);
        expect(player2.velocity_y).toBe(-1);
        expect(player2.has_turned).toBe(true);
    });

    test("spawn_food", () => {
        const player: snake = {
            snake_direction: "up",
            velocity_x: 0,
            velocity_y: -1,
            has_turned: false,
            snake_body: [[1, 1], [1, 2], [1, 3]],
            head_x: 4,
            head_y: 4,
            head_last_cords: [4, 4]
        };

        const cols = 25;
        const rows = 25;
        const [food_x, food_y] = spawn_food(player, cols, rows);

        expect(food_x).toBeGreaterThanOrEqual(0);
        expect(food_x).toBeLessThan(cols);
        expect(food_y).toBeGreaterThanOrEqual(0);
        expect(food_y).toBeLessThan(rows);

        expect(player.snake_body.every(([x, y]) => !(x === food_x && y === food_y))).toBe(true);
        expect(player.head_x !== food_x || player.head_y !== food_y).toBe(true);
    });

    test("gradient and red_gradient", () => {
        // We manually calculate the values and checked if they were the same
        expect(gradient(0)).toBe("rgb(0, 150, 0)");
        expect(gradient(3)).toBe("rgb(9, 141, 0)");
        expect(gradient(6)).toBe("rgb(18, 132, 0)");
        expect(gradient(9)).toBe("rgb(27, 123, 0)");

        expect(red_gradient(0)).toBe("rgb(150, 0, 0)");
        expect(red_gradient(3)).toBe("rgb(141, 9, 0)");
        expect(red_gradient(6)).toBe("rgb(132, 18, 0)");
        expect(red_gradient(9)).toBe("rgb(123, 27, 0)");
    });

    test("is_game_over", () => {
        const player: snake = {
            snake_direction: "up",
            velocity_x: 0,
            velocity_y: -1,
            has_turned: false,
            snake_body: [[1, 1], [1, 2]],
            head_x: 1,
            head_y: 1,
            head_last_cords: [1, 1]
        };

        const food_x = player.head_x;
        const food_y = player.head_y;

        const food_eaten_ = food_eaten(player, food_x, food_y);

        expect(food_eaten_).toBe(true);
        expect(player.snake_body.length).toBe(3);
        expect(player.snake_body[2]).toEqual([food_x, food_y]);
    });

    test("is_game_over", () => {
        let player: snake = {
            snake_direction: "up",
            velocity_x: 0,
            velocity_y: -1,
            has_turned: false,
            snake_body: [[1, 1], [1, 2], [2, 2], [3, 2], [3, 1], [2, 1], [1, 1]],
            head_x: 1,
            head_y: 1,
            head_last_cords: [2, 1]
        };

        const cols = 25;
        const rows = 25;

        let gameOver = is_game_over(player, rows, cols);

        expect(gameOver).toBe(true);

        gameOver = false;

        player = {
            snake_direction: "up",
            velocity_x: 1,
            velocity_y: 0,
            has_turned: false,
            snake_body: [[25, 1]], 
            head_x: 25,
            head_y: 1,
            head_last_cords: [24, 1]
        };

        gameOver = is_game_over(player, rows, cols);

        expect(gameOver).toBe(true);
    });

    test("pause_game and resume_game", () => {
        const dom = new JSDOM();
        const window = dom.window;
        const pause_menu = window.document.createElement("div");
        const interval: NodeJS.Timeout = setInterval(() => {}, 1000); // Mock interval

        
        pause_game(pause_menu, interval);
        // Check if the pause_menu text is set correctly
        expect(pause_menu.innerText).toBe("Press SPACE to resume");

        resume_game(() => {}, pause_menu, interval);

        expect(pause_menu.innerText).toBe("Press SPACE to pause");
        clearInterval(interval);
    });

    test("move_snake", () => {
        // Mock canvas context
        const canvasContext = {
            drawImage: jest.fn(),
            fillRect: jest.fn(),
        };

        const player: snake = {
            snake_direction: "right",
            velocity_x: 1,
            velocity_y: 0,
            has_turned: false,
            snake_body: [[4, 4], [3, 4], [2, 4]],
            head_x: 4,
            head_y: 4,
            head_last_cords: [4, 4]
        };
        const image = new Image();
        image.src = "Bilder/HeadUp.png"
        move_snake(player, canvasContext as any, image, image, image, image, 10);

        // Check if the snake's head position is updated correctly
        expect(player.head_x).toBe(5);
        expect(player.head_y).toBe(4);

        // Check if the snake's body is moved correctly
        expect(player.snake_body[1]).toEqual([4, 4]);
        expect(player.snake_body[2]).toEqual([3, 4]); 
    });
});

