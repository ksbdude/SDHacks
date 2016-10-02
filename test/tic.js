var NLP = require("../tictac/tictacNLP.js");
var expect = require("chai").expect;
describe("NLP", function(){
  describe("Parse Sentence", function(){
    it("should return a number", function(){
      var value = NLP.parseSentence("3");
      expect(value).to.equal(2);
    });
    it("should return null on 3 words", function(){
      var value = NLP.parseSentence("top center left");
      expect(value).to.equal(null);
    });
    it("should return 0 on top left", function(){
      var value = NLP.parseSentence("center left");
      expect(value).to.equal(3);
    });
    it("should return 1 on center top", function(){
      var value = NLP.parseSentence("center left");
      expect(value).to.equal(3);
    });
    it("should return 2 on top ight", function(){
      var value = NLP.parseSentence("center left");
      expect(value).to.equal(3);
    });
    it("should return 3 on center left", function(){
      var value = NLP.parseSentence("center left");
      expect(value).to.equal(3);
    });
    it("should return 4 on center", function(){
      var value = NLP.parseSentence("center");
      expect(value).to.equal(4);
    });
    it("should return 5 on center right", function(){
      var value = NLP.parseSentence("center right");
      expect(value).to.equal(5);
    });
    it("should return 6 on bottom left", function(){
      var value = NLP.parseSentence("bottom left");
      expect(value).to.equal(6);
    });
    it("should return 7 on bottom center", function(){
      var value = NLP.parseSentence("bottom center");
      expect(value).to.equal(7);
    });
    it("should return 8 on bottom right", function(){
      var value = NLP.parseSentence("bottom right");
      expect(value).to.equal(8);
    });
    it("should return null on 1 words", function(){
      var value = NLP.parseSentence("top");
      expect(value).to.equal(null);
    });

    it("should return null on crap", function(){
      var value = NLP.parseSentence("fff dsf e");
      expect(value).to.equal(null);
    });
  });
});
