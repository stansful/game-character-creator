import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { ConfigurationTypes } from '../config/enums/configurationTypes.enum';
import { Configuration } from '../config/interfaces/configuration.interface';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService<Configuration>) {}

  private getTransport() {
    return createTransport({
      host: this.configService.get(ConfigurationTypes.SMTP_HOST),
      port: this.configService.get(ConfigurationTypes.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get(ConfigurationTypes.SMTP_USER),
        pass: this.configService.get(ConfigurationTypes.SMTP_PASSWORD),
      },
    });
  }

  public async sendTextMessage(
    sendMailTo: string,
    title: string,
    message: string,
  ) {
    const transport = this.getTransport();
    return transport.sendMail({
      from: this.configService.get(ConfigurationTypes.SMTP_USER),
      to: sendMailTo,
      subject: title,
      text: message,
    });
  }
}
