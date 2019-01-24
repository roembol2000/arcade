const express = require('express'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  path = require('path'),
  low = require('lowdb'),
  { exec } = require('child_process'),
  FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, 'scores.json'))
const db = low(adapter)

db.defaults({ scores: [] }).write()

app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.get('/keyboard/:gameName/:score/:date', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/keyboard.html'));
});

server.listen(8080);

io.on('connection', function (socket) {
  socket.emit('firstSend');

  socket.on('saveScore', function (data) {
    db.get('scores')
      .push(data)
      .write()
  })

  socket.on('reqScores', function (incoming) {
    let scoresToSend = [];
    db.get('scores').write().forEach(function (score) { if (score.game == incoming.game) { scoresToSend.push(score); } });
    scoresToSend.sort(function (a, b) { return b.score - a.score; })
    scoresToSend = scoresToSend.slice(0, incoming.length);
    socket.emit('scores', scoresToSend);
  })
});

exec('DISPLAY=:0 chromium-browser --disable-notifications --disable-infobars --kiosk --app=http://localhost:8080', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

console.log('running');
