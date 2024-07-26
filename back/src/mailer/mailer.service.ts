import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'comicraft2024@gmail.com',
        pass: 'wkthcgnrndddhbrq',
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
