import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [mediaInfo, setMediaInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [open, setOpen] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const handleFetch = async () => {
    if (!url) {
      setError("Please enter an Instagram URL");
      return;
    }

    if (!isValidInstagramUrl(url)) {
      setError("Please enter a valid Instagram URL (reel, post, or story)");
      return;
    }

    setLoading(true);
    setError("");
    setMediaInfo(null);

    try {
      const endpoint = `http://localhost:5000/instagram?url=${encodeURIComponent(
        url
      )}`;
      const res = await fetch(endpoint);
      const data = await res.json();

      if (res.ok) {
        setMediaInfo(data);
      } else {
        setError(
          data.error ||
            "Failed to fetch media. The content might be private or the URL incorrect."
        );
      }
    } catch (err) {
      setError("Failed to fetch media. Please check your connection.");
    }

    setLoading(false);
  };

  const handleDownload = async () => {
    if (!url || !mediaInfo) return;

    setDownloading(true);

    try {
      if (mediaInfo.mediaUrl) {
        const response = await fetch(mediaInfo.mediaUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "instagram_media.mp4");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      setError("Failed to download media");
    }

    setDownloading(false);
  };

  const isValidInstagramUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|stories)\/.+$/.test(
      url
    );
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-[#1f4037] to-[#99f2c8] shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a className="text-white text-2xl font-bold tracking-wide" href="#">
            <i className="fab fa-instagram mr-2"></i>Insta Downloader
          </a>

          <button
            className="lg:hidden p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center">
            <ul className="flex flex-col lg:flex-row lg:space-x-6">
              <li>
                <a
                  href="#features"
                  className="block px-3 py-2 text-white text-lg hover:text-yellow-400 transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block px-3 py-2 text-white text-lg hover:text-yellow-400 transition-colors duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="block px-3 py-2 text-white text-lg hover:text-yellow-400 transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
            </ul>

            <select
              id="language-select"
              className="ml-4 px-3 py-2 rounded-sm border-0 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
          <div className="lg:hidden bg-[#1a352e] animate-slideDown">
            <div className="container mx-auto px-6 py-4">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="block px-3 py-2 text-white text-lg hover:text-yellow-400 transition-colors duration-300"
                  >
                    <i className="fas fa-star mr-2"></i>Features
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="block px-3 py-2 text-white text-lg hover:text-yellow-400 transition-colors duration-300"
                  >
                    <i className="fas fa-cogs mr-2"></i>Services
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="block px-3 py-2 text-white text-lg hover:text-yellow-400 transition-colors duration-300"
                  >
                    <i className="fas fa-question-circle mr-2"></i>FAQ
                  </a>
                </li>
              </ul>

              <div className="mt-4">
                <select
                  id="mobile-language-select"
                  className="w-full px-3 py-2 rounded-sm border-0 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white text-center px-5 pt-[70px] pb-[100px]">
        <section className="text-white text-center px-4 pt-10">
          <section id="hero" className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 bg-white/10 rounded-[10px] p-3 shadow max-w-full">
              {[
                { icon: "bi bi-play-circle", label: "Video" },
                { icon: "bi bi-image", label: "Photo" },
                { icon: "bi bi-clock-history", label: "Story" },
                { icon: "bi bi-film", label: "Reels" },
                { icon: "bi bi-tv", label: "IGTV" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center gap-2 text-white px-4 py-2 md:px-5 md:py-3 rounded-md hover:bg-white/20 transition text-sm md:text-base"
                >
                  <i className={`${item.icon} text-lg md:text-xl`}></i>
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold my-6 leading-tight">
            Instagram Video Downloader
          </h1>

          <p className="text-base sm:text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Download Instagram Reels, Posts, and Stories in High Quality
          </p>
        </section>

        <div className="p-4 md:p-8 max-w-3xl mx-auto">
          <div className=" rounded-lg">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <input
                type="text"
                placeholder="Paste Instagram URL here (reel, post, or story)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-white h-15"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <button
                onClick={handleFetch}
                disabled={loading}
                className="w-full md:w-40 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:bg-pink-400 h-15"
              >
                {loading ? "Fetching..." : "Fetch Media"}
              </button>
            </div>

            {error && (
              <div className="mt-6 text-center">
                <p className="text-red-100 bg-red-900/30 p-3 rounded-lg">
                  {error}
                </p>
              </div>
            )}

            {mediaInfo && (
              <div className="mt-6 p-4 bg-black/30 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 text-center">
                  Media Preview
                </h3>

                <div className="flex justify-center mb-4">
                  {mediaInfo.mediaUrl ? (
                    <video
                      src={mediaInfo.mediaUrl}
                      controls
                      className="max-w-full h-auto max-h-80 rounded-lg"
                    />
                  ) : (
                    <div className="text-white text-center py-10">
                      No preview available
                    </div>
                  )}
                </div>

                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition disabled:from-green-300 disabled:to-teal-400 flex items-center justify-center"
                >
                  {downloading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Downloading...
                    </>
                  ) : (
                    "⬇️ Download Now"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-gray-800">
        <section id="features" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-3xl font-bold mb-12">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
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
                  className="bg-white text-center p-6 rounded-lg shadow hover:shadow-md transition bg-gradient-to-tr from-[#11998e] to-[#38ef7d]"
                >
                  <div className="text-4xl mb-3 p-[5px] w-[75px] h-[75px] rounded-full mx-auto bg-[rgba(255,255,255,0.2)] flex justify-center items-center">
                    {f.icon}
                  </div>
                  <h5 className="font-semibold mb-2">{f.title}</h5>
                  <p className="text-sm text-white">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-3xl font-bold">🌟 Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 justify-items-center">
              {[
                { icon: "📹", title: "Video Downloader" },
                { icon: "📷", title: "Photo Downloader" },
                { icon: "🎬", title: "Reels & Stories Downloader" },
                { icon: "📺", title: "IGTV Downloader" },
                { icon: "🖼", title: "Carousel Downloader" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white text-center p-6 rounded-lg shadow hover:shadow-md transition w-full max-w-sm bg-gradient-to-tr from-[#11998e] to-[#38ef7d]"
                >
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h5 className="font-semibold">{s.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 bg-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center text-3xl font-bold mb-12">
              ❔ Frequently Asked Questions
            </h2>
            <div className="space-y-4">
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
                  a: "Yes, absolutely!  allows free downloading of photos, videos, reels, and IGTV exclusively from Instagram. However, it doesn't support any other sources.",
                },
                {
                  q: "❓ Is it possible to Download Video and Photo from any Instagram user?",
                  a: "Yes, that's correct! You can download content from public Instagram accounts using  Instagram Video Downloader. However, we fully respect the privacy and copyright of Instagram users, so downloading content from private accounts is not possible. We are currently developing a new browser extension for desktop browsers, which will allow you to download private posts directly from Instagram.",
                },
                {
                  q: "❓What is the maximum quality of images and videos that can be downloaded from Instagram?",
                  a: "The resolution and quality of the downloaded photos and videos depend on the original uploaded content on Instagram. Typically, the highest resolution for images is 1080x1350 pixels, which is the limit set by Instagram. For videos, the quality is usually in high definition (720p).",
                },
                {
                  q: "❓Is it permissible to download Instagram Reels?",
                  a: "Yes. In brief, it is feasible to download Instagram Reels, and it can be done effortlessly through your smartphone. However, Reels can only be downloaded for personal use, and it's permissible to download them as long as they are not used for commercial purposes.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center"
                  >
                    {faq.q}
                    <span>{open === i ? "−" : "+"}</span>
                  </button>
                  {open === i && (
                    <div className="px-6 pb-4 text-gray-600">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2025 Instagram Downloader. All rights reserved.</p>
            <p className="mt-2">
              <a href="#" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
