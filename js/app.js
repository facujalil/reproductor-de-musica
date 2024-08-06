const myPlaylist = [
  {
    id: 0,
    cover: "img/Babasónicos - Portada.jpg",
    song: "Como Eran Las Cosas",
    artist: "Babasónicos",
    audio: "audio/Como Eran Las Cosas - Babasónicos.mp3",
  },
  {
    id: 1,
    cover: "img/Los Piojos - Portada.jpg",
    song: "Desde Lejos No Se Ve",
    artist: "Los Piojos",
    audio: "audio/Desde Lejos No Se Ve - Los Piojos.mp3",
  },
  {
    id: 2,
    cover: "img/Las Pastillas Del Abuelo - Portada.jpg",
    song: "¿Qué Es Dios?",
    artist: "Las Pastillas Del Abuelo",
    audio: "audio/Qué Es Dios - Las Pastillas Del Abuelo.mp3",
  },
  {
    id: 3,
    cover: "img/Los Redondos - Portada.jpg",
    song: "Esa Estrella Era Mi Lujo",
    artist: "Los Redondos",
    audio: "audio/Esa Estrella Era Mi Lujo - Los Redondos.mp3",
  },
  {
    id: 4,
    cover: "img/Divididos - Portada.jpg",
    song: "Qué Ves?",
    artist: "Divididos",
    audio: "audio/Qué Ves - Divididos.mp3",
  },
  {
    id: 5,
    cover: "img/La Vela Puerca - Portada.jpg",
    song: "El Viejo",
    artist: "La Vela Puerca",
    audio: "audio/El Viejo - La Vela Puerca.mp3",
  },
  {
    id: 6,
    cover: "img/Bersuit Vergarabat - Portada.jpg",
    song: "La Soledad",
    artist: "Bersuit Vergarabat",
    audio: "audio/La Soledad - Bersuit Vergarabat.mp3",
  },
  {
    id: 7,
    cover: "img/Gustavo Cerati - Portada.jpg",
    song: "Deja Vu",
    artist: "Gustavo Cerati",
    audio: "audio/Deja Vu - Gustavo Cerati.mp3",
  },
  {
    id: 8,
    cover: "img/Andrés Calamaro - Portada.jpg",
    song: "Cuando No Estás",
    artist: "Andrés Calamaro",
    audio: "audio/Cuando No Estás - Andrés Calamaro.mp3",
  },
  {
    id: 9,
    cover: "img/Fito Páez - Portada.jpg",
    song: "Fue Amor",
    artist: "Fito Páez",
    audio: "audio/Fue Amor - Fito Páez.mp3",
  },
];

const cover = document.querySelector(".cover");
const song = document.querySelector("h2");
const artist = document.querySelector(".artist");
const audio = document.querySelector("audio");

const loopButton = document.getElementById("loop-button");
const resetLoopButton = document.getElementById("reset-loop-button");
const previousButton = document.getElementById("previous-button");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const nextButton = document.getElementById("next-button");
const queuePlaylistButton = document.getElementById("queue-playlist-button");
const closePlaylistButton = document.getElementById("close-playlist-button");

const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");

const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");

const playlistContainer = document.querySelector(".playlist-container");
const playlist = document.querySelector("ul");

let position = 0;

window.addEventListener("load", () => {
  markPlaylistItem();
});

loopButton.addEventListener("click", () => {
  audio.loop = true;
  loopButton.style.display = "none";
  resetLoopButton.style.display = "flex";
});

resetLoopButton.addEventListener("click", () => {
  audio.loop = false;
  resetLoopButton.style.display = "none";
  loopButton.style.display = "flex";
});

previousButton.addEventListener("click", () => {
  position--;
  chooseSong();
  changeState();
});

playButton.addEventListener("click", () => {
  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "flex";
  audio.setAttribute("autoplay", true);
});

pauseButton.addEventListener("click", () => {
  audio.pause();
  pauseButton.style.display = "none";
  playButton.style.display = "flex";
});

