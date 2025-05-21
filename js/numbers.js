let score = 0;

const numberWords = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Sex",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten"
};

// Son raqam uchun audio o'ynatish funksiyasi
function playNumber(number) {
  const audio = new Audio(`../audio/numbers/${number}.mp3`);
  audio.play().catch(e => {
    console.log("Audio ijro etishda xato:", e);
  });
}

// Ballni yangilash
function updateScore(points) {
  score += points;
  document.getElementById("score").textContent = `Ball: ${score}`;
}

// Quiz boshlash
function startQuiz() {
  const quizNum = Math.floor(Math.random() * 10) + 1;

  // Savolni matn ko'rinishida chiqaramiz
  document.getElementById("quiz-number").textContent = numberWords[quizNum];

  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  let options = [quizNum];
  while (options.length < 4) {
    let random = Math.floor(Math.random() * 10) + 1;
    if (!options.includes(random)) options.push(random);
  }

  options.sort(() => Math.random() - 0.5); // variantlarni aralashtirish

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "btn btn-outline-dark m-2 px-4 py-2";
    btn.onclick = () => {
      if (opt === quizNum) {
        // alert("✅ To‘g‘ri!");
        updateScore(5);
      } else {
        // alert("❌ Noto‘g‘ri. Yana urinib ko‘r!");
      }
      startQuiz();
    };
    optionsContainer.appendChild(btn);
  });
}

// Sahifa to'liq yuklangandan so'ng ishlash
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".number-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const number = parseInt(btn.dataset.number);
      playNumber(number);
      updateScore(1);
    });
  });

  startQuiz(); // Quizni boshlash
});
