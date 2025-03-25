let username = "";
let isLoggedIn = false;

// Check if there are saved login details in localStorage
window.onload = function() {
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
        username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        login(username, password);
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
        // Save login data to localStorage
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
    document.getElementById("welcome").style.display = "block"; // Show welcome section
    document.getElementById("initial").style.display = "none"; // Hide initial section
}

function logout() {
    // Clear login data from localStorage
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
    const winChance = Math.random(); // Generates a number between 0 and 1
    const wheel = document.getElementById("wheel");
    
    // Add a random rotation between 2000 and 3000 degrees
    const rotation = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        if (winChance <= 0.5) { // 50% chance to win
            document.getElementById('spinResult').innerHTML = "Herzlichen Glückwunsch! Du hast gewonnen!";
            document.getElementById('welcome').style.display = "block"; // Show the welcome section
            document.getElementById('initial').style.display = "none"; // Hide the initial section
        } else {
            document.getElementById('spinResult').innerHTML = "Leider hast du verloren. Versuche es erneut!";
        }
        document.getElementById('spinResult').style.display = "block"; // Show the spin result
    }, 4000); // Delay for the spinning effect
}
