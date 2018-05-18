require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const {PORT} = require('./config');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');

app.use( '/', express.static(__dirname + '/public') );
app.use( '/node_modules', express.static(__dirname + '/node_modules') );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/direct', (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ammunitiontestemail@gmail.com',
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`, // sender address
    to: 'peteryu@gmail.com', // list of receivers
    subject: 'Form Submission', // Subject line
    html:        
    `<p><b>Full name:</b> ${req.body.name}</p> 
    <p><b>Email Address:</b> ${req.body.email}</p> 
    <p><b>Message:</b> ${req.body.message}</p> `
  };
  const receipt = {
    from: `"Ammunition Agency" <ammunitiontestemail@gmail.com>`,
    to: req.body.email,
    subject: 'Form Submission Receipt', 
    html:        
    `<p>Form contents below have been submitted.</p>
    <p><b>Full name:</b> ${req.body.name}</p> 
    <p><b>Email Address:</b> ${req.body.email}</p> 
    <p><b>Message:</b> ${req.body.message}</p> `
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
      console.log(err)
    } else {
      transporter.sendMail(receipt, function (err, info) {
        if(err) {
          console.log(err)
        } else {
          console.log(info);
        }
      });
      console.log(info);
    }
  });
  res.status(200).send('Your form has been submitted!');
});

app.listen(PORT, function() {
  console.log(`The server at port ${PORT} is listening.`);
});