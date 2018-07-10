//1280
//1024
if (!Cookies.get('selectedGame')) { Cookies.set('selectedGame', 0); };

function selectNextGame(direction) {
  direction = parseInt(direction);
  document.getElementsByClassName('selected')[0].className = "game grid-item";
  let select = parseInt(Cookies.get('selectedGame'), 10) + direction;
  let gamesLength = document.getElementsByClassName("game").length - 1;
  if (select > gamesLength) { select = 0; }
  if (select < 0) { select = gamesLength; }
  Cookies.set('selectedGame', select);
  document.getElementsByClassName("game")[select].className = 'game selected grid-item';
}

function startSelectedGame() {
  let location = '/games/' + document.getElementsByClassName('selected')[0].id;
  location = location.replace('?', '');
  window.location.replace(location);
}

let keyCode = {
  y: 89,
  right: 39,
  left: 37
}

document.body.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case keyCode.left:
      selectNextGame(-1);
      break;

    case keyCode.right:
      selectNextGame(1);
      break;

    case keyCode.y:
      startSelectedGame();
      break;

    default:
      break;
  }
})


function tableCreate(playerScores, game) {
  let element = document.getElementById(game);
  let tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.style.color = 'white';
  tbl.style.marginTop = '5px';
  tbl.style.fontFamily = 'Bungee';
  tbl.style.fontSize = '12px';
  tbl.style.fontSize = 'auto';
  // tbl.style.border = '3px solid black';
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


getScores('asteroids', 10).then(function (res) {
  tableCreate(res, 'asteroids');
})

getScores('asteroids', 10).then(function (res) {
  tableCreate(res, 'asteroids');
})
