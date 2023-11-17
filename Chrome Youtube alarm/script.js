const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const changeBgColorButton = document.getElementById('changeBgColor');
const changeFontButton = document.getElementById('changeFont');
const setAlarmButton = document.getElementById('setAlarm');
const saveSettingsButton = document.getElementById('saveSettings');
const youtubeURLInput = document.getElementById('youtubeURL');
const alarmTimeInput = document.getElementById('alarmTime');
const startAlarmButton = document.getElementById('startAlarm');
const backgroundVideoContainer = document.getElementById('backgroundVideoContainer');
const alarmSound = document.getElementById('alarmSound');

const fonts = ['Arial', 'Helvetica', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New', 'Trebuchet MS'];
const colors = ['white', 'lightblue', 'lightgreen', 'lightpink', 'lightcoral', 'lightseagreen'];

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  dateElement.textContent = `${day}, ${date}`;
}

function changeBackgroundColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
  backgroundVideoContainer.style.display = 'none'; // Hide YouTube video
}

function changeFont() {
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  clockElement.style.fontFamily = randomFont;
}



function setAlarm() {
  youtubeURLInput.style.display = 'block';
  alarmTimeInput.style.display = 'block';
  startAlarmButton.style.display = 'block';
}

function saveSettings() {
  const bgColor = document.body.style.backgroundColor;
  const font = clockElement.style.fontFamily;

  // Save settings to Local Storage
  localStorage.setItem('backgroundColor', bgColor);
  localStorage.setItem('fontFamily', font);

  alert('Settings saved!');
}

function startAlarm() {
  const youtubeURL = youtubeURLInput.value;
  const alarmTime = alarmTimeInput.value;

  if (youtubeURL && alarmTime) {
    const alarmTimeParts = alarmTime.split(':');
    const alarmHour = parseInt(alarmTimeParts[0]);
    const alarmMinute = parseInt(alarmTimeParts[1]);

    const checkTime = () => {
      const currentTime = new Date();
      if (currentTime.getHours() === alarmHour && currentTime.getMinutes() === alarmMinute) {
        // Open YouTube video in a new tab
        window.open(youtubeURL, '_blank');
        clearInterval(interval); // Stop checking once the alarm is triggered
      }
    };

    const interval = setInterval(checkTime, 1000); // Check every second
  }
}

updateClock();
setInterval(updateClock, 1000);

changeBgColorButton.addEventListener('click', changeBackgroundColor);
changeFontButton.addEventListener('click', changeFont);
setAlarmButton.addEventListener('click', setAlarm);
saveSettingsButton.addEventListener('click', saveSettings);
startAlarmButton.addEventListener('click', startAlarm);
