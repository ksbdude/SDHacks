var expect = require("chai").expect;
var NLP = require("../chess/chessNLP.js");

describe("NLP", function(){
  describe("isStart", function(){
    it("should return true if start", function(){
      var sentence = "blah blah start";
      var value = NLP.isStart(sentence);
      expect(value).to.equal(true);
    });
    it("should return false in not start", function(){
      var sentence = "blah blah";
      var value = NLP.isStart(sentence);
      expect(value).to.equal(false);
    });
  });
});
