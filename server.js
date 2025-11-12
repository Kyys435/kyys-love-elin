import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("."));

app.post("/upscale", upload.single("image"), async (req, res) => {
  const inputPath = req.file.path;
  let image = sharp(inputPath);

  try {
    // Ulang 6x upscale
    for (let i = 0; i < 6; i++) {
      const metadata = await image.metadata();
      image = image.resize({
        width: Math.round(metadata.width * 1.5),
        height: Math.round(metadata.height * 1.5),
      });
    }

    const outputBuffer = await image.jpeg({ quality: 95 }).toBuffer();

    res.set("Content-Type", "image/jpeg");
    res.send(outputBuffer);

    fs.unlinkSync(inputPath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during upscale.");
  }
});

app.listen(5000, () => console.log("🚀 Server jalan di http://localhost:5000"));
