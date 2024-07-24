import { Controller, Get, Param } from '@nestjs/common';
import { ComicsService } from './comics.service';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get()
  getComics() {
    return this.comicsService.getComics();
  }

  @Get(':id')
  getComicById(@Param('id') id: string){
    return this.comicsService.getComicById(Number(id))
  }
}
