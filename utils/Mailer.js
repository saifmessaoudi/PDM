import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth : {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
          }
        });

        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to,
            subject,
            text,
        });

        console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.error(error);
    }
};

export default sendEmail;
