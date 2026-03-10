"use client";

import { useEffect, useMemo, useState } from "react";

type GreetingType = "morning" | "afternoon" | "evening" | "night";

type LanguageOption = {
  code: string;
  label: string;
  country: string;
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  greetingNight: string;
  thanks: string;
  birthday: string;
};

const LANGUAGES: LanguageOption[] = [
  { code: "en-US", label: "English", country: "United States", greetingMorning: "Good morning", greetingAfternoon: "Good afternoon", greetingEvening: "Good evening", greetingNight: "Good night", thanks: "Thank you for using the SSGPT6 website.", birthday: "Happy birthday from SSGPT6." },
  { code: "en-GB", label: "English", country: "United Kingdom", greetingMorning: "Good morning", greetingAfternoon: "Good afternoon", greetingEvening: "Good evening", greetingNight: "Good night", thanks: "Thank you for using the SSGPT6 website.", birthday: "Happy birthday from SSGPT6." },
  { code: "es-ES", label: "Spanish", country: "Spain", greetingMorning: "Buenos días", greetingAfternoon: "Buenas tardes", greetingEvening: "Buenas noches", greetingNight: "Buenas noches", thanks: "Gracias por usar el sitio web de SSGPT6.", birthday: "Feliz cumpleaños de parte de SSGPT6." },
  { code: "es-MX", label: "Spanish", country: "Mexico", greetingMorning: "Buenos días", greetingAfternoon: "Buenas tardes", greetingEvening: "Buenas noches", greetingNight: "Buenas noches", thanks: "Gracias por usar el sitio web de SSGPT6.", birthday: "Feliz cumpleaños de parte de SSGPT6." },
  { code: "fr-FR", label: "French", country: "France", greetingMorning: "Bonjour", greetingAfternoon: "Bon après-midi", greetingEvening: "Bonsoir", greetingNight: "Bonne nuit", thanks: "Merci d'utiliser le site web SSGPT6.", birthday: "Joyeux anniversaire de la part de SSGPT6." },
  { code: "de-DE", label: "German", country: "Germany", greetingMorning: "Guten Morgen", greetingAfternoon: "Guten Tag", greetingEvening: "Guten Abend", greetingNight: "Gute Nacht", thanks: "Vielen Dank für die Nutzung der SSGPT6-Website.", birthday: "Alles Gute zum Geburtstag von SSGPT6." },
  { code: "it-IT", label: "Italian", country: "Italy", greetingMorning: "Buongiorno", greetingAfternoon: "Buon pomeriggio", greetingEvening: "Buonasera", greetingNight: "Buona notte", thanks: "Grazie per aver utilizzato il sito web di SSGPT6.", birthday: "Buon compleanno da SSGPT6." },
  { code: "pt-BR", label: "Portuguese", country: "Brazil", greetingMorning: "Bom dia", greetingAfternoon: "Boa tarde", greetingEvening: "Boa noite", greetingNight: "Boa noite", thanks: "Obrigado por usar o site da SSGPT6.", birthday: "Feliz aniversário da SSGPT6." },
  { code: "pt-PT", label: "Portuguese", country: "Portugal", greetingMorning: "Bom dia", greetingAfternoon: "Boa tarde", greetingEvening: "Boa noite", greetingNight: "Boa noite", thanks: "Obrigado por usar o site da SSGPT6.", birthday: "Feliz aniversário da SSGPT6." },
  { code: "ar-SA", label: "Arabic", country: "Saudi Arabia", greetingMorning: "صباح الخير", greetingAfternoon: "مساء الخير", greetingEvening: "مساء الخير", greetingNight: "تصبح على خير", thanks: "شكراً لاستخدامك موقع SSGPT6.", birthday: "عيد ميلاد سعيد من SSGPT6." },
  { code: "bn-BD", label: "Bengali", country: "Bangladesh", greetingMorning: "সুপ্রভাত", greetingAfternoon: "শুভ অপরাহ্ন", greetingEvening: "শুভ সন্ধ্যা", greetingNight: "শুভ রাত্রি", thanks: "SSGPT6 ওয়েবসাইট ব্যবহার করার জন্য ধন্যবাদ।", birthday: "SSGPT6-এর পক্ষ থেকে শুভ জন্মদিন।" },
  { code: "hi-IN", label: "Hindi", country: "India", greetingMorning: "सुप्रभात", greetingAfternoon: "नमस्कार", greetingEvening: "शुभ संध्या", greetingNight: "शुभ रात्रि", thanks: "SSGPT6 वेबसाइट उपयोग करने के लिए धन्यवाद।", birthday: "SSGPT6 की ओर से जन्मदिन मुबारक।" },
  { code: "ur-PK", label: "Urdu", country: "Pakistan", greetingMorning: "صبح بخیر", greetingAfternoon: "دوپہر بخیر", greetingEvening: "شام بخیر", greetingNight: "شب بخیر", thanks: "SSGPT6 ویب سائٹ استعمال کرنے کا شکریہ۔", birthday: "SSGPT6 کی طرف سے سالگرہ مبارک۔" },
  { code: "zh-CN", label: "Chinese", country: "China", greetingMorning: "早上好", greetingAfternoon: "下午好", greetingEvening: "晚上好", greetingNight: "晚安", thanks: "感谢您使用 SSGPT6 网站。", birthday: "SSGPT6 祝您生日快乐。" },
  { code: "zh-TW", label: "Chinese", country: "Taiwan", greetingMorning: "早安", greetingAfternoon: "下午好", greetingEvening: "晚上好", greetingNight: "晚安", thanks: "感謝您使用 SSGPT6 網站。", birthday: "SSGPT6 祝您生日快樂。" },
  { code: "ja-JP", label: "Japanese", country: "Japan", greetingMorning: "おはようございます", greetingAfternoon: "こんにちは", greetingEvening: "こんばんは", greetingNight: "おやすみなさい", thanks: "SSGPT6 ウェブサイトをご利用いただきありがとうございます。", birthday: "SSGPT6よりお誕生日おめでとうございます。" },
  { code: "ko-KR", label: "Korean", country: "South Korea", greetingMorning: "좋은 아침입니다", greetingAfternoon: "안녕하세요", greetingEvening: "좋은 저녁입니다", greetingNight: "안녕히 주무세요", thanks: "SSGPT6 웹사이트를 이용해 주셔서 감사합니다.", birthday: "SSGPT6가 생일을 축하합니다." },
  { code: "ru-RU", label: "Russian", country: "Russia", greetingMorning: "Доброе утро", greetingAfternoon: "Добрый день", greetingEvening: "Добрый вечер", greetingNight: "Спокойной ночи", thanks: "Спасибо за использование сайта SSGPT6.", birthday: "С днем рождения от SSGPT6." },
  { code: "uk-UA", label: "Ukrainian", country: "Ukraine", greetingMorning: "Доброго ранку", greetingAfternoon: "Добрий день", greetingEvening: "Добрий вечір", greetingNight: "На добраніч", thanks: "Дякуємо за використання сайту SSGPT6.", birthday: "З днем народження від SSGPT6." },
  { code: "pl-PL", label: "Polish", country: "Poland", greetingMorning: "Dzień dobry", greetingAfternoon: "Dzień dobry", greetingEvening: "Dobry wieczór", greetingNight: "Dobranoc", thanks: "Dziękujemy za korzystanie ze strony SSGPT6.", birthday: "Wszystkiego najlepszego od SSGPT6." },
  { code: "nl-NL", label: "Dutch", country: "Netherlands", greetingMorning: "Goedemorgen", greetingAfternoon: "Goedemiddag", greetingEvening: "Goedenavond", greetingNight: "Goedenacht", thanks: "Bedankt voor het gebruiken van de SSGPT6-website.", birthday: "Gefeliciteerd met je verjaardag van SSGPT6." },
  { code: "sv-SE", label: "Swedish", country: "Sweden", greetingMorning: "God morgon", greetingAfternoon: "God eftermiddag", greetingEvening: "God kväll", greetingNight: "God natt", thanks: "Tack för att du använder SSGPT6-webbplatsen.", birthday: "Grattis på födelsedagen från SSGPT6." },
  { code: "no-NO", label: "Norwegian", country: "Norway", greetingMorning: "God morgen", greetingAfternoon: "God ettermiddag", greetingEvening: "God kveld", greetingNight: "God natt", thanks: "Takk for at du bruker SSGPT6-nettstedet.", birthday: "Gratulerer med dagen fra SSGPT6." },
  { code: "da-DK", label: "Danish", country: "Denmark", greetingMorning: "Godmorgen", greetingAfternoon: "God eftermiddag", greetingEvening: "Godaften", greetingNight: "Godnat", thanks: "Tak fordi du bruger SSGPT6-webstedet.", birthday: "Tillykke med fødselsdagen fra SSGPT6." },
  { code: "fi-FI", label: "Finnish", country: "Finland", greetingMorning: "Hyvää huomenta", greetingAfternoon: "Hyvää iltapäivää", greetingEvening: "Hyvää iltaa", greetingNight: "Hyvää yötä", thanks: "Kiitos, että käytät SSGPT6-verkkosivustoa.", birthday: "Hyvää syntymäpäivää SSGPT6:lta." },
  { code: "tr-TR", label: "Turkish", country: "Turkey", greetingMorning: "Günaydın", greetingAfternoon: "Tünaydın", greetingEvening: "İyi akşamlar", greetingNight: "İyi geceler", thanks: "SSGPT6 web sitesini kullandığınız için teşekkür ederiz.", birthday: "SSGPT6'dan mutlu yıllar." },
  { code: "el-GR", label: "Greek", country: "Greece", greetingMorning: "Καλημέρα", greetingAfternoon: "Καλό απόγευμα", greetingEvening: "Καλησπέρα", greetingNight: "Καληνύχτα", thanks: "Σας ευχαριστούμε που χρησιμοποιείτε τον ιστότοπο SSGPT6.", birthday: "Χρόνια πολλά από το SSGPT6." },
  { code: "he-IL", label: "Hebrew", country: "Israel", greetingMorning: "בוקר טוב", greetingAfternoon: "צהריים טובים", greetingEvening: "ערב טוב", greetingNight: "לילה טוב", thanks: "תודה על השימוש באתר SSGPT6.", birthday: "יום הולדת שמח מ-SSGPT6." },
  { code: "th-TH", label: "Thai", country: "Thailand", greetingMorning: "สวัสดีตอนเช้า", greetingAfternoon: "สวัสดีตอนบ่าย", greetingEvening: "สวัสดีตอนเย็น", greetingNight: "ราตรีสวัสดิ์", thanks: "ขอบคุณที่ใช้เว็บไซต์ SSGPT6", birthday: "สุขสันต์วันเกิดจาก SSGPT6" },
  { code: "vi-VN", label: "Vietnamese", country: "Vietnam", greetingMorning: "Chào buổi sáng", greetingAfternoon: "Chào buổi chiều", greetingEvening: "Chào buổi tối", greetingNight: "Chúc ngủ ngon", thanks: "Cảm ơn bạn đã sử dụng trang web SSGPT6.", birthday: "Chúc mừng sinh nhật từ SSGPT6." },
  { code: "id-ID", label: "Indonesian", country: "Indonesia", greetingMorning: "Selamat pagi", greetingAfternoon: "Selamat siang", greetingEvening: "Selamat malam", greetingNight: "Selamat malam", thanks: "Terima kasih telah menggunakan situs web SSGPT6.", birthday: "Selamat ulang tahun dari SSGPT6." },
  { code: "ms-MY", label: "Malay", country: "Malaysia", greetingMorning: "Selamat pagi", greetingAfternoon: "Selamat petang", greetingEvening: "Selamat malam", greetingNight: "Selamat malam", thanks: "Terima kasih kerana menggunakan laman web SSGPT6.", birthday: "Selamat hari lahir daripada SSGPT6." },
  { code: "fa-IR", label: "Persian", country: "Iran", greetingMorning: "صبح بخیر", greetingAfternoon: "عصر بخیر", greetingEvening: "عصر بخیر", greetingNight: "شب بخیر", thanks: "از استفاده از وب‌سایت SSGPT6 سپاسگزاریم.", birthday: "تولدت مبارک از طرف SSGPT6." },
  { code: "ro-RO", label: "Romanian", country: "Romania", greetingMorning: "Bună dimineața", greetingAfternoon: "Bună ziua", greetingEvening: "Bună seara", greetingNight: "Noapte bună", thanks: "Vă mulțumim că utilizați site-ul SSGPT6.", birthday: "La mulți ani din partea SSGPT6." },
  { code: "hu-HU", label: "Hungarian", country: "Hungary", greetingMorning: "Jó reggelt", greetingAfternoon: "Jó napot", greetingEvening: "Jó estét", greetingNight: "Jó éjszakát", thanks: "Köszönjük, hogy használja az SSGPT6 weboldalt.", birthday: "Boldog születésnapot az SSGPT6-tól." },
  { code: "cs-CZ", label: "Czech", country: "Czech Republic", greetingMorning: "Dobré ráno", greetingAfternoon: "Dobrý den", greetingEvening: "Dobrý večer", greetingNight: "Dobrou noc", thanks: "Děkujeme za používání webu SSGPT6.", birthday: "Všechno nejlepší od SSGPT6." },
  { code: "sk-SK", label: "Slovak", country: "Slovakia", greetingMorning: "Dobré ráno", greetingAfternoon: "Dobrý deň", greetingEvening: "Dobrý večer", greetingNight: "Dobrú noc", thanks: "Ďakujeme, že používate web SSGPT6.", birthday: "Všetko najlepšie od SSGPT6." },
  { code: "bg-BG", label: "Bulgarian", country: "Bulgaria", greetingMorning: "Добро утро", greetingAfternoon: "Добър ден", greetingEvening: "Добър вечер", greetingNight: "Лека нощ", thanks: "Благодарим ви, че използвате сайта SSGPT6.", birthday: "Честит рожден ден от SSGPT6." },
  { code: "hr-HR", label: "Croatian", country: "Croatia", greetingMorning: "Dobro jutro", greetingAfternoon: "Dobar dan", greetingEvening: "Dobra večer", greetingNight: "Laku noć", thanks: "Hvala što koristite SSGPT6 web stranicu.", birthday: "Sretan rođendan od SSGPT6." },
  { code: "sr-RS", label: "Serbian", country: "Serbia", greetingMorning: "Добро јутро", greetingAfternoon: "Добар дан", greetingEvening: "Добро вече", greetingNight: "Лаку ноћ", thanks: "Хвала што користите SSGPT6 веб сајт.", birthday: "Срећан рођендан од SSGPT6." },
  { code: "sl-SI", label: "Slovenian", country: "Slovenia", greetingMorning: "Dobro jutro", greetingAfternoon: "Dober dan", greetingEvening: "Dober večer", greetingNight: "Lahko noč", thanks: "Hvala, ker uporabljate spletno stran SSGPT6.", birthday: "Vse najboljše od SSGPT6." },
  { code: "lt-LT", label: "Lithuanian", country: "Lithuania", greetingMorning: "Labas rytas", greetingAfternoon: "Laba diena", greetingEvening: "Labas vakaras", greetingNight: "Labanakt", thanks: "Dėkojame, kad naudojatės SSGPT6 svetaine.", birthday: "Su gimtadieniu nuo SSGPT6." },
  { code: "lv-LV", label: "Latvian", country: "Latvia", greetingMorning: "Labrīt", greetingAfternoon: "Labdien", greetingEvening: "Labvakar", greetingNight: "Ar labunakti", thanks: "Paldies, ka izmantojat SSGPT6 vietni.", birthday: "Daudz laimes dzimšanas dienā no SSGPT6." },
  { code: "et-EE", label: "Estonian", country: "Estonia", greetingMorning: "Tere hommikust", greetingAfternoon: "Tere päevast", greetingEvening: "Tere õhtust", greetingNight: "Head ööd", thanks: "Aitäh, et kasutate SSGPT6 veebisaiti.", birthday: "Palju õnne sünnipäevaks SSGPT6-lt." },
  { code: "sw-KE", label: "Swahili", country: "Kenya", greetingMorning: "Habari za asubuhi", greetingAfternoon: "Habari za mchana", greetingEvening: "Habari za jioni", greetingNight: "Usiku mwema", thanks: "Asante kwa kutumia tovuti ya SSGPT6.", birthday: "Heri ya kuzaliwa kutoka SSGPT6." },
  { code: "zu-ZA", label: "Zulu", country: "South Africa", greetingMorning: "Sawubona ekuseni", greetingAfternoon: "Sawubona ntambama", greetingEvening: "Sawubona kusihlwa", greetingNight: "Ulale kahle", thanks: "Siyabonga ngokusebenzisa iwebhusayithi ye-SSGPT6.", birthday: "Usuku olumnandi lokuzalwa oluvela ku-SSGPT6." },
  { code: "af-ZA", label: "Afrikaans", country: "South Africa", greetingMorning: "Goeiemôre", greetingAfternoon: "Goeiemiddag", greetingEvening: "Goeienaand", greetingNight: "Goeienag", thanks: "Dankie dat jy die SSGPT6-webwerf gebruik.", birthday: "Gelukkige verjaarsdag van SSGPT6." }
];

