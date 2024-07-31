import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comics } from './comics.entity';
import { Categories } from 'src/categories/categories.entity';
import data from '../utils/data.json';
import { Users } from 'src/users/users.entity'; 
import { UsersRepository } from 'src/users/users.repository'; 

@Injectable()
export class ComicsRepository {
  constructor(
    @InjectRepository(Comics)
    private productsRepository: Repository<Comics>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>, // Inyecta el repositorio de Users
  ) {}

  async addComics() {
    const categories = await this.categoriesRepository.find();
    const user = await this.usersRepository.findOne({ where: { id: '785647ec-27ca-4a52-b099-d2f6ef3da65f' } }); // Corrección aquí

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