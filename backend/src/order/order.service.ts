import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/films.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<string> {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      // Находим фильм по ID
      const filmDoc = await this.filmModel.findOne({ id: film }).exec();
      if (!filmDoc) {
        throw new NotFoundException(`Film with ID ${film} not found.`);
      }

      // Находим сеанс по ID
      const schedule = filmDoc.schedule.find((s) => s.id === session);
      if (!schedule) {
        throw new NotFoundException(
          `Session with ID ${session} not found for film ${film}.`,
        );
      }

      // Проверяем, занято ли указанное место
      const seatCode = `${row}:${seat}`;
      if (schedule.taken.includes(seatCode)) {
        throw new BadRequestException(`Seat ${seatCode} is already booked.`);
      }

      // Если место свободно, бронируем его
      schedule.taken.push(seatCode);

      // Сохраняем
      await filmDoc.save();
    }

    return `Successfully booked ${tickets.length} tickets.`;
  }
}
