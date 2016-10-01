var express = require("express")
var bodyParser = require('body-parser')
var ticTac = require("./tictac/tictac.js")
var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}));
var chessGame = require("./chess/chess.js");
var chessNLP = require("./chess/chessNLP.js");

app.post("/moves", function(req, res) {
	var game = chessGame.handleInput("start","");
  console.log(game)
	var moves = req.body.moves.split(",");
	for (var i = 0; i < moves.length; i++) {
		data = chessGame.handleInput(moves[i], game.boardState);
		// game.boardState = data.board;
		if (data.winner == 1)
			break;
	}
	// res.send(data.game.boardState);
  res.send(data.boardString);
})
// var game = ticTac.startGame;
app.post("/tic", function(req, res) {
  var ticGame = ticTac.startGame();
	var sent = req.body.sent;
  var data = ticTac.turn(sent,ticGame);

  game = data.game;
  // res.send(data.game.boardState)
  res.send(ticTac.printBoard(ticGame));
	});
app.listen(3000, function() {
	console.log("started server")
});
