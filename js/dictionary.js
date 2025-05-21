let score = 0;

// Lug'at: o'zbekcha so'zlar va ularning inglizcha tarjimasi
const dictionaryWords = {
  "Kitob": "Book",
  "Stol": "Table",
  "Oyna": "Window",
  "Qalam": "Pen",
  "Maktab": "School",
  "Daraxt": "Tree",
  "Uy": "House",
  "Bola": "Child",
  "Qush": "Bird",
  "Oqituvchi": "Teacher",
  "Mashina": "Car",
  "Kitobxona": "Library",
  "Ochiq": "Open",
  "Yopiq": "Closed",
  "Do‘st": "Friend",
  "Shahar": "City",
  "Yo‘l": "Road",
  "Suv": "Water",
  "Issiq": "Hot",
  "Sovuq": "Cold"
};

let currentWordUzbek = null;
let quizAnswered = false;

// 🔊 Audio o‘ynatish (agar ovozlar bo‘lsa, yo‘riqnoma shu yerda)
// Bu holatda audio fayllar nomlari inglizcha so'zlar bilan bir xil deb faraz qilamiz
function playAudio(wordEng) {
  const audio = new Audio(`../audio/dictionary/${wordEng}.mp3`);
  audio.play().catch(err => {
    console.log("Audio o‘ynatishda xatolik:", err);
  });
}

function updateScore() {
  document.getElementById("score").textContent = `Ball: ${score}`;
}

// Lug'atdagi so'zlarni tugmalar sifatida ko'rsatish (audio uchun)
function loadDictionaryButtons() {
  const container = document.getElementById("dictionary-list");
  container.innerHTML = "";

  for (const [uzbek, english] of Object.entries(dictionaryWords)) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3 mb-3";

    const btn = document.createElement("button");
    btn.className = "btn btn-outline-success btn-lg w-100";
    btn.textContent = uzbek;
    btn.title = english;
    btn.dataset.eng = english;

    btn.addEventListener("click", () => {
      playAudio(english);
    });

    col.appendChild(btn);
    container.appendChild(col);
  }
}

// Quiz savolini yaratish
function loadDictionaryQuiz() {
  const quizEl = document.getElementById("quiz-word");
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  // O'zbek so'zini tasodifiy tanlash
  const keys = Object.keys(dictionaryWords);
  currentWordUzbek = keys[Math.floor(Math.random() * keys.length)];
  quizEl.textContent = currentWordUzbek;
  quizAnswered = false;

  // To'g'ri javobni kiritamiz
  const correctAnswer = dictionaryWords[currentWordUzbek];

  // Variantlar ro'yxati
  let options = [correctAnswer];

  // 3 ta noto'g'ri variant qo'shish
  while (options.length < 4) {
    const randomEng = dictionaryWords[keys[Math.floor(Math.random() * keys.length)]];
    if (!options.includes(randomEng)) options.push(randomEng);
  }

  // Aralashtirish
  options.sort(() => Math.random() - 0.5);

  // Tugmalar yaratish
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2 px-4 py-2";
    btn.textContent = option;

    btn.onclick = () => {
      if (quizAnswered) return;

      playAudio(option);

      if (option === correctAnswer) {
        score += 5;
        updateScore();
        quizAnswered = true;

        setTimeout(() => {
          loadDictionaryQuiz();
        }, 1000);
      } else {
        btn.classList.add("btn-danger");
      }
    };

    optionsContainer.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateScore();
  loadDictionaryButtons();
  loadDictionaryQuiz();
});
