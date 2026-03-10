"use client";

import { useEffect, useMemo, useState } from "react";

type GreetingType = "morning" | "afternoon" | "evening" | "night";

function getGreeting(): GreetingType {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

function getGreetingMessage(type: GreetingType) {
  if (type === "morning") {
    return "Good morning and welcome to SSGPT6.";
  }
  if (type === "afternoon") {
    return "Good afternoon and welcome to SSGPT6.";
  }
  if (type === "evening") {
    return "Good evening and welcome to SSGPT6.";
  }
  return "Good night and welcome to SSGPT6.";
}

function getLongMessage(type: GreetingType, isBirthday: boolean) {
  const base =
    type === "morning"
      ? "Good morning. Thank you for using the SSGPT6 website. Our AI Sleeping Agent is active and ready to support your journey."
      : type === "afternoon"
      ? "Good afternoon. Thank you for using the SSGPT6 website. Our AI Sleeping Agent is active and ready to support your journey."
      : type === "evening"
      ? "Good evening. Thank you for using the SSGPT6 website. Our AI Sleeping Agent is active and ready to support your journey."
      : "Good night. Thank you for using the SSGPT6 website. Our AI Sleeping Agent is active and ready to support your journey.";

  if (isBirthday) {
    return `${base} Happy birthday from SSGPT6. We wish you joy, health, success, and a beautiful day.`;
  }

  return `${base} Have a wonderful day and enjoy the platform.`;
}

export default function SpecialAnnouncementSystem() {
  const [mounted, setMounted] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedName = localStorage.getItem("ssgpt6_member_name") || "";
    const savedBirthday = localStorage.getItem("ssgpt6_member_birthday") || "";

    setMemberName(savedName);
    setBirthday(savedBirthday);
  }, []);

  const greetingType = useMemo(() => getGreeting(), []);
  const greetingText = useMemo(() => getGreetingMessage(greetingType), [greetingType]);

  const isBirthday = useMemo(() => {
    if (!birthday) return false;

    const today = new Date();
    const birth = new Date(birthday);

    return (
      today.getMonth() === birth.getMonth() &&
      today.getDate() === birth.getDate()
    );
  }, [birthday]);

  const fullMessage = useMemo(() => {
    const namePart = memberName ? ` ${memberName},` : "";
    return `${greetingText}${namePart} ${getLongMessage(greetingType, isBirthday)}`;
  }, [greetingText, memberName, greetingType, isBirthday]);

  const handleSaveProfile = () => {
    localStorage.setItem("ssgpt6_member_name", memberName);
    localStorage.setItem("ssgpt6_member_birthday", birthday);
    alert("Profile saved successfully.");
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech is not supported on this device.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(fullMessage);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeechEnabled(true);
  };

  if (!mounted) return null;

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0b1220, #172033)",
        color: "#ffffff",
        border: "1px solid #23304a",
        borderRadius: "18px",
        padding: "24px",
        marginBottom: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            color: "#f5c542",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "10px"
          }}
        >
          Special Announcement System
        </p>

        <h2 style={{ fontSize: "30px", marginBottom: "12px" }}>
          {greetingText}
        </h2>

        <p style={{ fontSize: "17px", lineHeight: "1.7" }}>
          {fullMessage}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "14px",
          marginBottom: "18px"
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "6px", color: "#f5c542" }}>
            Member Name
          </label>
          <input
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Enter member name"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "#ffffff"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", color: "#f5c542" }}>
            Birthday
          </label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "#ffffff"
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
        <button
          onClick={handleSaveProfile}
          style={{
            background: "#f5c542",
            color: "#0b1220",
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Save Member Profile
        </button>

        <button
          onClick={handleSpeak}
          style={{
            background: "#38bdf8",
            color: "#0b1220",
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Play Avatar Greeting
        </button>
      </div>

      <div
        style={{
          background: "#111827",
          borderRadius: "14px",
          padding: "16px",
          border: "1px solid #1f2937"
        }}
      >
        <h3 style={{ color: "#f5c542", marginBottom: "10px" }}>Automation Features</h3>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          <li>Time-based greeting system</li>
          <li>Member birthday celebration message</li>
          <li>AI voice announcement playback</li>
          <li>Member profile saved in browser</li>
          <li>Ready for future avatar video integration</li>
        </ul>
      </div>

      {speechEnabled && (
        <p style={{ marginTop: "14px", color: "#93c5fd" }}>
          Voice greeting activated successfully.
        </p>
      )}
    </section>
  );
}