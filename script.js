let username = "";
let isLoggedIn = false;

window.onload = function() {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("userArea").style.display = "block";
        document.getElementById("usernameDisplay").innerText = `Willkommen, ${storedUsername}!`;
        document.getElementById("calculator").style.display = "block";
        document.getElementById("rouletteTable").style.display = "block";
        document.getElementById("sidebar").style.display = "block";
        startClock();
    } else {
        document.getElementById("welcome").style.display = "block";
    }
}

function register() {
    username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        isLoggedIn = true;
        document.getElementById("usernameDisplay").innerText = `Willkommen, ${username}!`;
        document.getElementById("userArea").style.display = "block";
        document.getElementById("calculator").style.display = "block";
        document.getElementById("rouletteTable").style.display = "block";
        document.getElementById("sidebar").style.display = "block";
        document.getElementById("welcome").style.display = "none";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        startClock();
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    isLoggedIn = false;
    document.getElementById("welcome").style.display = "block";
    document.getElementById("userArea").style.display = "none";
    document.getElementById("calculator").style.display = "none";
    document.getElementById("rouletteTable").style.display = "none";
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("errorMessage").style.display = "none";
}

function appendToCalc(value) {
    const calcInput = document.getElementById("calcInput");
    calcInput.value += value;
}

function calculate() {
    const calcInput = document.getElementById("calcInput");
    try {
        calcInput.value = eval(calcInput.value);
    } catch (error) {
        calcInput.value = "Fehler";
    }
}

function clearCalc() {
    document.getElementById("calcInput").value = "";
}

function playRoulette() {
    const winChance = Math.random();
    const rouletteResult = document.getElementById("rouletteResult");

    if (winChance <= 0.5) {
        rouletteResult.innerHTML = "Herzlichen Glückwunsch! Du hast gewonnen!";
    } else {
        rouletteResult.innerHTML = "Leider verloren. Du wirst jetzt zum Rickroll weitergeleitet!";
        setTimeout(() => {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }, 2000);
    }
}

function startClock() {
    setInterval(function() {
        const date = new Date();
        const options = { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('clock').innerText = date.toLocaleTimeString('de-DE', options);
    }, 1000);
}

function showCalculator() {
    document.getElementById('calculator').style.display = 'block';
    document.getElementById('rouletteTable').style.display = 'none';
}

function showRoulette() {
    document.getElementById('calculator').style.display = 'none';
    document.getElementById('rouletteTable').style.display = 'block';
}
