/**
 * SSGPT6 MASTER TRIGGER
 * Connects the ♿︎ Key to the Media Hub
 */

function startSovereignAutomation() {
    // 1. Play "System Active" Sound or Speech
    const intro = new SpeechSynthesisUtterance("Sovereign AI Active. Welcome to GNAIAAAC LLC. Initializing Deep Core Content Engine.");
    window.speechSynthesis.speak(intro);

    // 2. Visual Animation
    document.querySelector('.handicap-key').style.color = '#ff00ff'; // Pulse Pink for Active State
    
    // 3. Redirect or Load Media
    setTimeout(() => {
        window.location.href = "media-hub.html";
    }, 3000); // Give 3 seconds of "Greeting" before switching to the Media Hub
}
