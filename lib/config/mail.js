// lib/mail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `" CurioBlog" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
