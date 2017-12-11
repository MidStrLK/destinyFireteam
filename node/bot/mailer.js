/**
 * Created by eds on 11.12.2017.
 */
'use strict';
const nodemailer = require('nodemailer');
const user       = require("../../manifest.json")['email_user'];
const password   = require("../../manifest.json")['email_password'];
const host       = require("../../manifest.json")['email_host'];
const port       = require("../../manifest.json")['email_port'];
const mailTo     = require("../../manifest.json")['email_mailto'];
const mailFrom   = require("../../manifest.json")['email_mailfrom'];
const subject    = require("../../manifest.json")['email_subject'];

exports.send = send;


function send(text) {

    if(!user || !password || !host || !port || !text || !mailTo) return;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
    nodemailer['createTestAccount']((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer['createTransport']({
            host: host,
            port: port,
            secure: false, // true for 465, false for other ports
            auth: {
                user: user, // generated ethereal user
                pass: password  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: mailFrom, // sender address
            to: mailTo, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: text // html body
        };

        // send mail with defined transport object
        transporter['sendMail'](mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info['messageId']);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer['getTestMessageUrl'](info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

}