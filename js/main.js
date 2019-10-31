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
    if (currentSong <0) {
      currentSong = tracks.length-1;
    }
    playTrack(currentSong);
  });

})







/* function Busqueda() {
  $('.lista').empty(); //Limpiamos la lista.
  var autor = $('input').val();
  SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
  });
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