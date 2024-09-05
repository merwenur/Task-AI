import nodemailer from 'nodemailer';
import fs from 'node:fs/promises';
import Handlebars from 'handlebars';
import dotenv from 'dotenv';

dotenv.config();

class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      ignoreTLS: process.env.MAIL_IGNORE_TLS === 'true',
      secure: process.env.MAIL_SECURE === 'true',
      requireTLS: process.env.MAIL_REQUIRE_TLS === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async send({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${process.env.MAIL_DEFAULT_NAME}" <${process.env.MAIL_DEFAULT_EMAIL}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}

export default MailerService;