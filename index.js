const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json()); // Parse JSON request bodies

app.get('/', (req, res) => {
    res.send("Yo");
});

// API endpoint for converting YouTube links
app.post('/convert', (req, res) => {
    console.log('Received request body:', req.body);
  
    const { url, format } = req.body;
    console.log(`url: ${url} and the format is : ${format}\n\n`);

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
