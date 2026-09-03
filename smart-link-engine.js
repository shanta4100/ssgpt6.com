/**
 * GNAIAAAC LLC | SMART LINK GENERATOR
 * Connects the 'Swarm' to the 'Deep Core'
 */

function generateSmartLink() {
    const agentID = document.querySelector('input[placeholder="Enter GNAI-ID"]').value;
    const feedback = document.querySelector('#link-feedback') || document.createElement('div');
    
    if (!agentID) {
        alert("Architect Alert: Please enter a valid GNAI-ID to initialize the swarm.");
        return;
    }

    // Logic: Create a trackable URL with your Sovereign metadata
    const secureLink = `https://ssgpt6.com/nexus?ref=${agentID}&utm_campaign=advertising_swarm_v41`;
    
    // Display the link to the user
    feedback.id = 'link-feedback';
    feedback.style.color = "#00ffcc";
    feedback.style.marginTop = "15px";
    feedback.innerHTML = `<strong>LINK ACTIVE:</strong> <br> <code style="background:#111; padding:5px;">${secureLink}</code>`;
    
    const portal = document.getElementById('affiliate-portal');
    portal.appendChild(feedback);
    
    console.log(`Swarm Node [${agentID}] is now live. Metadata synced to Vault.`);
}

// Attach to the button in your affiliate-portal.html
document.querySelector('button').onclick = generateSmartLink;
