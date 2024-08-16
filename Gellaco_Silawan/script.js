const canvas = document.createElement('canvas');
const gameCanvas = document.getElementById('gameCanvas');
gameCanvas.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');

let snake = [{x: 200, y: 200}];
let snakeDirection = 'RIGHT';
let food = {x: 200, y: 200};
let score = 0;
let gameSpeed = 300; //speed of the snake ni ju hehe

const appleImage = new Image();
appleImage.src = 'apple.png'; 

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
}

function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};
    
    switch (snakeDirection) {
        case 'LEFT':
            head.x -= 20;
            break;
        case 'RIGHT':
            head.x += 20;
            break;
        case 'UP':
            head.y -= 20;
            break;
        case 'DOWN':
            head.y += 20;
            break;
    }
    
    snake.unshift(head);
    
   
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
    
    snake.forEach(segment => {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
        }
    });
}

function drawFood() {
    ctx.drawImage(appleImage, food.x, food.y, 20, 20); 
}

function checkCollision() {
    const head = snake[0];
    
    // Check if snake hits the walls ni ju hehe
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }
    
    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(game);
    alert(`BLEE! GAME OVER KA, SCORE MO ${score} LANG.`);
    resetGame();
}

function resetGame() {
    snake = [{x: 200, y: 200}];
    snakeDirection = 'RIGHT';
    food = {x: 200, y: 200};
    score = 0;
    document.getElementById('score').textContent = score;
    game = setInterval(gameLoop, gameSpeed);
}

function changeDirection(event) {
    const key = event.keyCode;
    
    switch(key) {
        case 37: // left arrow
            if (snakeDirection !== 'RIGHT') {
                snakeDirection = 'LEFT';
            }
            break;
        case 38: // up arrow
            if (snakeDirection !== 'DOWN') {
                snakeDirection = 'UP';
            }
            break;
        case 39: // right arrow
            if (snakeDirection !== 'LEFT') {
                snakeDirection = 'RIGHT';
            }
            break;
        case 40: // down arrow
            if (snakeDirection !== 'UP') {
                snakeDirection = 'DOWN';
            }
            break;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

document.addEventListener('keydown', changeDirection);

let game = setInterval(gameLoop, gameSpeed);
