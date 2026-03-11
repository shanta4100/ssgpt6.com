




"use client";

import { useEffect, useMemo, useState } from "react";

type GreetingType = "morning" | "afternoon" | "evening" | "night";

type TranslationSet = {
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  greetingNight: string;
  thanks: string;
  birthday: string;
  locationReady: string;
  locationUnavailable: string;
  localServices: string;
  music: string;
  cinema: string;
  games: string;
  news: string;
  welcome: string;
};

const TRANSLATIONS: Record<string, TranslationSet> = {
  en: {
    greetingMorning: "Good morning",
    greetingAfternoon: "Good afternoon",
    greetingEvening: "Good evening",
    greetingNight: "Good night",
    thanks: "Thank you for using the SSGPT6 website.",
    birthday: "Happy birthday from SSGPT6.",
    locationReady: "Your local country version is active.",
    locationUnavailable: "Location is not available yet.",
    localServices: "Local Services",
    music: "Local Music",
    cinema: "Local Cinema",
    games: "Local Video Games",
    news: "Local News",
    welcome: "Welcome to your local SSGPT6 experience."
  },
  es: {
    greetingMorning: "Buenos días",
    greetingAfternoon: "Buenas tardes",
    greetingEvening: "Buenas noches",
    greetingNight: "Buenas noches",
    thanks: "Gracias por usar el sitio web de SSGPT6.",
    birthday: "Feliz cumpleaños de parte de SSGPT6.",
    locationReady: "La versión local de su país está activa.",
    locationUnavailable: "La ubicación aún no está disponible.",
    localServices: "Servicios Locales",
    music: "Música Local",
    cinema: "Cine Local",
    games: "Videojuegos Locales",
    news: "Noticias Locales",
    welcome: "Bienvenido a su experiencia local de SSGPT6."
  },
  fr: {
    greetingMorning: "Bonjour",
    greetingAfternoon: "Bon après-midi",
    greetingEvening: "Bonsoir",
    greetingNight: "Bonne nuit",
    thanks: "Merci d'utiliser le site web SSGPT6.",
    birthday: "Joyeux anniversaire de la part de SSGPT6.",
    locationReady: "La version locale de votre pays est active.",
    locationUnavailable: "La localisation n'est pas encore disponible.",
    localServices: "Services Locaux",
    music: "Musique Locale",
    cinema: "Cinéma Local",
    games: "Jeux Vidéo Locaux",
    news: "Actualités Locales",
    welcome: "Bienvenue dans votre expérience locale SSGPT6."
  },
  de: {
    greetingMorning: "Guten Morgen",
    greetingAfternoon: "Guten Tag",
    greetingEvening: "Guten Abend",
    greetingNight: "Gute Nacht",
    thanks: "Vielen Dank für die Nutzung der SSGPT6-Website.",
    birthday: "Alles Gute zum Geburtstag von SSGPT6.",
    locationReady: "Ihre lokale Länderversion ist aktiv.",
    locationUnavailable: "Standort ist noch nicht verfügbar.",
    localServices: "Lokale Dienste",
    music: "Lokale Musik",
    cinema: "Lokales Kino",
    games: "Lokale Videospiele",
    news: "Lokale Nachrichten",
    welcome: "Willkommen bei Ihrem lokalen SSGPT6-Erlebnis."
  },
  pt: {
    greetingMorning: "Bom dia",
    greetingAfternoon: "Boa tarde",
    greetingEvening: "Boa noite",
    greetingNight: "Boa noite",
    thanks: "Obrigado por usar o site da SSGPT6.",
    birthday: "Feliz aniversário da SSGPT6.",
    locationReady: "A versão local do seu país está ativa.",
    locationUnavailable: "A localização ainda não está disponível.",
    localServices: "Serviços Locais",
    music: "Música Local",
    cinema: "Cinema Local",
    games: "Jogos Locais",
    news: "Notícias Locais",
    welcome: "Bem-vindo à sua experiência local SSGPT6."
  },
  ar: {
    greetingMorning: "صباح الخير",
    greetingAfternoon: "مساء الخير",
    greetingEvening: "مساء الخير",
    greetingNight: "تصبح على خير",
    thanks: "شكراً لاستخدامك موقع SSGPT6.",
    birthday: "عيد ميلاد سعيد من SSGPT6.",
    locationReady: "تم تفعيل نسخة بلدك المحلية.",
    locationUnavailable: "الموقع غير متاح بعد.",
    localServices: "الخدمات المحلية",
    music: "الموسيقى المحلية",
    cinema: "السينما المحلية",
    games: "ألعاب الفيديو المحلية",
    news: "الأخبار المحلية",
    welcome: "مرحباً بك في تجربة SSGPT6 المحلية."
  },
  bn: {
    greetingMorning: "সুপ্রভাত",
    greetingAfternoon: "শুভ অপরাহ্ন",
    greetingEvening: "শুভ সন্ধ্যা",
    greetingNight: "শুভ রাত্রি",
    thanks: "SSGPT6 ওয়েবসাইট ব্যবহার করার জন্য ধন্যবাদ।",
    birthday: "SSGPT6-এর পক্ষ থেকে শুভ জন্মদিন।",
    locationReady: "আপনার দেশের লোকাল ভার্সন চালু হয়েছে।",
    locationUnavailable: "অবস্থান এখনো পাওয়া যায়নি।",
    localServices: "লোকাল সার্ভিস",
    music: "লোকাল মিউজিক",
    cinema: "লোকাল সিনেমা",
    games: "লোকাল ভিডিও গেম",
    news: "লোকাল নিউজ",
    welcome: "আপনার লোকাল SSGPT6 অভিজ্ঞতায় স্বাগতম।"
  },
  hi: {
    greetingMorning: "सुप्रभात",
    greetingAfternoon: "नमस्कार",
    greetingEvening: "शुभ संध्या",
    greetingNight: "शुभ रात्रि",
    thanks: "SSGPT6 वेबसाइट उपयोग करने के लिए धन्यवाद।",
    birthday: "SSGPT6 की ओर से जन्मदिन मुबारक।",
    locationReady: "आपके देश का स्थानीय संस्करण सक्रिय है।",
    locationUnavailable: "स्थान अभी उपलब्ध नहीं है।",
    localServices: "स्थानीय सेवाएँ",
    music: "स्थानीय संगीत",
    cinema: "स्थानीय सिनेमा",
    games: "स्थानीय वीडियो गेम",
    news: "स्थानीय समाचार",
    welcome: "आपके स्थानीय SSGPT6 अनुभव में आपका स्वागत है।"
  },
  ur: {
    greetingMorning: "صبح بخیر",
    greetingAfternoon: "دوپہر بخیر",
    greetingEvening: "شام بخیر",
    greetingNight: "شب بخیر",
    thanks: "SSGPT6 ویب سائٹ استعمال کرنے کا شکریہ۔",
    birthday: "SSGPT6 کی طرف سے سالگرہ مبارک۔",
    locationReady: "آپ کے ملک کا مقامی ورژن فعال ہے۔",
    locationUnavailable: "مقام ابھی دستیاب نہیں ہے۔",
    localServices: "مقامی خدمات",
    music: "مقامی موسیقی",
    cinema: "مقامی سینما",
    games: "مقامی ویڈیو گیمز",
    news: "مقامی خبریں",
    welcome: "آپ کے مقامی SSGPT6 تجربے میں خوش آمدید۔"
  },
  zh: {
    greetingMorning: "早上好",
    greetingAfternoon: "下午好",
    greetingEvening: "晚上好",
    greetingNight: "晚安",
    thanks: "感谢您使用 SSGPT6 网站。",
    birthday: "SSGPT6 祝您生日快乐。",
    locationReady: "您所在国家的本地版本已启用。",
    locationUnavailable: "位置暂时不可用。",
    localServices: "本地服务",
    music: "本地音乐",
    cinema: "本地影院",
    games: "本地电子游戏",
    news: "本地新闻",
    welcome: "欢迎使用您的本地 SSGPT6 体验。"
  },
  ja: {
    greetingMorning: "おはようございます",
    greetingAfternoon: "こんにちは",
    greetingEvening: "こんばんは",
    greetingNight: "おやすみなさい",
    thanks: "SSGPT6 ウェブサイトをご利用いただきありがとうございます。",
    birthday: "SSGPT6よりお誕生日おめでとうございます。",
    locationReady: "お住まいの国のローカル版が有効です。",
    locationUnavailable: "位置情報はまだ利用できません。",
    localServices: "ローカルサービス",
    music: "ローカル音楽",
    cinema: "ローカル映画館",
    games: "ローカルゲーム",
    news: "ローカルニュース",
    welcome: "あなたのローカル SSGPT6 体験へようこそ。"
  },
  ko: {
    greetingMorning: "좋은 아침입니다",
    greetingAfternoon: "안녕하세요",
    greetingEvening: "좋은 저녁입니다",
    greetingNight: "안녕히 주무세요",
    thanks: "SSGPT6 웹사이트를 이용해 주셔서 감사합니다.",
    birthday: "SSGPT6가 생일을 축하합니다.",
    locationReady: "해당 국가의 로컬 버전이 활성화되었습니다.",
    locationUnavailable: "위치를 아직 사용할 수 없습니다.",
    localServices: "로컬 서비스",
    music: "로컬 음악",
    cinema: "로컬 시네마",
    games: "로컬 게임",
    news: "로컬 뉴스",
    welcome: "로컬 SSGPT6 경험에 오신 것을 환영합니다."
  },
  ru: {
    greetingMorning: "Доброе утро",
    greetingAfternoon: "Добрый день",
    greetingEvening: "Добрый вечер",
    greetingNight: "Спокойной ночи",
    thanks: "Спасибо за использование сайта SSGPT6.",
    birthday: "С днем рождения от SSGPT6.",
    locationReady: "Локальная версия вашей страны активна.",
    locationUnavailable: "Местоположение пока недоступно.",
    localServices: "Локальные сервисы",
    music: "Локальная музыка",
    cinema: "Локальное кино",
    games: "Локальные видеоигры",
    news: "Локальные новости",
    welcome: "Добро пожаловать в локальный опыт SSGPT6."
  }
};

