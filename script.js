// script.js
import { devbayData } from "./data.js";

// ---------- Chatbot Logic ----------
const chatBox = document.querySelector(".chat-box");
const userInput = document.querySelector("#user-input");
const sendBtn = document.querySelector("#send-btn");

// Function to create chat bubbles
function addMessage(message, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Core bot response logic
function getBotResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  // Find best match from data
  const match = devbayData.find(
    (item) =>
      input === item.q.toLowerCase() || input.includes(item.q.toLowerCase())
  );

  // If found, return the answer; otherwise fallback
  if (match) {
    return match.a;
  } else {
    return "I'm sorry, I don't have information about that yet. Please ask something else related to DevBay.";
  }
}

// Event handler for sending messages
function handleSend() {
  const input = userInput.value.trim();
  if (input === "") return;

  addMessage(input, "user");
  userInput.value = "";

  // Simulate typing delay
  setTimeout(() => {
    const botResponse = getBotResponse(input);
    addMessage(botResponse, "bot");
  }, 600);
}

// Event listeners
sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSend();
  }
});

// ---------- Optional UI Enhancements ----------
window.addEventListener("load", () => {
  addMessage("👋 Hello! I'm DevBay Assistant. How can I help you today?", "bot");
});
