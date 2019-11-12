//1280
//1024
let selectedGame = 0;

function selectNextGame(direction) {
	document.getElementsByClassName('selected')[0].className = "game";
	let gamesLength = document.getElementsByClassName("game").length - 1;
	let newSelectedGame = selectedGame + direction;
	if (newSelectedGame > gamesLength) {
		newSelectedGame = 0;
	}
	if (newSelectedGame < 0) {
		newSelectedGame = gamesLength;
	}

	document.getElementsByClassName("game")[newSelectedGame].className = 'game selected';
	selectedGame = newSelectedGame;
}

function startSelectedGame() {
	let location = '/games/' + document.getElementsByClassName('selected')[0].id;
	location = location.replace('?', '');
	window.location.replace(location);
}

window.onload = function () {
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
	document.getElementsByClassName("game")[0].className = 'game selected'
}
