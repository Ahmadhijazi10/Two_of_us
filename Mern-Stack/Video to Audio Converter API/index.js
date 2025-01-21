const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/api/convert', upload.single('video'), (req, res) => {
  const videoPath = path.join(__dirname, req.file.path);
  const audioPath = path.join(__dirname, 'uploads', `${req.file.filename}.mp3`);

  ffmpeg(videoPath)
    .output(audioPath)
    .on('end', () => {
      res.download(audioPath, () => {
        fs.unlinkSync(videoPath); // Clean up video file
        fs.unlinkSync(audioPath); // Clean up audio file
      });
    })
    .on('error', (err) => {
      res.status(500).send('Conversion failed');
    })
    .run();
});

app.listen(5000, () => console.log('Server running on port 5000'));
