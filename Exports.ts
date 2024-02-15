type coordinate = {
    x: number
    y: number
    content: snake | fruit
}
type fruit = string
type snake = Array<coordinate>

function is_emty(coordinate: coordinate) {
    return coordinate.content === null      
        ? true
        : false;
}