function getGreeting(): GreetingType {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

function getGreetingText(language: LanguageOption, type: GreetingType) {
  if (type === "morning") return language.greetingMorning;
  if (type === "afternoon") return language.greetingAfternoon;
  if (type === "evening") return language.greetingEvening;
  return language.greetingNight;
}

export default function SpecialAnnouncementSystem() {
  const [mounted, setMounted] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("en-US");
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Voice command is not active.");

  useEffect(() => {
    setMounted(true);

    const savedName = localStorage.getItem("ssgpt6_member_name") || "";
    const savedBirthday = localStorage.getItem("ssgpt6_member_birthday") || "";
    const savedLanguage = localStorage.getItem("ssgpt6_language_code") || "en-US";

    setMemberName(savedName);
    setBirthday(savedBirthday);
    setSelectedLanguageCode(savedLanguage);
  }, []);

  const greetingType = useMemo(() => getGreeting(), []);
  const selectedLanguage = useMemo(() => {
    return LANGUAGES.find((item) => item.code === selectedLanguageCode) || LANGUAGES[0];
  }, [selectedLanguageCode]);

  const isBirthday = useMemo(() => {
    if (!birthday) return false;
    const today = new Date();
    const birth = new Date(birthday);
    return today.getMonth() === birth.getMonth() && today.getDate() === birth.getDate();
  }, [birthday]);

  const greetingText = useMemo(() => {
    return getGreetingText(selectedLanguage, greetingType);
  }, [selectedLanguage, greetingType]);

  const fullMessage = useMemo(() => {
    const namePart = memberName ? ` ${memberName},` : "";
    const birthdayPart = isBirthday ? ` ${selectedLanguage.birthday}` : "";
    return `${greetingText}${namePart} ${selectedLanguage.thanks}${birthdayPart}`;
  }, [greetingText, memberName, selectedLanguage, isBirthday]);

  const handleSaveProfile = () => {
    localStorage.setItem("ssgpt6_member_name", memberName);
    localStorage.setItem("ssgpt6_member_birthday", birthday);
    localStorage.setItem("ssgpt6_language_code", selectedLanguageCode);
    alert("Profile saved successfully.");
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech is not supported on this device.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(fullMessage);
    utterance.lang = selectedLanguage.code;
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeechEnabled(true);
  };

  const handleEnableVoiceCommands = () => {
    const speechRecognitionAvailable =
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window);

    if (!speechRecognitionAvailable) {
      alert("Voice recognition is not supported on this device.");
      return;
    }

    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = selectedLanguage.code;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setVoiceCommandsEnabled(true);
      setVoiceStatus("Voice command is listening.");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.toLowerCase() || "";
      setVoiceStatus(`Command received: ${transcript}`);

      if (transcript.includes("home")) {
        window.location.href = "/";
      } else if (transcript.includes("about")) {
        window.location.href = "/about";
      } else if (transcript.includes("contact")) {
        window.location.href = "/contact";
      } else if (transcript.includes("projects")) {
        window.location.href = "/projects";
      } else if (transcript.includes("automation")) {
        window.location.href = "/automation";
      } else if (transcript.includes("tradehub")) {
        window.location.href = "https://tradehub.ssgpt6.com";
      } else if (transcript.includes("earnai")) {
        window.location.href = "https://earnai.vercel.app";
      } else if (transcript.includes("greeting")) {
        handleSpeak();
      }
    };

    recognition.onerror = () => {
      setVoiceStatus("Voice command error occurred.");
      setVoiceCommandsEnabled(false);
    };

    recognition.onend = () => {
      setVoiceCommandsEnabled(false);
      setVoiceStatus("Voice command stopped.");
    };

    recognition.start();
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
          Global Special Announcement System
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

        <div>
          <label style={{ display: "block", marginBottom: "6px", color: "#f5c542" }}>
            Language and Country Voice
          </label>
          <select
            value={selectedLanguageCode}
            onChange={(e) => setSelectedLanguageCode(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "#ffffff"
            }}
          >
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.country} - {item.label}
              </option>
            ))}
          </select>
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
          Play Global Greeting
        </button>

        <button
          onClick={handleEnableVoiceCommands}
          style={{
            background: "#34d399",
            color: "#0b1220",
            border: "none",
            borderRadius: "10px",
            padding: "12px 18px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Start Voice Command
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
        <h3 style={{ color: "#f5c542", marginBottom: "10px" }}>Global Features</h3>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          <li>Multi-language announcement system</li>
          <li>Country-based voice option selector</li>
          <li>Birthday celebration greeting</li>
          <li>AI speech playback</li>
          <li>Voice command navigation</li>
          <li>Profile saved in browser</li>
          <li>Ready for future avatar video integration</li>
        </ul>
      </div>

      <p style={{ marginTop: "14px", color: "#93c5fd" }}>
        {voiceStatus}
      </p>

      {speechEnabled && (
        <p style={{ marginTop: "10px", color: "#93c5fd" }}>
          Voice greeting activated successfully.
        </p>
      )}

      {voiceCommandsEnabled && (
        <p style={{ marginTop: "10px", color: "#86efac" }}>
          Voice command is active.
        </p>
      )}
    </section>
  );
}