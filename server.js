const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('video'), (req, res) => {
    const videoPath = req.file.path;
    const command = `npm run transcribe -- ${videoPath}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('An error occurred while processing the video.');
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send('An error occurred while processing the video.');
        }
        const transcription = stdout;
        res.json({ transcription });
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
