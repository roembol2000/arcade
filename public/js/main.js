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
	
	const selectedGameElement = document.getElementsByClassName("game")[newSelectedGame];
	selectedGameElement.className = 'game selected';

	// const gamesContainer = document.getElementsByClassName("gamesContainer")[0];
	// if (newSelectedGame == 0) {
	// 	gamesContainer.scrollTo(0, 0);
	// } else if (newSelectedGame == gamesLength) {
	// 	gamesContainer.scrollTo(gamesContainer.scrollWidth, 0)
	// } else {
	// 	selectedGameElement.parentNode.scrollWidth = selectedGameElement.offsetLeft;
	// 	// selectedGameElement.scrollIntoView();
	// 	// document.documentElement.scrollTo(0, 0)
	// 	// gamesContainer.scrollTo(selectedGameElement.offsetX, 0)
	// }

	const allGames = document.getElementsByClassName("game");

	for (game of allGames) {
		game.style.transform = `translateX(${newSelectedGame * -361}px)`;
	}

	selectedGameElement.style.transform = `translate(${newSelectedGame * -361}px, -15px)`;
	
	selectedGame = newSelectedGame;
}

function startSelectedGame() {
	let location = '/games/' + document.getElementsByClassName('selected')[0].id;
	location = location.replace('?', '');

	document.body.classList.add("blurFade");

	setTimeout(() => {
		window.location.replace(location);
	}, 500);
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
	document.body.classList.remove("blurFade");
}
