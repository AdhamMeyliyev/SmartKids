const fruits = [
  { name: "olma", display: "Apple", audio: "../audio/fruits/apple.mp3" },
  { name: "banan", display: "Banana", audio: "../audio/fruits/banana.mp3" },
  { name: "nok", display: "Pear", audio: "../audio/fruits/pear.mp3" },
  { name: "apelsin", display: "Orange", audio: "../audio/fruits/orange.mp3" },
  { name: "anor", display: "Pomegranate", audio: "../audio/fruits/pomegranate.mp3" },
  { name: "shaftoli", display: "Peach", audio: "../audio/fruits/peach.mp3" },
  { name: "gilos", display: "Cherry", audio: "../audio/fruits/cherry.mp3" },
  { name: "qovun", display: "Melon", audio: "../audio/fruits/melon.mp3" },
  { name: "tarvuz", display: "Watermelon", audio: "../audio/fruits/watermelon.mp3" },
  { name: "olxo'ri", display: "Gooseberry", audio: "../audio/fruits/gooseberry.mp3" },
];

let score = 0;
let currentFruit = null;
let audioPlayer = null;

function updateScore() {
  document.getElementById("score").textContent = `Ball: ${score}`;
}

function playAudio(src) {
  try {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
    audioPlayer = new Audio(src);

    // audio play promise
    audioPlayer.play()
      .then(() => {
        console.log(`Audio o‘ynatildi: ${src}`);
      })
      .catch((error) => {
        console.error(`Audio ijro etishda xatolik: ${error}`);
        alert("Audio o‘ynatishda muammo yuz berdi. Iltimos, sahifani yangilang va yana urinib ko‘ring.");
      });
  } catch (e) {
    console.error("Audio ijro etishda kutilmagan xatolik:", e);
  }
}

function loadFruitButtons() {
  const container = document.getElementById("fruit-buttons");
  container.innerHTML = "";

  fruits.forEach((fruit) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-2 mb-3";

    const btn = document.createElement("button");
    btn.className = "btn btn-outline-danger btn-lg w-100 fruit-btn";
    btn.textContent = fruit.name;
    btn.dataset.name = fruit.name;

  btn.addEventListener("click", () => {
  playAudio(fruit.audio).then(() => {
    if (currentFruit && fruit.name === currentFruit.name) {
      score++;
      updateScore();
      alert("✅ To‘g‘ri javob!");
      loadQuiz();
    } else {
      alert("❌ Noto‘g‘ri. Yana urinib ko‘r!");
    }
  }).catch(() => {
    // Agar audio ijro etilmasa ham javobni tekshirish
    if (currentFruit && fruit.name === currentFruit.name) {
      score++;
      updateScore();
      alert("✅ To‘g‘ri javob!");
      loadQuiz();
    } else {
      alert("❌ Noto‘g‘ri. Yana urinib ko‘r!");
    }
  });
});


    col.appendChild(btn);
    container.appendChild(col);
  });
}

function loadQuiz() {
  const quizNameEl = document.getElementById("quiz-name");
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  // Tasodifiy meva tanlash (savol uchun)
  currentFruit = fruits[Math.floor(Math.random() * fruits.length)];

  // Savolda inglizcha nom (display) ko'rsatiladi
  quizNameEl.textContent = currentFruit.display;

  // Variantlar: to'g'ri javob + 3 ta noto'g'ri javob, lekin variantlar o'zbekcha 'name' bo'ladi
  const options = [currentFruit];
  while (options.length < 4) {
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    if (!options.some(f => f.name === randomFruit.name)) {
      options.push(randomFruit);
    }
  }

  // Variantlarni aralashtirish
  options.sort(() => Math.random() - 0.5);

  // Variant tugmalarini yaratish
  options.forEach((fruit) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2 px-4 py-2";
    // Bu yerda variant sifatida o'zbekcha nom chiqsin:
    btn.textContent = fruit.name;

    btn.onclick = () => {
      playAudio(fruit.audio);

      if (fruit.name === currentFruit.name) {
        score++;
        updateScore();
        // alert("✅ To‘g‘ri!");
        loadQuiz();
      } else {
        // alert("❌ Noto‘g‘ri. Yana urinib ko‘r!");
      }
    };

    optionsContainer.appendChild(btn);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  updateScore();
  loadFruitButtons();
  loadQuiz();
});
