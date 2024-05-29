const nodemailer = require('nodemailer');

export type mailMessage = {
    from: string;
    to: string;
    subject: string;
    text: string;
}

export async function sendMail(message: mailMessage) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: message.to,
        subject: message.subject,
        text: message.text,
    }

    transporter.sendMail(mailOptions, (err: any, data: any) => {
        if (err) {
            throw new Error("Failed to send email");
        } else {
            console.log("Email sent successfully");
            return true;
        }
    });
   
}