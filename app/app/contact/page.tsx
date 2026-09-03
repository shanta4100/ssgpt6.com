"use client";

import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <main style={{
      background: "#0b1a2f",
      color: "white",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: "gold", textAlign: "center" }}>
        Partnership Inquiry
      </h1>

      {!sent ? (
        <form
          action="https://formsubmit.co/ssgpt6@aol.com"
          method="POST"
          onSubmit={() => setSent(true)}
          style={{
            maxWidth: "500px",
            margin: "40px auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <input name="company" placeholder="Company Name" required style={{ padding: "10px" }} />
          <input name="name" placeholder="Your Name" required style={{ padding: "10px" }} />
          <input name="email" placeholder="Email" required style={{ padding: "10px" }} />
          <textarea name="message" placeholder="Message" required style={{ padding: "10px", height: "120px" }} />

          <button style={{
            padding: "12px",
            background: "gold",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold"
          }}>
            Send Inquiry
          </button>
        </form>
      ) : (
        <p style={{ textAlign: "center" }}>
          Message sent successfully ✔
        </p>
      )}
    </main>
  );
}