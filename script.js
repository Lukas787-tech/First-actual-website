let username = "";
let isLoggedIn = false;

window.onload = function() {
    // Überprüfen, ob der Benutzer eingeloggt ist
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        // Wenn der Benutzer eingeloggt ist, zeige die Willkommensnachricht, den Rechner und den Roulette-Tisch
        document.getElementById("welcome").style.display = "none"; // Versteckt Anmeldeseite
        document.getElementById("userArea").style.display = "block"; // Zeigt Benutzerbereich
        document.getElementById("usernameDisplay").innerText = `Willkommen, ${storedUsername}!`;
        document.getElementById("calculator").style.display = "block"; // Zeigt den Rechner
        document.getElementById("rouletteTable").style.display = "block"; // Zeigt den Roulette-Tisch
    } else {
        // Wenn der Benutzer nicht eingeloggt ist, zeige die Anmeldeseite
        document.getElementById("welcome").style.display = "block";
    }
}

function register() {
    username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        // Benutzerdaten im localStorage speichern, um sie beim nächsten Besuch zu verwenden
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        isLoggedIn = true;
        document.getElementById("usernameDisplay").innerText = `Willkommen, ${username}!`;
        document.getElementById("userArea").style.display = "block";
        document.getElementById("calculator").style.display = "block";
        document.getElementById("rouletteTable").style.display = "block"; // Zeigt den Roulette-Tisch
        document.getElementById("welcome").style.display = "none"; // Versteckt Anmeldeseite
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else {
        document.getElementById("errorMessage").style.display = "block"; // Zeigt Fehlernachricht
    }
}

function logout() {
    // Beim Ausloggen den localStorage löschen
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    isLoggedIn = false;
    document.getElementById("welcome").style.display = "block"; // Zeigt die Anmeldeseite
    document.getElementById("userArea").style.display = "none"; // Versteckt den Benutzersbereich
    document.getElementById("calculator").style.display = "none"; // Versteckt den Rechner
    document.getElementById("rouletteTable").style.display = "none"; // Versteckt den Roulette-Tisch
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
    const winChance = Math.random(); // Generiert eine Zahl zwischen 0 und 1
    const rouletteResult = document.getElementById("rouletteResult");

    if (winChance <= 0.5) { // 50% Chance zu gewinnen
        rouletteResult.innerHTML = "Herzlichen Glückwunsch! Du hast gewonnen!";
    } else {
        rouletteResult.innerHTML = "Leider verloren. Du wirst jetzt zum Rickroll weitergeleitet!";
        // Weiterleitung zum Rickroll-Video
        setTimeout(() => {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rickroll-Link
        }, 2000);
    }
}
