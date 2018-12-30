const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend:true }));

app.post('/', (req, res) => {
nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'miller.brett.andrew@gmail.com',
               pass: process.env.EMAIL_PASSWORD
           }
       });
    let mailOptions = {
        from:"'Website' miller.brett.andrew@gmail.com",
        to: "miller.brett.andrew@gmail.com",
        replyTO:'miller.brett.andrew@gmail.com',
        subject:'New Message',
        text:req.body.message,
        html:htmlEmail
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          res.status(500).send(error);
          // return console.log(error);
        } else {
          res.sendStatus(200);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
   
      });
});


});

const PORT = process.env.PORT|| 3001;

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`)
})