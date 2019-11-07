let tracks = [];
let currentPlayer;
let playList = [];


//Cargar Pagina
document.addEventListener("DOMContentLoaded", function (event) {

  //Boton Play
  document.getElementById("playBtn").addEventListener("click", function () {
    playTrack(playList[listNumber]);
    console.log("test")
  });

  //BotonPause
  document.getElementById("pauseBtn").addEventListener("click", function () {
    currentPlayer.pause();
  });

  //Boton Stop
  document.getElementById("stopBtn").addEventListener("click", function () {
    currentPlayer.pause();
    currentPlayer.seek(listNumber = 0);
  });

  //Boton Next
  document.getElementById("forwardBtn").addEventListener("click", function () {
    listNumber++;
    if (listNumber >= playList.length) {
      listNumber = 0;
    }
    playTrack(playList[listNumber]);
  });

  //Boton Previous
  document.getElementById("rewindBtn").addEventListener("click", function () {
    listNumber--;
    if (listNumber < 0) {
      listNumber = playList.length - 1;
    }
    playTrack(playList[listNumber]);
  });
});


//////////////////////////////////////////////////////////////


SC.initialize({
  client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("content loaded")
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()
    SC.get("/tracks", {
      q: document.getElementById("input").value

    }).then(function (response) {

      tracks = response;
      let list = document.getElementById("description")
      let itemList = ''

      for (const currentSong of tracks) {
        if (currentSong.artwork_url != null) {
          itemList += `<div id = "${currentSong.id}" class = "item" draggable="true" ondragstart='drag(event)' >
                            <div class= "title"> ${currentSong.title}</div> 
                            <div class = "genre">${currentSong.genre}</div>
                            <div class="extraInfo"> ${currentSong.description} </div>  
                            <img class = "image" src="${currentSong.artwork_url}" alt = "Ups! Image not found!">
                      </div>`
        } else {
          itemList += `<div id = "${currentSong.id}" class = "item" draggable="true" ondragstart='drag(event)' >
                            <div class= "title"> ${currentSong.title}</div> 
                            <div class = "genre">${currentSong.genre}</div>
                            <div class="extraInfo"> ${currentSong.description} </div>  
                            <img class = "image" src="./img/no-image-found1.jpg" alt = "Ups! Image not found!">
                      </div>`
        }

      }
      list.innerHTML = itemList
    });
  });
})

function letDrop(event) {

  event.preventDefault();
}

function drag(event) {

  event.dataTransfer.setData('data', event.target.id);
}

function drop(event) {

  event.preventDefault();

  let trackId = event.dataTransfer.getData('data');
  let iData = document.getElementById(trackId)
  event.target.appendChild(iData.cloneNode(true))

  playTrack(trackId);
  playList.push(trackId);
}

let listNumber = 0;

function playTrack(songId) {

  SC.stream('/tracks/' + songId).then(function (player) {

    currentPlayer = player;
    player.play();
  });
}

function stopAudio() {
  playList[listNumber].seek(0);
  playList[listNumber].pause();
}

function playAudio() {
  playList[listNumber].play();
}

function pauseAudio() {
  playList[listNumber].pause();
}

function forwardAudio() {
  stopAudio();
  listNumber += 1;
  playList[listNumber].play();
}

function rewindAudio() {
  stopAudio();
  listNumber = - 1;
  playList[listNumber].play();
  listNumber
}

function setVolume(val) {
  let player = currentPlayer;
  player.volume = val / 100;
  console.log('After: ' + player.volume);
  currentPlayer.setVolume(player.volume);
}