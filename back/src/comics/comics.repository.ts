import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comics } from './comics.entity';
import { Categories } from 'src/categories/categories.entity';
import data from '../utils/data.json';
import { Users } from 'src/users/users.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ComicsRepository {
  constructor(
    @InjectRepository(Comics)
    private productsRepository: Repository<Comics>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async addComics(userId: string) {
    const categories = await this.categoriesRepository.find();
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const comic = new Comics();
      comic.title = element.title;
      comic.author = element.author;
      comic.description = element.description;
      comic.url = element.url;
      comic.category = category;
      comic.date = element.date;
      comic.user = user;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Comics)
        .values(comic)
        .orUpdate(['description', 'url'], ['title'])
        .execute();
    });
    return 'Comics agregados';
  }
}