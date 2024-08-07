let songs = [
  {
    title: "نشيدة العيد",
    artist: "مشاري بن راشد العفاسي",
    src: "/images/ALEid.mp3",
    img: "https://i.ytimg.com/vi/73J6f5FDcOY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDCYTJOZgRCylVWWnnGDCY9_-nZcw"
  },
  {
    title: "لا إله إلا الله",
    artist: "Mishary bin Rashid Alafasy",
    src: "/images/La ilaha illallah Arabic Nasheed by Mishary Rashid Alafasy.mp3",
    img: "https://i.ytimg.com/vi/4yWLofNagy8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCcAjjfRWl4RTxWPmSDa_4oiakmeA"
  },
  {
    title: "Rahman Ya Rahman",
    artist: "Mishary bin Rashid Alafasy",
    src: "/images/rahman ya rahman.mp3",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXeokXMcIwTP3e5o8fMFjuTbVG6APcPoybTQ&s"
  },
  {
    title: "Ya Taiba",
    artist: "Mishary bin Rashid Alafasy",
    src: "/images/taiba.mp3",
    img: "https://i.ytimg.com/vi/9gseGLnjppI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCUEwiIIwuud81SPwZPpe7_41xfuw"
  },
  {
    title: "أنا العبد",
    artist: "مشاري بن راشد العفاسي",
    src: "/images/أنا العبد الذي كسب الذنوب - مشاري راشد العفاسي.mp3",
    img: "https://i.ytimg.com/vi/LAnYxpVNOG8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpNTJKJXKABrgse58hUXtEOB5Wxg"
  },
  {
    title: "مصطفى مصطفى",
    artist: "مشاري بن راشد العفاسي",
    src: "/images/مصطفى _ مشاري راشد العفاسي وابنه محمد Mustafa Nashid Mishary Alafasy.mp3",
    img: "https://i.ytimg.com/vi/LZhDlPNO3SE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC8J-zGU8QCDGfpzx5OSDx_ZTMjQw"
  }
];

const progress = document.getElementById("progress");
const song = document.getElementById("song");
const ctrlIcon = document.getElementById("ctrlIcon");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const songImg = document.querySelector(".song-img");
let currentSongIndex = 0;
const volume = document.getElementById("volume");

const updateSongMetadata = () => {
  let s = songs[currentSongIndex];
  songTitle.textContent = s.title;
  artist.textContent = s.artist;
  songImg.src = s.img;
  song.src = s.src;
};

const playPause = () => {
  song.paused ? song.play() : song.pause();
  ctrlIcon.classList.toggle("fa-play");
  ctrlIcon.classList.toggle("fa-pause");
};

const changeSong = (index) => {
  currentSongIndex = index;
  updateSongMetadata();
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

document.getElementById("play-pause-btn").addEventListener("click", playPause);
document.getElementById("forward-btn").addEventListener("click", () => changeSong((currentSongIndex + 1) % songs.length));
document.getElementById("backward-btn").addEventListener("click", () => changeSong((currentSongIndex - 1 + songs.length) % songs.length));
document.getElementById("menu-btn").addEventListener("click", () => {
  let songList = document.getElementById("song-list");
  songList.innerHTML = songs.map((s, i) => `<li onclick="changeSong(${i})">${s.title} - ${s.artist}</li>`).join('');
  songList.style.display = songList.style.display === 'none' ? 'block' : 'none';
});

progress.oninput = () => song.currentTime = progress.value;
volume.oninput = () => song.volume = volume.value;
song.onloadedmetadata = () => progress.max = song.duration;
song.ontimeupdate = () => progress.value = song.currentTime;
song.onended = () => changeSong((currentSongIndex + 1) % songs.length);
updateSongMetadata();
