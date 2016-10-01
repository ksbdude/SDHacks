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
		var game;
		chessGame.handleInput("start", "").then(function(data) {
			game = data;
			var moves = req.body.moves.split(",");
			chessGame.handleInput(moves[0], game.boardState).then(function(data) {
					game.boardState = data.board;
          res.send(data.boardString);
				});
		});
	})
	// var game = ticTac.startGame;
app.post("/tic", function(req, res) {
	var ticGame = ticTac.startGame();
	var sent = req.body.sent;
	ticTac.turn(sent, ticGame).then(function(data){
    tic = data.game;
    // res.send(data.game.boardState)
    res.send(ticTac.printBoard(ticGame));
  }).catch(function(err){
    return(err);
  });
});
app.listen(3000, function() {
	console.log("started server")
});
