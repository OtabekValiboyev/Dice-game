const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdScoreBtn = document.querySelector(".btn--hold");
const diceImg = document.querySelector(".dice");

diceImg.style.display = "none";

let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let gameOver = true;

function setDice() {
  if (gameOver) {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer == 1 ? 0 : 1;
    document.querySelector(".player--0").classList.toggle("player--active");
    document.querySelector(".player--1").classList.toggle("player--active");
  }
}

rollDiceBtn.addEventListener("click", () => {
  if (gameOver) {
    diceImg.style.display = "block";
    const random = Math.floor(Math.random() * 6 + 1);
    diceImg.src = `img/dice-${random}.png`;
    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      setDice();
    }
  }
});

holdScoreBtn.addEventListener("click", () => {
  if (gameOver) {
    diceImg.style.display = "none";
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      gameOver = false;
    } else {
      setDice();
    }
  }
});

newGameBtn.addEventListener("click", () => {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  gameOver = true;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.getElementById(`score--0`).textContent = score[0];
  document.getElementById(`score--1`).textContent = score[1];
  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.remove("player--winner");
  diceImg.style.display = "none";
});
