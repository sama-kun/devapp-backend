import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

console.log(join(__dirname, 'templates'));

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', //smtp.sendgrid.net
        port: 465, //465 or tried 25567
        // secure: false, //tried false
        // ignoreTLS: true, // tired true
        auth: {
          user: 'samgar.job@gmail.com',
          pass: 'Aisha-2003',
        },
      },
      template: {
        adapter: new HandlebarsAdapter(),
        dir: join(__dirname, 'templates'),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [EmailService],
})
export class EmailModule {}
