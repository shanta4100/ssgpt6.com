document.getElementById('sendBtn').addEventListener('click', function() {
    const userInput = document.getElementById('userInput');
    const chatDisplay = document.getElementById('chatDisplay');

    if (userInput.value.trim() !== "") {
        // User Message
        const userDiv = document.createElement('div');
        userDiv.className = 'message user';
        userDiv.style.alignSelf = 'flex-end';
        userDiv.style.background = '#233554';
        userDiv.innerHTML = `<p><strong>You:</strong> ${userInput.value}</p>`;
        chatDisplay.appendChild(userDiv);

        // Agent Response Placeholder (2026 Compliance: Labeled AI Response)
        setTimeout(() => {
            const agentDiv = document.createElement('div');
            agentDiv.className = 'message agent';
            agentDiv.innerHTML = `
                <p><strong>[SS6-Connect]:</strong> Processing command for GNAIAAAC LLC database...</p>
                <small style="font-size: 10px; color: #64ffda;">AI-Generated Response | GNAI Internal Model</small>
            `;
            chatDisplay.appendChild(agentDiv);
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }, 1000);

        userInput.value = "";
    }
});
