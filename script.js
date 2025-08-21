let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");

let highScore = 0;
let highScoreDisplay = document.querySelector("#high-score");

// Retrieve high score from local storage
if (localStorage.getItem("simonHighScore")) {
    // console.log(localStorage.getItem("simonHighScore"))
    highScore = localStorage.getItem("simonHighScore");
    highScoreDisplay.innerText = highScore;
}

document.addEventListener("keypress", function () {
  if (started == false) {
    // console.log("game is started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = ["red", "orange", "aqua", "blue"][randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // Check and update highest score
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("simonHighScore", highScore);
      highScoreDisplay.innerText = highScore;
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Press any key to start again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

for (let btn of btns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}