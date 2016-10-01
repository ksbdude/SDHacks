var NLP = require("./tictacNLP.js");
var startGame = {
	bd: [9, 8, 7, 6, 5, 3, 4, 5, 6],
	currentTurn: "X"
};
module.exports = {
  turn: function(sentence,game){
      var result = this.placePiece(game.currentTurn,NLP.parseSentence(sentence),game);
      var win = this.checkWin(result.game);
      return {
        valid: result.success,
        winner: win,
        game: result.game
      }
  },
	startGame: startGame,
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
				game.currentTurn ='X';
			return {success: true, game: game};
		}
		return {success: false, game:game};
	},
  printBoard: function(game){
    console.log(game.bd);
    var boardString = game.bd.map(function(tile){
      if(tile == "X" || tile == "O")
        return tile;
      return " ";
    })
    console.log(boardString);
    boardString[1] = "|"+boardString[1]+'|'
    boardString[4] = "|"+boardString[4]+'|'
    boardString[7] = "|"+boardString[7]+'|'
    boardString[2] = boardString[2]+ "</br>-----</br>"
    boardString[5] = boardString[5]+ "</br>-----</br>"
    boardString.unshift('<font face="courier">');
    boardString.push("</font>");
    return boardString.toString().replace(/,/g, '');
  }
};
