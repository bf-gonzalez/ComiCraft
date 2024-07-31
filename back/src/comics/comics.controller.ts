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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comics')
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get()
  getComics() {
    return this.comicsService.getComics();
  }

  @Get(':id')
  getComicById(@Param('id') id: string) {
    return this.comicsService.getComicById(Number(id));
  }

  @Get('name/:name')
  getComicByName(@Param('name') name: string) {
    return this.comicsService.getComicByName(name);
  }

  @Post()
  postComic(@Body() comic: Comic) {
    return this.comicsService.postComic(comic);
  }

  @Put(':id')
  putComic(@Param('id') id: string, @Body() comic: Comic) {
    return this.comicsService.putComic(Number(id), comic);
  }

  @Delete(':id')
  deleteComic(@Param('id') id: string) {
    return this.comicsService.deleteComic(Number(id));
  }
}