nextButton.addEventListener("click", () => {
  position++;
  chooseSong();
  changeState();
});

queuePlaylistButton.addEventListener("click", () => {
  playlistContainer.style.display = "flex";
});

closePlaylistButton.addEventListener("click", () => {
  playlistContainer.style.display = "none";
});

audio.onended = () => {
  position++;
  chooseSong();
};

audio.addEventListener("timeupdate", (e) => {
  const percentage = (e.target.currentTime / e.target.duration) * 100;
  progressBar.style.width = `${percentage}%`;

  const currentMin = Math.floor(e.target.currentTime / 60);
  let currentSec = Math.floor(e.target.currentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  currentTime.textContent = `${currentMin}:${currentSec}`;
});

audio.addEventListener("loadeddata", () => {
  const totalMin = Math.floor(audio.duration / 60);
  let totalSec = Math.floor(audio.duration % 60);

  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }

  currentTime.textContent = "0:00";
  totalTime.textContent = `${totalMin}:${totalSec}`;
});

progressBarContainer.addEventListener("click", (e) => {
  const totalWidth = progressBarContainer.offsetWidth;
  const progressWidth = e.offsetX;
  audio.currentTime = (progressWidth / totalWidth) * audio.duration;
});

const chooseSong = () => {
  if (position < 0) {
    position = myPlaylist.length - 1;
  } else if (position > myPlaylist.length - 1) {
    position = 0;
  }
  cover.src = myPlaylist[position].cover;
  cover.alt = myPlaylist[position].cover.split("/")[1].split(".")[0];
  song.textContent = myPlaylist[position].song;
  artist.textContent = myPlaylist[position].artist;
  audio.src = myPlaylist[position].audio;
  markPlaylistItem();
};

const changeState = () => {
  progressBar.style.width = 0 + "%";
  if (playButton.style.display === "flex") {
    audio.removeAttribute("autoplay", true);
  } else if (playButton.style.display === "none") {
    audio.setAttribute("autoplay", true);
  }
};

for (let i = 0; i < myPlaylist.length; i++) {
  const playlistItem = document.createElement("li");
  playlistItem.classList.add("playlist-item");
  playlistItem.id = i;

  const playlistItemSong = document.createElement("h4");

  const playlistItemArtist = document.createElement("span");
  playlistItemArtist.classList.add("playlist-item-artist");

  const playlistItemAudio = document.createElement("audio");

  const playlistItemDuration = document.createElement("p");
  playlistItemDuration.classList.add("playlist-item-duration");

  playlist.appendChild(playlistItem);
  playlistItem.appendChild(playlistItemSong);
  playlistItem.appendChild(playlistItemDuration);
  playlistItem.appendChild(playlistItemArtist);

  const myPlaylistItem = myPlaylist[i];
  playlistItemSong.textContent = myPlaylistItem.song;
  playlistItemArtist.textContent = myPlaylistItem.artist;

  playlistItem.style.opacity = "0.8";

  playlistItemAudio.src = myPlaylistItem.audio;

  playlistItem.addEventListener("click", () => {
    playButton.style.display = "none";
    pauseButton.style.display = "flex";

    position = myPlaylistItem.id;
    chooseSong();
    changeState();

    audio.play();
  });

  playlistItemAudio.addEventListener("loadeddata", () => {
    const totalMin = Math.floor(playlistItemAudio.duration / 60);
    let totalSec = Math.floor(playlistItemAudio.duration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    playlistItemDuration.textContent = `${totalMin}:${totalSec}`;
  });
}

const markPlaylistItem = () => {
  const playlistItem = document.querySelectorAll(".playlist-item");

  for (let i = 0; i < playlistItem.length; i++) {
    if (playlistItem[i].classList.contains("current-position")) {
      playlistItem[i].classList.remove("current-position");
    }

    if (Number(playlistItem[i].id) === position) {
      playlistItem[i].classList.add("current-position");
    }

    playlistItem[i].setAttribute("onclick", "clicked()");
  }
};

const clicked = () => {
  markPlaylistItem();
};
