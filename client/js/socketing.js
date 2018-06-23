let socket = io.connect('localhost:8080');
socket.on('firstSend', function () {
  console.log('connected');
});

if (!Cookies.get('usedNames')) { Cookies.set('usedNames', []) }
// Cookies.set('currentName', null)

let allowedGameNames = ['pacman'];

function saveScore(game, score) {
  if (arguments.length < 2) throw 'Missing argument';

  let data = {
    name: Cookies.get('currentName') || 'anonymous',
    game: game,
    score: parseInt(score, 10),
    date: (new Date()).toLocaleString('en-GB')
  };
  socket.emit('saveScore', data);
  console.log('saved: ', data);
}

function getScores(gameName, length) {
  if (!length) length = 10;
  return new Promise(function (resolve, reject) {
    socket.emit('reqScores', { game: gameName, length: length })
    socket.on('scores', function (scores) {
      resolve(scores);
    })
  });
}


// add to game:
// <script src="path/to/js/js.cookie.min.js"></script>
// <script src="path/to/js/socket.io.min.js"></script>
// <script src="path/to/js/socketing.js"></script>
