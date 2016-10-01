var SparkPost = require('sparkpost');
var sp = new SparkPost('<YOUR API KEY>');
var chess = require("node-chess");
var NLP = require("./chessNLP.js")

module.exports = {

	handleInput: function(sentence, boardState) {
		if (NLP.isStart(sentence))
			return this.startGame();
		if (NLP.isMove(sentence)) {
			var playGame = this.startGame();
			playGame.boardState = boardState;
			var command = NLP.parseMove(sentence);
			move = this.parseMove(command);
			if (this.verifyMove(move)) {
				var result = playGame.movePiece(move);
				var winner = 0;
				if (playGame.boardState.winnerIsWhite === false)
					winner = 1;
				if (playGame.boardState.winnerIsWhite === true)
					winner = 2;
				if (playGame.boardState.gameIsDrawn)
					winner = 3;
				return {
					board: playGame.boardState,
					validMove: result === null ? false : true,
					winner: winner,
					boardString: this.writeBoard(playGame.boardState)
				}

			} else {
				return {
					board: playGame.deepCopy(),
					validMove: false,
					winner: 0,
					boardString: this.writeBoard(playGame.boardState)
				};
			}
		}
	},
	verifyMove: function(move, board) {
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
	writeBoard: function(board) {
		var playGame = this.startGame();
		playGame.boardState = board;
		// for (var i = 0; i < chars.length; i++) {
		// 	if ((/[a-z]/).test(chars[i])) {
		// 		chars[i] = "<b>" + chars[i] + "</b>"
		// 	}
		// }
		var board = '<table style="text-align:center;border-spacing:0pt;font-family:"Arial Unicode MS"; border-collapse:collapse; border-color: silver; border-style: solid; border-width: 0pt 0pt 0pt 0pt">';
		for (var i = 0; i < 8; i++) {
			var row = "<tr style='vertical-align:bottom;'><td style='vertical-align:middle;width:12pt'>" + (8 - i).toString() + "</td>"
			for (var j = 0; j < 8; j++) {
				if (((j % 2) + (i % 2)) % 2 == 1) {
					row = row + '<td style="width:40pt; height:40pt; border-collapse:collapse; border-color: silver; border-style: solid; border-width: 1pt 0pt 0pt 1pt"><span style="font-size:250%;">?' + (8 * i + j).toString() + '?</span></td>'
				} else {
					row = row + '<td style="background:silver;"><span style="font-size:250%;">?' + (8 * i + j).toString() + '?</span></td>'
				}
			}
			row = row + "</tr>"
			board = board + row;
		}
		// return chars
		// chars = chars.filter(function(u) {
		// 	return (/[a-z]/).test(u) || (/[A-Z]/).test(u) || u == "_" || u == "|";
		// })
		var ranks = playGame.boardState.ranks;
		for (var i = 1; i < 9; i++) {
			for (var j = 1; j < 9; j++) {
				var piece = ' ';
				if (ranks[i].squares[j].piece !== null)
					piece = ranks[i].squares[j].piece.notation;
				switch (piece) {
					case "R":
						piece = "&#9820";
						break;
					case "N":
						piece = "&#9822";
						break;
					case "B":
						piece = "&#9821";
						break;
					case "Q":
						piece = "&#9819";
						break;
					case "K":
						piece = "&#9818";
						break;
					case "P":
						piece = "&#9823";
						break;
					case "r":
						piece = "&#9814";
						break;
					case "n":
						piece = "&#9816";
						break;
					case "b":
						piece = "&#9815";
						break;
					case "q":
						piece = "&#9813";
						break;
					case "k":
						piece = "&#9812";
						break;
					case "p":
						piece = "&#9817";
						break;
				}
				board = board.replace("?" + (8 * (i - 1) + (j - 1)).toString() + "?", piece)

			}
		}
		board = board + "</table>"
			// chars[chars.lastIndexOf('1')] = 'a';
			// chars[chars.lastIndexOf('2')] = 'b';
			// chars[chars.lastIndexOf('3')] = 'c';
			// chars[chars.lastIndexOf('4')] = 'd';
			// chars[chars.lastIndexOf('5')] = 'e';
			// chars[chars.lastIndexOf('6')] = 'f';
			// chars[chars.lastIndexOf('7')] = 'g';
			// chars[chars.lastIndexOf('8')] = 'h';
			// chars[chars.indexOf('1') - 2] = "|<br>";
			// chars[chars.indexOf('2') - 2] = "|<br>";
			// chars[chars.indexOf('3') - 2] = "|<br>";
			// chars[chars.indexOf('4') - 2] = "|<br>";
			// chars[chars.indexOf('5') - 2] = "|<br>";
			// chars[chars.indexOf('6') - 2] = "|<br>";
			// chars[chars.indexOf('7') - 2] = "|<br>";
			// chars[chars.indexOf('8') - 2] = "|<br>";
			// chars[chars.indexOf('-') - 2] = "|<br>";
			// chars.unshift('<font face="courier">');
			// chars.push("|</font>");
		return board;
		// return chars.toString().replace(/,/g, '');
	}
};
