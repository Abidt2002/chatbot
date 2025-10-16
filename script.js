import { devbayData } from "./data.js";

const chatBox = document.querySelector("#chat-box");
const userInput = document.querySelector("#user-input");
const sendBtn = document.querySelector("#send-btn");
const chatbotToggle = document.querySelector("#chatbot-toggle");
const chatbotContainer = document.querySelector("#chatbot-container");
const closeChat = document.querySelector("#close-chat");

// --- Open/Close Chat ---
chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.toggle("hidden");
});
closeChat.addEventListener("click", () => {
  chatbotContainer.classList.add("hidden");
});

// --- Display Message ---
function addMessage(message, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  chatBox.appendChild(msg);

  // Typing animation for bot
  if (sender === "bot") {
    let index = 0;
    const typing = setInterval(() => {
      msg.textContent += message.charAt(index);
      index++;
      chatBox.scrollTop = chatBox.scrollHeight;
      if (index >= message.length) clearInterval(typing);
    }, 25);
  } else {
    msg.textContent = message;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// --- Bot Logic ---
function getBotResponse(userText) {
  const input = userText.toLowerCase().trim();
  const found = devbayData.find(
    (item) => input === item.q.toLowerCase() || input.includes(item.q.toLowerCase())
  );
  return found
    ? found.a
    : "I'm sorry, I don't have information about that yet. Please ask something else related to DevBay.";
}

// --- Send Message ---
function handleSend() {
  const input = userInput.value.trim();
  if (!input) return;
  addMessage(input, "user");
  userInput.value = "";

  setTimeout(() => {
    const response = getBotResponse(input);
    addMessage(response, "bot");
  }, 400);
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});

// --- Greeting Message ---
window.addEventListener("load", () => {
  addMessage("👋 Hi! I'm DevBay Assistant. Ask me about our company, projects, or services.", "bot");
});
