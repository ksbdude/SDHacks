var expect = require("chai").expect;
var NLP = require("../chess/chessNLP.js");

describe("NLP", function() {
	describe("isStart", function() {
		it("should return true if start", function() {
			var sentence = "blah blah start";
			var value = NLP.isStart(sentence);
			expect(value).to.equal(true);
		});
		it("should return false in not start", function() {
			var sentence = "blah blah";
			var value = NLP.isStart(sentence);
			expect(value).to.equal(false);
		});
	});
	describe("findEmail", function() {
		it("should return email", function() {
			var sentence = "blah blahet@gmail.com";
			var value = NLP.findEmail(sentence);
			expect(value).to.equal("blahet@gmail.com");
		});
		it("should return null if no email", function() {
			var sentence = "blah blahetgmail.com";
			var value = NLP.findEmail(sentence);
			expect(value).to.equal(null);
		});
	});
	describe("isMove", function() {
		it("should return true if move", function() {
			var sentence = "balh blah move";
			var value = NLP.isMove(sentence);
			expect(value).to.equal(true);
		});
		it("should return false if not move", function() {
			var sentence = "balh blah sove";
			var value = NLP.isMove(sentence);
			expect(value).to.equal(false);
		});
	});
	describe("parseMove", function() { //   it("should return as end if one", function(){
		//     var sentence = "balh blah move a3";
		//     var value = NLP.parseMove(sentence);
		//     console.log(value);
		//     expect(value).to.deep.equal({
		//       start: null,
		//       end: {
		//         file: 1,
		//         rank: 3
		//       }
		//     });
		//   });
		it("should return one after 'to' as end #1", function() {
			var sentence = "move a3 to b4";
			var value = NLP.parseMove(sentence);
			expect(value).to.deep.equal({
				start: {
					file: 1,
					rank: 3
				},
				end: {
					file: 2,
					rank: 4
				}
			});
		});
		it("should return one after 'to' as end #2", function() {
			var sentence = "movet to c5 from a2";
			var value = NLP.parseMove(sentence);
			expect(value).to.deep.equal({
				start: {
					file: 1,
					rank: 2
				},
				end: {
					file: 3,
					rank: 5
				}
			});
		});
		it("should return null if 0 commands", function() {
			var sentence = "balh blah move";
			var value = NLP.parseMove(sentence);
			expect(value).to.equal(null);
		});
		it("should return null if 3 commands", function() {
			var sentence = "a3 b3 c3";
			var value = NLP.parseMove(sentence);
			expect(value).to.equal(null);
		});
	});
});
