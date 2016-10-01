var SparkPost = require('sparkpost');
var sp = new SparkPost('<YOUR API KEY>');
var chess = require("node-chess");
var NLP = require("./chessNLP.js")

module.exports = {

	handleInput: function(sentence, game) {
		if (NLP.isStart(sentence))
			return this.startGame();
		if (NLP.isMove(sentence)) {
			var command = NLP.parseMove(sentence);
			move = this.parseMove(command);
			console.log(move);
			if (this.verifyMove(move)) {
				var result = game.movePiece(move);
        var winner = 0;
				if (result != null) {
					if (game.boardState.winnerIsWhite)
						winner = 1;
					if (game.boardState.winnerIsBlack)
						winner = 2;
					if (game.boardState.gameIsDrawn)
						winner = 3;
					return {
						game: game,
						validMove: true,
						winner: winner
					}
				} else {
					return {
						game: game,
						validMove: false,
						winner: 0
					}
				}
			} else {
				return {
					game: game,
					validMove: false,
					winner: 0
				};
			}
		}
	},
	verifyMove: function(move, game) {
		if ((move.hasOwnProperty("from") && move.hasOwnProperty("to"))) {
			// var moves = game.boardState.ranks[move.start.rank].squares[move.start.file])
			return true;
		}
		return false;
	},
	startGame: function() {
		var game = chess.classic.engine();
		return game;
	},
	parseMove: function(command) {
		var move = {
			from: {
				file: command.start.file,
				rank: command.start.rank
			},
			to: {
				file: command.end.file,
				rank: command.end.rank
			}
		}
		return move;
	},
	writeBoard: function(game) {
		return game.toString();
	}
};
