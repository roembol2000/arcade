# How to add a game to the arcade machine

### The controls
	The buttons and joystick on the arcade machine work exactly like a keyboard.
	These are the keys that they map to:
	Joystick:			[up, left, down, right] arrow keys like on your keyboard
	2 white buttons:	[x, y] (left to right), these are used for navigation on the home screen.
						DO NOT USE THESE BUTTONS IN YOUR GAME
	Light up buttons:	[w, a, s, d] like on your keyboard

### Add your game
1. Make sure that your game doesn't need a internet connection.
2. Make sure that your game has a index.html file
   Make sure that your program doesn't the x or the y key
3. Copy your game folder into public/games
4. In your game folder create a file named `env.json` with the following content:
```json
{
	"title": "my game",
	"author": "unknown",
	"scores": []
}
```
5. In the game folder copy the logo of your game
Name it `logo.png`
Please make sure it has a 4:3 aspect ratio

### The scoreboard
Copy `<script src="/js/arcadeGameAPI.js"></script>` to the beginning of your index.html

`saveScore(game String, score Number)`
game: The name of the folder of your game (case sensitive)
score: The score
When this function is called the game stops and you will be redirected to the keyboard page.

`async getScores(game String, length Number)`
game: The name of the folder of your game (case sensitive)
length: Number of scores you want (highest score first)
It only returns the scores that are saved, even if you request more.
