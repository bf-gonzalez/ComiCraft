import { Module } from '@nestjs/common';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';
import { ComicsRepository } from './comics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comics } from './comics.entity';
import { Users } from 'src/users/users.entity';
import { Comments } from 'src/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comics, Users, Comments])],
  controllers: [ComicsController],
  providers: [ComicsService,ComicsRepository]
})
export class ComicsModule {}
