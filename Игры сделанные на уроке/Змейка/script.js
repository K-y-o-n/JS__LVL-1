var gameState = {
  snake: [],
  lastKey: '',
  treat: {},
}

function getRandomPos() {
  return Math.floor(Math.random() * 13)
}

function addTreat() {
  var x = getRandomPos()
  var y = getRandomPos()

  if (gameState.snake.some(pos => pos.x === x && pos.y == y)) {
    x = getRandomPos()
    y = getRandomPos()
  }

  gameState.treat = { x, y }
}

function resetGame() {
  gameState.snake = [
    { x: 6, y: 6 },
    { x: 6, y: 5 },
  ]
  gameState.lastKey = ''
  addTreat()
}

function drawBoard() {
  var gameDiv = document.getElementById('gameBoard')
  for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 13; j++) {
      var gameCell = document.createElement('div')
      gameCell.setAttribute('id', `${j}-${i}`)
      gameDiv.append(gameCell)
    }
  }
  gameState.snake = [
    { x: 6, y: 6 },
    { x: 6, y: 5 },
  ]

  addTreat()

  window.addEventListener('keydown', e => moveSnake(e.key))
}

function updateBoard() {
  for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 13; j++) {
      var gameCell = document.getElementById(`${j}-${i}`)
      gameCell.className = ''
    }
  }

  gameState.snake.forEach(pos => {
    var snakeCell = document.getElementById(`${pos.x}-${pos.y}`)
    snakeCell.className = 'snake'
  })
  var snakeHeadPos = gameState.snake[0]
  var varSnakeHeadCell = document.getElementById(`${snakeHeadPos.x}-${snakeHeadPos.y}`)
  varSnakeHeadCell.className = 'snakeHead'

  var treat = gameState.treat
  var treatCell = document.getElementById(`${treat.x}-${treat.y}`)
  treatCell.className = 'treat'
}

function moveSnake(key) {
  var snakeHead = gameState.snake[0]

  if (key === 'ArrowUp' && gameState.lastKey !== 'ArrowDown' && gameState.lastKey!=='') {
    gameState.snake.unshift({ x: snakeHead.x, y: snakeHead.y - 1 })
  } else if (key === 'ArrowDown' && gameState.lastKey !== 'ArrowUp') {
    gameState.snake.unshift({ x: snakeHead.x, y: snakeHead.y + 1 })
  } else if (key === 'ArrowLeft' && gameState.lastKey !== 'ArrowRight') {
    gameState.snake.unshift({ x: snakeHead.x - 1, y: snakeHead.y })
  } else if (key === 'ArrowRight' && gameState.lastKey !== 'ArrowLeft') {
    gameState.snake.unshift({ x: snakeHead.x + 1, y: snakeHead.y })
  } else {
    return
  }

  var newHeadPos = gameState.snake[0]
  if (newHeadPos.x === gameState.treat.x && newHeadPos.y === gameState.treat.y) {
    addTreat()
  }
  // ???????????????? ???? ?????????????? ????????
  else if (newHeadPos.x < 0 || newHeadPos.x > 12 || newHeadPos.y < 0 || newHeadPos.y > 12) {
    alert(`???? ??????????????????! ???? ?????????????????? ?? ?????????????? :( ?????? ???????? ${gameState.snake.length - 3}`)
    resetGame()
  }
  // ???????????????? ???? ???????????????? ?????????? ????????
  else if (gameState.snake.some((pos,i) => i>0 && newHeadPos.x === pos.x && newHeadPos.y === pos.y)) {
    alert(`???? ??????????????????! ???? ?????????? ???????? ???????? :( ?????? ???????? ${gameState.snake.length - 3}`)
    resetGame()
  } else {
    gameState.snake.splice(-1, 1)
  }

  gameState.lastKey = key

  updateBoard()
}

function init() {
  drawBoard()
  updateBoard()

  setInterval(() => {
    if (gameState.lastKey) {
      moveSnake(gameState.lastKey)
    }
  }, 1000 )
}

window.onload = init
