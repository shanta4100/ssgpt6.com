/**
 * GNAIAAAC LLC | AFFILIATE AMPLIFIER v1.0
 * Connects Nova Network Security to Revenue Streams
 */

const AffiliateEngine = {
    links: {
        cyber: "https://www.pjtra.com/t/your_nord_id", // Replace with your CJ/Impact ID
        energy: "https://www.pntrs.com/t/your_jackery_id",
        dns: "https://www.bluehost.com/track/your_id/"
    },

    injectLinks() {
        console.log("Amplify: Linking Sovereign Tech to Affiliate Partners...");
        
        // Target the 'Security Shield' element we built for Nova
        const shield = document.getElementById('security-shield');
        if (shield && NovaHandshake.isVerified) {
            shield.innerHTML += `<br><a href="${this.links.cyber}" target="_blank" style="color:#c7a85a; font-size:0.7rem;">[ SECURE YOUR NODE VIA NORDVPN ]</a>`;
        }
    }
};

// Sync with the Nova Handshake
if (NovaHandshake.isVerified) { AffiliateEngine.injectLinks(); }
