document.getElementById('upload-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('video-upload');
    if (fileInput.files.length > 0) {
        formData.append('video', fileInput.files[0]);
    } else {
        alert('Please select a video file.');
        return;
    }
    
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    document.getElementById('transcription').textContent = result.transcription;
});

document.getElementById('drop-area').addEventListener('dragover', (event) => {
    event.preventDefault();
});

document.getElementById('drop-area').addEventListener('drop', (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('video-upload').files = files;
    }
});
