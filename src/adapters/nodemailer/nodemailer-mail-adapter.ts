import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const { 
    SMTP_HOST, 
    SMTP_PORT, 
    SMTP_USER, 
    SMTP_PASSWORD 
} = process.env;

const transport = nodemailer.createTransport({
  host: SMTP_HOST || "smtp.mailtrap.io",
  port: Number(SMTP_PORT) || 2525,
  auth: {
    user: SMTP_USER || "",
    pass: SMTP_PASSWORD || ""
  }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
      await transport.sendMail({
        from: "equipe feedget <Elias@123.com.br>",
        to: "Elias Oliveira <eliascpr123@gmail.com",
        subject,
        html: body,
      });
    }
  }