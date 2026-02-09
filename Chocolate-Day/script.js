const startBtn = document.getElementById("startBtn");
const startCard = document.getElementById("start-card");
const box = document.getElementById("chocolate-box");
const pieces = document.querySelectorAll(".choco-piece");
const popup = document.getElementById("popup");
const finalCard = document.getElementById("final-card");
const progress = document.getElementById("progress");
const finalMusic = document.getElementById("final-music");
const sliceSound = document.getElementById("slice-sound");

let clicked = 0;
let soundTimer = null;
let fadeTimer = null;


const emojis = ["💖", "💕", "❤️", "😍", "💍", "🥰", "💞"];
const burstEmojis = ["💖","💕","❤️","😍","💍","🥰","💞"];

let emojiParticles = [];
let emojiAnimId;


startBtn.addEventListener("click", () => {
    startCard.classList.add("slide-up-out");

    setTimeout(() => {
        startCard.classList.add("hidden");   // fully gone
        box.classList.remove("hidden");      // chocolate slab show
    }, 600);
});


pieces.forEach(piece => {
    piece.addEventListener("click", () => {
        if (piece.classList.contains("clicked")) return;

        piece.classList.add("clicked");
        clicked++;

        // 🎵 play sound with fade-out
        if (sliceSound) {
            // clear old timers
            if (soundTimer) clearTimeout(soundTimer);
            if (fadeTimer) clearInterval(fadeTimer);

            sliceSound.pause();
            sliceSound.currentTime = 0;
            sliceSound.volume = 0.7;
            sliceSound.play().catch(() => {});

            // after 2 sec start fade-out
            soundTimer = setTimeout(() => {
                fadeTimer = setInterval(() => {
                    if (sliceSound.volume > 0.05) {
                        sliceSound.volume -= 0.05;
                    } else {
                        sliceSound.pause();
                        sliceSound.currentTime = 0;
                        sliceSound.volume = 0.7; // reset for next click
                        clearInterval(fadeTimer);
                    }
                }, 100); // smooth fade speed
            }, 500);
        }



        const percent = Math.round((clicked / pieces.length) * 100);
        progress.textContent = percent + "%";
        progress.style.display = "block";

        showPopup(piece.dataset.msg);

        if (clicked === pieces.length) {
            setTimeout(showFinal, 800);
        }
    });
});

function startEmojiFall() {
    const canvas = document.createElement("canvas");
    canvas.id = "emoji-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    emojiParticles = [];
    for (let i = 0; i < 30; i++) {
        emojiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            speed: Math.random() * 2 + 1,
            size: Math.random() * 22 + 18,
            emoji: emojis[Math.floor(Math.random() * emojis.length)]
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        emojiParticles.forEach(p => {
            ctx.font = `${p.size}px serif`;
            ctx.fillText(p.emoji, p.x, p.y);
            p.y += p.speed;

            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });
        emojiAnimId = requestAnimationFrame(animate);
    }

    animate();
}

function showFinal() {
    box.classList.add("hidden");
    finalCard.classList.remove("hidden");

    // 💖 start emoji fall
    startEmojiFall();

    // 🎵 start final music (no overlap with slice sound)
    if (finalMusic) {
        sliceSound.pause();          // ensure slice sound off
        sliceSound.currentTime = 0;

        finalMusic.volume = 0;
        finalMusic.play().catch(() => {});

        // smooth fade-in
        let vol = 0;
        const fadeIn = setInterval(() => {
            if (vol < 0.6) {
                vol += 0.05;
                finalMusic.volume = vol;
            } else {
                clearInterval(fadeIn);
            }
        }, 150);
    }
}


function emojiBurst() {
    const burstContainer = document.createElement("div");
    burstContainer.id = "emoji-burst";
    document.body.appendChild(burstContainer);

    for (let i = 0; i < 18; i++) {
        const span = document.createElement("span");
        span.textContent =
            burstEmojis[Math.floor(Math.random() * burstEmojis.length)];

        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDelay = Math.random() * 0.4 + "s";

        burstContainer.appendChild(span);
    }

    // cleanup after animation
    setTimeout(() => {
        burstContainer.remove();
    }, 1800);
}

function showPopup(text) {
    popup.textContent = text;
    popup.classList.remove("hidden");
    popup.style.opacity = "1";

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => {
            popup.classList.add("hidden");
             // 🎉 emoji burst ONLY for last slice
        if (isLastSlice) {
            emojiBurst();
        }
        }, 1000);
    }, 6000);   // ⏱️ 6 seconds readable time
}
