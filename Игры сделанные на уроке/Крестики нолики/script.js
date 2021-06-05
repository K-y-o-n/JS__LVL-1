var gameState = {
  tiles: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],

  isPlayerOneMove: true,
}

function checkRows() {
  var winner = ''
  for (var i = 0; i < 3; i++) {
    var row = gameState.tiles[i]

    if (row.every(tile => tile === row[0]) && row[0] !== '') {
      flag = true
      winner = row[0]
      break
    }
  }
  return winner
}

function checkColumns() {
  var winner = ''

  if (
    gameState.tiles[0][0] === gameState.tiles[1][0] &&
    gameState.tiles[1][0] === gameState.tiles[2][0] &&
    gameState.tiles[0][0] !== ''
  ) {
    winner = gameState.tiles[0][0]
  }

  if (
    gameState.tiles[0][1] === gameState.tiles[1][1] &&
    gameState.tiles[1][1] === gameState.tiles[2][1] &&
    gameState.tiles[0][1] !== ''
  ) {
    winner = gameState.tiles[0][1]
  }

  if (
    gameState.tiles[0][2] === gameState.tiles[1][2] &&
    gameState.tiles[1][2] === gameState.tiles[2][2] &&
    gameState.tiles[0][2] !== ''
  ) {
    winner = gameState.tiles[0][2]
  }

  return winner
}

function checkDiagonal() {
  var winner = ''

  if (
    gameState.tiles[0][0] === gameState.tiles[1][1] &&
    gameState.tiles[1][1] === gameState.tiles[2][2] &&
    gameState.tiles[0][0] !== ''
  ) {
    winner = gameState.tiles[0][0]
  }

  if (
    gameState.tiles[0][2] === gameState.tiles[1][1] &&
    gameState.tiles[1][1] === gameState.tiles[2][0] &&
    gameState.tiles[0][2] !== ''
  ) {
    winner = gameState.tiles[0][2]
  }

  return winner
}

function checkWinner() {
  var winner = checkRows() || checkColumns() || checkDiagonal()

  if (winner !== '') {
    console.log('Выграли ' + winner)
    gameState.tiles = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
    gameState.isPlayerOneMove = true
  }
}

function drawGameboard() {
  var gameDiv = document.getElementById('gameWrapper')

  gameState.tiles.forEach((row, i) => {
  // gameState.tiles.forEach(function(row, i) {
    row.forEach((tile, j) => {
      var t = document.createElement('div')
      t.classList.add('tile')
      t.setAttribute('id', `${i}${j}`)

      gameDiv.appendChild(t)
    })
  })
}

function drawGame() {
  gameState.tiles.map((row, i) => {
    row.map((tile, j) => {
      var tileDiv = document.getElementById(`${i}${j}`)

      var src = ''

      if (tile === 'x') {
        src = 'cross.png'
      } else if (tile === 'o') {
        src = 'circle.png'
      }

      var image = document.createElement('img')
      image.src = 'images/circle.png'

      tileDiv.innerHTML = src ? `<img class="tileImage" src="${src}">` : ''
    })
  })
}

function onDivClick(e) {
  var id = e.target.id
  gameState.tiles[parseInt(id[0])][parseInt(id[1])] = gameState.isPlayerOneMove ? 'x' : 'o'
  gameState.isPlayerOneMove = !gameState.isPlayerOneMove

  drawGame()
  checkWinner()
}

function init() {
  drawGameboard()
  drawGame()

  var tiles = document.getElementsByClassName('tile')

  for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', onDivClick)
  }
}

window.onload = init

var items = [{ price: 123, item: '' }]
