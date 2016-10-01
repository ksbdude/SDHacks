var watson = require('watson-developer-cloud');
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
var Promise = require('promise');

var language_translator = new LanguageTranslatorV2({
	"url": "https://gateway.watsonplatform.net/language-translator/api",
	"password": "Mh1AXElJAH3P",
	"username": "d5427df3-c6fe-47ae-9aca-41e2e57acea5"
});
var identify = function(sentence) {
	return new Promise(function(resolve, reject) {
		language_translator.identify({
				text: sentence
			},
			function(err, language) {
				if (err) {
					reject(err);
					console.log('error:', err);
				} else {
					resolve(language.languages[0].language);
				};
			});
	});
};
var translate = function(sentence, source, target) {
	return new Promise(function(resolve, reject) {
		language_translator.translate({
				text: sentence,
				source: source,
				target: target
			},
			function(err, translation) {
				if (err) {
          reject(err);
				} else {
					resolve(translation);
				}
			});
	});
};
module.exports = {
	parsingTranslate: function(sentence) {
		return identify(sentence).then(function(source) {
      if(source!= 'en')
        return translate(sentence,source, "en").then(function(english){
          return english.translations[0].translation;
      });
      return sentence;
		}).catch(function(err) {
			console.log(err)
      return err;
		});
	},
	conversationTranslate: function(sentence, target) {
		return identify(sentence).then(function(self) {
			return translate(sentence, self, target).then(function(trans){
        return trans.translations[0].translation;
      });
		}).catch(function(rej) {
			return rej;
		});
	}
}
