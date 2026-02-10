const popup = document.getElementById("popup");
const nextBtn = document.getElementById("nextBtn");
const popupTextEl = document.getElementById("popupText");
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const transitionSound = document.getElementById("transitionSound");

/* 💖 EMOJI FALLING SETUP */
const emojis = ["💖", "💕", "🧸", "✨", "💗"];
let emojiInterval = null;

function startEmojiFall() {
    stopEmojiFall();

    emojiInterval = setInterval(() => {
        const emoji = document.createElement("span");
        emoji.className = "falling-emoji";
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.fontSize = Math.random() * 10 + 18 + "px";
        emoji.style.animationDuration = Math.random() * 3 + 4 + "s";

        document.body.appendChild(emoji);

        setTimeout(() => emoji.remove(), 7000);
    }, 500);
}

function stopEmojiFall() {
    if (emojiInterval) {
        clearInterval(emojiInterval);
        emojiInterval = null;
    }
}

const popupLines = [
    "Tumhe teddy chahiye tha,",
    "toh maine socha…",
    "<b>kyun na poori ek teddy duniya hi bana doon tumhare liye 💗</b>"
];

function typeWriterLines(lines, delay = 800, onComplete) {
    popupTextEl.innerHTML = "";
    let index = 0;

    function writeLine() {
        if (index < lines.length) {
            popupTextEl.innerHTML += lines[index] + "<br>";
            index++;
            setTimeout(writeLine, delay);
        } else {
            if (onComplete) onComplete(); // 👈 typing finished
        }
    }

    writeLine();
}


/* 🎀 SHOW POPUP AFTER DELAY (PAGE LOAD FEEL) */
setTimeout(() => {
    popup.classList.add("show");
    startEmojiFall();

    typeWriterLines(popupLines, 900, () => {
        // ⏳ WAIT AFTER WRITING
        setTimeout(() => {
            popup.classList.add("hide");
            stopEmojiFall();
        }, 3500); // readable pause AFTER text complete
    });

}, 2500);



/* ⏳ POPUP STAYS, THEN SLIDE UP + FADE OUT */
setTimeout(() => {
    popup.classList.add("hide");
    stopEmojiFall();       // 💖 stop emojis when popup goes
}, 2500 + 4200);

/* CTA */
nextBtn.addEventListener("click", () => {
    if (!screen1 || !screen2) {
        console.error("screen1 or screen2 not found in HTML");
        return;
    }

    
    // 🎵 play transition sound
    if (transitionSound) {
        transitionSound.currentTime = 0;
        transitionSound.volume = 0.7;
        transitionSound.play().catch(() => {});
    }
    // Screen-1 dreamy exit
    screen1.classList.add("exit");

    // Screen-2 dreamy enter
    screen2.classList.remove("hidden");
    setTimeout(() => {
        screen2.classList.add("enter");
    }, 100);
});




function startBackgroundBlush() {
    const container = document.createElement("div");
    container.className = "bg-blush";
    document.body.appendChild(container);

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("span");
        heart.textContent = "💗";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = Math.random() * 20 + "vh";
        heart.style.animationDelay = Math.random() * 3 + "s";
        heart.style.animationDuration = Math.random() * 3 + 4 + "s";

        container.appendChild(heart);
    }
}
startBackgroundBlush();


const finalScreen = document.getElementById("finalScreen");
const notebookText = document.getElementById("notebookText");

let lineIndex = 0;

const notebookLines = [
    "<span class='hl-love'>1. My dear teddy bear</span>, tum hi meri life ke jeete-jaagte teddy bear ho.",
    "Jab se <span class='hl-love'>tum</span> meri life mein aaye ho, lagta hai jaise meri life mein <span class='hl-soft'>Doremon</span> aa gaya hai.",
    "Haan maana ki tumhare paas koi <span class='hl-soft'>gadget</span> nahi hai,",
    "lekin tumhare hone bhar se hi, meri <span class='hl-love'>aadhi se zyada tension</span> door ho jaati hai.",
    "",
    "Toh meri life ke is <span class='hl-love'>teddy bear</span> ko,",
    "uske teddy bear ki taraf se —",
    "<span class='hl-day'>Happy Teddy Day</span> <span class='hl-love'>Budhu Bandariya</span> 🧸💖",
    "",
    "2. Who said <span class='hl-soft'>teddies aren’t real</span>?",
    "Just look at <span class='hl-love'>you</span>,",
    "you are the <span class='hl-love'>cutest</span> and most lovable <span class='hl-soft'>teddy</span> 🤍",
    "",
    "<span class='hl-love'>3. Tum</span> mere liye sirf ek din ka reason nahi ho…",
    "tum woh wajah ho jo <span class='hl-love'>har din</span> ko khaas bana deti ho.",
    "",
    "4. Main <span class='hl-soft'>perfect</span> nahi hoon,",
    "lekin tumhe <span class='hl-love'>khush rakhne</span> ki koshish dil se karta hoon.",
    "",
    "5. Tumhari <span class='hl-soft'>care</span>, tumhari baatein,",
    "aur <span class='hl-love'>tumhara hona</span>…",
    "meri zindagi ka <span class='hl-soft'>sabse soft sukoon</span> hai 🤍",
    "",
    "<span class='hl-day'>6. Aaj Teddy Day</span> hai,",
    "par mere liye <span class='hl-love'>tum roz ka comfort</span> ho 🧸💖"
];


