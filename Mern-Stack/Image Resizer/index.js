const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/api/resize', upload.single('image'), (req, res) => {
  const { width, height } = req.body;
  const inputPath = path.join(__dirname, req.file.path);
  const outputPath = path.join(__dirname, 'uploads', `${req.file.filename}_resized.jpg`);

  sharp(inputPath)
    .resize(parseInt(width), parseInt(height))
    .toFile(outputPath, (err) => {
      if (err) return res.status(500).send('Failed to resize image');
      res.download(outputPath, () => {
        fs.unlinkSync(inputPath); // Clean up original image
        fs.unlinkSync(outputPath); // Clean up resized image
      });
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
