'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var SparkPost = require('sparkpost');
var sparky = new SparkPost('174c6d51643ab96c495a68a70a2eb2b4c31561e3');
var firebase = require("firebase");
var chess = new require("./chess/chess.js");
var tictac = new require("./tictac/tictac.js");

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World');
});

var config = {
    apiKey: "AIzaSyD6Xsy4rDSHLL1x6tYSjwlnky6mGz0WZGk",
    authDomain: "emailgamer-be1d5.firebaseapp.com",
    databaseURL: "https://emailgamer-be1d5.firebaseio.com",
    storageBucket: "emailgamer-be1d5.appspot.com",
    messagingSenderId: "845155021781"
};
firebase.initializeApp(config);

// var getUserValue = firebase.database().ref('users/1/user');
// getUserValue.on('value', function(snapshot) {
//   console.log(snapshot.val);
//   //sendEmail(snapshot.val);
// });

// function writeUserData(player1, player2) {
//   firebase.database().ref('users/').set({
//     user1: player1,
//     user2: player2
// });
// }

// function addGameNum(){
//   var getUserValue = firebase.database().ref('gamenum');
//   getUserValue.on('value', function(snapshot) {
//   console.log(snapshot.val);
//   firebase.database.ref('gamenum').set(snapshot.val + 1);
//   });
// }

function createChessGame(player1, player2){
  var board = chess.startGame();
  firebase.database().ref('games').set({
    user1: player1,
    user2: player2,
    game: board
  });
  sendEmail(player1,'<p>Welcome to Chess, Make your first move! </p>' + board.writeBoard());
}

//createChessGame('kevinscottburns@gmail.com', 'zeidersjack@gmail.com')


function createtictactoe(player1, player2) {
  var board = tictac.startGame();
  firebase.database().ref('games').set({
    user1: player1,
    user2: player2,
    game: board
  });
  sendEmail(player1,'<p>Welcome to TicTacToe, Make your first move! </p>' + tictac.printBoard(board));
}

createtictactoe('kevinscottburns@gmail.com', 'zeidersjack@gmail.com')


//writeUserData('Kevin', 'Bacon'); //player1, player2

// var userData = firebase.database().ref('users/user1');
// userData.on('value', function(snapshot) {
//   sendUserData(snapshot.val());
// });

// function sendUserData(player1) {
//   sendEmail('Player1: ' + player1);
// }


function sendEmail(user, text){
  console.log("Sending email with text: " + text);
  sparky.transmissions.send({
  transmissionBody: {
    content: {
      from: user,
      subject: 'Game :)',
      html:'<html><body>' + text + '</body></html>'
    },
    recipients: [
      {address: 'kevinscottburns@gmail.com'}
    ]
  }
}, function(err, res) {
  if (err) {
    console.log('ERROR IT DIDNT WORK :(');
    console.log(err);
  } else {
    console.log('Email Sent!!! :)');
  }
});
}


var processRelayMessage = function(data) {
  console.log('Email received from: ', data.msg_from);
};

app.post('/incoming', function(req, res) {
  res.sendStatus(200);
  var batch = req.body;
  for(var i=0; i<batch.length; i++) {
    //processRelayMessage(batch[i].msys.relay_message);
    console.log('Got a MSG!!!');
  }
});

// app.listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
