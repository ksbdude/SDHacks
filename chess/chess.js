var chess = require("node-chess");
var NLP = require("./chessNLP.js");
var watson = require("../watson.js");
var simGame = function(history) {
	console.log("?")
	var game = chess.classic.engine();
	if (history) {
		for (var i = 0; i < history.length; i++) {
			console.log(history[i] + "data")
			game.movePiece(history[i]);
		}
	}
	return game;
}
module.exports = {
	handleInput: function(sentence, history) {
		console.log("I hate life");
		if (history === 'a')
			history = [];
		var that = this;
		console.log("wtf")
		return watson.parsingTranslate(sentence).then(function(trans) {
			var game = simGame(history);
			sentence = trans;
			console.log("fire")
			if (NLP.isMove(sentence)) {
        console.log("move" + sentence)
				var command = NLP.parseMove(sentence);
				move = that.parseMove(command);
        console.log("stuffer")
				if (that.verifyMove(move)) {
          console.log("foot)")
					game.movePiece(move);
          console.log("post")
					var winner = 0;
					if (game.boardState.winnerIsWhite === false)
						winner = 1;
					if (game.boardState.winnerIsWhite === true)
						winner = 2;
					if (game.boardState.gameIsDrawn)
						winner = 3;
          console.log("more")
					return {
						history: game.boardState.moveHistory,
            validMove:true,
						winner: winner,
						boardString: that.writeBoard(game.boardState.moveHistory)
					};
				} else {
					return {
						history: game.boardState.moveHistory,
						validMove: false,
						winner: 0,
						boardString: that.writeBoard(that.game.boardState.moveHistory)
					};
				}
			}
		}).catch(function(err){
      return err;
    });
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
	simGame: function(history) {
		return simGame(history);
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
	writeBoard: function(history) {
		var game = simGame(history);
		var board = '<table style="text-align:center;border-spacing:0pt;font-family:"Arial Unicode MS"; border-collapse:collapse; border-color: silver; border-style: solid; border-width: 0pt 0pt 0pt 0pt">';
		for (var i = 7; i > -1; i--) {
			var row = "<tr style='vertical-align:bottom;'><td style='vertical-align:middle;width:12pt'>" + (8 - i).toString() + "</td>"
			for (var j = 0; j < 8; j++) {
				if (((j % 2) + (i % 2)) % 2 == 1) {
					row = row + '<td style="width:40pt; height:40pt; border-collapse:collapse; border-color: silver; border-style: solid; border-width: 1pt 0pt 0pt 1pt"><span style="font-size:250%;">?' + (8 * i + j).toString() + '?</span></td>';
				} else {
					row = row + '<td style="background:silver;"><span style="font-size:250%;">?' + (8 * i + j).toString() + '?</span></td>';
				}
			}
			row = row + "</tr>";
			board = board + row;
		}
		var ranks = game.boardState.ranks;
		for (var i = 1; i < 9; i++) {
			for (var j = 1; j < 9; j++) {
				var piece = ' ';
				if (ranks[i].squares[j].piece !== null)
					piece = ranks[i].squares[j].piece.notation;
				switch (piece) {
					case "R":
						piece = "&#9820;";
						break;
					case "N":
						piece = "&#9822;";
						break;
					case "B":
						piece = "&#9821;";
						break;
					case "Q":
						piece = "&#9819;";
						break;
					case "K":
						piece = "&#9818;";
						break;
					case "P":
						piece = "&#9823;";
						break;
					case "r":
						piece = "&#9814;";
						break;
					case "n":
						piece = "&#9816;";
						break;
					case "b":
						piece = "&#9815;";
						break;
					case "q":
						piece = "&#9813;";
						break;
					case "k":
						piece = "&#9812;";
						break;
					case "p":
						piece = "&#9817;";
						break;
				}
				board = board.replace("?" + (8 * (i - 1) + (j - 1)).toString() + "?", piece)
				}
		}
		board = board + "<tr> <td></td> <td>A</td>  <td>B</td>  <td>C</td>  <td>D</td>  <td>E</td>  <td>F</td>  <td>G</td>  <td>H</td></tr>"
		board = board + "</table>";
		return board;
	}
};
