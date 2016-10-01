var SparkPost = require('sparkpost');
var sp = new SparkPost('<YOUR API KEY>');
var chess = require("node-chess");


module.exports = {
  startGame: function(email){
    var game = chess.classic.engine();
    return game;
  },
  parseMove: function(command){
    var move = {
      start: {
        file: command.start.file,
        rank: command.start.rank
      },
      end: {
        file: command.end.file,
        rank: command.end.rank
      }
    }
    return move;
  },
  movePiece: function(game, move){
    game.movePiece({from : move.start, to: move.end});
    return boardArray;
  },
  parseBoard: function(boardString) {

    return boardArray;
  },

  writeBoard: function(game){
    return game.toString();
  }
};
