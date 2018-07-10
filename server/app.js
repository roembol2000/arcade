const express = require('express'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  path = require('path')


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(__dirname, 'scores.json'))
const db = low(adapter)

db.defaults({ scores: [] }).write()

app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// app.get('/js/', function (req, res) { });

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

// const SerialPort = require('serialport');
// const parsers = SerialPort.parsers;
// const parser = new parsers.Readline({
// delimiter: '\r\n'
// });
// // const arduinoPort = '/dev/ttyACM0';
// const arduinoPort = '/dev/cu.usbmodemfa131';
// const arduino = new SerialPort(arduinoPort, {
// baudRate: 115200
// });
// arduino.pipe(parser);
// arduino.on('open', function () {
// console.log('Arduino connection');
// parser.on('data', function (incomingData) {
// });
// });

console.log('started');
