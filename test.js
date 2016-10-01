var express = require("express")
var bodyParser = require('body-parser')
var ticTac = require("./tictac/tictac.js")
var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}));
var chessGame = require("./chess/chess.js");
var chessNLP = require("./chess/chessNLP.js");
var game = chessGame.handleInput("start game", "");
app.post("/", function(req, res) {
	var sent = req.body.sent;
	// console.log(game);
	data = chessGame.handleInput(sent, game);
	game = data.game;
	if (data.winner != 0) {
		res.send("GAME OVER ");
	}
	res.send(chessGame.writeBoard(game));
})
app.post("/moves", function(req, res) {
	var game = chessGame.handleInput("start game", "");
	var moves = req.body.moves.split(",");
	console.log(moves);
	for (var i = 0; i < moves.length; i++) {
		data = chessGame.handleInput(moves[i], game);
		game = data.game;
		if (data.winner == 1)
			break;
	}
	res.send(data);
})
var game = ticTac.startGame;
app.post("/tic", function(req, res) {
	var sent = req.body.sent;
  var data = ticTac.turn(sent,game);
  game = data.game
  res.send(ticTac.printBoard(game));
	});
app.listen(3000, function() {
	console.log("started server")
});
