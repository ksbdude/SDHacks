var express = require("express")
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var chessGame = require("./chess/chess.js");
var chessNLP = require("./chess/chessNLP.js");
var game = chessGame.handleInput("start game", "");
app.post("/", function(req,res){
  var sent = req.body.sent;
  // console.log(game);
  data = chessGame.handleInput(sent,game);
  game = data.game;
  res.send(data.game.toString());
})
app.listen(3000, function(){
  console.log("started server")
});
