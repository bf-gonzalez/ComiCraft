import { Module, OnModuleInit } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ComicsService } from 'src/comics/comics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Comics } from 'src/comics/comics.entity';
import { ComicsRepository } from 'src/comics/comics.repository';
import { Users } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { MailerService } from 'src/mailer/mailer.service';
import { CategoriesRepository } from './category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Comics, Users])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    ComicsService,
    ComicsRepository,
    UsersRepository,
    MailerService,
  ],
})
export class CategoriesModule {
  // constructor(    implements OnModuleInit
  //   private readonly categoriesService: CategoriesService,
  //   private readonly comicsService: ComicsService,
  // ) {}
  // async onModuleInit() {
  //   console.log('categorias y productos agregados');
  //   await this.categoriesService.addCategories();
  //   await this.comicsService.addComics();
  // }
}
