let allMusic = [{
        name: "Nụ cười xuân",
        artist: "",
        img: "nụ cười xuân",
        src: "music/y2mate.com - NỤ CƯỜI XUÂN  HƯƠNG LY  YUNIBOO  NHẠC XUÂN NHẠC TẾT CHÀO XUÂN QUÝ MÃO 2023 Official MV 4k.mp3",
        idMusic: "song1"
    },
    {
        name: "Tết Này Con Sẽ Về",
        artist: "",
        img: "tết này con sẽ về",
        src: "music/y2mate.com - Tết Này Con Sẽ Về Đi Về Nhà  Tuyển Tập Nhạc Tết 2024  Nhạc Xuân 2024  Nhạc Tết 2024 P1.mp3",
        idMusic: "song2"
    },
    {
        name: "Tết Này Con Sẽ Về Remix",
        artist: "",
        img: "tết này con sẽ về",
        src: "music/y2mate.com - Tết này Con Sẽ Về Orinn Remix  Bùi Công Nam  Nhạc Trẻ Remix Căng Cực Gây Nghiện Hay Nhất 2022 (1).mp3",
        idMusic: "song3"
    },
    {
        name: "Nhạc Xuân Remix",
        artist: "",
        img: "nhạc tết remix",
        src: "music/y2mate.com - LK Nhạc Xuân 2024 Remix  Nhạc Tết 2024 Remix Hay Nhất Việt Nam Chúc mừng năm mới  KHÔNG QUẢNG CÁO.mp3",
        idMusic: "song4"
    },
    {
        name: "Ước Nguyện Đầu Xuân",
        artist: "",
        img: "ước nguyện đầu xuân",
        src: "music/y2mate.com - Ước Nguyện Đầu Xuân Remix  Tina Ho x H2O  Nhạc Xuân 2024 Remix  Một Rừng Hoa Mai Nở TikTok.mp3",
        idMusic: "song5"
    },
    {
        name: "Xuân Trước Nhà",
        artist: "",
        img: "xuân trước nhà",
        src: "music/y2mate.com - Xuân Trước Nhà Remix  H2K x H2O Nhạc Xuân 2024  Nhạc Xuân Remix 2024 Hay Nhất Hiện Nay.mp3",
        idMusic: "song6"
    },
    {
        name: "Tâm Sự Nàng Xuân",
        artist: "",
        img: "tâm sự nàng xuân",
        src: "music/y2mate.com - Tâm Sự Nàng Xuân Remix  Đạt Long Vinh x H2O Nhạc Xuân 2024 Trong Thế Gian Đang Vui Mừng Đón Xuân.mp3",
        idMusic: "song7"
    },
    {
        name: "Nhạc Tết Lofi Chill",
        artist: "",
        img: "nhạc tết chill",
        src: "music/y2mate.com - Nhạc Tết Remix Chill 2024  Tết Bình An Điệp Khúc Mùa Xuân Tết Là Tết  LK Nhạc Xuân Remix 2024.mp3",
        idMusic: "song8"
    }

]

const wrapper = document.querySelector(".wrapper")
imgMusic = wrapper.querySelector('.img-music')
musicImg = wrapper.querySelector(".img-music img")
musicName = wrapper.querySelector(".name-music .name")
musicArtist = wrapper.querySelector(".name-music .artist")
progress = wrapper.querySelector('.progress')
progressbar = wrapper.querySelector(".progress-bar")
play = wrapper.querySelector('#play');
prev = wrapper.querySelector('#prev');
next = wrapper.querySelector('#next');

let musicIndex = 0;
let autoplay = 0;
let timer = 0;
let play_song = false;
let songAudio = document.createElement('audio');

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playLiMusic();
})

function loadMusic(index) {
    reset_music();
    autoplay_song();
    musicName.innerText = allMusic[index].name;
    musicArtist.innerText = allMusic[index].artist;
    musicImg.src = `image/${allMusic[index].img}.jpg`;
    songAudio.src = allMusic[index].src;
    songAudio.load();

    timer = setInterval(range_slider, 1000);
}
loadMusic(musicIndex);

function musicPlay() {
    if (play_song == false) {
        playsong();
    } else {
        pausesong();
    }
}

