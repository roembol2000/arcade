How to add a game to the arcade:

The controls are:
	The buttons and joystick on the arcade machine work exactly like a keyboard.
	These are the keys that they map to:
	Joystick:			[up, left, down, right] arrow keys like on your keyboard
	2 white buttons:	[x, y] (left to right), these are used for navigation on the home screen.
						DO NOT USE THESE BUTTONS IN YOUR GAME
	Light up buttons:	[w, a, s, d] like on your keyboard

1. Make sure that your game doesn't need a internet connection.
2. Make sure that your game has a index.html file
2.5: Make sure that your program doesn't the x key
3. Copy game folder to public/games
4. In the game folder create a file named "env.json"
With the following content:
"
{
	"title": "my title",
	"author": "unknown",
	"created": "unknown",
	"scores": []
}
"
5. In the game folder copy your logo
Name it logo.png
Please make sure it has a 4:3 aspect ratio

Optional:

6. To add a scoreboard:
Copy "<script src="/js/arcadeGameAPI.js"></script>" to the beginning of your index.html

There are two functions:

saveScore(game String, score Number)
game: The name of the folder of your game (case sensitive)
score: The score
When this function is called the game stops and you will be redirected to the keyboard page.

async getScores(game String, length Number)
game: The name of the folder of your game (case sensitive)
length: Number of scores you want (highest score first)
It only returns the scores that are saved, even if you request more.
