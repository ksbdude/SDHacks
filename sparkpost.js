var SparkPost = require('sparkpost');
var sparky = new SparkPost('174c6d51643ab96c495a68a70a2eb2b4c31561e3');
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyD6Xsy4rDSHLL1x6tYSjwlnky6mGz0WZGk",
    authDomain: "emailgamer-be1d5.firebaseapp.com",
    databaseURL: "https://emailgamer-be1d5.firebaseio.com",
    storageBucket: "emailgamer-be1d5.appspot.com",
    messagingSenderId: "845155021781"
};
firebase.initializeApp(config);

// myFirebaseRef.child("text").on("value", function(snapshot) {
//   alert(snapshot.val());  // Alerts "San Francisco"
// });

// var commentsRef = firebase.database().ref('test');
// commentsRef.on('child_added', function(data) {
//   console.log("data added :)")
//   sendEmail(snapshot.val());
// });

// firebase.database().ref('users/1').set({
//     user: 'Hello'
// });

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


writeUserData('Kevin', 'Bacon');
var starCountRef = firebase.database().ref('users/user1');
starCountRef.on('value', function(snapshot) {
  sendUserData(snapshot.val());
});

function sendUserData(player1) {
  sendEmail('Player1: ' + player1);
}


function sendEmail(text){
  console.log("Sending email..");
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
console.log('Done :)');
