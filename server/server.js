import express from "express";
import cors from "cors";
import path from "path";
import ytdl from "@distube/ytdl-core";
import { instagramGetUrl } from "instagram-url-direct";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send('OK');
});

// Security headers middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Health check route
app.get('/health', (_req, res) => {
  res.send('Server is running!');
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// YouTube download route
app.get("/youtube/download", (req, res) => {
  const url = req.query.url;
  const itag = req.query.itag;

  if (!url || !ytdl.validateURL(url))
    return res.status(400).json({ error: "Invalid URL" });

  res.header("Content-Disposition", 'attachment; filename="video.mp4"');

  if (itag) {
    ytdl(url, { quality: itag }).pipe(res);
  } else {
    ytdl(url, { quality: "highest" }).pipe(res);
  }
});

// Instagram routes
app.get("/instagram", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "URL required" });

    if (!url.includes("instagram.com")) {
      return res.status(400).json({ error: "Invalid Instagram URL" });
    }

    const result = await instagramGetUrl(url);

    if (!result.url_list || result.url_list.length === 0) {
      return res.status(404).json({
        error: "No media found. This might be private or the URL is incorrect."
      });
    }

    const mediaUrl = result.url_list[0];

    let type = "unknown";
    if (mediaUrl.includes(".mp4")) type = "video";
    else if (mediaUrl.includes(".jpg") || mediaUrl.includes(".png")) type = "image";

    res.json({
      success: true,
      mediaUrl,
      type
    });
  } catch (err) {
    console.error("Instagram Error:", err);
    res.status(500).json({ error: "Failed to fetch media. Please try again later." });
  }
});

app.get("/instagram/download", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "URL required" });

    const result = await instagramGetUrl(url);

    if (!result.url_list || result.url_list.length === 0) {
      return res.status(404).json({ error: "No media found" });
    }

    const mediaUrl = result.url_list[0];
    res.redirect(mediaUrl);
  } catch (err) {
    console.error("Instagram Download Error:", err);
    res.status(500).json({ error: "Failed to download media" });
  }
});

// CATCH-ALL ROUTE - MUST BE LAST AND USE '/*' NOT '*'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, '0.0.0.0', () =>
  console.log(`✅ Server running at http://0.0.0.0:${PORT}`)
);
