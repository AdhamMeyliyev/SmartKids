// Mevalar ma'lumotlari
const fruits = [
  { name: "Olma", display: "Apple", audio: "../audio/fruits/apple.mp3" },
  { name: "Banan", display: "Banana", audio: "../audio/fruits/banana.mp3" },
  { name: "Nok", display: "Pear", audio: "../audio/fruits/pear.mp3" },
  { name: "Apelsin", display: "Orange", audio: "../audio/fruits/orange.mp3" },
  { name: "Anor", display: "Pomegranate", audio: "../audio/fruits/pomegranate.mp3" },
  { name: "Shaftoli", display: "Peach", audio: "../audio/fruits/peach.mp3" },
  { name: "Gilos", display: "Cherry", audio: "../audio/fruits/cherry.mp3" },
  { name: "Qovun", display: "Melon", audio: "../audio/fruits/melon.mp3" },
  { name: "Tarvuz", display: "Watermelon", audio: "../audio/fruits/watermelon.mp3" },
  { name: "Olxo'ri", display: "Gooseberry", audio: "../audio/fruits/gooseberry.mp3" }
];

let currentFruit = null;
let score = 0;

// Audio o‘ynatish funksiyasi
function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}

// Ballni yangilash
function updateScore() {
  document.getElementById("score").textContent = score;
}

// Mevalar tugmalarini yaratish (faqat audio o‘ynaydi)
function loadFruitButtons() {
  const container = document.getElementById("fruit-buttons");
  container.innerHTML = "";

  fruits.forEach(fruit => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-2 mb-3";

    const btn = document.createElement("button");
    btn.className = "btn btn-outline-danger btn-lg w-100";
    btn.textContent = fruit.name;

    btn.addEventListener("click", () => {
      playAudio(fruit.audio);
    });

    col.appendChild(btn);
    container.appendChild(col);
  });
}

// Quizni yuklash
function loadQuiz() {
  const quizNameEl = document.getElementById("quiz-name");
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  // Tasodifiy meva tanlash
  currentFruit = fruits[Math.floor(Math.random() * fruits.length)];
  quizNameEl.textContent = currentFruit.display;

  // Variantlar (to‘g‘ri + 3 ta noto‘g‘ri)
  const options = [currentFruit];
  while (options.length < 4) {
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    if (!options.some(f => f.name === randomFruit.name)) {
      options.push(randomFruit);
    }
  }

  // Aralashtirish
  options.sort(() => Math.random() - 0.5);

  // Tugmalarni yaratish
  options.forEach(fruit => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2 px-4 py-2";
    btn.textContent = fruit.name;

    btn.onclick = () => {
      playAudio(fruit.audio);
      if (fruit.name === currentFruit.name) {
        score++;
        updateScore();
        loadQuiz();
      }
    };

    optionsContainer.appendChild(btn);
  });
}

// Sahifa yuklanganda ishga tushadi
document.addEventListener("DOMContentLoaded", () => {
  updateScore();
  loadFruitButtons();
  loadQuiz();
});