function getGreetingType(): GreetingType {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

function getBaseLanguageCode(locale: string) {
  return locale.split("-")[0].toLowerCase();
}

function getTranslation(locale: string): TranslationSet {
  const base = getBaseLanguageCode(locale);
  return TRANSLATIONS[base] || TRANSLATIONS.en;
}

function getGreetingText(locale: string, type: GreetingType) {
  const t = getTranslation(locale);
  if (type === "morning") return t.greetingMorning;
  if (type === "afternoon") return t.greetingAfternoon;
  if (type === "evening") return t.greetingEvening;
  return t.greetingNight;
}

function getCountryNameFromLocale(locale: string) {
  try {
    const region = locale.split("-")[1];
    if (!region) return "Global";
    const display = new Intl.DisplayNames([locale], { type: "region" });
    return display.of(region) || region;
  } catch {
    return "Global";
  }
}

function getVoiceMatch(voices: SpeechSynthesisVoice[], locale: string) {
  return (
    voices.find((voice) => voice.lang.toLowerCase() === locale.toLowerCase()) ||
    voices.find((voice) =>
      voice.lang.toLowerCase().startsWith(getBaseLanguageCode(locale))
    ) ||
    voices[0] ||
    null
  );
}

export default function SpecialAnnouncementSystem() {
  const [mounted, setMounted] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [locale, setLocale] = useState("en-US");
  const [countryName, setCountryName] = useState("Global");
  const [timeZone, setTimeZone] = useState("UTC");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState("Location is not active.");
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Voice command is not active.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    setMounted(true);

    const browserLocale = navigator.language || "en-US";
    const savedName = localStorage.getItem("ssgpt6_member_name") || "";
    const savedBirthday = localStorage.getItem("ssgpt6_member_birthday") || "";
    const savedLocale = localStorage.getItem("ssgpt6_locale") || browserLocale;

    setMemberName(savedName);
    setBirthday(savedBirthday);
    setLocale(savedLocale);
    setCountryName(getCountryNameFromLocale(savedLocale));

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZone(tz || "UTC");
    } catch {
      setTimeZone("UTC");
    }

    if ("speechSynthesis" in window) {
      const loadVoices = () => {
        const available = window.speechSynthesis.getVoices();
        if (available.length > 0) setVoices(available);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const translation = useMemo(() => getTranslation(locale), [locale]);
  const greetingType = useMemo(() => getGreetingType(), []);
  const greetingText = useMemo(
    () => getGreetingText(locale, greetingType),
    [locale, greetingType]
  );

  const isBirthday = useMemo(() => {
    if (!birthday) return false;
    const today = new Date();
    const birth = new Date(birthday);
    return today.getMonth() === birth.getMonth() && today.getDate() === birth.getDate();
  }, [birthday]);

  const fullMessage = useMemo(() => {
    const namePart = memberName ? ` ${memberName},` : "";
    const birthdayPart = isBirthday ? ` ${translation.birthday}` : "";
    return `${greetingText}${namePart} ${translation.welcome} ${translation.thanks} ${translation.locationReady}${birthdayPart}`;
  }, [greetingText, memberName, isBirthday, translation]);

  const selectedVoice = useMemo(() => getVoiceMatch(voices, locale), [voices, locale]);

  const handleSaveProfile = () => {
    localStorage.setItem("ssgpt6_member_name", memberName);
    localStorage.setItem("ssgpt6_member_birthday", birthday);
    localStorage.setItem("ssgpt6_locale", locale);
    alert("Profile saved successfully.");
  };

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Speech is not supported on this device.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(fullMessage);
    utterance.lang = locale;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeechEnabled(true);
  };

  const handleDetectLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus(translation.locationUnavailable);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude.toFixed(5));
        const lng = Number(position.coords.longitude.toFixed(5));
        setCoordinates({ lat, lng });
        setLocationStatus(`${translation.locationReady} (${lat}, ${lng})`);
      },
      () => {
        setLocationStatus(translation.locationUnavailable);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleAutoActivateLocalVersion = () => {
    const browserLocale = navigator.language || "en-US";
    setLocale(browserLocale);
    setCountryName(getCountryNameFromLocale(browserLocale));
    localStorage.setItem("ssgpt6_locale", browserLocale);
    setLocationStatus(translation.locationReady);
  };

  const handleEnableVoiceCommands = () => {
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert("Voice recognition is not supported on this device.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = locale;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setVoiceCommandsEnabled(true);
      setVoiceStatus("Voice command is listening.");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.toLowerCase() || "";
      setVoiceStatus(`Command received: ${transcript}`);

      if (transcript.includes("home")) window.location.href = "/";
      else if (transcript.includes("about")) window.location.href = "/about";
      else if (transcript.includes("contact")) window.location.href = "/contact";
      else if (transcript.includes("projects")) window.location.href = "/projects";
      else if (transcript.includes("automation")) window.location.href = "/automation";
      else if (transcript.includes("tradehub")) window.location.href = "https://tradehub.ssgpt6.com";
      else if (transcript.includes("earnai")) window.location.href = "https://earnai.vercel.app";
      else if (transcript.includes("music")) window.location.href = `https://www.google.com/search?q=${encodeURIComponent(countryName + " music")}`;
      else if (transcript.includes("cinema")) window.location.href = `https://www.google.com/search?q=${encodeURIComponent(countryName + " cinema")}`;
      else if (transcript.includes("games")) window.location.href = `https://www.google.com/search?q=${encodeURIComponent(countryName + " video games")}`;
      else if (transcript.includes("news")) window.location.href = `https://www.google.com/search?q=${encodeURIComponent(countryName + " news")}`;
      else if (transcript.includes("greeting")) handleSpeak();
    };

    recognition.onerror = () => {
      setVoiceCommandsEnabled(false);
      setVoiceStatus("Voice command error occurred.");
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
        Global Location + Language Activation
      </p>

      <h2 style={{ fontSize: "30px", marginBottom: "12px" }}>{greetingText}</h2>

      <p style={{ fontSize: "17px", lineHeight: "1.7", marginBottom: "18px" }}>
        {fullMessage}
      </p>

      <div style={{ display: "grid", gap: "14px", marginBottom: "20px" }}>
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
            Active Locale
          </label>
          <input
            value={locale}
            onChange={(e) => {
              setLocale(e.target.value);
              setCountryName(getCountryNameFromLocale(e.target.value));
            }}
            placeholder="en-US"
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
          onClick={handleAutoActivateLocalVersion}
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
          Activate Country Version
        </button>

        <button
          onClick={handleDetectLocation}
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
          Detect Geographical Location
        </button>

        <button
          onClick={handleSpeak}
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
          Play Local Greeting
        </button>

        <button
          onClick={handleEnableVoiceCommands}
          style={{
            background: "#c084fc",
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

        <button
          onClick={handleSaveProfile}
          style={{
            background: "#f97316",
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
      </div>

      <div
        style={{
          background: "#111827",
          borderRadius: "14px",
          padding: "16px",
          border: "1px solid #1f2937",
          marginBottom: "18px"
        }}
      >
        <h3 style={{ color: "#f5c542", marginBottom: "12px" }}>Location Status</h3>
        <p style={{ marginBottom: "8px" }}>{locationStatus}</p>
        <p style={{ marginBottom: "8px" }}>Country: {countryName}</p>
        <p style={{ marginBottom: "8px" }}>Locale: {locale}</p>
        <p style={{ marginBottom: "8px" }}>Time Zone: {timeZone}</p>
        <p style={{ marginBottom: "0" }}>
          Coordinates: {coordinates ? `${coordinates.lat}, ${coordinates.lng}` : "Not detected"}
        </p>
      </div>

      <div
        style={{
          background: "#111827",
          borderRadius: "14px",
          padding: "16px",
          border: "1px solid #1f2937",
          marginBottom: "18px"
        }}
      >
        <h3 style={{ color: "#f5c542", marginBottom: "12px" }}>{translation.localServices}</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px"
          }}
        >
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(countryName + " music")}`}
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937",
              color: "#ffffff",
              textDecoration: "none"
            }}
          >
            {translation.music}
          </a>

          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(countryName + " cinema")}`}
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937",
              color: "#ffffff",
              textDecoration: "none"
            }}
          >
            {translation.cinema}
          </a>

          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(countryName + " video games")}`}
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937",
              color: "#ffffff",
              textDecoration: "none"
            }}
          >
            {translation.games}
          </a>

          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(countryName + " news")}`}
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937",
              color: "#ffffff",
              textDecoration: "none"
            }}
          >
            {translation.news}
          </a>
        </div>
      </div>

      <div
        style={{
          background: "#111827",
          borderRadius: "14px",
          padding: "16px",
          border: "1px solid #1f2937",
          marginBottom: "18px"
        }}
      >
        <h3 style={{ color: "#f5c542", marginBottom: "12px" }}>Command Features</h3>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          <li>Automatic browser language activation</li>
          <li>Geographical location detection</li>
          <li>Country version language service</li>
          <li>Local music, cinema, games, and news links</li>
          <li>Voice greeting playback</li>
          <li>Voice command navigation</li>
          <li>Birthday greeting support</li>
        </ul>
      </div>

      <div
        style={{
          background: "#111827",
          borderRadius: "14px",
          padding: "16px",
          border: "1px solid #1f2937",
          marginBottom: "18px"
        }}
      >
        <h3 style={{ color: "#f5c542", marginBottom: "12px" }}>
          SS Solitaire Gameplay System
        </h3>

        <div style={{ display: "grid", gap: "14px" }}>
          <div
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937"
            }}
          >
            <h4 style={{ color: "#f5c542", marginTop: 0, marginBottom: "10px" }}>
              1. Core Game Design
            </h4>
            <ul style={{ paddingLeft: "18px", margin: 0 }}>
              <li>Classic Klondike Solitaire</li>
              <li>52-card deck</li>
              <li>7 tableau piles, stock, waste, and foundations</li>
              <li>Alternating colors and descending order</li>
              <li>Win by moving all cards to foundations</li>
            </ul>
          </div>

          <div
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937"
            }}
          >
            <h4 style={{ color: "#f5c542", marginTop: 0, marginBottom: "10px" }}>
              2. Autonomous Automation Features
            </h4>
            <ul style={{ paddingLeft: "18px", margin: 0 }}>
              <li>Auto-move to foundations</li>
              <li>Suggest best legal moves</li>
              <li>Auto-play mode to complete the game</li>
              <li>Rule-based decision engine</li>
              <li>Optional future Monte Carlo simulation</li>
            </ul>
          </div>

          <div
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937"
            }}
          >
            <h4 style={{ color: "#f5c542", marginTop: 0, marginBottom: "10px" }}>
              3. Technical Architecture
            </h4>
            <ul style={{ paddingLeft: "18px", margin: 0 }}>
              <li>Cross-platform web or mobile interface</li>
              <li>Drag-and-drop card interaction</li>
              <li>Auto-play toggle button</li>
              <li>Game state manager for deck, tableau, and foundations</li>
              <li>Autonomous module runs until no legal moves remain</li>
            </ul>
          </div>

          <div
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937"
            }}
          >
            <h4 style={{ color: "#f5c542", marginTop: 0, marginBottom: "10px" }}>
              4. Automation Workflow
            </h4>
            <ol style={{ paddingLeft: "18px", margin: 0 }}>
              <li>Initialize game state</li>
              <li>Shuffle deck and deal tableau</li>
              <li>Choose manual mode or auto mode</li>
              <li>Scan tableau, stock, and waste</li>
              <li>Apply best move until win or no move remains</li>
            </ol>
          </div>

          <div
            style={{
              background: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #1f2937"
            }}
          >
            <h4 style={{ color: "#f5c542", marginTop: 0, marginBottom: "10px" }}>
              5. Example Automation Engine
            </h4>
            <pre
              style={{
                background: "#020617",
                color: "#93c5fd",
                padding: "14px",
                borderRadius: "10px",
                overflowX: "auto",
                fontSize: "13px",
                margin: 0
              }}
            >
{`def auto_play(game_state):
    while not game_state.is_over():
        moves = game_state.get_legal_moves()
        if not moves:
            break
        best_move = select_best_move(moves)
        game_state.apply(best_move)
    return game_state.result()`}
            </pre>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#111827",
          borderRadius: "14px",
          padding: "16px",
          border: "1px solid #1f2937"
        }}
      >
        <h3 style={{ color: "#f5c542", marginBottom: "12px" }}>
          Extra Game Features
        </h3>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          <li>Replay mode</li>
          <li>Speed control</li>
          <li>Statistics tracking</li>
          <li>Theme and card customization</li>
          <li>Future game app and subdomain expansion</li>
        </ul>
      </div>

      <p style={{ marginTop: "14px", color: "#93c5fd" }}>{voiceStatus}</p>

      {speechEnabled && (
        <p style={{ marginTop: "10px", color: "#93c5fd" }}>
          Local language greeting activated successfully.
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