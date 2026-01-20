(async () => {
	const path = require('path')
	process.env.root = __dirname

	const express = require('express')
	const app = express()

	app.set('views', path.join(__dirname, 'views/'))
	app.set('view engine', 'ejs')

	const http = require('http')
	const httpServer = http.createServer(app)

	app.use(express.static(path.join(__dirname, 'public/')))

	const io = require('socket.io')(httpServer)
	const router = await require('./server/router.js')(io)
	app.get('/', router.index)
	app.get('/keyboard/:gameName/:score/:date', router.keyboard)

	await new Promise((resolve) => httpServer.listen(8080, resolve))

	console.log('running on http://localhost:8080')
	const os = require('os')

	if (os.hostname() == 'arcade') {
		const { exec } = require('child_process')
		exec('chromium-browser --disable-notifications --disable-infobars --start-fullscreen --app=http://localhost:8080', (err, stdout, stderr) => {
		  if (err) {
		    console.error(err)
		    return
		  }
		  console.log(`stdout: ${stdout}`)
		  console.log(`stderr: ${stderr}`)
		})
	}
})()
