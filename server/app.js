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

Storage.init({ dir: __dirname });
// Storage.setItem('clients', [])
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.listen(8080);
let clients = 0;


io.on('connection', function (socket) {
    socket.emit('firstSend');
    clients += 1;

    socket.on('disconnect', function () {
        clients -= 1;
    });
});

arduino.on('open', function () {
    console.log('Arduino connection');
    parser.on('data', function (incomingData) {
        incomingData = incomingData.replace(/\ /g, '');
        incomingData = parseInt(incomingData, 10);





        // console.log(incomingData);
        incomingData = { name: 'Jeff', id: incomingData };
        Storage.getItem('clients')
            .then(function (clients) {
                clients.push(incomingData);
                Storage.setItem('clients', clients);
            }).catch(function (err) {
                console.error(err);
            });

    });
});

console.log('started');
