const projectData = {
    "001": { name: "Water Bankruptcy", context: "Expert in global water scarcity and GWERI protocols." },
    "002": { name: "Zero-Carbon Grid", context: "Specialist in renewable energy and carbon credits." },
    "003": { name: "Satellite Coils", context: "Engineer for orbital power and Starlink integration." }
};

let currentProject = "001";

function switchProject(id) {
    currentProject = id;
    const project = projectData[id];
    document.querySelector('.header-info h1').innerText = `SS6: ${project.name}`;
    
    // Notify the 'Sleeping Agent' of the new context
    const msg = document.createElement('div');
    msg.className = 'message system';
    msg.innerHTML = `<p><strong>[SYSTEM]:</strong> Context switched to ${project.name}. Specialist Agent synchronized.</p>`;
    document.getElementById('chatDisplay').appendChild(msg);
}
