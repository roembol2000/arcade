let socket = io.connect('localhost:8080');
socket.on('firstSend', function () {
  console.log('connected');
});

if (!Cookies.get('usedNames')) { Cookies.set('usedNames', []) }
// Cookies.set('currentName', null)

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
  return new Promise(function (resolve, reject) {
    socket.emit('reqScores', { game: gameName, length: length || 10 })
    socket.on('scores', function (scores) {
      resolve(scores);
    })
  });
}


// add to game: scoreAPI
// <script src="/js/socket.io.slim.js"></script>
// <script src="/js/socketing.js"></script>
