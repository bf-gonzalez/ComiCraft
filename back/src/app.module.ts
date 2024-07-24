import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComicsController } from './comics/comics.controller';
import { ComicsModule } from './comics/comics.module';
import { ComicsService } from './comics/comics.service';

@Module({
  imports: [ComicsModule],
  controllers: [AppController, ComicsController],
  providers: [AppService, ComicsService],
})
export class AppModule {}
