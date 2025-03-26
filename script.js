let username = "";
let isLoggedIn = false;

window.onload = function() {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        // Benutzer ist eingeloggt
        username = storedUsername;
        isLoggedIn = true;

        // Setze Willkommensnachricht
        document.getElementById("usernameDisplay").innerText = `Willkommen, ${username}!`;

        // Zeige das Sidebar-Menü und Funktionen
        document.getElementById("welcome").style.display = "none";
        document.getElementById("userArea").style.display = "block";
        document.getElementById("sidebar").style.display = "block";
        
        // Lade und wende gespeicherte Einstellungen an
        loadSettings();
        startClock();
    } else {
        // Wenn der Benutzer nicht eingeloggt ist, zeige die Anmeldeseite
        document.getElementById("welcome").style.display = "block";
    }
}

function register() {
    username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        // Speichern der Anmeldedaten im localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Zeige Willkommensnachricht
        document.getElementById("usernameDisplay").innerText = `Willkommen, ${username}!`;

        // Zeige das Menü und Funktionen
        document.getElementById("userArea").style.display = "block";
        document.getElementById("sidebar").style.display = "block";
        document.getElementById("welcome").style.display = "none";
        
        // Lade und wende gespeicherte Einstellungen an
        loadSettings();
        startClock();
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
}

function logout() {
    // Lösche Anmeldedaten und Einstellungen
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("fontSize");
    localStorage.removeItem("fontColor");
    localStorage.removeItem("bgColor");
    localStorage.removeItem("buttonSize");

    // Benutzer ausloggen
    isLoggedIn = false;
    document.getElementById("welcome").style.display = "block";
    document.getElementById("userArea").style.display = "none";
    document.getElementById("sidebar").style.display = "none";
    hideAllFunctions();
}

function showCalculator() {
    hideAllFunctions();
    document.getElementById('calculator').style.display = 'block';
}

function showRoulette() {
    hideAllFunctions();
    document.getElementById('rouletteTable').style.display = 'block';
}

function showSettings() {
    hideAllFunctions();
    document.getElementById('settings').style.display = 'block';
}

function hideAllFunctions() {
    document.getElementById('calculator').style.display = 'none';
    document.getElementById('rouletteTable').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
}

function saveSettings() {
    const fontSize = document.getElementById("fontSize").value;
    const fontColor = document.getElementById("fontColor").value;
    const bgColor = document.getElementById("bgColor").value;
    const buttonSize = document.getElementById("buttonSize").value;

    // Speichern der Einstellungen im localStorage
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("fontColor", fontColor);
    localStorage.setItem("bgColor", bgColor);
    localStorage.setItem("buttonSize", buttonSize);

    // Anwenden der gespeicherten Einstellungen
    applySettings(fontSize, fontColor, bgColor, buttonSize);
}

function loadSettings() {
    const savedFontSize = localStorage.getItem("fontSize");
    const savedFontColor = localStorage.getItem("fontColor");
    const savedBgColor = localStorage.getItem("bgColor");
    const savedButtonSize = localStorage.getItem("buttonSize");

    // Standardwerte
    const fontSize = savedFontSize || 16;
    const fontColor = savedFontColor || '#000000';
    const bgColor = savedBgColor || '#FFFFFF';
    const buttonSize = savedButtonSize || 18;

    document.getElementById("fontSize").value = fontSize;
    document.getElementById("fontColor").value = fontColor;
    document.getElementById("bgColor").value = bgColor;
    document.getElementById("buttonSize").value = buttonSize;

    applySettings(fontSize, fontColor, bgColor, buttonSize);
}

function applySettings(fontSize, fontColor, bgColor, buttonSize) {
    document.body.style.fontSize = fontSize + 'px';
    document.body.style.color = fontColor;
    document.body.style.backgroundColor = bgColor;

    // Alle Buttons anpassen
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.fontSize = buttonSize + 'px';
    });
}

// Funktion für die Uhr
function startClock() {
    setInterval(function() {
        const date = new Date();
        const options = { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('clock').innerText = date.toLocaleTimeString('de-DE', options);
    }, 1000);
}
