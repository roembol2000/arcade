let socket = io.connect('localhost:8080');
socket.on('firstSend', function () {
  console.log('connected');
});

//returns everything there is to known about this id:
// {
//   id: 12345,
//   name: 'jeff', //if anivalable
//   creation: '7/11', //if anivalable
//   games: { //if anivalable
//     pacman: [{
//       score: 123,
//       date: '911'
//     }, {
//       score: 1223,
//       date: '420'
//     }]
//   }
// }

let getId = new Promise(function (resolve, reject) {

  socket.emit('reqRfidID');
  socket.on('rfidID', function (res) {
    resolve(res);
  });
});

function associateNameId(rfidID, clientName) {
  socket.emit('associateNameId', {
    rfidID: parseInt(rfidID, 10),
    clientName: clientName,
    creation: (new Date()).toLocaleString('en-GB')
  });
}

socket.emit('reqRfidID');
