'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var SparkPost = require('sparkpost');
var sparky = new SparkPost('174c6d51643ab96c495a68a70a2eb2b4c31561e3');
var firebase = require("firebase");

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World');
});

sparky.inboundDomains.all(function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our client library!');
  }
});

sparky.transmissions.all(function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});

var config = {
    apiKey: "AIzaSyD6Xsy4rDSHLL1x6tYSjwlnky6mGz0WZGk",
    authDomain: "emailgamer-be1d5.firebaseapp.com",
    databaseURL: "https://emailgamer-be1d5.firebaseio.com",
    storageBucket: "emailgamer-be1d5.appspot.com",
    messagingSenderId: "845155021781"
};
firebase.initializeApp(config);

var getUserValue = firebase.database().ref('users/1/user');
getUserValue.on('value', function(snapshot) {
  console.log(snapshot.val);
  //sendEmail(snapshot.val);
});

function writeUserData(player1, player2) {
  firebase.database().ref('users/').set({
    user1: player1,
    user2: player2
});
}

function addGameNum(){
  var getUserValue = firebase.database().ref('gamenum');
  getUserValue.on('value', function(snapshot) {
  console.log(snapshot.val);
  firebase.database.ref('gamenum').set(snapshot.val + 1);
  });
}


writeUserData('Kevin', 'Bacon'); //player1, player2

var userData = firebase.database().ref('users/user1');
userData.on('value', function(snapshot) {
  sendUserData(snapshot.val());
});

function sendUserData(player1) {
  sendEmail('Player1: ' + player1);
}


function sendEmail(text){
  console.log("Sending email...");
  sparky.transmissions.send({
  transmissionBody: {
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Oh hey!',
      html:'<html><body><p>' + text + '</p></body></html>'
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
  console.log('Searching for: ', data.content.subject);
  // We start by using the Giphy API to search for gifs based on the subject
  
};

// /**
//   Defines the endpoint that will accept batches from SparkPost
// **/
// app.post('/incoming', function(req, res) {
//   // SparkPost expects a 200 response, send it before processing data
//   // If you are storing data, do it before returning a response
//   res.sendStatus(200);
//   var batch = req.body;
//   // A batch could contain up to 10,000 events
//   for(var i=0; i<batch.length; i++) {
//     // For this application, we can safely assume the batch will only
//     // contain relay_message events
//     processRelayMessage(batch[i].msys.relay_message);
//   }
// });

// app.listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });



console.log('Done :)');
