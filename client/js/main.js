//1280
//1024
let selectedGame = 0;

function selectNextGame(direction) {
  document.getElementsByClassName('selected')[0].className = "game grid-item";
  let gamesLength = document.getElementsByClassName("game").length - 1;
  let newSelectedGame = selectedGame + direction;
  if (newSelectedGame > gamesLength) {
    newSelectedGame = 0;
  }
  if (newSelectedGame < 0) {
    newSelectedGame = gamesLength;
  }

  document.getElementsByClassName("game")[newSelectedGame].className = 'game selected grid-item';
  selectedGame = newSelectedGame;
}

function startSelectedGame() {
  let location = '/games/' + document.getElementsByClassName('selected')[0].id;
  location = location.replace('?', '');
  window.location.replace(location);
}

function tableCreate(playerScores, game) {
  let element = document.getElementById(game);
  let tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.style.color = 'white';
  tbl.style.marginTop = '5px';
  tbl.style.fontFamily = 'Bungee';
  tbl.style.fontSize = '12px';
  tbl.style.fontSize = 'auto';
  tbl.style.borderCollapse = 'collapse';

  for (let y = 0; y < playerScores.length; y++) {
    let tr = tbl.insertRow();

    let td = tr.insertCell();
    td.appendChild(document.createTextNode(playerScores[y].score));
    td.style.border = '1px solid black';
    td.style.padding = '2px';

    td = tr.insertCell();
    td.appendChild(document.createTextNode(playerScores[y].name));
    td.style.border = '1px solid black';
    td.style.padding = '2px';
    td.style.textAlign = 'center';

    td = tr.insertCell();
    td.appendChild(document.createTextNode(playerScores[y].date));
    td.style.border = '1px solid black';
    td.style.padding = '2px';
    td.style.textAlign = 'center';
  }
  element.appendChild(tbl);
}

window.onload = function () {
  getScores('pacman', 10).then(function (res) {
    tableCreate(res, 'pacman');
  });

  document.body.addEventListener('keydown', function (e) {
    switch (e.code) {
      case 'ArrowLeft':
        selectNextGame(-1);
        break;

      case 'ArrowRight':
        selectNextGame(1);
        break;

      case 'KeyY':
        startSelectedGame();
        break;
    }
  });
  document.getElementsByClassName("game")[0].className = 'game selected grid-item'
}
