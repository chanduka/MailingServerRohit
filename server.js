var bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')
const nodemailer = require('nodemailer')
var app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(function(req,res,next){
  if(!req.body.toList||!req.body.subject||!req.body.text)
    res.status(400).send('Mising mail parameters');
  else
    next()
})


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'boardapp4@gmail.com',
    pass: "JimO'Yang"
  }
});



var acceptance;
// Sends Mail using nodemailer.
var sendMail = function(toList,_subject,_text,callback){
  var mailOptions = {
    from: 'boardapp4@gmail.com',
    to: toList,
    subject: _subject,
    text: _text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      acceptance = false 
      callback(acceptance) 
    } else {
      console.log('Email sent: ' + info.response);
      acceptance = true
      callback(acceptance) 
    }
  });
}

// Post request to send mail
app.post('/',function (req, res) {
  
  sendMail(req.body.toList,req.body.subject,req.body.text,function(acceptance){
    if(acceptance)
      res.send('Mail Sent!');
    else
      res.status(500).send('Sending Mail Failed');
  })  
})

// Initiates Service .
app.listen(3001,function(){
  console.log("Mail server started")
})
