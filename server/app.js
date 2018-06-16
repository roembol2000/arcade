const express = require('express'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  path = require('path'),
  Storage = require('node-persist');

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: '\r\n'
});
// const arduinoPort = '/dev/ttyACM0';
const arduinoPort = '/dev/cu.usbmodemfa131';
const arduino = new SerialPort(arduinoPort, {
  baudRate: 115200
});
arduino.pipe(parser);

Storage.init({
  dir: __dirname
});
// Storage.setItem('clients', [])
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.listen(8080);
let clients = 0;

let idResolve = function () {};

io.on('connection', function (socket) {
  socket.emit('firstSend');
  clients += 1;

  socket.on('disconnect', function () {
    clients -= 1;
  });

  socket.on('reqRfidID', function () {
    console.log('1 waiting for card scan');
    (
      new Promise(function (resolve, reject) {
        idResolve = resolve;
      })
    )
    .then(function (id) {
      idResolve = function () {};
      console.log('2 card scanned');
      Storage.getItem('clients')
        .then(function (clients) {
          let client = clients.find(function (client) { //checks if id is known
            return client.id == id;
          });
          if (client) {
            socket.emit('rfidID', client);
            console.log('3', id, 'known');
          } else {
            socket.emit('rfidID', {
              id: id
            });
            console.log('3', id, 'not known');
          }
        });
    }).catch(function (err) {
      console.error(err);
    });
  });

  socket.on('associateNameId', function (_clientData) {
    Storage.getItem('clients')
      .then(function (clients) {
        clients.push(_clientData);
        Storage.setItem('clients', clients);
      }).catch(function (err) {
        console.error(err);
      });
  });
});

arduino.on('open', function () {
  parser.on('data', function (incomingData) {
    incomingData = incomingData.replace(/\ /g, '');
    incomingData = parseInt(incomingData, 10);
    console.log(incomingData, 'read from Arduino');
    idResolve(incomingData);
  });
});


console.log('started');
