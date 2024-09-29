let mediaRecorder;
let recordedChunks = [];


// Функція для початку запису
function startRecording(canvasSelector) {

  if(!canvasSelector ){
    canvasSelector='canvas';
  }
  const canvas = document.querySelector(canvasSelector);
  const stream = canvas.captureStream(30); // 30 FPS
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dg.webm';
    a.click();

    recordedChunks = []; // Очищення масиву
  };

  mediaRecorder.start();
}

// Функція для зупинки запису
function stopRecording() {
  mediaRecorder.stop();
}

// Слухачі подій
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startRecording') {
    startRecording(request.canvasSelector);
  } else if (request.action === 'stopRecording') {
    stopRecording();
  }
});
