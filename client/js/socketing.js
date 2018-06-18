let socket = io.connect('localhost:8080');
socket.on('firstSend', function () {
  console.log('connected');
});


function saveScore(name, game, score, date) {
  if (arguments.length < 4) throw new Error('Missing argument');
  else { socket.emit('saveScore', { name: name, game: game, score: parseInt(score, 10), date: date }) }
}

function getScores(game) {
  return new Promise(function (resolve, reject) {
    socket.emit('reqScores', game)
    socket.on('scores', function (scores) {
      resolve(scores);
    })
  });
}
