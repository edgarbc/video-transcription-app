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
    
    // print the command to the console
    console.log(`Running command: ${command}`);

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

    // print a message when the transcription is complete
    console.log('Transcription complete!');
    // delete the video file after processing
    fs.unlink(videoPath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
        }
    });
    //print a message when the video file is deleted
    console.log('Video file deleted!');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
