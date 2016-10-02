var startWords = ["start", "challenge", "begin", "play"];
var ticTacWords = ["top", "upper", "bottom", "lower", "left", "center", "middle", "right"];
var ticNLP = require('./tictac/tictacNLP.js');
var chessNLP = require("./chess/chessNLP.js");
module.exports = {
	parseChallenge: function(email, sender) {
		var data = {
			game: null,
			person: null
		}
		words = email.split(/[ ,]+/);
		console.log(words)
		var addresses = words.filter(function(word) {
			if (word.search("@") != -1 && word != sender)
				return true;
			return false;
			console.log(addresses)
		});
		if (addresses.length > 0)
			data.person = addresses[0].replace(/\s+/, "");
		for (var i = 0; i < words.length; i++) {
			if (words[i].search('tic') + words[i].search('tac') + words[i].search('toe') > -2)
				data.game = "ticTacToe";
			if (words[i] == 'chess') {
				data.game = "chess";
			}
		}
		return data;
	},
	isItNew: function(email) {
		words = email.toLowerCase().split(/[ ,]+/);
		for (var i = 0; i < words.length; i++) {
			for (var j = 0; j < startWords.length; j++) {
				if (words[i] == startWords[j])
					return true;
			}
		}
		return false
	},
	isTicTac: function(email) {
		if (ticNLP.parseSentence(email)) {
			return ticNLP.parseSentence(email);
		}
	},
	isChess: function(email) {
		return chessNLP.isMove(email);
	}
};
