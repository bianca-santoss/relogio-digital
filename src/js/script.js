// ------------------ TEMA CLARO/ESCURO ------------------
const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Carregar tema salvo
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}


// ------------------ RELÓGIO ------------------
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").textContent = `${h}:${m}:${s}`;

    const dateString = now.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    document.getElementById("date").textContent = dateString;
}
setInterval(updateClock, 1000);
updateClock();


// ------------------ CALENDÁRIO ------------------
function loadCalendar() {
    const today = new Date();

    const dateText = today.toLocaleDateString("pt-BR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    document.getElementById("calendar").textContent = dateText;
}
loadCalendar();


// ------------------ CRONÔMETRO ------------------
let swInterval;
let swSeconds = 0;

function formatTime(sec) {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

document.getElementById("startSW").onclick = () => {
    if (swInterval) return;
    swInterval = setInterval(() => {
        swSeconds++;
        document.getElementById("stopwatch").textContent = formatTime(swSeconds);
    }, 1000);
};

document.getElementById("pauseSW").onclick = () => {
    clearInterval(swInterval);
    swInterval = null;
};

document.getElementById("resetSW").onclick = () => {
    clearInterval(swInterval);
    swInterval = null;
    swSeconds = 0;
    document.getElementById("stopwatch").textContent = "00:00:00";
};


// ------------------ TIMER ------------------
let timer;
let timerTime = 0;
let timerRunning = false;

document.getElementById("startTimer").onclick = () => {
    if (timerRunning) return;

    if (timerTime === 0) {
        timerTime = parseInt(document.getElementById("timerInput").value) || 0;
    }
    if (timerTime <= 0) return;

    timerRunning = true;

    timer = setInterval(() => {
        timerTime--;
        const m = String(Math.floor(timerTime / 60)).padStart(2, "0");
        const s = String(timerTime % 60).padStart(2, "0");
        document.getElementById("timerDisplay").textContent = `${m}:${s}`;

        if (timerTime <= 0) {
            clearInterval(timer);
            timerRunning = false;
            alert("Tempo finalizado!");
        }
    }, 1000);
};

document.getElementById("pauseTimer").onclick = () => {
    clearInterval(timer);
    timerRunning = false;
};

document.getElementById("resetTimer").onclick = () => {
    clearInterval(timer);
    timerRunning = false;
    timerTime = 0;
    document.getElementById("timerDisplay").textContent = "00:00";
};
