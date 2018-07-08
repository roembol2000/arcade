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
