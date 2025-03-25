let username = "";
let isLoggedIn = false;

const apiKey = 'Bd5e378503939ddaee76f12ad7a9760'; // Hier deinen OpenWeatherMap API-Schlüssel einfügen

// Überprüft, ob Login-Daten in localStorage vorhanden sind und loggt automatisch ein
window.onload = function() {
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
        username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        login(username, password);
    }
}

// Funktion zur Wetterabfrage
async function getWeather() {
    const country = document.getElementById("country").value;

    if (!country) {
        alert("Bitte gib ein Land ein.");
        return;
    }

    // API URL mit dem eingegebenen Land
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric&lang=de`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            // Wetterdaten erfolgreich erhalten
            const locationName = data.name;
            const temperature = data.main.temp;
            const weatherCondition = data.weather[0].description;

            // Anzeige der Wetterdaten
            document.getElementById("locationName").innerText = locationName;
            document.getElementById("temperature").innerText = `Temperatur: ${temperature}°C`;
            document.getElementById("weatherCondition").innerText = `Wetter: ${weatherCondition}`;

            document.getElementById("weatherResult").style.display = "block";
        } else {
            alert("Fehler: Land nicht gefunden.");
            document.getElementById("weatherResult").style.display = "none";
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten:", error);
        alert("Es gab ein Problem beim Abrufen der Wetterdaten. Bitte versuche es später erneut.");
    }
}

function proceed() {
    document.getElementById("initial").style.display = "none";
    document.getElementById("welcome").style.display = "block";
    startTime();
}

function decline() {
    document.getElementById("initial").style.display = "none";
    document.getElementById("declineMessage").style.display = "block";
}

function register() {
    username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        // Login-Daten speichern
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        isLoggedIn = true;
        login(username, password);
    } else {
        alert("Bitte Benutzername und Passwort eingeben.");
    }
}

function login(username, password) {
    document.getElementById("usernameDisplay").innerText = `Willkommen, ${username}!`;
    document.getElementById("userArea").style.display = "block";
    document.getElementById("calculator").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("welcome").style.display = "block";
    document.getElementById("initial").style.display = "none";
}

function logout() {
    // Login-Daten aus localStorage entfernen
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    isLoggedIn = false;
    document.getElementById("welcome").style.display = "none";
    document.getElementById("initial").style.display = "block";
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

function startTime() {
    const today = new Date();
    const time = today.toLocaleTimeString();
    document.getElementById("time").innerText = time;
    setTimeout(startTime, 1000);
}

function spinWheel() {
    const winChance = Math.random();
    const wheel = document.getElementById("wheel");

    // Rotation des Rades
    const rotation = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        if (winChance <= 0.5) {
            document.getElementById('spinResult').innerHTML = "Herzlichen Glückwunsch! Du hast gewonnen!";
            document.getElementById('welcome').style.display = "block";
            document.getElementById('initial').style.display = "none";
        } else {
            document.getElementById('spinResult').innerHTML = "Leider hast du verloren. Versuche es erneut!";
        }
        document.getElementById('spinResult').style.display = "block";
    }, 4000);
}
