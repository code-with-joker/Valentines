const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const promiseGame = document.getElementById("promiseGame");
const promiseFinal = document.getElementById("promiseFinal");

const promiseText = document.getElementById("promiseText");
const optionsDiv = document.getElementById("options");
const progressBar = document.getElementById("gameProgress");


const gameSong = document.getElementById("gameSong");
const finalSong = document.getElementById("finalSong");

function stopAllSongs() {
    if (gameSong) {
        gameSong.pause();
        gameSong.currentTime = 0;
    }
    if (finalSong) {
        finalSong.pause();
        finalSong.currentTime = 0;
    }
}


const gameData = [
    {
        question: "I promise to always _______",
        options: ["make you laugh 💛", "ignore you 😒", "forget your birthday 🎂"],
        answer: 0
    },
    {
        question: "I promise to never _______",
        options: ["break your trust 💛", "leave your side 🤍", "hurt your heart 💔"],
        answer: 1
    },
    {
        question: "In every fight, I will _______",
        options: ["win 🏆", "stay silent 😶", "understand you 💛"],
        answer: 2
    },
    {
        question: "Your smile is something I will _______",
        options: ["protect 💛", "ignore 😑", "test 😅"],
        answer: 0
    },
    {
        question: "No matter what happens, I will _______",
        options: ["choose you 💍", "run away 🏃", "complain 😒"],
        answer: 0
    }
];

let current = 0;
let score = 0;

startBtn.addEventListener("click", () => {
    stopAllSongs(); // 🔴 ensure no conflict

    document.querySelector(".screen.active").classList.remove("active");
    promiseGame.classList.add("active");

    if (gameSong) {
        gameSong.volume = 0.6;
        gameSong.play().catch(() => {});
    }

    loadQuestion();
});


function loadQuestion() {
    const q = gameData[current];
    promiseText.textContent = q.question;
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {

    if (selected === gameData[current].answer) {
        score++;
        progressBar.style.width = (score / gameData.length) * 100 + "%";
        current++;

        if (current < gameData.length) {
            loadQuestion();
        } else {
            showFinal();
        }

    } else {
        // alert("Arre buddhu 😅 Choose the sweetest promise 💛");
        Swal.fire({
            title: "Arre buddhu 😅",
            text: "Choose the sweetest promise 💛",
            icon: "error",
            confirmButtonText: "Let me try again 💕",
            confirmButtonColor: "#ff8fa3",
            background: "#fff0f5",
            backdrop: `
                rgba(201,24,74,0.2)
            `
        });

    }
}

function startGlowBackground() {

    const container = document.createElement("div");
    container.className = "bg-glow";
    document.body.appendChild(container);

    const emojis = ["💛","✨","🤍","🌟"];

    for (let i = 0; i < 18; i++) {
        const emoji = document.createElement("span");
        emoji.innerText = emojis[Math.floor(Math.random()*emojis.length)];
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.bottom = Math.random() * 100 + "vh";
        emoji.style.animationDelay = Math.random() * 7 + "s";
        container.appendChild(emoji);
    }
}

startGlowBackground();



function startPromiseConfetti() {

    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const emojis = ["💛","💖","✨","🤍","🫶","💍","🌟"];

    const particles = [];

    // 💥 ONE TIME BIG BURST
    for (let i = 0; i < 70; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random() * 36 + 28,
            speedX: (Math.random() - 0.5) * 10,
            speedY: (Math.random() - 0.5) * 10,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            opacity: 1
        });
    }

    let burstFrames = 50;
    let rainMode = false;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            ctx.globalAlpha = p.opacity;   // 🎚️ OPACITY CONTROL
            ctx.font = `${p.size}px serif`;
            ctx.fillText(p.emoji, p.x, p.y);
            ctx.globalAlpha = 1;

            if (burstFrames > 0) {
                p.x += p.speedX;
                p.y += p.speedY;
                p.opacity -= 0.02;
            } 
            else {
                if (!rainMode) {
                    rainMode = true;
                    particles.length = 0;

                    // 🌧 Continuous rain particles
                    for (let i = 0; i < 40; i++) {
                        particles.push(createRainParticle());
                    }
                }
            }

            if (rainMode) {
                p.y += p.speed;

                if (p.y > canvas.height) {
                    Object.assign(p, createRainParticle());
                }
            }

        });

        if (burstFrames > 0) burstFrames--;

        requestAnimationFrame(animate);
    }

    function createRainParticle() {
        return {
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 26 + 18,
            speed: Math.random() * 1.5 + 0.8,  // speed control
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            opacity: Math.random() * 0.6 + 0.1  // 🎚️ opacity range
        };
    }

    animate();
}


function showFinal() {

    promiseGame.classList.remove("active");
    promiseFinal.classList.add("active");

    stopAllSongs(); // 🔴 stop previous

    if (finalSong) {
        finalSong.volume = 0.7;
        finalSong.play().catch(() => {});
    }

    startPromiseConfetti();
}
