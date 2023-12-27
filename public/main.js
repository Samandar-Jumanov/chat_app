const messageBox = document.querySelector("#messages");

function createMessage(text, ownMessage = false) {
  const messageElement = document.createElement("div");
  messageElement.className = "chat-message";
  const subMesssageElement = document.createElement("div");
  subMesssageElement.className =
    "px-4 py-4 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
  if (ownMessage) {
    subMesssageElement.className += " float-right bg-blue-800 text-white";
  }
  subMesssageElement.innerText = text;
  messageElement.appendChild(subMesssageElement);

  messageBox.appendChild(messageElement);
}

createMessage("Welcome to vahalla");
createMessage("Who are you to talk to me", true);