function playsong() {
    songAudio.play();
    play_song = true;
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pausesong() {
    songAudio.pause();
    play_song = false;
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// ---------next Music----------
function nextMusic() {
    if (musicIndex < allMusic.length - 1) {
        musicIndex++;
        loadMusic(musicIndex);
        playsong();
        playLiMusic();
    } else {
        musicIndex = 0;
        loadMusic(musicIndex);
        playsong();
        playLiMusic();
    }
}
// ---------prev Music----------
function prevMusic() {
    if (musicIndex > 0) {
        musicIndex--;
        loadMusic(musicIndex);
        playsong();
    } else {
        musicIndex = allMusic.length - 1;
        loadMusic(musicIndex);
        playsong();
    }
}
next.addEventListener("click", () => {
    nextMusic();
})

prev.addEventListener("click", () => {
    prevMusic();
})

// -------------update progress-------
songAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressbar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current")
    let musicDuration = wrapper.querySelector(".duration")
    songAudio.addEventListener("loadeddata", () => {
        let audioduration = songAudio.duration;
        let totalMusicmin = Math.floor(audioduration / 60);
        let totalMusicsec = Math.floor(audioduration % 60);
        if (totalMusicsec < 10) {
            totalMusicsec = `0${totalMusicsec}`;
        }
        musicDuration.innerText = `${totalMusicmin}:${totalMusicsec}`;
    });
    let currentMusicmin = Math.floor(currentTime / 60);
    let currentMusicsec = Math.floor(currentTime % 60);
    if (currentMusicsec < 10) {
        currentMusicsec = `0${currentMusicsec}`;
    }
    musicCurrentTime.innerText = `${currentMusicmin}:${currentMusicsec}`;

});

// -----------tua nhạc-------
progress.addEventListener("click", (e) => {
    let progressWidthval = progress.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = songAudio.duration;
    songAudio.currentTime = (clickOffsetX / progressWidthval) * songDuration
    playsong();
})

// --------tự chuyển bài----------
function autoplay_song() {
    if (autoplay == 1) {
        autoplay = 0;
    } else {
        autoplay = 1;
    }
}

function range_slider() {
    if (songAudio.ended) {
        play.innerHTML = `<i class="fa-solid fa-play"></i>`;
        if (autoplay == 1) {
            nextMusic();
            loadMusic(musicIndex);
            playsong();
        }
    }
}
// --------reset music---------
function reset_music() {
    progressbar.value = 0;
}

// --------Volume--------

let recent_volume = wrapper.querySelector('#volume')

function volume_change() {
    songAudio.volume = recent_volume.value / 100;
}



// --------danh sách nhạc----------

const showMusic = document.querySelector("#fa-list")
const closeMusic = document.querySelector(".fa-close")
const listMusic = document.querySelector(".list-music")
const ulMusic = wrapper.querySelector("ul")

showMusic.addEventListener("click", function() {
    listMusic.classList.add("show")
})
closeMusic.addEventListener("click", function() {
    listMusic.classList.remove("show")
})

for (let i = 0; i < allMusic.length; i++) {
    let liMusic = `<li Musicindex="${i}">
                        <div class="song-title">
                            <span>${allMusic[i].name}</span>
                            <p>${allMusic[i].artist}</p>
                        </div>
                        <audio class="${allMusic[i].idMusic}" src="${allMusic[i].src}"></audio>
                        <span id="${allMusic[i].idMusic}" class="audio-duration">3:04</span>
                    </li>`;
    ulMusic.insertAdjacentHTML("beforeend", liMusic);
    let liAudioDuration = ulMusic.querySelector(`#${allMusic[i].idMusic}`)
    let liAudioTag = ulMusic.querySelector(`.${allMusic[i].idMusic}`)

    // -------hiển thị thời gian bài hát------------
    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMusicmin = Math.floor(audioDuration / 60);
        let totalMusicsec = Math.floor(audioDuration % 60);
        if (totalMusicsec < 10) {
            totalMusicsec = `0${totalMusicsec}`;
        }
        liAudioDuration.innerText = `${totalMusicmin}:${totalMusicsec}`;
    });

}
// -----------------------------------------------

const allLiMusic = ulMusic.querySelectorAll("li");

function playLiMusic() {
    for (let j = 0; j < allLiMusic.length; j++) {
        if (allLiMusic[j].classList.contains("playMusic")) {
            allLiMusic[j].classList.remove("playMusic")
        }
        if (allLiMusic[j].getAttribute("Musicindex") == musicIndex) {
            allLiMusic[j].classList.add("playMusic");
        }
        allLiMusic[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(index) {
    let getLiIndex = index.getAttribute("Musicindex");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playsong();
    playLiMusic();
}