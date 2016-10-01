var NLP = require("../tictac/tictacNLP.js");
var expect = require("chai").expect;
describe("NLP", function(){
  describe("Parse Sentence", function(){
    it("should return a number", function(){
      var value = NLP.parseSentence("3");
      expect(value).to.equal(3);
    });
    it("should return null on 3 words", function(){
      var value = NLP.parseSentence("top center left");
      expect(value).to.equal(null);
    });
    it("should return 3 on center left", function(){
      var value = NLP.parseSentence("center left");
      expect(value).to.equal(3);
    });
    it("should return null on 1 words", function(){
      var value = NLP.parseSentence("top");
      expect(value).to.equal(null);
    });
    it("should return 4 on center", function(){
      var value = NLP.parseSentence("center");
      expect(value).to.equal(4);
    });
    it("should return null on crap", function(){
      var value = NLP.parseSentence("fff dsf e");
      expect(value).to.equal(null);
    });
  });
});
