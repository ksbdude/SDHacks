var startWords = [
	"begin", "start", "enter"
];
var moveWords = [
	"move", "piece", "from", "to"
];
var letToNum = function(letter) {
	return parseInt('a', 36) - 9;
}
module.exports = {
	isStart: function(sentence) {
		var starter = false;
		sentence = sentence.toLowerCase();
		for (var i = 0; i < startWords.length; i++) {
			if (sentence.search(startWords[i]) != -1) {
				starter = true;
				break;
			}
		}
		return starter;
	},
	findEmail: function(sentence) {
		var words = sentence.split("\\s+");
		var emails = words.filter(function(word) {
			if (word.search("@") && word.search(".")) {
				return true;
			}
			return false;
		});
		return emails[0];
	},
	isMove: function(sentence) {
		var mover = false;
		sentence = sentence.toLowerCase();
		for (var i = 0; i < moveWords.length; i++) {
			if (semtence.search(moveWords[i]) != -1) {
				mover = true;
				break;
			}
		}
		return mover;
	},
	parseMove: function(sentence) {
		var words = sentence.toLower().split("\\s+");
		var commands = words.filter(function(u) {
			if (u.length == 2)
				if (u.search(/[1-9]/) != -1)
					if (u.search(/[a,z]/ != -1))
						return true;
		});
		if (commands.length == 1) {
			return {
				start: null,
				end: {
					rank: letToNum(commands[0][0]),
					file: commands[0][1]
				}
			};
		}
		if (commands.length == 2) {
			for (var i = 0; i < words.length; i++) {
				if (word == 'to')
					for (var j = i; j < words.length; j++) {
						if (words[j] == commands[0])
							return {
								from: {
									rank: letToNum(commands[1][0]),
									file: commands[1][1]
								},
								to: {
									rank: letToNum(commands[0][0]),
									file: commands[0][1]
								}
							};
						if (words[j] == commands[1])
							return {
								from: {
									rank: letToNum(commands[0][0]),
									file: commands[0][1]
								},
								to: {
									rank: letToNum(commands[1][0]),
									file: commands[1][1]
								}
							};
					}
			}
		}
		return null;

	}
};
