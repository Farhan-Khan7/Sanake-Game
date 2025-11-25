const board = document.querySelector(".board");

const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }


const blocks = [];
const snake = [
    {
        x: 0, y: 0
    },

]
let direction = 'down';
let IntervalId = null;


for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div")
        block.classList.add("block");
        board.appendChild(block);
        block.innerText = `${row}-${col}`;
        blocks[`${row}-${col}`] = block
    }
}

function render() {

    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add("food")

    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        alert("Game Over")
        clearInterval(IntervalId)
    }

    if(food.x == head.x && food.y == head.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        snake.unshift(head)
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }


    }


    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");

    })


    snake.unshift(head)
    snake.pop()

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })


}

IntervalId = setInterval(() => {

    render()
}, 300)

addEventListener("keydown", (event) => {

    if (event.key == "ArrowLeft") {
        direction = "left"
    } else if (event.key == "ArrowRight") {
        direction = "right"
    } else if (event.key == "ArrowUp") {
        direction = "up"
    } else if (event.key == "ArrowDown") {
        direction = "down"
    }
})