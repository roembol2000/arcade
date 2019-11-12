const parser = require('./parser.js')

module.exports = async (io) => {
	let games = (await parser.getGames()).games

	io.on('connection', (socket) => {
		socket.emit('firstSend')
		socket.on('saveScore', parser.saveScore)
	})


	async function index(req, res) {
		res.render('index.ejs', { games })
	}

	function keyboard(req, res) {
		res.render('keyboard.ejs')
	}

	return {
		index,
		keyboard
	}
}
