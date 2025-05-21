// Harflar ma'lumotlari
const letters = [
  { name: "A", display: "ey", audio: "../audio/letters/A.mp3" },
  { name: "B", display: "bi", audio: "../audio/letters/B.mp3" },
  { name: "C", display: "si", audio: "../audio/letters/C.mp3" },
  { name: "D", display: "di", audio: "../audio/letters/D.mp3" },
  { name: "E", display: "i", audio: "../audio/letters/E.mp3" },
  { name: "F", display: "ef", audio: "../audio/letters/F.mp3" },
  { name: "G", display: "ci", audio: "../audio/letters/G.mp3" },
  { name: "H", display: "eych", audio: "../audio/letters/H.mp3" },
  { name: "I", display: "ay", audio: "../audio/letters/I.mp3" },
  { name: "J", display: "jey", audio: "../audio/letters/J.mp3" },
  { name: "K", display: "key", audio: "../audio/letters/K.mp3" },
  { name: "L", display: "el", audio: "../audio/letters/L.mp3" },
  { name: "M", display: "em", audio: "../audio/letters/M.mp3" },
  { name: "N", display: "en", audio: "../audio/letters/N.mp3" },
  { name: "O", display: "ou", audio: "../audio/letters/O.mp3" },
  { name: "P", display: "pi", audio: "../audio/letters/P.mp3" },
  { name: "Q", display: "kyu", audio: "../audio/letters/Q.mp3" },
  { name: "R", display: "ar", audio: "../audio/letters/R.mp3" },
  { name: "S", display: "es", audio: "../audio/letters/S.mp3" },
  { name: "T", display: "ti", audio: "../audio/letters/T.mp3" },
  { name: "U", display: "yu", audio: "../audio/letters/U.mp3" },
  { name: "V", display: "vi", audio: "../audio/letters/V.mp3" },
  { name: "W", display: "dabl yu", audio: "../audio/letters/W.mp3" },
  { name: "X", display: "eks", audio: "../audio/letters/X.mp3" },
  { name: "Y", display: "way", audio: "../audio/letters/Y.mp3" },
  { name: "Z", display: "zi", audio: "../audio/letters/Z.mp3" }
];



let currentLetter = null;
let score = 0;

// Audio o‘ynatish funksiyasi
function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}

// Ballni yangilash
function updateScore() {
  document.getElementById("score").textContent = `Ball: ${score}`;
}

// Harflar tugmalarini yaratish (faqat audio o‘ynaydi)
function loadLetterButtons() {
  const container = document.getElementById("letter-buttons");
  container.innerHTML = "";

  letters.forEach(letter => {
    const col = document.createElement("div");
    col.className = "col-3 col-md-1 mb-3";

    const btn = document.createElement("button");
    btn.className = "btn btn-outline-danger btn-lg w-100";
    btn.textContent = letter.name;

    btn.addEventListener("click", () => {
      playAudio(letter.audio);
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

  // Tasodifiy harf tanlash
  currentLetter = letters[Math.floor(Math.random() * letters.length)];
  quizNameEl.textContent = currentLetter.display;

  // Variantlar (to‘g‘ri + 3 ta noto‘g‘ri)
  const options = [currentLetter];
  while (options.length < 4) {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    if (!options.some(l => l.name === randomLetter.name)) {
      options.push(randomLetter);
    }
  }

  // Aralashtirish
  options.sort(() => Math.random() - 0.5);

  // Tugmalarni yaratish
  options.forEach(letter => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2 px-4 py-2";
    btn.textContent = letter.name;

    btn.onclick = () => {
      playAudio(letter.audio);
      if (letter.name === currentLetter.name) {
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
  loadLetterButtons();
  loadQuiz();
});
