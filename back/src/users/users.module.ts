import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, MailerService],
})
export class UsersModule {}
