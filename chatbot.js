const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");

const API_KEY = "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"; // Ensure this is your correct API key

// Function to create chat list items
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    const chatContent =
        className === "outgoing"
            ? `<p>${message}</p>` // Outgoing message structure
            : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`; // Incoming message with smart toy icon
    chatLi.innerHTML = chatContent;
    return chatLi;
};

// Function to generate a response from the API (OpenAI GPT)
const generateResponse = (userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an Islamic bot, please answer the user's questions according to Islamic teachings." },
                { role: "user", content: userMessage }
            ]
        })
    };

    // Start by adding a "Thinking..." message
    const thinkingMessage = createChatLi("Thinking...", "incoming");
    const thinkingMessageElement = chatbox.appendChild(thinkingMessage);

    // Scroll to the bottom after appending the thinking message
    chatbox.scrollTop = chatbox.scrollHeight;

    fetch(API_URL, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            // Extract bot's response
            const botMessage = data.choices[0].message.content;
            
            // Remove "Thinking..." message
            thinkingMessageElement.remove();

            // Add the bot's response as an incoming message
            chatbox.appendChild(createChatLi(botMessage, "incoming"));

            // Scroll to the bottom of the chatbox
            chatbox.scrollTop = chatbox.scrollHeight;
        })
        .catch((error) => {
            console.error("Error:", error);
            
            // Remove "Thinking..." message and show error message
            thinkingMessageElement.remove();
            chatbox.appendChild(createChatLi("Sorry, The bot is work in progress.", "incoming"));
            chatbox.scrollTop = chatbox.scrollHeight;
        });
};

// Function to handle chat interaction (Outgoing messages only)
const handleChat = () => {
    const userMessage = chatInput.value.trim(); // Get the input text
    if (!userMessage) return; // Do nothing if input is empty

    // Append the user's message to the chatbox as an outgoing message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = ""; // Clear the input field

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;

    // Call the generateResponse function to get the bot's reply
    generateResponse(userMessage);
};

// Add event listener to the send button
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);

// Optionally allow the Enter key to send the message
chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleChat();
    }
});
window.addEventListener('load', () => {
    setTimeout(() => {
      // Hide the loading screen
      document.getElementById("loading-screen").style.display = "none";
      
      // Show the chat container
      document.getElementById("chat-container").style.display = "flex";
    }, 2600); // 2 second delay to show loading
});
