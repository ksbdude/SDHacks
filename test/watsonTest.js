var watson = require("../watson.js");
watson.conversationTranslate("The fish", "es").then(function(res, rej) {
			console.log(res);
});
watson.parsingTranslate("caballero a a4").then(function(word){
  // console.log(word);
})
