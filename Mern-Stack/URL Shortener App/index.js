const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const urlStore = {}; // In-memory storage for URL mappings

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  const shortUrl = shortid.generate();
  urlStore[shortUrl] = url; // Save URL in memory
  res.json({ shortUrl: `http://localhost:5000/${shortUrl}` });
});

app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const originalUrl = urlStore[shortUrl];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
