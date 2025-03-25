let username = "";
let isLoggedIn = false;

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
        isLoggedIn = true;
        document.getElementById("usernameDisplay").innerText = `Willkommen, ${username}!`;
        document.getElementById("userArea").style.display = "block";
        document.getElementById("calculator").style.display = "block";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else {
        alert("Bitte Benutzername und Passwort eingeben.");
    }
}

function logout() {
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