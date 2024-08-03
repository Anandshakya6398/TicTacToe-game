let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let winner = document.querySelector(".winner-name");
let newBtn = document.querySelector(".new-btn");

let turnO = true; //player X, player Y

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

//console.log("hello");

printWinner = (name) => {
  if (name === "Draw") {
    winner.innerHTML = `Game is ${name}`;
  } else {
    winner.innerHTML = `Winner is ${name}`;
  }
  winner.classList.remove("hide");
  newBtn.classList.remove("hide");
  resetBtn.classList.add("hide");
};

enableButton = () => {
  boxes.forEach((box) => {
    box.disabled = false;
  });
};

disableButton = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

resetBtn.addEventListener("click", (e) => {
  resetGame();
});

resetGame = () => {
  enableButton();
  boxes.forEach((box) => {
    box.innerText = "";
  });
};

newBtn.addEventListener("click", (e) => {
  newGame();
});

newGame = () => {
  enableButton();
  boxes.forEach((box) => {
    box.innerText = "";
    winner.classList.add("hide");
    newBtn.classList.add("hide");
    resetBtn.classList.remove("hide");
  });
};

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (turnO) {
      turnO = false;
      box.innerText = "O";
    } else {
      turnO = true;
      box.innerText = "X";
    }
    box.disabled = true;
    checkWinner();
    checkNoWinner();
  });
});

const checkWinner = () => {
  //console.log(winningPattern);
  for (let pattern of winningPattern) {
    //console.log(pattern[0], pattern[1], pattern[2]);
    const pos1Val = boxes[pattern[0]].innerText;
    const pos2Val = boxes[pattern[1]].innerText;
    const pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        disableButton();
        printWinner(pos1Val);
      }
    }
  }
};

const checkNoWinner = () => {
  let count = 0;
  for (let box of boxes) {
    if (box.innerText != "") {
      count++;
    }
  }
  if (count === 9) {
    printWinner("Draw");
  }
};