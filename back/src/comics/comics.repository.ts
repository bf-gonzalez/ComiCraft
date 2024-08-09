import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comics } from './comics.entity';
import { Not, Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { Categories } from 'src/categories/categories.entity';
import data from '../utils/data.json';

@Injectable()
export class ComicsRepository {
  constructor(
    @InjectRepository(Comics) private comicsRepository: Repository<Comics>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getAllComics(page: number, limit: number) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      return await this.comicsRepository.find({
        skip: skip,
        take: limit,
      });
    } else {
      return await this.comicsRepository.find();
    }
  }

  async getInactiveComics(page?: number, limit?: number) {
    const skip = (page - 1) * limit;
    try {
      const comics = await this.comicsRepository.find({
        skip: skip,
        take: limit,
      });
      if (comics.length < 1) {
        throw new NotFoundException('No se encontraron usuarios');
      }
      const inactiveComics = comics.filter((comic) => !comic.isActive);
      return inactiveComics;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async getActiveComics(page?: number, limit?: number) {
    const skip = (page - 1) * limit;
    try {
      const comics = await this.comicsRepository.find({
        skip: skip,
        take: limit,
      });
      if (comics.length < 1) {
        throw new NotFoundException('No se encontraron usuarios');
      }
      const activeComics = comics.filter((comic) => comic.isActive);
      return activeComics;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async getComicById(id: string) {
    const comic = await this.comicsRepository.findOne({
      where: { id },
      relations: {
        comment: true,
      },
    });
    if (!comic) {
      return `El comic con id ${id} no se encuentra`;
    }

    return comic;
  }

  async getComicByTitle(title: string) {
    if (!title) {
      return `El comic con el ${title} que busca no existe `;
    }
    return await this.comicsRepository.findOneBy({ title });
  }

  async createComic(id: string, comic: Partial<Comics>) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      return `Usuario con id ${id} no encontrado`;
    }

    let category = await this.categoriesRepository.findOneBy({
      name: comic.categoryname,
    });
    if (!category) {
      category = this.categoriesRepository.create({ name: comic.categoryname });
      await this.categoriesRepository.save(category);
    }
    const newComic = this.comicsRepository.create({
      ...comic,
      user,
      category,
    });

    const savedComic = await this.comicsRepository.save(newComic);

    return {
      title: savedComic.title,
      description: savedComic.description,
      username: savedComic.author,
      data_post: savedComic.data_post,
      nombrecarpeta: savedComic.folderName, // Assuming this field exists in the Comic entity
      user: {
        id: user.id,
      },
      category: {
        id: savedComic.category.id,
        name: savedComic.category.name, // Assuming `name` is a property in `Categories`
      },
    };
  }

  async updateComic(id: string, comic: Comics) {
    await this.comicsRepository.update(id, comic);
    const updatedComic = await this.comicsRepository.findOneBy({ id });

    return updatedComic;
  }

  async activateComics(id: string) {
    try {
      const comic = await this.comicsRepository.findOneBy({ id });
      if (!comic) {
        throw new NotFoundException(`No se encontró comic con el id: ${id}`);
      }
      await this.comicsRepository
        .createQueryBuilder()
        .update(Comics)
        .set({
          isActive: !comic.isActive,
        })
        .where('id = :id', { id })
        .execute();
      if (!comic.isActive) {
        return { message: `Comic con el id ${id} activado con éxito` };
      } else {
        return { message: `Comic con el id ${id} desactivado con éxito` };
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadGatewayException();
    }
  }

  async deleteComic(id: string) {
    const comic = await this.comicsRepository.findOneBy({ id });

    if (!comic) return `El comic ${id} no existe`;

    this.comicsRepository.delete(comic.id);

    const { title } = comic;

    return `El Comic ${title} fue eliminado`;
  }

  async addComics(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    for (const element of data) {
      const categoryExists = await this.categoriesRepository.findOne({
        where: { name: element.category },
      });
      if (!categoryExists) {
        const newCategory = this.categoriesRepository.create({
          name: element.category,
        });
        await this.categoriesRepository.save(newCategory);
      }
    }

    const categories = await this.categoriesRepository.find();

    for (const element of data) {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      if (!category) {
        throw new NotFoundException(
          `Categoría ${element.category} no encontrada`,
        );
      }

      const comic = new Comics();
      comic.title = element.title;
      comic.author = element.author;
      comic.description = element.description;
      comic.folderName = element.url;
      comic.category = category;
      comic.data_post = new Date(element.date);
      comic.user = user;

      await this.comicsRepository
        .createQueryBuilder()
        .insert()
        .into(Comics)
        .values(comic)
        .orUpdate(['description', 'folderName'], ['title'])
        .execute();
    }
    return 'Comics agregados';
  }
}
