import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { GetUserDto } from 'src/users/dto/get-user.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMessage(user: {
    email: string;
    name: string;
  }): Promise<{ success: boolean }> {
    const code = this.generaterCode();
    await this.mailService
      .sendMail({
        to: user.email,
        from: '"Support Team" samgar.job@gmail.com', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './message', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.name,
          code,
        },
      })
      .catch((err) => console.log(err));

    return {
      success: true,
    };
  }

  generaterCode(): string {
    const code: string = Math.floor(100000 + Math.random() * 999999).toString();
    return code;
  }
}
