const cards = document.querySelectorAll(".card");
const cardImage = document.querySelectorAll(".card-image");
const start = document.querySelector(".start");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flipped");
  this.children[0].style.display = "flex";
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}
function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1500);
  setTimeout(() => {
    firstCard.children[0].style.display = "none";
    secondCard.children[0].style.display = "none";
  }, 1499);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  if (document.querySelectorAll(".matched").length === cards.length) {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}
cards.forEach((card) => card.addEventListener("click", flipCard));
shuffle();
start.addEventListener("click", () => {
  cards.forEach((card) => {
    card.children[0].style.display = "flex";
    setTimeout(() => {
      card.children[0].style.display = "none";
    }, 3000);
  });
});
