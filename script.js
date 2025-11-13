const splash = document.getElementById("splash");
const chatContainer = document.querySelector(".chat-container");
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");
const chatBox = document.getElementById("chatBox");
const bgMusic = document.getElementById("bgMusic");
const settingsBtn = document.getElementById("settingsBtn");
const settings = document.getElementById("settings");
const closeSettings = document.getElementById("closeSettings");
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

// Splash delay
setTimeout(() => {
  splash.classList.add("hidden");
  chatContainer.classList.remove("hidden");
}, 3000);

// Send message
sendBtn.onclick = () => {
  const msg = msgInput.value.trim();
  if (!msg) return;
  const div = document.createElement("div");
  div.className = "message user";
  div.textContent = msg;
  chatBox.appendChild(div);
  msgInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Open/close settings
settingsBtn.onclick = () => settings.classList.remove("hidden");
closeSettings.onclick = () => settings.classList.add("hidden");

// Volume control
volumeSlider.addEventListener("input", () => {
  bgMusic.volume = volumeSlider.value / 100;
  volumeValue.textContent = `${volumeSlider.value}%`;
});
