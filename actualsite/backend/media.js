const songPath = [
    [
        "https://github.com/znatgd/znatgd.github.io/releases/download/future-adventures/FutureAdventures.mp3",
        "https://s3.eu-central-2.wasabisys.com/musicworld/media_attachments/files/114/867/839/057/209/323/original/6f8368446560605e.mp3"
    ],
    [
        "https://github.com/znatgd/znatgd.github.io/releases/download/loops/LOOP1.mp3",
        "https://s3.eu-central-2.wasabisys.com/musicworld/media_attachments/files/114/867/807/678/533/477/original/2f9e6d718836aa7e.mp3"
    ],
    [
        "https://github.com/znatgd/znatgd.github.io/releases/download/loops/LOOP2.mp3",
        "https://s3.eu-central-2.wasabisys.com/musicworld/media_attachments/files/114/867/828/195/645/792/original/92655b64f8ca6168.mp3"
    ]
    
]

const songFile = [
    "Future Adventures.mp3",
    "Loop 1 test.mp3",
    "Loop 2 test.mp3"
]
const songTitle = [
    "Future Adventures",
    "LOOP1",
    "LOOP2"
]

const artistTitle = [
    "MKMusic (ZnatGD)",
    "mkmusic22",
    "mkmusic22"
]

const genre = [
    "Riced Future Funk",
    "Freeform",
    "Soft Rock"
]

const duration = [
    "04:43",
    "00:36",
    "00:58"
]

const bgImg = [
    "/src/animebg.png",
    "/src/animebg.png",
    "/src/animebg.png"
]

let currentIndex = -1;
let currentServer = 0;
const maxSongs = 3;
let isPlaying = false;
let durationCurrent = "00:00";

const audioPlayer = document.getElementById("player");

// Function to track and display the current position
function trackAudioPosition() {
    let currentTimeHere = document.getElementById("player").currentTime.toFixed(0);
    formatData = ("0" + parseInt(Math.floor(currentTimeHere / 60))).slice(-2) + ":" +  ("0" + parseInt(Math.floor(currentTimeHere % 60))).slice(-2)
    if (audioPlayer) {
        document.getElementById("trackPos").innerText = (`${formatData} / ${durationCurrent}`);
    }
}

// Add an event listener to update the position as the audio plays
if (audioPlayer) {
    document.getElementById("player").addEventListener("timeupdate", trackAudioPosition);
}


function previous() {
    audioPlayer.pause();
    isPlaying = false;
    document.getElementById("playButton").innerText = "play";
    if ((currentIndex - 1) < 0) {
        currentIndex = maxSongs - 1;
        switchSong(currentIndex);
    } else {
        switchSong(--currentIndex);
    }
    console.log(currentIndex);
}

function seek(amount) {
    document.getElementById("player").currentTime = document.getElementById("player").currentTime + amount;
}

function next() {
    document.getElementById("player").pause();
    isPlaying = false;
    document.getElementById("playButton").innerText = "play";
    if ((currentIndex + 2) > maxSongs) {
        currentIndex = 0;
        switchSong(currentIndex);
    } else {
        switchSong(++currentIndex);
    }
    console.log(currentIndex);
}

function play() {
    // console.log(document.getElementById("player").src);
    
    if (isPlaying) {
        document.getElementById("player").pause();
        isPlaying = false;
        document.getElementById("playButton").src = "/src/play.svg";
        
    } else {
        document.getElementById("player").play();
        isPlaying = true;
        document.getElementById("playButton").src = "/src/pause.svg";
    }
}
function switchSong(index) {
    document.getElementById("player").pause();
    isPlaying = false;
    document.getElementById("playButton").src = "/src/play.svg";
    currentIndex = index;

    document.body.style.backgroundImage = 'url($"{bgImg[currentIndex]}")';
    document.getElementById("songTitle").innerText = songTitle[currentIndex];
    document.getElementById("artistTitle").innerText = artistTitle[currentIndex];
    document.getElementById("genre").innerText = genre[currentIndex];
    document.getElementById("player").src = songPath[currentIndex][currentServer];
    durationCurrent = duration[currentIndex];
}

function switchServer(serverName) {
    document.getElementById("player").pause();
    isPlaying = false;
    document.getElementById("playButton").src = "/src/play.svg";

    currentServer = serverName;
    document.getElementById("serverHeader").innerText = "Server Selection (Current server- Server " + (currentServer + 1) + "):";
    // console.log(songPath[currentIndex][currentServer]);
    // console.log(currentServer);
    // console.log(currentIndex);
    
    switchSong(currentIndex)
}

function goTo() {
    const link = document.createElement('a');
    link.href = songPath[currentIndex];
    link.download = songFile[currentIndex];
    link.click();
}


window.addEventListener("keydown", (e) => {
    // Prevent Backspace navigation
    if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
    }

    // Prevent Arrow key scrolling
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
    }
    if (e.key == ' ' && e.target === document.body) {
        e.preventDefault(); // Prevent default scrolling behavior
    }

    switch (e.code) {
        case "ArrowLeft":
            seek(-10)
            break;
        case "ArrowRight":
            seek(10)
            break;
        case "Space":
            play()
            break;
        case "ArrowUp":
            next()
            break;
        case "ArrowDown":
            previous()
            break;
        case "KeyX":
            goTo()
            break;
    }
})