import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { CreateFilmDto } from '../films/dto/create-film.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const createdFilm = this.filmRepository.create(createFilmDto);
    return this.filmRepository.save(createdFilm);
  }

  async findAll(): Promise<{ items: Film[]; total: number }> {
    const [items, total] = await Promise.all([
      this.filmRepository.find({ relations: ['schedule'] }),
      this.filmRepository.count(),
    ]);

    return { items, total };
  }

  async findOne(
    id: string,
  ): Promise<{ items: Schedule[] | null; total: number }> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    const total = film ? film.schedule.length : 0;

    return { items: film ? film.schedule : null, total };
  }
}
