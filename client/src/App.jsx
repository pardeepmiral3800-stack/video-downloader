import { useState, useEffect, useRef } from "react";
import SeoHead from "./SeoHead";

function App() {
  const [url, setUrl] = useState("");
  const [mediaInfo, setMediaInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [open, setOpen] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [copiedText, setCopiedText] = useState("");
  
  // 3D References
  const mainCardRef = useRef(null);
  const navRef = useRef(null);

  // Language translations (same as your code)
  const translations = {
    en: {
      navTitle: "MoboInsta",
      features: "Features",
      services: "Services",
      faq: "FAQ",
      placeholder: "🔗 Paste Instagram URL here...",
      fetch: "FETCH MEDIA",
      fetching: "PROCESSING...",
      download: "📥 DOWNLOAD NOW",
      downloading: "📥 DOWNLOADING...",
      preview: "MEDIA PREVIEW",
      noPreview: "No preview available",
      errorInvalidUrl: "❌ Invalid Instagram URL",
      errorEmptyUrl: "⚠️ Please enter URL",
      heroTitle: "NEURAL INSTAGRAM DOWNLOADER",
      heroSubtitle: "Download Reels, Posts & Stories in 4K Quality",
      featuresTitle: "AI FEATURES",
      servicesTitle: "🌟 OUR SERVICES",
      faqTitle: "❔ FREQUENTLY ASKED QUESTIONS",
      copyright: "© 2025 MoboInsta. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact Us",
      likes: "Likes",
      comments: "Comments",
      timestamp: "Posted on",
      views: "Views",
      description: "Description",
      copy: "Copy",
      copied: "Copied!",
    },
    hi: {
      navTitle: "मोबोइंस्टा",
      features: "विशेषताएं",
      services: "सेवाएं",
      faq: "सवाल-जवाब",
      placeholder: "🔗 इंस्टाग्राम URL पेस्ट करें...",
      fetch: "मीडिया लाएं",
      fetching: "प्रोसेसिंग...",
      download: "📥 डाउनलोड करें",
      downloading: "📥 डाउनलोड हो रहा...",
      preview: "मीडिया पूर्वावलोकन",
      noPreview: "कोई पूर्वावलोकन नहीं",
      errorInvalidUrl: "❌ अमान्य इंस्टाग्राम URL",
      errorEmptyUrl: "⚠️ कृपया URL दर्ज करें",
      heroTitle: "न्यूरल इंस्टाग्राम डाउनलोडर",
      heroSubtitle: "4K क्वालिटी में रील्स, पोस्ट्स और स्टोरीज़ डाउनलोड करें",
      featuresTitle: "AI विशेषताएं",
      servicesTitle: "🌟 हमारी सेवाएं",
      faqTitle: "❔ अक्सर पूछे जाने वाले सवाल",
      copyright: "© 2025 मोबोइंस्टा। सभी अधिकार सुरक्षित।",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      contact: "हमसे संपर्क करें",
      likes: "लाइक्स",
      comments: "कमेंट्स",
      timestamp: "पोस्ट की तारीख",
      views: "व्यूज",
      description: "विवरण",
      copy: "कॉपी करें",
      copied: "कॉपी किया गया!",
    },
    es: {
      navTitle: "MoboInsta",
      features: "Características",
      services: "Servicios",
      faq: "Preguntas Frecuentes",
      placeholder: "🔗 Pegar URL de Instagram aquí...",
      fetch: "OBTENER MEDIA",
      fetching: "PROCESANDO...",
      download: "📥 DESCARGAR AHORA",
      downloading: "📥 DESCARGANDO...",
      preview: "VISTA PREVIA",
      noPreview: "No hay vista previa disponible",
      errorInvalidUrl: "❌ URL de Instagram no válida",
      errorEmptyUrl: "⚠️ Por favor ingrese URL",
      heroTitle: "DESCARGADOR NEURAL DE INSTAGRAM",
      heroSubtitle: "Descarga Reels, Posts y Stories en Calidad 4K",
      featuresTitle: "CARACTERÍSTICAS IA",
      servicesTitle: "🌟 NUESTROS SERVICIOS",
      faqTitle: "❔ PREGUNTAS FRECUENTES",
      copyright: "© 2025 MoboInsta. Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      contact: "Contáctanos",
      likes: "Me gusta",
      comments: "Comentarios",
      timestamp: "Publicado el",
      views: "Vistas",
      description: "Descripción",
      copy: "Copiar",
      copied: "¡Copiado!",
    },
    fr: {
      navTitle: "MoboInsta",
      features: "Fonctionnalités",
      services: "Services",
      faq: "FAQ",
      placeholder: "🔗 Coller l'URL Instagram ici...",
      fetch: "OBTENIR LE MÉDIA",
      fetching: "TRAITEMENT...",
      download: "📥 TÉLÉCHARGER MAINTENANT",
      downloading: "📥 TÉLÉCHARGEMENT...",
      preview: "APERÇU DU MÉDIA",
      noPreview: "Aucun aperçu disponible",
      errorInvalidUrl: "❌ URL Instagram non valide",
      errorEmptyUrl: "⚠️ Veuillez saisir l'URL",
      heroTitle: "TÉLÉCHARGEUR NEURAL INSTAGRAM",
      heroSubtitle: "Téléchargez Reels, Posts et Stories en Qualité 4K",
      featuresTitle: "FONCTIONNALITÉS IA",
      servicesTitle: "🌟 NOS SERVICES",
      faqTitle: "❔ QUESTIONS FRÉQUENTES",
      copyright: "© 2025 MoboInsta. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      contact: "Nous contacter",
      likes: "J'aime",
      comments: "Commentaires",
      timestamp: "Publié le",
      views: "Vues",
      description: "Description",
      copy: "Copier",
      copied: "Copié!",
    },
    de: {
      navTitle: "MoboInsta",
      features: "Funktionen",
      services: "Dienstleistungen",
      faq: "FAQ",
      placeholder: "🔗 Instagram-URL hier einfügen...",
      fetch: "MEDIA ABRUFEN",
      fetching: "WIRD VERARBEITET...",
      download: "📥 JETZT HERUNTERLADEN",
      downloading: "📥 WIRD HERUNTERGELADEN...",
      preview: "MEDIEN-VORSCHAU",
      noPreview: "Keine Vorschau verfügbar",
      errorInvalidUrl: "❌ Ungültige Instagram-URL",
      errorEmptyUrl: "⚠️ Bitte URL eingeben",
      heroTitle: "NEURALER INSTAGRAM-DOWNLOADER",
      heroSubtitle: "Laden Sie Reels, Posts und Stories in 4K-Qualität herunter",
      featuresTitle: "KI-FUNKTIONEN",
      servicesTitle: "🌟 UNSERE DIENSTLEISTUNGEN",
      faqTitle: "❔ HÄUFIG GESTELLTE FRAGEN",
      copyright: "© 2025 MoboInsta. Alle Rechte vorbehalten.",
      privacy: "Datenschutzrichtlinie",
      terms: "Nutzungsbedingungen",
      contact: "Kontakt",
      likes: "Likes",
      comments: "Kommentare",
      timestamp: "Veröffentlicht am",
      views: "Aufrufe",
      description: "Beschreibung",
      copy: "Kopieren",
      copied: "Kopiert!",
    },
    ar: {
      navTitle: "موبوإنستا",
      features: "الميزات",
      services: "الخدمات",
      faq: "الأسئلة الشائعة",
      placeholder: "🔗 الصق رابط إنستغرام هنا...",
      fetch: "جلب المحتوى",
      fetching: "جاري المعالجة...",
      download: "📥 تحميل الآن",
      downloading: "📥 جاري التحميل...",
      preview: "معاينة المحتوى",
      noPreview: "لا توجد معاينة متاحة",
      errorInvalidUrl: "❌ رابط إنستغرام غير صالح",
      errorEmptyUrl: "⚠️ يرجى إدخال الرابط",
      heroTitle: "تحميل إنستغرام العصبي",
      heroSubtitle: "حمل الريلز والمشاركات والستوريات بجودة 4K",
      featuresTitle: "ميزات الذكاء الاصطناعي",
      servicesTitle: "🌟 خدماتنا",
      faqTitle: "❔ الأسئلة الشائعة",
      copyright: "© 2025 موبوإنستا. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      contact: "اتصل بنا",
      likes: "الإعجابات",
      comments: "التعليقات",
      timestamp: "نشر في",
      views: "المشاهدات",
      description: "الوصف",
      copy: "نسخ",
      copied: "تم النسخ!",
    },
  };

  const t = translations[language];

  // Auto-fetch when URL changes (with debounce) - Same as your code
  useEffect(() => {
    if (url && isValidInstagramUrl(url)) {
      const timer = setTimeout(() => {
        handleFetch();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [url]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Copy to clipboard function
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(""), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleFetch = async () => {
    if (!url) {
      setError(t.errorEmptyUrl);
      return;
    }

    if (!isValidInstagramUrl(url)) {
      setError(t.errorInvalidUrl);
      return;
    }

    setLoading(true);
    setError("");
    setMediaInfo(null);

    try {
      const endpoint = `http://localhost:5000/instagram?url=${encodeURIComponent(url)}`;
      const res = await fetch(endpoint);
      const data = await res.json();

      if (res.ok) {
        setMediaInfo(data);
      } else {
        setError(data.error || "Failed to fetch media.");
      }
    } catch (err) {
      setError("Failed to fetch media. Please check your connection.");
      console.error("Fetch error:", err);
    }

    setLoading(false);
  };

  // Download function - Same as your code
  const handleDownload = async () => {
    if (!mediaInfo || !mediaInfo.mediaUrl) {
      setError("No media available for download");
      return;
    }

    setDownloading(true);
    
    try {
      const response = await fetch(mediaInfo.mediaUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      
      const extension = mediaInfo.type === 'video' ? 'mp4' : 'jpg';
      const filename = `instagram_${Date.now()}.${extension}`;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      console.error('Download failed:', error);
      
      try {
        const downloadEndpoint = `http://localhost:5000/instagram/download?url=${encodeURIComponent(url)}`;
        const link = document.createElement('a');
        link.href = downloadEndpoint;
        link.download = 'instagram_media.mp4';
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error('Fallback download failed:', fallbackError);
        setError('Download failed. Please try again.');
      }
    }
    
    setTimeout(() => setDownloading(false), 1500);
  };

  const isValidInstagramUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|stories)\/.+$/.test(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
      setError("Please paste the URL manually");
    }
  };

  // Format functions - Same as your code
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString(language, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return timestamp;
    }
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Floating Background Component
  const FloatingBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-[0.15] animate-float"
          style={{
            width: Math.random() * 400 + 100,
            height: Math.random() * 400 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, ${
              ['#00f2fe', '#4facfe', '#ff6b6b', '#42e695', '#9d50bb', '#ff5e62'][i % 6]
            }, ${
              ['#4facfe', '#ff6b6b', '#42e695', '#9d50bb', '#ff5e62', '#00f2fe'][i % 6]
            })`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            filter: 'blur(50px)'
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden relative font-['Rajdhani']">
      <SeoHead language={language} pageType="home" />
      <FloatingBackground />
      
      {/* 3D Navigation */}
      <nav 
        ref={navRef}
        className="bg-gray-800/70 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl fixed w-full top-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="text-3xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            🌟 {t.navTitle}
          </div>

          <button
            className="lg:hidden p-3 rounded-xl bg-cyan-500/20 border border-cyan-400/30 hover:bg-cyan-500/30 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center space-x-8" style={{ width: 'fit-content' }}>
            {['features', 'services', 'faq'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative group text-lg font-semibold hover:text-cyan-400 transition-all duration-300 hover:scale-110"
              >
                {t[item]}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-700/50 border border-cyan-400/30 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-md"
            >
              <option value="en">🇺🇸 English</option>
              <option value="hi">🇮🇳 Hindi</option>
              <option value="es">🇪🇸 Spanish</option>
              <option value="fr">🇫🇷 French</option>
              <option value="de">🇩🇪 German</option>
              <option value="ar">🇸🇦 Arabic</option>
            </select>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-gray-800/90 backdrop-blur-xl border-t border-cyan-500/30 animate-slideDown">
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-4">
                {['features', 'services', 'faq'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="block px-4 py-3 bg-cyan-500/10 border border-cyan-400/20 rounded-xl hover:bg-cyan-500/20 transition-all text-center font-semibold"
                  >
                    {t[item]}
                  </a>
                ))}
                
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-cyan-400/30 rounded-xl text-white focus:outline-none"
                >
                  <option value="en">🇺🇸 English</option>
                  <option value="hi">🇮🇳 Hindi</option>
                  <option value="es">🇪🇸 Spanish</option>
                  <option value="fr">🇫🇷 French</option>
                  <option value="de">🇩🇪 German</option>
                  <option value="ar">🇸🇦 Arabic</option>
                </select>
              </div>

              <div className="mt-6 pt-4 border-t border-green-600">
                <p className="text-green-300 text-sm text-center">
                  Download Instagram content easily
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main 3D Content */}
      <div className="pt-32 pb-16 px-4 min-h-screen flex items-center justify-center">
        <div
          ref={mainCardRef}
          className="w-full max-w-6xl bg-gray-800/40 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 transition-all duration-300 relative overflow-hidden static-3d-card"
          style={{
            boxShadow: `
              0 0 80px rgba(0, 242, 254, 0.1),
              0 30px 60px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            minHeight: 'auto'
          }}
        >
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
          
          {/* Header */}
          <div className="text-center mb-8 relative z-10" style={{ minHeight: '200px' }}>
            <h1 className="text-4xl md:text-5xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Media Type Selector */}
          <div className="flex justify-center mb-8" style={{ minHeight: '120px' }}>
            <div className="flex flex-wrap justify-center gap-3 bg-gray-700/50 backdrop-blur-md rounded-2xl p-4 border border-cyan-400/20" style={{ minHeight: '88px' }}>
              {[
                { icon: "🎬", label: "Video" },
                { icon: "🖼️", label: "Photo" },
                { icon: "📱", label: "Story" },
                { icon: "🎞️", label: "Reels" },
                { icon: "📺", label: "IGTV" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center gap-2 text-white px-4 py-3 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-400/40 border border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-105"
                  style={{ minWidth: 'fit-content', minHeight: '48px' }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Download Form */}
          <div className="space-y-6 relative z-10" style={{ minHeight: '300px' }}>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-4" style={{ minHeight: 'auto' }}>
              {/* Input Container - Increased width */}
              <div className="relative flex-[2]">
                <input
                  type="text"
                  placeholder={t.placeholder}
                  className="w-full h-16 p-5 bg-gray-700/50 backdrop-blur-md border-2 border-cyan-400/30 rounded-2xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 text-white text-lg placeholder-gray-400 transition-all duration-300"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-2xl">🔗</div>
              </div>

              {/* Paste Button */}
              <button
                onClick={handlePaste}
                className="h-16 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 font-['Orbitron'] tracking-wider shadow-lg hover:shadow-purple-500/30 relative overflow-hidden group w-full md:w-[140px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                  <span className="text-xl">📋</span>
                  <span className="whitespace-nowrap">PASTE</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>

              {/* Fetch Media Button - Icon removed and text changed */}
              <button
                onClick={handleFetch}
                disabled={loading}
                className="h-16 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 font-['Orbitron'] tracking-wider text-lg shadow-lg hover:shadow-cyan-500/30 relative overflow-hidden group w-full md:w-[140px]"
              >
                <span className="relative z-10 flex items-center justify-center w-full">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="whitespace-nowrap">{t.fetching}</span>
                    </>
                  ) : (
                    <span className="whitespace-nowrap">{t.fetch}</span>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/20 backdrop-blur-md border-2 border-red-500/30 rounded-2xl text-red-200 text-center animate-pulse" style={{ minHeight: '72px' }}>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">❌</span>
                  {error}
                </div>
              </div>
            )}

            {/* Video Preview Section with Description */}
            {mediaInfo && (
              <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-md border-2 border-cyan-400/30 rounded-2xl" style={{ minHeight: '600px' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Video Preview */}
                  <div className="space-y-4">
                    <h3 className="text-cyan-400 font-['Orbitron'] text-xl font-bold">{t.preview}</h3>
                    <div className="aspect-video bg-black rounded-xl overflow-hidden">
                      {mediaInfo.type === "video" ? (
                        <video
                          src={mediaInfo.mediaUrl}
                          controls
                          className="w-full h-full object-cover"
                          poster={mediaInfo.thumbnail}
                          loading="lazy"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={mediaInfo.mediaUrl}
                          alt="Instagram preview"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    
                    {/* Download Button */}
                    <button
                      onClick={handleDownload}
                      disabled={downloading}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 font-['Orbitron'] tracking-wider text-lg shadow-lg hover:shadow-green-500/30 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {downloading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t.downloading}
                          </>
                        ) : (
                          <>
                            <span className="text-xl">⬇️</span>
                            {t.download}
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </button>

                    {/* Media Stats */}
                    {(mediaInfo.likes !== undefined || mediaInfo.comments !== undefined || mediaInfo.timestamp || mediaInfo.views !== undefined) && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {mediaInfo.likes !== undefined && (
                          <div className="bg-gray-600/30 rounded-xl p-3 text-center border border-cyan-400/20" style={{ minHeight: '80px' }}>
                            <div className="text-xl mb-1">❤️</div>
                            <div className="text-cyan-400 font-bold text-xs">{t.likes}</div>
                            <div className="text-white font-semibold text-sm">{formatNumber(mediaInfo.likes)}</div>
                          </div>
                        )}

                        {mediaInfo.comments !== undefined && (
                          <div className="bg-gray-600/30 rounded-xl p-3 text-center border border-cyan-400/20" style={{ minHeight: '80px' }}>
                            <div className="text-xl mb-1">💬</div>
                            <div className="text-cyan-400 font-bold text-xs">{t.comments}</div>
                            <div className="text-white font-semibold text-sm">{formatNumber(mediaInfo.comments)}</div>
                          </div>
                        )}

                        {mediaInfo.views !== undefined && (
                          <div className="bg-gray-600/30 rounded-xl p-3 text-center border border-cyan-400/20" style={{ minHeight: '80px' }}>
                            <div className="text-xl mb-1">👁️</div>
                            <div className="text-cyan-400 font-bold text-xs">{t.views}</div>
                            <div className="text-white font-semibold text-sm">{formatNumber(mediaInfo.views)}</div>
                          </div>
                        )}

                        {mediaInfo.timestamp && (
                          <div className="bg-gray-600/30 rounded-xl p-3 text-center border border-cyan-400/20" style={{ minHeight: '80px' }}>
                            <div className="text-xl mb-1">📅</div>
                            <div className="text-cyan-400 font-bold text-xs">{t.timestamp}</div>
                            <div className="text-white font-semibold text-xs">{formatTimestamp(mediaInfo.timestamp)}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Description Only */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-cyan-400 font-['Orbitron'] text-xl font-bold">{t.description}</h3>
                        <button
                          onClick={() => copyToClipboard(mediaInfo.description || "No description available", 'description')}
                          className="flex items-center gap-2 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-300 text-sm"
                        >
                          <span>📋</span>
                          {copiedText === 'description' ? t.copied : t.copy}
                        </button>
                      </div>
                      <div className="p-4 bg-gray-700/50 rounded-xl h-48 overflow-y-auto">
                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                          {mediaInfo.description || "No description available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10" style={{ minHeight: '320px' }}>
            {[
              { icon: "🤖", label: "AI Powered", color: "from-cyan-400 to-blue-400" },
              { icon: "⚡", label: "Lightning Fast", color: "from-yellow-400 to-orange-400" },
              { icon: "🔒", label: "Secure", color: "from-green-400 to-teal-400" },
              { icon: "🎯", label: "HD Quality", color: "from-purple-400 to-pink-400" },
              { icon: "💫", label: "4K Support", color: "from-red-400 to-pink-400" },
              { icon: "🚀", label: "Instant", color: "from-indigo-400 to-purple-400" }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-700/30 backdrop-blur-md rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 transform hover:scale-105"
                style={{ minHeight: '120px' }}
              >
                <div className={`text-3xl mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.icon}
                </div>
                <div className="text-sm text-gray-300 font-semibold">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - 3D Style */}
      <section id="features" className="py-16 bg-gray-800/50 backdrop-blur-md text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-4xl font-bold font-['Orbitron'] mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" style={{ minHeight: '400px' }}>
            {[
              {
                icon: "⚡",
                title: "Fast Download",
                desc: "Quick servers optimized for fast downloads.",
              },
              {
                icon: "📱",
                title: "Multi Device",
                desc: "Works seamlessly on mobile, tablet, desktop.",
              },
              {
                icon: "🔒",
                title: "Secure",
                desc: "No login required, fully private downloads.",
              },
              {
                icon: "💎",
                title: "High Quality",
                desc: "Preserve original video & photo quality.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-gray-700/50 backdrop-blur-md border border-cyan-400/30 text-white text-center p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-2"
                style={{ minHeight: '200px' }}
              >
                <div className="text-4xl mb-3 p-2 w-16 h-16 rounded-full mx-auto bg-cyan-500/20 flex justify-center items-center">
                  {f.icon}
                </div>
                <h5 className="font-semibold mb-2 text-lg font-['Orbitron']">{f.title}</h5>
                <p className="text-sm opacity-90">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - 3D Style */}
      <section id="services" className="py-16 bg-gray-900/80 text-white" style={{ minHeight: '600px' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-4xl font-bold font-['Orbitron'] mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.servicesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 justify-items-center" style={{ minHeight: '400px' }}>
            {[
              { icon: "📹", title: "Video Downloader" },
              { icon: "📷", title: "Photo Downloader" },
              { icon: "🎬", title: "Reels & Stories Downloader" },
              { icon: "📺", title: "IGTV Downloader" },
              { icon: "🖼️", title: "Carousel Downloader" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-white text-center p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 w-full max-w-sm border border-cyan-400/30"
                style={{ minHeight: '160px' }}
              >
                <div className="text-5xl mb-4">{s.icon}</div>
                <h5 className="font-semibold text-xl font-['Orbitron']">{s.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - 3D Style */}
      <section id="faq" className="py-16 bg-gray-800/50 backdrop-blur-md text-white" style={{ minHeight: '800px' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-4xl font-bold font-['Orbitron'] mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.faqTitle}
          </h2>
          <div className="space-y-4" style={{ minHeight: '600px' }}>
            {[
              {
                q: "❓ Is it legal to download media?",
                a: "Downloading public media for personal use is allowed. Get creator permission for reuse.",
              },
              {
                q: "❓ Do I need to log in?",
                a: "No, you don't need to log in. Just paste the URL and download.",
              },
              {
                q: "❓ Is it possible to download content other than video on this website?",
                a: "Yes, absolutely! Our downloader allows free downloading of photos, videos, reels, and IGTV exclusively from Instagram.",
              },
              {
                q: "❓ Is it possible to Download Video and Photo from any Instagram user?",
                a: "Yes, you can download content from public Instagram accounts. We respect privacy and copyright, so downloading from private accounts is not possible.",
              },
              {
                q: "❓ What is the maximum quality of images and videos that can be downloaded from Instagram?",
                a: "The resolution depends on the original uploaded content. Typically, images are up to 1080x1350 pixels and videos are in high definition (720p).",
              },
              {
                q: "❓ Is it permissible to download Instagram Reels?",
                a: "Yes, you can download Reels for personal use as long as they are not used for commercial purposes.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-gray-700/50 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300"
                style={{ minHeight: '80px' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center hover:bg-cyan-500/10 transition duration-300 font-['Orbitron']"
                >
                  {faq.q}
                  <span className="text-lg text-cyan-400">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && (
                  <div className="px-6 pb-4 text-gray-300 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-md text-gray-300 py-8 border-t border-cyan-500/30" style={{ minHeight: '120px' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-['Orbitron']">{t.copyright}</p>
          <p className="mt-4">
            <a href="/privacy.html" className="text-cyan-400 hover:text-cyan-300 hover:underline mx-3 transition-colors">
              {t.privacy}
            </a>
            <span className="mx-2">|</span>
            <a href="/terms.html" className="text-cyan-400 hover:text-cyan-300 hover:underline mx-3 transition-colors">
              {t.terms}
            </a>
            <span className="mx-2">|</span>
            <a href="/contact.html" className="text-cyan-400 hover:text-cyan-300 hover:underline mx-3 transition-colors">
              {t.contact}
            </a>
          </p>
        </div>
      </footer>

      {/* Server Status */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-md border border-green-400/30 rounded-full px-4 py-2 shadow-2xl">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold font-['Orbitron']">Backend: Online</span>
        </div>
      </div>


      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          @font-face {
            font-family: 'Orbitron';
            font-display: swap;
          }
          @font-face {
            font-family: 'Rajdhani';
            font-display: swap;
          }

          /* Reserve space for dynamic content to prevent CLS */
          .media-preview-placeholder {
            min-height: 600px;
          }

          .error-placeholder {
            min-height: 72px;
          }

          .stats-card {
            min-height: 80px;
          }

          .feature-card {
            min-height: 120px;
          }

          .media-selector {
            min-height: 88px;
          }

          .features-grid {
            min-height: 320px;
          }
        `}
      </style>
    </div>
  );
}

export default App;
