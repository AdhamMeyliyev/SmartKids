// dictionary.js
const dictionary = [
  { name: "Kitob", display: "book", audio: "../audio/dictionary/book.mp3" },
  { name: "Stol", display: "table", audio: "../audio/dictionary/table.mp3" },
  { name: "Oyna", display: "window", audio: "../audio/dictionary/window.mp3" },
  { name: "Qalam", display: "pen", audio: "../audio/dictionary/pen.mp3" },
  { name: "Maktab", display: "school", audio: "../audio/dictionary/school.mp3" },
  { name: "Daraxt", display: "tree", audio: "../audio/dictionary/tree.mp3" },
  { name: "Uy", display: "house", audio: "../audio/dictionary/house.mp3" },
  { name: "Bola", display: "child", audio: "../audio/dictionary/child.mp3" },
  { name: "Qush", display: "bird", audio: "../audio/dictionary/bird.mp3" },
  { name: "Oqituvchi", display: "teacher", audio: "../audio/dictionary/teacher.mp3" },
  { name: "Mashina", display: "car", audio: "../audio/dictionary/car.mp3" },
  { name: "Kitobxona", display: "library", audio: "../audio/dictionary/library.mp3" },
  { name: "Ochiq", display: "open", audio: "../audio/dictionary/open.mp3" },
  { name: "Yopiq", display: "closed", audio: "../audio/dictionary/closed.mp3" },
  { name: "Do‘st", display: "friend", audio: "../audio/dictionary/friend.mp3" },
  { name: "Shahar", display: "city", audio: "../audio/dictionary/city.mp3" },
  { name: "Yo‘l", display: "road", audio: "../audio/dictionary/road.mp3" },
  { name: "Suv", display: "water", audio: "../audio/dictionary/water.mp3" },
  { name: "Issiq", display: "hot", audio: "../audio/dictionary/hot.mp3" },
  { name: "Sovuq", display: "cold", audio: "../audio/dictionary/cold.mp3" }
];

let currentWord = null;
let score = 0;
let quizAnswered = false;

// Audio o'ynatish funksiyasi (audio fayl manzili orqali)
function playAudio(src) {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.play().catch(err => {
    console.error("Audio o‘ynatishda xatolik:", err);
  });
}

// Ballni yangilash
function updateScore() {
  document.getElementById("score").textContent = `Ball: ${score}`;
}

// Lug'atdagi so'zlarni tugmalar sifatida ko'rsatish (audio uchun)
function loadDictionaryButtons() {
  const container = document.getElementById("dictionary-list");
  container.innerHTML = "";

  dictionary.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3 mb-3";

    const btn = document.createElement("button");
    btn.className = "btn btn-outline-success btn-lg w-100";
    btn.textContent = item.name;
    btn.title = item.display;

    btn.addEventListener("click", () => {
      playAudio(item.audio);
    });

    col.appendChild(btn);
    container.appendChild(col);
  });
}

// Quiz savolini yaratish
function loadDictionaryQuiz() {
  const quizEl = document.getElementById("quiz-word");
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  // Tasodifiy so'z tanlash
  currentWord = dictionary[Math.floor(Math.random() * dictionary.length)];
  quizEl.textContent = currentWord.name;
  quizAnswered = false;

  const correctAnswer = currentWord.display;

  // Variantlar uchun ro'yxat (to'g'ri + 3 noto'g'ri)
  const options = [currentWord];

  while (options.length < 4) {
    const randomOption = dictionary[Math.floor(Math.random() * dictionary.length)];
    if (!options.some(opt => opt.display === randomOption.display)) {
      options.push(randomOption);
    }
  }

  // Variantlarni aralashtirish
  options.sort(() => Math.random() - 0.5);

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2 px-4 py-2";
    btn.textContent = option.display;

    btn.onclick = () => {
      if (quizAnswered) return;

      playAudio(option.audio);

      if (option.display === correctAnswer) {
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
