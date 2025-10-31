import { useEffect, useRef } from 'react';

/**
 * Advanced Multi-Language SEO Head Component for MoboInsta
 * Supports 5 languages with complete SEO optimization
 */
const SeoHead = ({ 
  language = "en",
  pageType = "home", // home, download, features, faq
  mediaType = null, // video, image, reel, story
  additionalKeywords = ""
}) => {

  // 3D References
  const mainCardRef = useRef(null);
  const navRef = useRef(null);

  // Google Analytics setup
  useEffect(() => {
    if (import.meta.env.VITE_GA_TRACKING_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_TRACKING_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GA_TRACKING_ID);
    }
  }, []);

  
  // Multi-language SEO configurations
  const seoConfigs = {
    en: {
      // Home Page
      home: {
        title: "MoboInsta - Download Instagram Videos, Reels, Stories & Photos in 4K HD",
        description: "Free Instagram downloader for videos, reels, stories, and photos. Download HD quality content from public Instagram accounts instantly. No registration required. Fast, secure and easy to use.",
        keywords: "instagram downloader, instagram video download, download instagram reels, instagram story download, instagram photo download, free instagram downloader, hd instagram download, save instagram videos, instagram reels downloader, 4k video download"
      },
      // Download Page
      download: {
        title: "Download Instagram {mediaType} in HD | MoboInsta",
        description: "Downloading {mediaType} from Instagram in high quality. Fast and secure download process with no watermarks.",
        keywords: "download {mediaType} instagram, instagram {mediaType} download, save {mediaType} instagram"
      },
      // Features Page
      features: {
        title: "Advanced Features - AI Powered Instagram Downloader | MoboInsta",
        description: "Explore advanced features of MoboInsta downloader. AI-powered technology, 4K quality downloads, multi-format support and more.",
        keywords: "instagram downloader features, ai instagram download, 4k download quality, multi-format support"
      },
      // FAQ Page
      faq: {
        title: "Frequently Asked Questions - Instagram Downloader | MoboInsta",
        description: "Find answers to common questions about downloading Instagram content. Legal information, quality details, and usage guidelines.",
        keywords: "instagram downloader faq, instagram download legal, download quality, usage guidelines"
      }
    },
    hi: {
      home: {
        title: "MoboInsta - इंस्टाग्राम वीडियो, रील्स, स्टोरीज और फोटो 4K HD में डाउनलोड करें",
        description: "मुफ्त इंस्टाग्राम डाउनलोडर - वीडियो, रील्स, स्टोरीज और फोटो डाउनलोड करें। HD क्वालिटी में पब्लिक इंस्टाग्राम अकाउंट से कंटेंट डाउनलोड करें। कोई रजिस्ट्रेशन नहीं। तेज, सुरक्षित और आसान उपयोग।",
        keywords: "इंस्टाग्राम डाउनलोडर, इंस्टाग्राम वीडियो डाउनलोड, इंस्टाग्राम रील डाउनलोड, इंस्टाग्राम स्टोरी डाउनलोड, इंस्टाग्राम फोटो डाउनलोड, मुफ्त इंस्टाग्राम डाउनलोडर, एचडी इंस्टाग्राम डाउनलोड"
      },
      download: {
        title: "इंस्टाग्राम {mediaType} HD में डाउनलोड करें | MoboInsta",
        description: "इंस्टाग्राम से {mediaType} हाई क्वालिटी में डाउनलोड करें। तेज और सुरक्षित डाउनलोड प्रक्रिया, कोई वॉटरमार्क नहीं।",
        keywords: "इंस्टाग्राम {mediaType} डाउनलोड, {mediaType} डाउनलोड इंस्टाग्राम, सेव {mediaType} इंस्टाग्राम"
      },
      features: {
        title: "उन्नत फीचर्स - AI पावर्ड इंस्टाग्राम डाउनलोडर | MoboInsta",
        description: "MoboInsta डाउनलोडर के उन्नत फीचर्स एक्सप्लोर करें। AI-पावर्ड टेक्नोलॉजी, 4K क्वालिटी डाउनलोड, मल्टी-फॉर्मेट सपोर्ट और भी बहुत कुछ।",
        keywords: "इंस्टाग्राम डाउनलोडर फीचर्स, एआई इंस्टाग्राम डाउनलोड, 4k डाउनलोड क्वालिटी, मल्टी-फॉर्मेट सपोर्ट"
      },
      faq: {
        title: "अक्सर पूछे जाने वाले सवाल - इंस्टाग्राम डाउनलोडर | MoboInsta",
        description: "इंस्टाग्राम कंटेंट डाउनलोड करने के बारे में आम सवालों के जवाब खोजें। कानूनी जानकारी, क्वालिटी विवरण और उपयोग दिशानिर्देश।",
        keywords: "इंस्टाग्राम डाउनलोडर सवाल, इंस्टाग्राम डाउनलोड कानूनी, डाउनलोड क्वालिटी, उपयोग दिशानिर्देश"
      }
    },
    es: {
      home: {
        title: "MoboInsta - Descargar Videos de Instagram, Reels, Stories y Fotos en 4K HD",
        description: "Descargador gratuito de Instagram para videos, reels, stories y fotos. Descarga contenido en calidad HD de cuentas públicas de Instagram al instante. Sin registro requerido. Rápido, seguro y fácil de usar.",
        keywords: "descargar instagram, descargar videos de instagram, descargar reels de instagram, descargar historias de instagram, descargar fotos de instagram, descargador instagram gratis, descarga hd instagram"
      },
      download: {
        title: "Descargar {mediaType} de Instagram en HD | MoboInsta",
        description: "Descargando {mediaType} de Instagram en alta calidad. Proceso de descarga rápido y seguro sin marcas de agua.",
        keywords: "descargar {mediaType} instagram, instagram {mediaType} descargar, guardar {mediaType} instagram"
      },
      features: {
        title: "Características Avanzadas - Descargador de Instagram con IA | MoboInsta",
        description: "Explore las características avanzadas del descargador MoboInsta. Tecnología con IA, descargas en calidad 4K, soporte multi-formato y más.",
        keywords: "características descargador instagram, ia descargar instagram, calidad descarga 4k, soporte multi-formato"
      },
      faq: {
        title: "Preguntas Frecuentes - Descargador de Instagram | MoboInsta",
        description: "Encuentre respuestas a preguntas comunes sobre cómo descargar contenido de Instagram. Información legal, detalles de calidad y pautas de uso.",
        keywords: "preguntas descargador instagram, descargar instagram legal, calidad descarga, pautas uso"
      }
    },
    fr: {
      home: {
        title: "MoboInsta - Télécharger Vidéos Instagram, Reels, Stories et Photos en 4K HD",
        description: "Téléchargeur Instagram gratuit pour vidéos, reels, stories et photos. Téléchargez du contenu en calidad HD desde comptes Instagram publics instantanément. Aucune inscription requise. Rapide, sécurisé et facile à utiliser.",
        keywords: "téléchargeur instagram, télécharger vidéos instagram, télécharger reels instagram, télécharger stories instagram, télécharger photos instagram, téléchargeur instagram gratuit, téléchargement hd instagram"
      },
      download: {
        title: "Télécharger {mediaType} Instagram en HD | MoboInsta",
        description: "Téléchargement de {mediaType} depuis Instagram en haute qualité. Processus de téléchargement rapide et sécurisé sans filigranes.",
        keywords: "télécharger {mediaType} instagram, instagram {mediaType} télécharger, sauvegarder {mediaType} instagram"
      },
      features: {
        title: "Fonctionnalités Avancées - Téléchargeur Instagram avec IA | MoboInsta",
        description: "Explorez les fonctionnalités avancées du téléchargeur MoboInsta. Technologie IA, téléchargements qualité 4K, support multi-format et plus.",
        keywords: "fonctionnalités téléchargeur instagram, ia télécharger instagram, qualité téléchargement 4k, support multi-format"
      },
      faq: {
        title: "Questions Fréquentes - Téléchargeur Instagram | MoboInsta",
        description: "Trouvez des réponses aux questions courantes sur le téléchargement de contenu Instagram. Informations légales, détails qualité et directives d'utilisation.",
        keywords: "questions téléchargeur instagram, télécharger instagram légal, qualité téléchargement, directives utilisation"
      }
    },
    de: {
      home: {
        title: "MoboInsta - Instagram Videos, Reels, Stories und Fotos in 4K HD herunterladen",
        description: "Kostenloser Instagram-Downloader für Videos, Reels, Stories und Fotos. Laden Sie Inhalte in HD-Qualität von öffentlichen Instagram-Konten sofort herunter. Keine Registrierung erforderlich. Schnell, sicher und einfach zu verwenden.",
        keywords: "instagram downloader, instagram videos downloaden, instagram reels downloaden, instagram stories downloaden, instagram fotos downloaden, kostenloser instagram downloader, hd instagram download"
      },
      download: {
        title: "{mediaType} von Instagram in HD herunterladen | MoboInsta",
        description: "{mediaType} von Instagram in hoher Qualität herunterladen. Schneller und sicherer Download-Prozess ohne Wasserzeichen.",
        keywords: "{mediaType} instagram herunterladen, instagram {mediaType} downloaden, {mediaType} instagram speichern"
      },
      features: {
        title: "Erweiterte Funktionen - KI-gestützter Instagram Downloader | MoboInsta",
        description: "Entdecken Sie die erweiterten Funktionen des MoboInsta Downloaders. KI-gestützte Technologie, 4K-Qualitäts-Downloads, Multi-Format-Unterstützung und mehr.",
        keywords: "instagram downloader funktionen, ki instagram download, 4k download qualität, multi-format unterstützung"
      },
      faq: {
        title: "Häufig Gestellte Fragen - Instagram Downloader | MoboInsta",
        description: "Finden Sie Antworten auf häufige Fragen zum Herunterladen von Instagram-Inhalten. Rechtliche Informationen, Qualitätsdetails und Nutzungsrichtlinien.",
        keywords: "instagram downloader fragen, instagram download legal, download qualität, nutzungsrichtlinien"
      }
    }
  };

  // Media type mappings for different languages
  const mediaTypeTranslations = {
    en: {
      video: "video",
      image: "photo", 
      reel: "reel",
      story: "story"
    },
    hi: {
      video: "वीडियो",
      image: "फोटो",
      reel: "रील", 
      story: "स्टोरी"
    },
    es: {
      video: "video",
      image: "foto",
      reel: "reel",
      story: "historia"
    },
    fr: {
      video: "vidéo",
      image: "photo",
      reel: "reel", 
      story: "story"
    },
    de: {
      video: "Video",
      image: "Foto",
      reel: "Reel",
      story: "Story"
    }
  };

  // Get current SEO config based on language and page type
  const getSeoConfig = () => {
    const langConfig = seoConfigs[language] || seoConfigs.en;
    const pageConfig = langConfig[pageType] || langConfig.home;
    
    let title = pageConfig.title;
    let description = pageConfig.description;
    let keywords = pageConfig.keywords;

    // Replace media type placeholders if mediaType is provided
    if (mediaType) {
      const mediaTrans = mediaTypeTranslations[language] || mediaTypeTranslations.en;
      const mediaText = mediaTrans[mediaType] || mediaType;
      
      title = title.replace(/{mediaType}/g, mediaText);
      description = description.replace(/{mediaType}/g, mediaText);
      keywords = keywords.replace(/{mediaType}/g, mediaText);
    }

    // Add additional keywords if provided
    if (additionalKeywords) {
      keywords += `, ${additionalKeywords}`;
    }

    return { title, description, keywords };
  };

  // Get website URL based on language
  const getWebsiteUrl = () => {
    const baseUrl = "https://moboinsta.com";
    const langPaths = {
      en: "",
      hi: "/hi",
      es: "/es",
      fr: "/fr",
      de: "/de"
    };
    return `${baseUrl}${langPaths[language] || ""}`;
  };

  // Generate structured data for SEO
  const generateStructuredData = (seoConfig) => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": seoConfig.title,
          "description": seoConfig.description,
          "url": getWebsiteUrl(),
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Any",
          "permissions": "clipboard-read",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Organization",
            "name": "MoboInsta",
            "url": getWebsiteUrl()
          },
          "publisher": {
            "@type": "Organization",
            "name": "MoboInsta",
            "logo": {
              "@type": "ImageObject",
              "url": `${getWebsiteUrl()}/logo.png`
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": getWebsiteUrl()
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": seoConfig.title,
              "item": `${getWebsiteUrl()}/${pageType}`
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is it legal to download Instagram content?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Downloading public content for personal use is generally allowed. Always respect copyright and get permission for commercial use."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need to create an account?",
              "acceptedAnswer": {
                "@type": "Answer", 
              "text": "No, MoboInsta works without registration. Just paste the Instagram URL and download."
              }
            }
          ]
        }
      ]
    };
  };

  useEffect(() => {
    const seoConfig = getSeoConfig();
    const websiteUrl = getWebsiteUrl();

    // Update document title
    document.title = seoConfig.title;

    // Helper function to update or create meta tags
    const updateMetaTag = (attribute, value, content) => {
      let tag = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (attribute === 'name') {
          tag.name = value;
        } else if (attribute === 'property') {
          tag.setAttribute('property', value);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Helper function to update link tags
    const updateLinkTag = (rel, href, attributes = {}) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.rel = rel;
        document.head.appendChild(tag);
      }
      tag.href = href;
      Object.keys(attributes).forEach(key => {
        tag.setAttribute(key, attributes[key]);
      });
    };

    // === BASIC META TAGS ===
    updateMetaTag('name', 'description', seoConfig.description);
    updateMetaTag('name', 'keywords', seoConfig.keywords);
    updateMetaTag('name', 'author', 'MoboInsta');
    updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Language and locale
    updateMetaTag('name', 'language', language);
    updateMetaTag('property', 'og:locale', language);

    // === OPEN GRAPH META TAGS ===
    updateMetaTag('property', 'og:title', seoConfig.title);
    updateMetaTag('property', 'og:description', seoConfig.description);
    updateMetaTag('property', 'og:image', `${websiteUrl}/og-image.jpg`);
    updateMetaTag('property', 'og:url', websiteUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', 'MoboInsta');
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
    updateMetaTag('property', 'og:image:type', 'image/jpeg');

    // === TWITTER CARD META TAGS ===
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', seoConfig.title);
    updateMetaTag('name', 'twitter:description', seoConfig.description);
    updateMetaTag('name', 'twitter:image', `${websiteUrl}/twitter-image.jpg`);
    updateMetaTag('name', 'twitter:site', '@moboinsta');
    updateMetaTag('name', 'twitter:creator', '@moboinsta');
    updateMetaTag('name', 'twitter:image:alt', seoConfig.title);

    // === ADDITIONAL META TAGS ===
    updateMetaTag('name', 'theme-color', '#00f2fe');
    updateMetaTag('name', 'msapplication-TileColor', '#00f2fe');

    // === CANONICAL URL & ALTERNATE LANGUAGES ===
    updateLinkTag('canonical', websiteUrl);

    // Alternate language URLs for hreflang
    const languages = ['en', 'hi', 'es', 'fr', 'de'];
    languages.forEach(lang => {
      const langUrl = `https://moboinsta.com${lang === 'en' ? '' : `/${lang}`}`;
      updateLinkTag('alternate', langUrl, { hreflang: lang });
    });
    updateLinkTag('alternate', websiteUrl, { hreflang: 'x-default' });

    // === FAVICON AND ICONS ===
    updateLinkTag('icon', '/favicon.ico', { type: 'image/x-icon' });
    updateLinkTag('apple-touch-icon', '/apple-touch-icon.png', { sizes: '180x180' });

    // === STRUCTURED DATA ===
    const structuredData = generateStructuredData(seoConfig);
    
    // Remove existing structured data
    let existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

  }, [language, pageType, mediaType, additionalKeywords]);

  // This component doesn't render anything
  return null;
};

export default SeoHead;