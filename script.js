let username = "";
let isLoggedIn = false;

window.onload = function() {
    // Überprüfen, ob der Benutzer eingeloggt ist
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        // Wenn der Benutzer eingeloggt ist, zeige die Willkommensnachricht und den Rechner
        document.getElementById("welcome").style.display = "none";
        document.getElementById("userArea").style.display = "block";
        document.getElementById("usernameDisplay").innerText = `Willkommen, ${storedUsername}!`;
        document.getElementById("calculator").style.display = "block";
    } else {
        // Wenn der Benutzer nicht eingeloggt ist, zeige die Anmeldeseite
        document.getElementById("welcome").style.display = "block";
    }

    startTime();
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
        document.getElementById("welcome").style.display = "none"; // Versteckt die Anmeldeseite
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else {
        alert("Bitte Benutzername und Passwort eingeben.");
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

// Virtuelles Roulette-Funktion
function spinRoulette() {
    const wheel = document.getElementById('wheel');
    const resultMessage = document.getElementById('spinResult');
    resultMessage.style.display = "none"; // Versteckt das Ergebnis

    // Zufällige Drehung generieren (zwischen 2000 und 3600 Grad)
    const rotation = Math.floor(Math.random() * (3600 - 2000 + 1)) + 2000;
    wheel.style.transition = "transform 4s ease-out";  // 4 Sekunden für die Drehung
    wheel.style.transform = `rotate(${rotation}deg)`;  // Setzt die Drehung auf das Rad

    // Nach 4 Sekunden wird das Ergebnis angezeigt
    setTimeout(() => {
        const sector = Math.floor((rotation % 360) / 45); // Teilen des Rades in 8 Sektoren

        // 0 bis 3 = Gewinn, 4 bis 7 = Verlust
        if (sector >= 4) {
            resultMessage.innerHTML = "Leider hast du verloren! Du wirst jetzt zu einem besonderen Video weitergeleitet...";
            resultMessage.style.display = "block";  // Zeigt das Resultat
            setTimeout(() => {
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rickroll-Link
            }, 2000); // 2 Sekunden Verzögerung bevor der Link geöffnet wird
        } else {
            resultMessage.innerHTML = "Herzlichen Glückwunsch! Du hast gewonnen!";
            resultMessage.style.display = "block"; // Zeigt das Resultat
        }
    }, 4000); // 4 Sekunden Verzögerung, um die Drehung zu beenden
}
