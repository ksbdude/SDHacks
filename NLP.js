var startWords = ["start", "challenge", "being"]
module.exports = {
		parseChallenge: function(email, sender) {
			var data = {
				game: null,
				person: null
			}
			words = emails.split(/[ ,]+/);
			var adresses = words.filter(function(word) {
				if (word.search("@" != -1) && word != sender)
					return true;
				return false;
			});
			if (addresses.length > 0)
				data.person = adresses[0];
			for (var i = 0; i < words.length; i++) {
				if (words[i].search('tic') + words[i].search('tac') + word[i].search('toe') > -3)
					data.game = "tic tac toe";
				if (words[i] = 'chess') {
					data.game = "chess";
				}
			}
		}
		return data;
	},
  isItNew: function(email){
    	words = emails.split(/[ ,]+/).toLowerCase();
      for(var i = 0; i < words.length;i ++){
        for(var j = 0; j < startWords.length;j ++){
          if(words[i] == startWords[j])
            return true;
        }
      }
  }
};
