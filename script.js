const board = document.querySelector(".board");
const startbtn = document.querySelector(".btn-start")
const restartbtn = document.querySelector(".btn-restart")
const gameOver = document.querySelector(".game-over")
const startGame = document.querySelector(".start-game")
const modal = document.querySelector(".modal")

const highScoreElement = document.querySelector("#high-score")
const scoreElement = document.querySelector("#score")
const timerElement = document.querySelector("#time")


const blockHeight = 50;
const blockWidth = 50;

let highScore = localStorage.getItem("highScore") || 0;
let Score = 0;
let time = `00-00`;

highScoreElement.innerHTML = highScore

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }


const blocks = [];
let snake = [
    {
        x: 0, y: 0
    },

]
let direction = 'down';
let IntervalId = null;
let timeIntervalId = null;


for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div")
        block.classList.add("block");
        board.appendChild(block);
        // block.innerText = `${row}-${col}`;
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
        // alert("Game Over")
        clearInterval(IntervalId)
        modal.style.display = "flex"
        gameOver.style.display = "flex"
        startGame.style.display = "none"
        return
    }

    if (food.x == head.x && food.y == head.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        snake.unshift(head)
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }

        Score += 10;
        scoreElement.innerHTML = Score
        
        if(Score > highScore){
            highScore = Score;
            localStorage.setItem("highScore" , highScore.toString())
        }

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


startbtn.addEventListener("click", () => {
    modal.style.display = "none"
    IntervalId = setInterval(() => {
        render()
    }, 300)
    timeIntervalId = setInterval(() => {
        let [min , sec] = time.split("-").map(Number)
        if(sec == 59){
            min += 1;
            sec = 0;
        }else{
            sec += 1;
        }

        time = `${min}-${sec}`
        timerElement.innerHTML = time;
    } , 1000)

})

restartbtn.addEventListener("click", restartGame)


function restartGame() {
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");

    })

    Score = 0;
    scoreElement.innerHTML = Score
    highScoreElement.innerHTML = highScore
    modal.style.display = "none"
    direction = "down"
    snake = [ {x: 0, y: 0} ]
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    IntervalId = setInterval(() => {
        render()
    }, 300)    

}


