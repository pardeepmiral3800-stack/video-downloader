import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/instagram", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "URL required" });

  try {
    const isImage = Math.random() > 0.5;

    res.json({
      mediaUrl: isImage
        ? "https://example.com/dummy.jpg"
        : "https://example.com/dummy.mp4",
      mediaType: isImage ? "image" : "video",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

app.get("/proxy", async (req, res) => {
  const mediaUrl = req.query.url;
  if (!mediaUrl) return res.status(400).json({ error: "Media URL required" });

  try {
    const response = await fetch(mediaUrl);
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch from Instagram" });
    }

    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType);

    const isImage = contentType.includes("image");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="instagram_media.${isImage ? "jpg" : "mp4"}"`
    );

    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
