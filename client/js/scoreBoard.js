//ik heb dit meer dan een jaar geleden geschreven pls no hate

// let date = (new Date()).toLocaleString('en-GB');

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


// getScores('pacman').then(function (res) { tableCreate(res) });
