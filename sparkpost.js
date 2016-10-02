'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var SparkPost = require('sparkpost');
var sparky = new SparkPost('174c6d51643ab96c495a68a70a2eb2b4c31561e3');
var firebase = require("firebase");
var chess = new require("./chess/chess.js");
var tictac = new require("./tictac/tictac.js");
var NLP = require("./NLP.js");
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

app.get("/chess", function(req, res) {

	var history = [{
		from: {
			rank: 2,
			file: 4,
		},
		to: {
			rank: 3,
			file: 4
		}
	}, {
		from: {
			rank: 7,
			file: 4,
		},
		to: {
			rank: 6,
			file: 4
		}
	}]
	var game = chess.simGame(history)
	res.send(game.boardState.moveHistory)
})

function createChessGame(player1, player2) {
	firebase.database().ref('games').push({
		user1: player1,
		user2: player2,
		history: [],
		type: "chess"
	});
	sendEmail(player1, '<p>Welcome to Chess, Make your first move! </p>' + chess.writeBoard([]));
}

//createChessGame('kevinscottburns@gmail.com', 'zeidersjack@gmail.com')


function createtictactoe(player1, player2) {
	var board = tictac.startGame();
	firebase.database().ref('games').push({
		game: {
			board: board,
			user1: player1,
			user2: player2,
			type: "ticTac"
		}
	});
	sendEmail(player2, '<p>Welcome to TicTacToe, Make your first move! </p>' + tictac.printBoard(board));
}



// writeUserData('Kevin', 'Bacon'); //player1, player2

// var userData = firebase.database().ref('users/user1');
// userData.on('value', function(snapshot) {
//   sendUserData(snapshot.val());
// });

// function sendUserData(player1) {
//   sendEmail('Player1: ' + player1);
// }


function sendEmail(user, text) {
	var userRef = firebase.database().ref('users');
	var up = false;
	userRef.once('value', function(users) {
		users.forEach(function(subuser) {
			if (subuser.val() == user)
				up = true;
		});
		if (up == false) {
			userRef.push(user)
		}
	});
	// console.log("Sending email with text: " + text);
	sparky.transmissions.send({
		transmissionBody: {
			content: {
				from: 'yo@yo.quibblemail.com',
				subject: "Game",
				html: '<html><body>' + text + '</body></html>'
			},
			recipients: [{
				address: user
			}]
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

function findPerson() {
	return "zeidersjack@gmail.com";
}

function router(text, user) {
	var isNew = NLP.isItNew(text);
	if (isNew) {
		var data = NLP.parseChallenge(text, user);

		if (data.person === null) {
			data.person = findPerson();
		}
		if (data.game == "ticTacToe")
			createtictactoe(user, data.person);
		if (data.game == "chess")
			createChessGame(user, data.person);
	} else {
		if (NLP.isTicTac(text) !== null) {
			firebase.database().ref('games').orderByChild("game/type").equalTo("ticTac").once("value").then(function(games) {
				games.forEach(function(game) {
					if (game.val().game.user1 == user || game.val().game.user2 == user) {
						tictac.turn(text, game.val().game.board).then(function(res) {
							firebase.database().ref('games').child(game.key).child("game/board").update(res.game, function(err) {
								var html = tictac.printBoard(res.game);
								if (res.winner != null) {
									html = "<p> You lose <p>" + html;
									sendEmail(game.val().game.user1 == user ? game.val().game.user1 : game.val().game.user2, "<b> Congrats you won your game against " + game.val().game.user2 + "</b>");
								}
								sendEmail(game.val().game.user1 == user ? game.val().game.user2 : game.val().game.user1, html);
							});

						});

					}
				})
			})
		}
		if (NLP.isChess(text)) {
      firebase.database().ref('games').orderByChild("type").equalTo("chess").once("value").then(function(games) {
      	games.forEach(function(game) {
      		if (game.val().user1 == user || game.val().user2 == user) {
      			console.log("stuff");
            var history = "[]"
            if(game.val().hasOwnProperty('history'))
              history = game.val().history;
      			chess.handleInput(text, JSON.parse(history)).then(function(data) {
      				console.log("moreStuffs " + game.key + data.history);
      				firebase.database().ref('games').child(game.key).set({
      					history: JSON.stringify(data.history),
      					user1: game.val().user1,
      					user2: game.val().user2,
                type: "chess"
      				}).then(function(res){
                console.log(res)
                if (data.winner !== 0) {
        					sendEmail(game.val().user1 == user ? game.val().user1 : game.val().user2, "<b> Congrats you won your game against" + game.val().user2 + "</b>");
        					data.boardString = "<p> You LOST </p>" + data.boardString
        				}
        				sendEmail(game.val().user1 == user ? game.val().user2 : game.val().user1, data.boardString);
              }).catch(function(err){
                console.log(err)
              });

      			});
      		}
      	});
      });
		}
	}
}



var data = firebase.database().ref('raw-inbound');
data.on('child_added', function(snapshot) {
	snapshot.forEach(function(item) {
		console.log("ran")
		var text = item.val().msys.relay_message.content.text;
		var person = item.val().msys.relay_message.msg_from.replace(/(<([^>]+)>)/ig, "");
		router(text, person);
		console.log()
	})
	data.remove();
});



// var text = snapshot.val()[0].msys.relay_message.content.text;
// console.log("Got an email!   ", text);
// if(text.search('start game') != -1){
//   console.log('creating game');
// }

//this.firebase.child('raw-events').child(snapshot.key()).remove();

// app.listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
