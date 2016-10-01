
var recieveMessage = function(){}


app.post("/mewEmail", function(req,res){
  var isNew = NLP.isItNew(req.body.email);
  if(isNew){
    var data = NLP.parseChallenge(req.body.email) // Determine Game Type and Challengee
    data.sender = req.body.sender;
    if(data.person === null){
      data.person = randomPerson();
    }
  }
  else{
    NLP.continueGame
  }
})
