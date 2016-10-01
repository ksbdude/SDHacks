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
				// console.log(game.boardState.isGameOver())
				var result = game.movePiece(move);
				var winner = 0;
				if (game.boardState.winnerIsWhite === false)
					winner = 1;
        if (game.boardState.winnerIsWhite === true)
					winner = 2;
				if (game.boardState.gameIsDrawn)
					winner = 3;
				return {
					game: game,
					validMove: result === null ? false : true,
					winner: winner,
					boardString: this.writeBoard(game)
				}

			} else {
				return {
					game: game,
					validMove: false,
					winner: 0,
					boardString: this.writeBoard(game)
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
		var chars = game.toString().split('');
		for (var i = 0; i < chars.length; i++) {
			if ((/[a-z]/).test(chars[i])) {
				chars[i] = "<b>" + chars[i] + "</b>"
			}
		}
		chars[chars.lastIndexOf('1')] = 'a';
		chars[chars.lastIndexOf('2')] = 'b';
		chars[chars.lastIndexOf('3')] = 'c';
		chars[chars.lastIndexOf('4')] = 'd';
		chars[chars.lastIndexOf('5')] = 'e';
		chars[chars.lastIndexOf('6')] = 'f';
		chars[chars.lastIndexOf('7')] = 'g';
		chars[chars.lastIndexOf('8')] = 'h';
		chars[chars.indexOf('1') - 2] = "|<br>";
		chars[chars.indexOf('2') - 2] = "|<br>";
		chars[chars.indexOf('3') - 2] = "|<br>";
		chars[chars.indexOf('4') - 2] = "|<br>";
		chars[chars.indexOf('5') - 2] = "|<br>";
		chars[chars.indexOf('6') - 2] = "|<br>";
		chars[chars.indexOf('7') - 2] = "|<br>";
		chars[chars.indexOf('8') - 2] = "|<br>";
		chars[chars.indexOf('-') - 2] = "|<br>";
		chars.unshift('<font face="courier">');
		chars.push("|</font>");
		return chars.toString().replace(/,/g, '');
	}
};
