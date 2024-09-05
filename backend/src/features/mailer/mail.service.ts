import MailerService from './mailer.service';
import path from 'path';

class MailService {
  private mailerService: MailerService;
  private appName: string;
  constructor() {
    this.mailerService = new MailerService();
    this.appName = process.env.MAIL_DEFAULT_NAME || 'YourAppName';
  }

  async userActivationEmail(mailData: { to: string; hash: string }): Promise<void> {
    const url = `${process.env.FRONTEND_URL}/auth/confirm-email?hash=${mailData.hash}`;

    await this.mailerService.send({
        to: mailData.to,
        subject: 'Confirm your email',
        templatePath: path.join(__dirname, 'templates', 'user-activation-email.hbs'),
        context: {
          url,
          title: 'Confirm your email',
          app_name: this.appName,
          text1: 'Thank you for signing up!',
          text2: 'Please confirm your email address to start using',
          text3: 'Click the button below to confirm your email address.',
          actionTitle: 'Confirm Email'
        },
      });
  }

  async forgotPassword(mailData: { to: string; hash: string; tokenExpires: number }): Promise<void> {
    const url = `${process.env.FRONTEND_URL}/auth/password-change?hash=${mailData.hash}&expires=${mailData.tokenExpires}`;

    await this.mailerService.send({
      to: mailData.to,
      subject: 'Reset your password',
      templatePath: path.join(__dirname, 'templates', 'reset-password.hbs'),
      context: {
        url,
        title: 'Reset your password',
        app_name: this.appName,
        text1: 'We received a request to reset your password.',
        text2: 'If you did not make this request, you can ignore this email.',
        text3: 'Otherwise, click the button below to reset your password.',
        actionTitle: 'Reset Password',
        text4: 'If you have any questions, feel free to contact our support team.'
      },
    });
  }

  async confirmNewEmail(mailData: { to: string; hash: string }): Promise<void> {
    const url = `${process.env.FRONTEND_URL}/auth/confirm-new-email?hash=${mailData.hash}`;

    await this.mailerService.send({
      to: mailData.to,
      subject: 'Confirm your new email',
      templatePath: path.join(__dirname, 'templates', 'confirm-new-email.hbs'),
      context: {
        url,
        title: 'Confirm your new email',
        app_name: this.appName,
        text1: `You have requested to change your email address.`,
        text2: 'Please confirm your new email address to complete the process.',
        text3: 'Click the button below to confirm your new email address.',
        actionTitle: 'Confirm New Email'
      },
    });
  }
}

export default MailService;