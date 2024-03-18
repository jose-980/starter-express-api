// server.js
const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/', (req,res) => {
    res.send("Yo");   
})

// API endpoint for converting YouTube links
app.post('/convert', (req, res) => {
  const { url, format } = req.body;

  // Use youtube-dl to download and convert the video
  exec(`youtube-dl -x --audio-format ${format} ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Conversion error:', error);
      res.status(500).json({ error: 'Conversion failed' });
      return;
    }
    // Assuming conversion is successful, return the converted file
    res.status(200).json({ message: 'Conversion successful', file: 'path/to/converted/file' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
