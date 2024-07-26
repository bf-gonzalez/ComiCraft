import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComicsController } from './comics/comics.controller';
import { ComicsModule } from './comics/comics.module';
import { ComicsService } from './comics/comics.service';
import { UsersModule } from './users/users.module';
import { MembershipModule } from './membership/membership.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),
    ComicsModule, UsersModule, MembershipModule, CategoriesModule],
  controllers: [AppController, ComicsController],
  providers: [AppService, ComicsService],
})
export class AppModule {}
