var topWords = ["top","upper"];
var bottomWords = ["bottom", "lower"];
var leftWords = ["left"];
var centerWords = ["center","middle"];
var rightWords = ["right"];

var sort = function(words, filter){
  return words.filter(function(word){
    for(var i =0; i < filter.length;i++)
      if(word.search(filter[i])!=-1)
        return true;
    return false;
  }).length;
};
module.exports = {
  parseSentence: function(sentence){
    sentence = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    var words = sentence.split(/[ ,]+/);
    var counts = {
      top: sort(words, topWords),
      bottom: sort(words, bottomWords),
      left: sort(words, leftWords),
      center: sort(words, centerWords),
      right: sort(words, rightWords)
    };
    var sum = counts.top + counts.bottom + counts.left + counts.center + counts.right;
    if(sentence.search(/[1-9]/)!= -1)
      return parseInt(sentence[sentence.search(/[1-9]/)])-1;
    else if(sum > 2 || sum < 1)
      return null;
    else if(counts.top == 1 && counts.left == 1)
      return 0;
    else if(counts.top == 1 && counts.center == 1)
      return 1;
    else if(counts.top == 1 && counts.right == 1)
      return 2;
    else if(counts.center == 1 && counts.left == 1)
      return 3;
    else if(counts.center == 1 && counts.right == 1)
      return 5;
    else if(counts.center == 1 && sum == 1)
      return 4;
    else if(counts.bottom == 1 && counts.left == 1)
      return 6;
    else if(counts.bottom == 1 && counts.center == 1)
      return 7;
    else if(counts.bottom == 1 && counts.right == 1)
      return 8;

      return null;
  }
};
