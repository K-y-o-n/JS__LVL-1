// Задание 1

function createCell() {
  let board = document.querySelector(".board");

  for (let i = 0; i < 8; i++) {
    if (i % 2 == 0) {
      for (let j = 0; j < 8; j++) {
        let cell = document.createElement("div");
        if (j % 2 != 0) {
          cell.className = "cell black"
          board.append(cell);
        } else {
          cell.className = "cell";
          board.append(cell);
        }
      }
    } else {
      for (let j = 0; j < 8; j++) {
        let cell = document.createElement("div");
        if (j % 2 == 0) {
          cell.className = "cell black"
          board.append(cell);
        } else {
          cell.className = "cell"
          board.append(cell);
        }
      }
    }
  }
  setCellNumber();
  setCellLetter();
}

function setCellNumber() {
  let boardCell = document.querySelectorAll(".cell");

  for (let i = 0; i < 64; i = i + 8) {
    let cellWithNum = boardCell[i];
    cellWithNum.classList.add("number");
  }

}

function setCellLetter() {
  let boardCell = document.querySelectorAll(".cell");

  for (let i = 56; i <= 64; i++) {
    let cellWithLetter = boardCell[i];
    cellWithLetter.classList.add("letter");
  }
}




//---------------------------------------------------------------------------

function init() {
  createCell(),
    shop()
}

window.onload = init;