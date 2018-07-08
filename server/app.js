const express = require('express'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  path = require('path'),
  Storage = require('node-persist');


Storage.init({ logging: true });
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.listen(8080);
// Storage.setItem('scores', [])

io.on('connection', function (socket) {
  socket.emit('firstSend');

  socket.on('saveScore', function (data) {
    Storage.getItem('scores')
      .then(function (scores) {
        scores.push(data)
        Storage.setItem('scores', scores).catch(function (err) { console.error(err) })
        console.log('saveScore ', data);
      }).catch(function (err) { console.error(err) })
  })

  socket.on('reqScores', function (incoming) {
    let scoresToSend = [];
    Storage.getItem('scores')
      .then(function (scores) {
        scores.forEach(function (score) { if (score.game == incoming.game) { scoresToSend.push(score); } });
        scoresToSend.sort(function (a, b) { return b.score - a.score; })
        scoresToSend = scoresToSend.slice(0, incoming.length);
        socket.emit('scores', scoresToSend);
      }).catch(function (err) { console.error(err) })

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
