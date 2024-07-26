import { config as dotenvConfig } from 'dotenv';
import * as nodemailer from 'nodemailer';

dotenvConfig({ path: '.development.env' });

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
