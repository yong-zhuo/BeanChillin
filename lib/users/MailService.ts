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
            user: 'beanchillin3@gmail.com',
            pass: 'vaff dthx qczw dwfw',
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