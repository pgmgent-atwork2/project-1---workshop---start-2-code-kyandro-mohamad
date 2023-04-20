// Het verkrijgen van DOM-elementen
const cards = document.querySelectorAll(".card");
const cardImage = document.querySelectorAll(".card-image");
const start = document.querySelector(".start");

// Variabelen declareren en initialiseren

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Eventlistener voor het omdraaien van kaarten

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

// Functie om te controleren op een overeenkomst

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

// Functie om te zorgen dat je niet meer op de kaarten kan klikken

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
}

// Functie om kaarten om te draaien

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

// Functie om het bord te resetten

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  if (document.querySelectorAll(".matched").length === cards.length) {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

// Functie om de kaarten te schudden

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// Eventlisteners toevoegen aan de kaarten
cards.forEach((card) => card.addEventListener("click", flipCard));

// Functie shuffle wordt aangeroepen
shuffle();

// Eventlistener toevoegen aan de startknop
start.addEventListener("click", () => {
  cards.forEach((card) => {
    card.children[0].style.display = "flex";
    setTimeout(() => {
      card.children[0].style.display = "none";
    }, 3000);
  });
});
