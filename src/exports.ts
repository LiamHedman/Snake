export type coordinate = barrier | fruit | null
export type barrier = string
export type fruit = string 
export type snake = Array<barrier>
export type map = Array<Array<coordinate>>

export const map: map = make_empty_map(20);

export function make_empty_map(size: number): map {
    const map: coordinate[][] = [];
    for (let i = 0; i < size; i++) {
        const row: coordinate[] = [];
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

export function is_fruit(coordinate: coordinate): boolean {
    return coordinate === "fruit"
        ? true
        : false;
}

export function is_barrier(coordinate: coordinate): boolean {
    return coordinate === "barrier"
        ? true
        : false;
}

export function turn_right(): void {
    const right_coord: coordinate = Map;
    if (is_barrier(right_coord)) {

    }
}