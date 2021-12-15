const nodemailer = require('nodemailer');
const mailer = require('../config/').mailerConfig;

//Criando conexão SMTP
const mailConfig = {
    host: mailer.smtp.host,
    port: mailer.smtp.port,
    service: mailer.smtp.service,
    secure: mailer.smtp.secure,
    tls: {
        ciphers: mailer.smtp.tls.ciphers,
        rejectUnauthorized: mailer.smtp.tls.rejectUnauthorized
    },
    auth: {
        user: mailer.smtp.auth.user,
        pass: mailer.smtp.auth.pass,
    }
};

const transport = nodemailer.createTransport(mailConfig);

exports.sendEmails = async (email, title, output, { attachments }) => {

    let message = {
        from: mailer.smtp.auth.user,
        to: email,
        replyTo: process.env.REPLYTO_ADDRESS,
        subject: title,
        html: output,
        attachments: attachments,
        date: Date.now()
    };

    //Envia o email
    await transport.sendMail(message, function (err, info) {
        if (err) { console.log(err) }
        else { console.log(info); }
    });
};