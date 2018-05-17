require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const {PORT} = require('./config');
const app = express();
const nodemailer = require('nodemailer');

app.use( '/', express.static(__dirname + '/public') );
app.use( '/node_modules', express.static(__dirname + '/node_modules') );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/direct', (req, res) => {
  console.log(req.body.name, "req.body")
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ammunitiontestemail@gmail.com',
      pass: 'cloudatlas1'
    }
  });
  
  const mailOptions = {
    from: `"${req.body.name}" <rahxephon@gmail.com>`, // sender address
    to: 'peteryu@gmail.com', // list of receivers
    subject: 'Form Submission', // Subject line
    text: req.body.comment
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
});

app.listen(PORT, function() {
  console.log(`The server at port ${PORT} is listening.`);
});