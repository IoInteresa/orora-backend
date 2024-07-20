import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const { SMTP_USER, SMTP_PASSWORD } = process.env;

class MailManager {
  public transporter: nodemailer.Transporter;

  constructor() {
    const transportOptions: SMTPTransport.Options = {
      service: 'gmail',
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    };

    this.transporter = nodemailer.createTransport(transportOptions);
  }

  async send(email: string, code: number) {
    const response = await this.transporter.sendMail({
      from: `"Your App" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Confirm Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2>Welcome to Your App!</h2>
          <p>Thank you for registering. To complete your registration, please use the following confirmation code:</p>
          <p style="font-size: 20px; font-weight: bold;">${code}</p>
          <p>If you did not request this code, you can safely ignore this email.</p>
          <p>Best Regards,<br>Your Orora Team</p>
        </div>
      `,
    });

    if (!response.messageId) {
      return false;
    }

    return true;
  }
}

export default MailManager;
