var chessGame = require("../chess/chess.js");
describe("Sample Game", function() {
	it("should print games", function() {
		var game = chessGame.handleInput("start game", "");
		var moves = ["d2 to d4", "g7 to g5", "d4 to d5", "g5 to g4", "d5 to d6", "g4 to g3", "d6 to e7", "g3 to f2", "a2 to a3", "f2 to e2" ];
    for(var i = 0; i < moves.length; i++){
      data = chessGame.handleInput(moves[i],game);
      game = data.game;
      console.log(data.validMove);
    }
	});
});
