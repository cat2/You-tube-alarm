"use strict";

var clockElement = document.getElementById('clock');
var dateElement = document.getElementById('date');
var changeBgColorButton = document.getElementById('changeBgColor');
var changeFontButton = document.getElementById('changeFont');
var setAlarmButton = document.getElementById('setAlarm');
var saveSettingsButton = document.getElementById('saveSettings');
var youtubeURLInput = document.getElementById('youtubeURL');
var alarmTimeInput = document.getElementById('alarmTime');
var startAlarmButton = document.getElementById('startAlarm');
var backgroundVideoContainer = document.getElementById('backgroundVideoContainer');
var alarmSound = document.getElementById('alarmSound');
var fonts = ['Arial', 'Helvetica', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New', 'Trebuchet MS'];
var colors = ['white', 'lightblue', 'lightgreen', 'lightpink', 'lightcoral', 'lightseagreen'];

function updateClock() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var seconds = now.getSeconds().toString().padStart(2, '0');
  var day = now.toLocaleDateString('en-US', {
    weekday: 'long'
  });
  var date = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  clockElement.textContent = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
  dateElement.textContent = "".concat(day, ", ").concat(date);
}

function changeBackgroundColor() {
  var randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
  backgroundVideoContainer.style.display = 'none'; // Hide YouTube video
}

function changeFont() {
  var randomFont = fonts[Math.floor(randomFont.length)];
  clockElement.style.fontFamily = randomFont;
}

function setAlarm() {
  youtubeURLInput.style.display = 'block';
  alarmTimeInput.style.display = 'block';
  startAlarmButton.style.display = 'block';
}

function saveSettings() {
  var bgColor = document.body.style.backgroundColor;
  var font = clockElement.style.fontFamily; // Save settings to Local Storage

  localStorage.setItem('backgroundColor', bgColor);
  localStorage.setItem('fontFamily', font);
  alert('Settings saved!');
}

function startAlarm() {
  var youtubeURL = youtubeURLInput.value;
  var alarmTime = alarmTimeInput.value;

  if (youtubeURL && alarmTime) {
    var alarmTimeParts = alarmTime.split(':');
    var alarmHour = parseInt(alarmTimeParts[0]);
    var alarmMinute = parseInt(alarmTimeParts[1]);

    var checkTime = function checkTime() {
      var currentTime = new Date();

      if (currentTime.getHours() === alarmHour && currentTime.getMinutes() === alarmMinute) {
        // Open YouTube video in a new tab
        window.open(youtubeURL, '_blank');
        clearInterval(interval); // Stop checking once the alarm is triggered
      }
    };

    var interval = setInterval(checkTime, 1000); // Check every second
  }
}

updateClock();
setInterval(updateClock, 1000);
changeBgColorButton.addEventListener('click', changeBackgroundColor);
changeFontButton.addEventListener('click', changeFont);
setAlarmButton.addEventListener('click', setAlarm);
saveSettingsButton.addEventListener('click', saveSettings);
startAlarmButton.addEventListener('click', startAlarm);