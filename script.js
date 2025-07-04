let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

const winPatterns = [ //wining condition
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let playerO = true;

// Handle player move
boxes.forEach(function (box) {
  box.addEventListener("click", function () {
    if (box.innerHTML === "") {
      if (playerO) {
        box.style.color = "red";
        box.innerHTML = "O";
      } else {
        box.style.color = "black";
        box.innerHTML = "X";
      }
      playerO = !playerO;
      checkWinner(); // Call after every move
    }
  });
});

// Reset game
reset.addEventListener("click", function () {
  boxes.forEach(function (box) {
    box.innerHTML = "";
    box.disabled = false;
    box.style.color = "";
  });

  playerO = true;
  msgContainer.classList.add("hide");
  msg.innerText = "";
  reset.innerHTML = "Reset Game";
});

// Show winner
const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  reset.innerHTML = "New Game";
  disableBoxes();
};

// Game Draw
const gameDraw = () => {
  msg.innerText = `😐 Game was a Draw.`;
  msgContainer.classList.remove("hide");
  reset.innerHTML = "New Game";
  disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Check win or draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }

  // Check for draw
  let allFilled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    gameDraw();
  }
};
