const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// THE INQUIRY ROUTE
app.post('/send-inquiry', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // This block pulls directly from your Replit Secrets
    let transporter = nodemailer.createTransport({
        host: 'smtp.aol.com',
        port: 465,
        secure: true, 
        auth: {
            user: process.env.EMAIL_USER, // Your ssgpt6@aol.com secret
            pass: process.env.EMAIL_PASS  // Your 16-character AOL App Password secret
        }
    });

    // Email sent to YOU (the Founder)
    let adminMail = {
        from: `"SSGPT6 System" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `NEW INQUIRY: ${subject}`,
        text: `Lead Name: ${name}\nClient Email: ${email}\nTier Selected: ${subject}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(adminMail);
        console.log(`Inquiry from ${name} sent to ssgpt6@aol.com`);
        res.redirect('/success.html');
    } catch (error) {
        console.error("Critical Email Error:", error);
        res.status(500).send("System Error: Could not route inquiry. Please check AOL App Password.");
    }
});

app.listen(PORT, () => {
    console.log(`SSGPT6 Infrastructure Live on Port ${PORT}`);
});
