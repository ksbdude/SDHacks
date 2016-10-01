var SparkPost = require('sparkpost');
var sp = new SparkPost('<YOUR API KEY>');
var chess = require("node-chess");
var NLP = require("./chessNLP.js")

module.exports = {

  handleInput: function(sentence,game){
    if(NLP.isStart(sentence))
      return this.startGame();
    if(NLP.isMove(sentence)){
      var command = NLP.parseMove(sentence);
      move = this.parseMove(command);
      console.log(move);
      if(this.verifyMove(move)){
        return this.movePiece(game,move)
      }
      else{
        return "Invalid Move";
      }
    }
  },
  verifyMove: function(move, game){
    if((move.hasOwnProperty("from") &&  move.hasOwnProperty("to"))){
      // var moves = game.boardState.ranks[move.start.rank].squares[move.start.file])
      return true;
    }
    return false;
  },
  startGame: function(){
    var game = chess.classic.engine();
    return game;
  },
  parseMove: function(command){
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
  movePiece: function(game, move){
    console.log(move)
    // console.log(game);
    game.movePiece(move);
    return game;
  }
  ,
  writeBoard: function(game){
    return game.toString();
  }
};
