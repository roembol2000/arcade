//1280
//1024

if (!Cookies.get('selectedGame')) { Cookies.set('selectedGame', 0); };

function selectNextGame(direction) {
  direction = parseInt(direction);
  document.getElementsByClassName('selected')[0].className = "gallery";
  let select = parseInt(Cookies.get('selectedGame')) + direction;
  let gamesLength = document.getElementsByClassName("gallery").length - 1;
  if (select > gamesLength) { select = 0; }
  if (select < 0) { select = gamesLength; }
  Cookies.set('selectedGame', select);
  document.getElementsByClassName("gallery")[select].className = 'selected';
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

function tableCreate(playerScores) {
  let body = document.body,
    tbl = document.createElement('table');
  tbl.style.width = '500px';
  tbl.style.border = '3px solid black';

  for (let y = 0; y < playerScores.length; y++) {
    let tr = tbl.insertRow();

    let td = tr.insertCell();
    td.appendChild(document.createTextNode(playerScores[y].score));
    td.style.border = '1px solid black';

    td = tr.insertCell();
    td.appendChild(document.createTextNode(playerScores[y].name));
    td.style.border = '1px solid black';

    td = tr.insertCell();
    td.appendChild(document.createTextNode(playerScores[y].date));
    td.style.border = '1px solid black';

  }
  body.appendChild(tbl);
}

// getScores('test').then(function (res) {
//   tableCreate(res);

// })