function startNotebookWriting() {
    if (lineIndex < notebookLines.length) {

        const line = notebookLines[lineIndex];

        if (line === "") {
            // blank line = paragraph spacing (no rule)
            notebookText.innerHTML += "<div class='line-gap'></div>";
        } else {
            notebookText.innerHTML +=
                "<div class='note-line'>" + line + "</div>";
        }

        lineIndex++;
        setTimeout(startNotebookWriting, 850);
    }
}

function showFinalScreen() {
    finalScreen.classList.remove("hidden");
    setTimeout(() => {
        finalScreen.classList.add("show");
        startNotebookWriting();
    }, 100);
}


function emojiBurst() {
    const emojis = ["💖", "🧸", "💕", "✨", "💗"];
    const container = document.createElement("div");
    container.className = "emoji-burst";
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
        const span = document.createElement("span");
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDelay = Math.random() * 0.4 + "s";
        container.appendChild(span);
    }

    setTimeout(() => container.remove(), 2500);
}

const notesData = [
    {
        text: "Tumhare liye sirf teddy nahi,<br>uske saath mera pyaar bhi 🧸💗",
        gif: "gifs/teddy1.gif"
    },
    {
        text: "Tum meri comfort ho,<br>meri aadat ho 🤍",
        gif: "gifs/teddy2.gif"
    },
    {
        text: "Aaj Teddy Day hai,<br>par mujhe roz tum chahiye 💖",
        gif: "gifs/teddy3.gif"
    },
    {
        text: "Agar hug dena ho,<br>toh bas tum ho kaafi ✨",
        gif: "gifs/teddy4.gif"
    }
];

let currentIndex = 0;

const noteText = document.getElementById("noteText");
const gifImage = document.getElementById("gifImage");
const progressBar = document.getElementById("progressBar");
const nextNoteBtn = document.getElementById("nextNoteBtn");

// nextNoteBtn.addEventListener("click", () => {
//     currentIndex++;

//     if (currentIndex === notesData.length - 1) {
//         emojiBurst(); // 🎉 last note celebration
//     }


//     if (currentIndex < notesData.length) {
//         noteText.style.opacity = 0;
//         gifImage.style.opacity = 0;

//         setTimeout(() => {
//             noteText.innerHTML = notesData[currentIndex].text;
//             gifImage.src = notesData[currentIndex].gif;

//             noteText.style.opacity = 1;
//             gifImage.style.opacity = 1;

//             progressBar.style.width =
//                 ((currentIndex + 1) / notesData.length) * 100 + "%";
//         }, 300);
//     } else {
//         nextNoteBtn.textContent = "Only Hugs 🧸💗";
//     }
// });


// const nextNoteBtn = document.getElementById("nextNoteBtn");

nextNoteBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex === notesData.length - 1) {
        emojiBurst(); // 🎉 last note celebration
    }

    if (currentIndex < notesData.length) {
        // normal note change
        noteText.style.opacity = 0;
        gifImage.style.opacity = 0;

        setTimeout(() => {
            noteText.innerHTML = notesData[currentIndex].text;
            gifImage.src = notesData[currentIndex].gif;
            noteText.style.opacity = 1;
            gifImage.style.opacity = 1;

            progressBar.style.width =
                ((currentIndex + 1) / notesData.length) * 100 + "%";
        }, 300);

        // last note reached → change button text
        if (currentIndex === notesData.length - 1) {
            nextNoteBtn.textContent = "Surprise 🎁";
        }

    } else {
        // 🎁 USER CLICKED AFTER LAST NOTE
        showFinalScreen();
    }
});


