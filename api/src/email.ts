import nodemailer from 'nodemailer';
import { enviroment } from './utils';
import { Email } from './interfaces';

export const transporter = nodemailer.createTransport({
    host: enviroment.EMAIL_HOST,
    port: Number(enviroment.EMAIL_PORT),
    secure: enviroment.EMAIL_PORT === 465, // true for port 465, false for other ports
    auth: {
        user: enviroment.EMAIL_USER,
        pass: enviroment.EMAIL_PASS
    }
});

export const sendEmail = async (email: Email) => {
    const info = await transporter.sendMail({
        from: email.from || enviroment.EMAIL_FROM,
        to: email.to,
        subject: email.subject,
        html: email.html,
        attachments: email.attachments
    });
    return info;
};
