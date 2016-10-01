var NLP = require("./tictacNLP.js");
var startGame = {
	bd: [9, 8, 7, 6, 5, 3, 4, 5, 6],
	currentTurn: "X"
};
module.exports = {
	turn: function(sentence, game) {
		var result = this.placePiece(game.currentTurn, NLP.parseSentence(sentence), game);
		var win = this.checkWin(result.game);
		return {
			valid: result.success,
			winner: win,
			game: result.game
		}
	},
	startGame: function() {
		return startGame
	},
	checkWin: function(game) {
		for (var i = 0; i < 3; i++) {
			if (game.bd[i * 3] == game.bd[i * 3 + 1] && game.bd[i * 3 + 1] == game.bd[i * 3 + 2]) {
				if (game.bd[i * 3] == 'X')
					return 'X';
				else
					return 'O';
			}
			if (game.bd[i] == game.bd[i + 3] && game.bd[i + 3] == game.bd[i + 6]) {
				if (game.bd[i] == 'X')
					return 'X';
				else
					return 'O';
			}
			if (game.bd[0] == game.bd[4] && game.bd[4] == game.bd[8]) {
				if (game.bd[0] == 'X')
					return 'X';
				else
					return 'O';
			}
			if (game.bd[2] == game.bd[4] && game.bd[4] == game.bd[6]) {
				if (game.bd[0] == 'X')
					return 'X';
				else
					return 'O';
			}
		}
		return null
	},
	placePiece: function(char, pos, game) {
		console.log(char)
		if (game.bd[pos] > 1) {
			game.bd[pos] = char;
			if (game.currentTurn == 'X')
				game.currentTurn = 'O';
			else if (game.currentTurn == 'O')
				game.currentTurn = 'X';
			return {
				success: true,
				game: game
			};
		}
		return {
			success: false,
			game: game
		};
	},
	printBoard: function(game) {
		var boardString = game.bd.map(function(tile) {
			if (tile == "X" || tile == "O")
				return tile;
			return " ";
		})
		var board = '<table style="text-align:center;border-spacing:0pt;font-family:"Arial Unicode MS"; border-collapse:collapse; border-color: silver; border-style: solid; border-width: 0pt 0pt 0pt 0pt">';
		for (var i = 0; i < 3; i++) {
			var row = "<tr style='vertical-align:bottom;'>"
			for (var j = 0; j < 3; j++) {
				if (((j % 2) + (i % 2)) % 2 == 1) {
					row = row + '<td style="width:40pt; height:40pt; border-collapse:collapse; border-color: silver; border-style: solid; border-width: 1pt 0pt 0pt 1pt"><span style="font-size:250%;">?' + (3 * i + j).toString() + '?</span></td>'
				} else {
					row = row + '<td style="background:silver;"><span style="font-size:250%;">?' + (3 * i + j).toString() + '?</span></td>'
				}
			}
			row = row + "</tr>"
			board = board + row;
		}
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				board = board.replace("?" + (3 * (i) + (j)).toString() + "?", boardString[3 * i + j])
			}
		}
		return board;
	}
};
