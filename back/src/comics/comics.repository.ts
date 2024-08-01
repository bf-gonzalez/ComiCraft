import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comics } from "./comics.entity";
import { Repository } from "typeorm";
import { Users } from "src/users/users.entity";


@Injectable()
export class ComicsRepository {
    constructor( 
        @InjectRepository(Comics) private comicsRepository: Repository<Comics>,
        @InjectRepository(Users) private usersRepository: Repository<Users>
    ){}

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