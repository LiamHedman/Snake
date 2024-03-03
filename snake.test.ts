import { snake, changeDirection } from "./exports";
import { JSDOM } from "jsdom";

describe("classic game testing", () => {
    test("Try to change direction of snake", () => {
        const dom = new JSDOM();
        const window = dom.window;

        let player: snake = { snake_direction: "up",
                              velocityX: 0,
                              velocityY: -1,
                              has_turned: false,
                              snake_body: [[4, 4]],
                              headX: 4,
                              headY: 4,
                              head_last_cords: [4, 4]};

        const arrow_right = new window.KeyboardEvent('keydown', { code: "ArrowRight" });
        
        changeDirection(arrow_right, player);
        expect(player.snake_direction).toBe("right");
        expect(player.has_turned).toBe(true);
        // Try to turn again, should not be possible and continue heading right
        const arrow_up = new window.KeyboardEvent('keydown', { code: "ArrowUp" });
        changeDirection(arrow_right, player);
        expect(player.snake_direction).toBe("right");
        // Try to do a 180, reset has_turned to false to test this
        player.has_turned = false;
        const arrow_left = new window.KeyboardEvent('keydown', { code: "ArrowLeft" });
        changeDirection(arrow_left, player);
        expect(player.snake_direction).toBe("right");
    })
}
);