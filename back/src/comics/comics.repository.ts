
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comics } from './comics.entity';
import { Categories } from 'src/categories/categories.entity';
import data from '../utils/data.json';
import { Users } from 'src/users/users.entity'; 

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
      throw new Error('Usuario no encontrado');
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

    async getAllComics(){
        return await this.comicsRepository.find()
    }

    async getComicById(id: string){
        const comic = await this.comicsRepository.findOneBy({id})
        if(!comic){
            return `El comic con id ${id} no se encuentra`;
        }

        return comic
    }

    async getComicByTitle(title: string){
        if(!title){
            return `El comic con el ${title} que busca no existe `
        }
        return await this.comicsRepository.findOneBy({title})
    }

    async createComic(id: string, comic: Partial<Comics> ){
        const user = await this.usersRepository.findOneBy({id})
        if(!user){
            return `Usuario con id ${id} no encontrado`
        }

       /* const category = await this.categoriesRepository.findOneBy({ name: comicData.category });
        if (!category) {
         category = this.categoriesRepository.create({ name: comicData.category });
         await this.categoriesRepository.save(category);
        */
        const newComic =  this.comicsRepository.create({
            ...comic,
            user,
          //category, 
            });

        const savedComic= await this.comicsRepository.save(newComic);

        return{
            title: savedComic.title,
            description: savedComic.description,
            username: savedComic.username,
            data_post: savedComic.data_post,
            nombrecarpeta: savedComic.nombrecarpeta, // Assuming this field exists in the Comic entity
            user: {
                id: user.id,
            },
            /*category: {
                id: savedComic.category.id,
                name: savedComic.category.name,  // Assuming `name` is a property in `Categories`
              }
           */
        }
    }

    async updateComic(id: string, comic: Comics){
        await this.comicsRepository.update(id, comic);
        const updatedComic = await this.comicsRepository.findOneBy({id});

        return updatedComic;
    }

    async deleteComic(id: string){
        const comic = await this.comicsRepository.findOneBy({id})

        if(!comic) return `El comic ${id} no existe`

        this.comicsRepository.recover(comic)

        const { title } = comic;

        return `El comic llamado ` + title + ` con id: ${id} fue eliminado`
        
    }
    
}