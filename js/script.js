//NOTE - Об'єкт з зображеннями для кожного варіанту
const handOptions = {
  rock: "/assets/icon-rock.svg",
  paper: "/assets/icon-paper.svg",
  scissors: "/assets/icon-scissors.svg",
  lizard: "/assets/icon-lizard.svg",
  spock: "/assets/icon-spock.svg",
};

//NOTE - Початкове значення рахунку
let score = 0;

//NOTE - Об'єкт виграшу/програшу кожної руки
const winMatrix = {
  paper: ["rock", "spock"],
  rock: ["scissors", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
  scissors: ["paper", "lizard"],
};

//NOTE - Функція для вибору користувачем варіанту
const pickUserHand = (userHand) => {
  toggleVisibility(".hands", false);
  toggleVisibility(".contest", true);
  document.getElementById("userPickImage").src = handOptions[userHand];
  pickComputerHand(userHand);
};

//NOTE - Функція для вибору комп'ютером варіанту
const pickComputerHand = (userHand) => {
  const handEntries = Object.entries(handOptions);
  const randomIndex = Math.floor(Math.random() * handEntries.length);
  const [compHand, compHandImage] = handEntries[randomIndex];

  document.getElementById("computerPickImage").src = compHandImage;
  referee(userHand, compHand);
};

//NOTE - Функція визначення результату гри
const referee = (userHand, compHand) => {
  let decision;
  let scoreChange = 0;

  if (userHand === compHand) {
    decision = "НІЧИЯ!";
  } else if (winMatrix[userHand].includes(compHand)) {
    decision = "ВИ ПЕРЕМОГЛИ!";
    scoreChange = 1;
  } else {
    decision = "ВИ ПРОГРАЛИ!";
    scoreChange = -1;
  }

  setDecision(decision);
  updateScore(score + scoreChange);
};

//NOTE - Функція перезапуску гри
const restartGame = () => {
  toggleVisibility(".contest", false);
  toggleVisibility(".hands", true);
};

//NOTE - Функція для виведення рішення перемоги/програшу/нічиї
const setDecision = (decision) => {
  document.querySelector(".decision h1").textContent = decision;
};

//NOTE - Функція для оновлення рахунку
const updateScore = (newScore) => {
  score = newScore;
  document.querySelector(".score h1").textContent = newScore;
};

//NOTE - Функція для приховування/відображення елементів
const toggleVisibility = (selector, show) => {
  document.querySelector(selector).style.display = show ? "flex" : "none";
};

//NOTE - Обнулення рахунку при натисканні кнопки обнулення
document.querySelector('.btn-reset').addEventListener('click', () => {
  updateScore(0);
});

//NOTE - Модальне вікно: відкриття/закриття
const modal = document.querySelector('.rules-modal');
const toggleModal = () => {
  modal.classList.toggle('show-modal');
};

//NOTE - Додавання слухачів подій для модального вікна
document.querySelector('.btn-rules').addEventListener('click', toggleModal);
document.querySelector('.rules-modal__content--close').addEventListener('click', toggleModal);