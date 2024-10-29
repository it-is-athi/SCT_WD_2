let timerInterval;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 1; // Initialize lap count
let lapTime = 0; // To keep track of the lap time

const timeDisplay = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const ms = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    
    timeDisplay.innerHTML = `<span>${padZero(hours)}</span> hr : <span>${padZero(minutes)}</span> min : <span>${padZero(seconds)}</span> sec : <span>${padZero(ms)}</span> ms`;
}

function padZero(num) {
    return num < 10 ? '0' + num : num; // Add leading zero
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resumeTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 1; // Reset lap count
    timeDisplay.innerHTML = `<span>00</span> hr : <span>00</span> min : <span>00</span> sec : <span>00</span> ms`;
    lapList.innerHTML = ''; // Clear lap list
}

function recordLap() {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${formatLapTime(elapsedTime)}`; // Update the lap format
    lapList.appendChild(lapItem);
    lapCount++;
}

function formatLapTime(time) {
    const ms = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);

    return `${padZero(seconds)} sec : ${padZero(ms)} ms`;
}


// Event listeners for buttons
document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('pause-button').addEventListener('click', pauseTimer);
document.getElementById('resume-button').addEventListener('click', resumeTimer);
document.getElementById('reset-button').addEventListener('click', resetTimer);
document.getElementById('lap-button').addEventListener('click', recordLap);
