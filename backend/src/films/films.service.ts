import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { CreateFilmDto } from './dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsRepository: FilmsRepository) {}

  async create(createFilmDto: CreateFilmDto) {
    return this.filmsRepository.create(createFilmDto);
  }

  async findAll() {
    return this.filmsRepository.findAll();
  }

  async findOne(id) {
    return this.filmsRepository.findOne(id);
  }
}
