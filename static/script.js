async function openCamera() {
    const cameraContainer = document.getElementById('cameraContainer');
    const video = document.getElementById('video');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        cameraContainer.style.display = 'flex';
    } catch (err) {
        console.error("Error accessing the camera: ", err);
    }
}

function closeCamera() {
    const cameraContainer = document.getElementById('cameraContainer');
    const video = document.getElementById('video');
    const stream = video.srcObject;

    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }

    cameraContainer.style.display = 'none';
}

async function startDetection() {
    const response = await fetch('/start_detection');
    const data = await response.json();
    if (data.status === 'success') {
        console.log('Drowsiness detection started.');
    } else {
        console.error('Failed to start drowsiness detection:', data.message);
    }
}