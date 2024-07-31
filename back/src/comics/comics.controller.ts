import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ComicsService } from './comics.service';
import { Comic } from './interfaces/comic.interface';
import { title } from 'process';
import { Comics } from './comics.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comic')
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get()
  getComics() {
    return this.comicsService.getAllComics();
  }

  @Get('seeder/:id')
  addComics(@Param('id') id: string) {
    return this.comicsService.addComics(id);
  }
  
  @Get(':id')
  getComicById(@Param('id') id: string) {
    return this.comicsService.getComicById(id);
  }

  @Get('title/:title')
  getComicByName(@Param('title') title: string) {
    return this.comicsService.getComicByTitle(title);
  }


  @Post()
  postComic(@Body() comic: Comic) {
    return this.comicsService.postComic(comic);

  @Post(':id')
  createComic(@Param('id') id: string,
              @Body() comic: Partial<Comics>,
              ) {
    return this.comicsService.createComic(id, comic);

  }

  @Put(':id')
  putComic(@Param('id') id: string, @Body() comic: Comics) {
    return this.comicsService.updatedComic(id, comic);
  }

  @Delete(':id')
  deleteComic(@Param('id') id: string) {
    return this.comicsService.deleteComic(id);
  }
}