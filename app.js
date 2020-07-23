const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('span');
const startButton = document.querySelector('.start');

function createBoard() {
  for(let i=0 ; i<100 ; i++) {
    var divBlock = document.createElement('div');
    divBlock.setAttribute('id', i);
    grid.appendChild(divBlock);
  }
}
createBoard();

const squares = document.querySelectorAll('.grid div');//0-99 divs(squares)
let width;
width = 10;//coz 1 row contains 10 blocks
let appleIndex = 0;
let currentSnake = [2,1,0];//HEAD - 2nd div, TAIL - 0, 1 - BODY
let direction = 1;//1-right -1-left 10-down(div+10 makes snake go down)
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

//start-restart game
function startGame() {
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  squares[appleIndex].classList.remove('apple');
  clearInterval(interval);
  score = 0;
  direction = 1; //right
  scoreDisplay.innerText = score;
  intervalTime = 1000;
  currentSnake = [2,1,0];
  currentSnake.forEach(index => squares[index].classList.add('snake'));
  randomApple();
  interval = setInterval(moveOutcomes, intervalTime);
}

function moveOutcomes() {
  //hitting wall(width 10 & last row contains 90-99)
  if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      alert("Game Over! Press Start to play again!");
      return clearInterval(interval); //clear the interval if any of the above happen
    }
    //snake movement
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction) //add at starting(becomes HEAD)
    squares[currentSnake[0]].classList.add('snake')

    //snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
}

function randomApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while(squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

//using keycodes for arrow keys '<- 37' 'up 38' '-> 39' 'down 40'
function control(e) {
  if(e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}
  document.addEventListener('keyup', control);
  startButton.addEventListener('click',startGame);
