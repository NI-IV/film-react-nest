import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument, Schedule } from '../films/films.schema';
import { CreateFilmDto } from '../films/dto/create-film.dto';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const createdFilm = new this.filmModel(createFilmDto);
    return createdFilm.save();
  }

  async findAll(): Promise<{ items: Film[], total: number }> {
    const [items, total] = await Promise.all([
      this.filmModel.find().exec(),
      this.filmModel.countDocuments().exec(),
    ]);

    return { items, total };
  }

  async findOne(id: string): Promise<{ items: Schedule[] | null, total: number }> {
    const film = await this.filmModel.findOne({ id }).exec();
    const total = film ? film.schedule.length : 0;

    return { items: film.schedule, total: total };
  }
}