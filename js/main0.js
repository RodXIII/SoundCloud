let tracks, players = [];

//Cargar Pagina
document.addEventListener("DOMContentLoaded", function (event) {

  //Boton Play
  document.getElementById("playBtn").addEventListener("click", function () {
    playTrack(currentSong);
    console.log("test")
  });

  //BotonPause
  document.getElementById("pauseBtn").addEventListener("click", function () {
    players[currentSong].pause();
  });

  //Boton Stop
  document.getElementById("stopBtn").addEventListener("click", function () {
    players[currentSong].pause();
    players[currentSong].seek(0);
  });

  //Boton Next
  document.getElementById("forwardBtn").addEventListener("click", function () {
    currentSong++;
    if (currentSong >= tracks.length) {
      currentSong = 0;
    }
    playTrack(currentSong);
  });

  //Boton Previous
  document.getElementById("rewindBtn").addEventListener("click", function () {
    currentSong--;
    if (currentSong < 0) {
      currentSong = tracks.length - 1;
    }
    playTrack(currentSong);
  });

});

///////////////////////////


SC.initialize({
  client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("content loaded") 
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault()
    console.log(event)
    SC.get("/tracks", {
      q: document.getElementById("input").value
    }).then(function (response) {
      console.log(response);
      tracks = response;
      document.getElementById("description").innerHTML = tracks[currentSong].title + tracks[currentSong].genre + tracks[currentSong].description
      document.getElementById("artwork").src = tracks[currentSong].artwork_url || "http://" + q + ".jpg.to"
      playTrack(currentSong);
    });
  });
})

let localTracks = [46833586, 46834546]
let currentSong = 0;

function playTrack(songId) {
  document.getElementById("description").innerHTML = tracks[currentSong].title + " . " + "Genre: " + tracks[currentSong].genre

  if (!players[songId]) {
    SC.stream('/tracks/' + tracks[songId].id).then(function (player) {
      console.log(player);
      players[songId] = player;
      players[songId].play();
    });
  } else {
    players[songId].play();
  }

}

function stopAudio() {
  players[currentSong].seek(0);
  players[currentSong].pause();
}

function playAudio() {
  players[currentSong].play();
}

function pauseAudio() {
  players[currentSong].pause();
}

function forwardAudio() {
  stopAudio();
  currentSong += 1;
  players[currentSong].play();
};

function rewindAudio() {
  stopAudio();
  currentSong =- 1;
  players[currentSong].play();
  currentSong
}

function setVolume(val) {
  let player =tracks[currentSong];
  player.volume = val/100;
  console.log('After: ' + player.volume);
  players[currentSong].setVolume(player.volume);
}


















/* function Busqueda() {
  $('.lista').empty(); //Limpiamos la lista.
  var autor = $('input').val();

  SC.get('/tracks', {
    q: autor,
  }).then(function (tracks) {
    var numero = 0;
    if (tracks.length > 12) {
      numero = 12;
    } else {
      numero = tracks.length;
    }
    for (var i = 0; i < numero; i++) {
      if (tracks[i].artwork_url !== null) {
        $('.lista').append(
          "<div class='imagen_mini col-xs-2'><img src='" +
          tracks[i].artwork_url +
          "' id ='" +
          tracks[i].id +
          "' draggable='true' ondragstart='drag(event)'></div>"
        );
      }
    }
  });
} */