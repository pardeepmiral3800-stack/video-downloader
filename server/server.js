// import express from "express";
// import cors from "cors";
// import { instagramGetUrl } from "instagram-url-direct";
// import axios from "axios";

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // Function to fetch Instagram post details (top 5 comments, likes, etc.)
// const fetchInstagramDetails = async (url) => {
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//       },
//     });

//     const html = response.data;
//     const scriptRegex = /window\._sharedData\s*=\s*({.+?});<\/script>/;
//     const match = html.match(scriptRegex);

//     if (match && match[1]) {
//       const sharedData = JSON.parse(match[1]);
//       const shortcodeMedia =
//         sharedData?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;

//       if (shortcodeMedia) {
//         // Top 5 comments
//         const topComments = shortcodeMedia?.edge_media_to_parent_comment?.edges
//           ?.slice(0, 5)
//           .map((c) => ({
//             username: c.node.owner.username,
//             text: c.node.text,
//           })) || [];

//         return {
//           likes: shortcodeMedia?.edge_media_preview_like?.count || 0,
//           comments: topComments,
//           views: shortcodeMedia?.video_view_count || 0,
//           timestamp: shortcodeMedia?.taken_at_timestamp
//             ? new Date(shortcodeMedia.taken_at_timestamp * 1000).toISOString()
//             : null,
//           caption:
//             shortcodeMedia?.edge_media_to_caption?.edges?.[0]?.node?.text || "",
//           username: shortcodeMedia?.owner?.username || "",
//           isVideo: shortcodeMedia?.is_video || false,
//         };
//       }
//     }

//     return null;
//   } catch (error) {
//     console.error("Error fetching Instagram details:", error.message);
//     return null;
//   }
// };

// // Instagram endpoint
// app.get("/instagram", async (req, res) => {
//   try {
//     const url = req.query.url;
//     if (!url) return res.status(400).json({ error: "URL required" });

//     if (!url.includes("instagram.com")) {
//       return res.status(400).json({ error: "Invalid Instagram URL" });
//     }

//     // Get media URLs using instagram-url-direct
//     const result = await instagramGetUrl(url);

//     if (!result.url_list || result.url_list.length === 0) {
//       return res.status(404).json({
//         error: "No media found. This might be private or the URL is incorrect.",
//       });
//     }

//     // Pick best quality video/image
//     let mediaUrl = result.url_list[0];
//     let bestQuality = 0;

//     for (const u of result.url_list) {
//       if (u.includes(".mp4")) {
//         const qualityMatch = u.match(/\d+x\d+/);
//         if (qualityMatch) {
//           const [width, height] = qualityMatch[0].split("x").map(Number);
//           const totalPixels = width * height;
//           if (totalPixels > bestQuality) {
//             bestQuality = totalPixels;
//             mediaUrl = u;
//           }
//         }
//       }
//     }

//     // Determine media type
//     const type = mediaUrl.includes(".mp4") ? "video" : "image";

//     // Fetch additional details (likes, comments, caption, timestamp)
//     const mediaDetails = await fetchInstagramDetails(url);

//     const responseData = {
//       success: true,
//       mediaUrl,
//       type,
//       alternatives: result.url_list,
//       likes: mediaDetails?.likes || 0,
//       comments: mediaDetails?.comments || [],
//       views: mediaDetails?.views || 0,
//       timestamp: mediaDetails?.timestamp || null,
//       caption: mediaDetails?.caption || "",
//       username: mediaDetails?.username || "",
//       isVideo: mediaDetails?.isVideo || (type === "video"),
//     };

//     res.json(responseData);
//   } catch (err) {
//     console.error("Instagram Error:", err.message);
//     res.status(500).json({
//       error: "Failed to fetch media. Please try again later.",
//       details: err.message,
//     });
//   }
//   // console.log(res.json(responseData));
  
// });

// // Start server
// app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));


import express from "express";
import cors from "cors";
import path from "path";
import ytdl from "@distube/ytdl-core";
import { instagramGetUrl } from "instagram-url-direct";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from client build
app.use(express.static(path.join(process.cwd(), 'public')));

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api') && !req.path.startsWith('/instagram') && !req.path.startsWith('/youtube')) {
    res.sendFile(path.join(process.cwd(), 'public/index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Health check endpoint
// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  // For API responses, set no-cache to prevent caching sensitive data
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
 
 
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
 
// ---------------------- Instagram Reel ----------------------
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
 
    // type detect करना (photo या video)
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
 
    // Direct redirect कर दो (browser photo/video handle कर लेगा)
    res.redirect(mediaUrl);
  } catch (err) {
    console.error("Instagram Download Error:", err);
    res.status(500).json({ error: "Failed to download media" });
  }
});
 
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Video Downloader API is running" });
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Server running at http://0.0.0.0:${PORT}`)
);
