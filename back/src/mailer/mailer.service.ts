import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import * as nodemailer from 'nodemailer';

dotenvConfig({ path: '.development.env' });

@Injectable()
export class MailerService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.AIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'comicraft2024',
      to,
      subject,
      text,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
