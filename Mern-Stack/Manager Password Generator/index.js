const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', (req, res) => {
  const { length } = req.body;
  const password = crypto.randomBytes(length / 2).toString('hex'); // Generate random password
  res.json({ password });
});

app.listen(5000, () => console.log('Server running on port 5000'));
