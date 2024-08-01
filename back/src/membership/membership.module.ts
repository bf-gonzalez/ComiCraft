import { Module } from '@nestjs/common';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { MembershipsRepository } from './membership.repository';
import { UsersRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './membership.entity';

@Module({
  controllers: [MembershipController],
  providers: [MembershipService, MembershipsRepository],
  imports: [TypeOrmModule.forFeature([Membership]), UsersModule],
})
export class MembershipModule {}
