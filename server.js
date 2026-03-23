const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serves your HTML files

// POST Route for Contact Form
app.post('/send-inquiry', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Configure your email transporter
    // Note: Use Environment Variables (Secrets) for these for security
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail
            pass: process.env.EMAIL_PASS  // Your Gmail App Password
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, 
        subject: `SSGPT6 Inquiry: ${subject} from ${name}`,
        text: `New Inquiry Received:\n\nName: ${name}\nEmail: ${email}\nTier: ${subject}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        // Redirect to your success.html page
        res.redirect('/success.html');
    } catch (error) {
        console.error("Email failed:", error);
        res.status(500).send("Form submission failed. Please try again.");
    }
});

app.listen(PORT, () => {
    console.log(`SSGPT6 Server running on port ${PORT}`);
});
