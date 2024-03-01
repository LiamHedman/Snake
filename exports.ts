export type snake = {snake_direction: "up" | "down" | "left" | "right", 
                    velocityX: number,
                    velocityY: number,
                    has_turned: boolean,
                    snake_body: Array<cords>,
                    headX: number,
                    headY: number}

export type cords = [number, number];
