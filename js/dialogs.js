// Dialog ma'lumotlari (misol uchun)
const dialogs = [
  {
    name: "Teacher",
    text: "Hello! How are you today?",
    audio: "../audio/dialogs/hello.mp3"
  },
  {
    name: "Student",
    text: "I'm fine, thank you! And you?",
    audio: "../audio/dialogs/fine.mp3"
  },
  {
    name: "Teacher",
    text: "I'm great, let's start our lesson.",
    audio: "../audio/dialogs/start.mp3"
  }
];

let dialogCount = 0;

// Ballni yangilash (dialoglar soni)
function updateDialogCount() {
  document.getElementById("score").textContent = `Dialoglar soni: ${dialogCount}`;
}

// Dialog tugmalarini yaratish
function loadDialogButtons() {
  const container = document.getElementById("dialog-buttons");
  container.innerHTML = "";

  dialogs.forEach((dialog, index) => {
    const btn = document.createElement("button");
    btn.textContent = `${dialog.name} gaplari`;
    btn.className = "btn btn-danger m-2 px-4 py-2";

    btn.addEventListener("click", () => {
      showDialog(index);
    });

    container.appendChild(btn);
  });
}

// Dialogni ko'rsatish va audio o'ynatish
function showDialog(index) {
  const dialog = dialogs[index];
  document.getElementById("dialog-name").textContent = dialog.name;
  document.getElementById("dialog-text").textContent = dialog.text;

  const audioEl = document.getElementById("dialog-audio");
  audioEl.src = dialog.audio;
  audioEl.style.display = "block";
  audioEl.play();

  dialogCount++;
  updateDialogCount();
}

document.addEventListener("DOMContentLoaded", () => {
  updateDialogCount();
  loadDialogButtons();
});
