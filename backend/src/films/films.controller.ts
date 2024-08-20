import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  getAllFilms() {
    return this.filmsService.findAll();
  }

  @Get('/:id/schedule')
  getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.findOne(id);
  }

  @Post('/')
  async createFilm(@Body() createOrderDto: CreateFilmDto) {
    return this.filmsService.create(createOrderDto);
  }
}
