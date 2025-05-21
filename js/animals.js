// Hayvonlar ma'lumotlari (misol uchun)
const animals = [
  { name: "Mushuk", display: "Cat", audio: "../audio/animals/Cat.mp3" },
  { name: "It", display: "Dog", audio: "../audio/animals/Dog.mp3" },
  { name: "Quyon", display: "Rabbit", audio: "../audio/animals/Rabbit.mp3" },
  { name: "Sigir", display: "Cow", audio: "../audio/animals/Cow.mp3" },
  { name: "Ot", display: "Horse", audio: "../audio/animals/Horse.mp3" },
];

let currentAnimal = null;
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

// Hayvonlar tugmalarini yaratish - faqat audio o‘ynaydi
function loadAnimalButtons() {
  const container = document.getElementById("animal-buttons");
  container.innerHTML = "";

  animals.forEach(animal => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-2 mb-3";

    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary btn-lg w-100";
    btn.textContent = animal.name;

    // Faqat audio o‘ynash
    btn.addEventListener("click", () => {
      playAudio(animal.audio);
    });

    col.appendChild(btn);
    container.appendChild(col);
  });
}

// Quiz uchun tugmalar yaratish va shartlarni ishlatish
function loadQuiz() {
  const quizNameEl = document.getElementById("quiz-name");
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  // Tasodifiy hayvon tanlash
  currentAnimal = animals[Math.floor(Math.random() * animals.length)];

  quizNameEl.textContent = currentAnimal.display;

  // Quiz uchun 4 variant tayyorlash
  const options = [currentAnimal];
  while (options.length < 4) {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    if (!options.some(a => a.name === randomAnimal.name)) {
      options.push(randomAnimal);
    }
  }

  // Variantlarni aralashtirish
  options.sort(() => Math.random() - 0.5);

  // Variantlar uchun tugmalar yaratish
  options.forEach(animal => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2 px-4 py-2";
    btn.textContent = animal.name;

    btn.onclick = () => {
      playAudio(animal.audio);

      if (animal.name === currentAnimal.name) {
        score++;
        updateScore();
        // alert("✅ To‘g‘ri javob!");
        loadQuiz();
      } else {
        // alert("❌ Noto‘g‘ri javob. Yana urinib ko‘r!");
      }
    };

    optionsContainer.appendChild(btn);
  });
}

// Dastlab yuklash
loadAnimalButtons();
loadQuiz();
updateScore();
