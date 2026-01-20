const fs = require('fs').promises
const path = require('path')
const gamesPath = path.join(process.env.root, 'public/games')

async function getGames() {
	let files = await fs.readdir(gamesPath)
	let failedGames = []
	let games = []

	for (const file of files) {
		let filePath = path.join(gamesPath, file)
		try {
			let stat = await fs.lstat(filePath)
			if (stat.isFile()) continue
		} catch (err) {
			failedGames.push({ msg: `stat failed for ${filePath}`, err })
			continue
		}

		const envPath = path.join(filePath, 'env.json')
		let env
		try {
			env = await fs.readFile(envPath)
			env = env.toString()
			env = JSON.parse(env)
		} catch (err) {
			failedGames.push({ msg: `reading env from ${envPath} failed`, err, envContent: env })
			continue
		}

		try {
			let game = {
				id: file,
				author: env.author,
				created: env.created,
				title: env.title,
				scores: env.scores,
				fullPath: filePath,
				envPath
			}
			games.push(game)
		} catch (err) {
			failedGames.push({ msg: `env file incomplete`, err, envContent: env })
			continue
		}

		const idInUse = games.find((game) => game.id === env.id)
		if (idInUse) {
			failedGames.push({ msg: `id ${env.id} in use` })
			continue
		}

	}

	if (failedGames.length > 0) console.log("failed games", failedGames)

	return { games, failedGames }
}

async function saveScore({ gameName, score, playerName }) {
	const games = getGames().games;
	let index = games.findIndex((game) => game.name == gameName)
	const newScore = {
		score,
		playerName,
		date: (new Date()).toLocaleDateString('en-GB')
	}
	games[index].scores.push(newScore)
	await fs.writeFile(games[index].envPath, JSON.stringify(games[index].scores))
}

module.exports = {
	getGames,
	saveScore
}
