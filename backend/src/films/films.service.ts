import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { CreateFilmDto } from './dto/create-film.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(createFilmDto: CreateFilmDto) {
    return this.filmsRepository.create(createFilmDto);
  }

  async findAll() {
    return this.filmsRepository.findAll();
  }

  async findOne(id: string) {
    return this.filmsRepository.findOne(id);
  }
}
