const input = document.querySelector("#guess");
const button = document.querySelector("#btn");
const music = document.querySelector("#mlp");
const musicToggle = document.querySelector("#music-toggle");
const timerText = document.querySelector("#timer");
let answer;
let attempts = 0;
let timeLeft = 30;
let timer;
let isMusicPlaying = true;
input.addEventListener("keydown", (e) => {
if (e.key === "Enter") {
e.preventDefault();
play();
}
});
button.addEventListener("click", () => {
    play();
  });
  
musicToggle.addEventListener("click", () => {
if (isMusicPlaying) {
music.pause();
musicToggle.textContent = "🔇";
isMusicPlaying = false;
} else {
music.play();
musicToggle.textContent = "🔈";
isMusicPlaying = true;
}
});
function play() {
const userNumber = parseInt(input.value);
if (isNaN(userNumber)) {
Swal.fire({ title: 'Упс...', text: 'Вводить можно только цифры' });
return;
}
if (userNumber < 1 || userNumber > 20) {
Swal.fire({ title: 'Упс...', text: 'Число должно быть от 1 до 20' });
return;
}
attempts++;
if (userNumber < answer) {
Swal.fire({ text: 'Я загадала число больше!' });
} else if (userNumber > answer) {
Swal.fire({ text: 'Я загадала число меньше!' });
} else {
clearInterval(timer);
Swal.fire({
text: `Ты угадал с ${attempts} попытки!`,
icon: 'success',
}).then(() => {
changeBackgroundFlash(() => {
resetGame();
});
});
}
}
function updateTimer() {
if (timeLeft <= 0) {
clearInterval(timer);
Swal.fire({
title: 'Время вышло!',
text: 'Попробуй ещё раз!',
icon: 'info',
}).then(() => {
resetGame();
});
} else {
timerText.innerText = `Оставшееся время: ${timeLeft} с`;
timeLeft--;
}
}
function resetGame() {
answer = Math.floor(Math.random() * 20) + 1;
attempts = 0;
timeLeft = 30;
input.value = '';
clearInterval(timer);
updateTimer(); 
timer = setInterval(updateTimer, 1000);
document.body.style.backgroundColor = "rgb(242, 188, 234)";
document.body.style.backgroundImage = "url('https://m.media-amazon.com/images/I/71k17DF8IvS.jpg')";
}
function changeBackgroundFlash(callback) {
const originalImage = document.body.style.backgroundImage;
const originalColor = document.body.style.backgroundColor;
const colors = [
"rgba(173, 216, 230, 0.6)", 
"rgba(138, 43, 226, 0.6)",
];
let index = 0;
let count = 0;
const maxFlashes = 6;
const interval = setInterval(() => {
document.body.style.backgroundColor = colors[index];
index = (index + 1) % colors.length;
count++;
if (count >= maxFlashes) {
clearInterval(interval);
document.body.style.backgroundColor = originalColor;
document.body.style.backgroundImage = originalImage;
callback();
}
}, 300);
}
window.addEventListener("DOMContentLoaded", () => {
resetGame();
});