// Boshlang'ich ball
let score = 0;

// Raqamlar va ularning inglizcha nomlari
const numberWords = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten"
};

let currentNumber = null;
let quizAnswered = false; // foydalanuvchi javob bergan-yo‘qligini tekshiruvchi flag

// 🔊 Audio o‘ynatish funksiyasi
function playNumberAudio(number) {
  const audio = new Audio(`../audio/numbers/${number}.mp3`);
  audio.play().catch(err => {
    console.log("Audio o‘ynatishda xatolik:", err);
  });
}

// 🧮 Ballni yangilash
function updateScore() {
  document.getElementById("score").textContent = `Ball: ${score}`;
}

// 🔘 1 dan 10 gacha tugmalarni yaratish (o‘rganish uchun)
function loadNumberButtons() {
  const container = document.getElementById("number-buttons");
  container.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    const col = document.createElement("div");
    col.className = "col-4 col-md-2 mb-3";

    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary btn-lg w-100 number-btn";
    btn.textContent = i;
    btn.dataset.number = i;

    // Faqat audio o‘ynatish, ball qo‘shilmaydi
    btn.addEventListener("click", () => {
      playNumberAudio(i);
    });

    col.appendChild(btn);
    container.appendChild(col);
  }
}

// ❓ Quiz savolini yaratish
function loadNumberQuiz() {
  const quizEl = document.getElementById("quiz-word");
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  currentNumber = Math.floor(Math.random() * 10) + 1;
  quizEl.textContent = numberWords[currentNumber];
  quizAnswered = false;

  let options = [currentNumber];
  while (options.length < 4) {
    const rand = Math.floor(Math.random() * 10) + 1;
    if (!options.includes(rand)) options.push(rand);
  }

  // Aralashtirish
  options.sort(() => Math.random() - 0.5);

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2 px-4 py-2";
    btn.textContent = option;

    btn.onclick = () => {
      if (quizAnswered) return; // Faqat bir marta javob berilsin

      playNumberAudio(option);

      if (option === currentNumber) {
        score += 5;
        updateScore();
        quizAnswered = true;

        // Keyingi savolni 1 soniyadan so‘ng yuklash
        setTimeout(() => {
          loadNumberQuiz();
        }, 1000);
      } else {
        btn.classList.add("btn-danger"); // noto‘g‘ri javob ko‘rsatiladi
      }
    };

    optionsContainer.appendChild(btn);
  });
}

// 📦 DOM yuklanganda ishga tushirish
document.addEventListener("DOMContentLoaded", () => {
  updateScore();
  loadNumberButtons();
  loadNumberQuiz();
});
