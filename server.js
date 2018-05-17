require('dotenv').config();
const express = require('express');
const {PORT} = require('./config');
const app = express();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ammunitiontestemail@gmail.com',
    pass: 'cloudatlas1'
  }
});

const mailOptions = {
  from: '"Ammunition" <ammunitiontestemail@email.com>', // sender address
  to: 'peteryu@gmail.com', // list of receivers
  subject: 'forreal', // Subject line
  text: 'Hello guys',
  html: '<p>Your html here</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
  if(err)
    console.log(err)
  else
    console.log(info);
});

app.use( '/', express.static(__dirname + '/public') );
app.use( '/node_modules', express.static(__dirname + '/node_modules') );

app.listen(PORT, function() {
  console.log(`The server at port ${PORT} is listening.`);
});