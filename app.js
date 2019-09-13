(async () => {
  const path = require('path')
  const express = require('express')

  const app = express()
  const http = require('http')
  const httpServer = http.createServer(app)

  const low = require('lowdb')
  const FileAsync = require('lowdb/adapters/FileAsync')
  const adapter = new FileAsync(path.join(__dirname, 'scores.json'))

  const db = await low(adapter)

  app.use(express.static(path.join(__dirname, 'client/')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'))
  })

  app.get('/keyboard/:gameName/:score/:date', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/keyboard.html'))
  })

  const io = require('socket.io')(server)
  io.on('connection', (socket) => {
    socket.emit('firstSend')

    socket.on('saveScore', (data) => {
      db.get('scores')
        .push(data)
        .write()
    })

    socket.on('reqScores', (incoming) => {
      let scoresToSend = []
      db.get('scores').write().forEach((score) => { if (score.game == incoming.game) { scoresToSend.push(score) } })
      scoresToSend.sort((a, b) => b.score - a.score)

      scoresToSend = scoresToSend.slice(0, incoming.length)
      socket.emit('scores', scoresToSend)
    })
  })

  await new Promise((resolve) => {
    httpServer.listen(8080, () => {
      resolve()
    })
  })

  const { exec } = require('child_process')
  exec('chromium-browser --disable-notifications --disable-infobars --start-fullscreen --app=http://localhost:8080', (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
})()
