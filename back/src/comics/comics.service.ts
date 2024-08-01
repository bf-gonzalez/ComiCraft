import { Injectable } from '@nestjs/common';
import { Comic } from './interfaces/comic.interface';
import { ComicsRepository } from './comics.repository';
import { Comics } from './comics.entity';
import { Users } from 'src/users/users.entity';


@Injectable()
export class ComicsService {
  constructor (private readonly comicsRepository: ComicsRepository){}
    
  getAllComics(){
    return this.comicsRepository.getAllComics();

  }
  getComicById(id: string) {
     return this.comicsRepository.getComicById(id)
    
  }

  getComicByTitle(title: string) {
    return this.comicsRepository.getComicByTitle(title)
  }


  addComics(id: string) {
    return this.comicsRepository.addComics(id);
  }

  postComic(comic: Comic) {
    const newComic = { id: comics.length + 1, ...comic };
    comics.push(newComic);
    return newComic;

  createComic(id: string, comic: Partial<Comics>, ) {
   return this.comicsRepository.createComic(id, comic)

  }

  updatedComic(id: string, comic: Comics){
    return this.comicsRepository.updateComic(id, comic)
  }


  deleteComic(id: string) {
    return this.comicsRepository.deleteComic(id)
  }  
}

