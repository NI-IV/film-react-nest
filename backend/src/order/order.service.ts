import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<string> {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      // Находим фильм по ID
      const filmDoc = await this.filmRepository.findOne({
        where: { id: film },
        relations: ['schedule'],
      });
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

      // Формируем код места
      const seatCode = `${row}:${seat}`;

      // Проверяем, занято ли указанное место
      const takenSeats = schedule.taken.split(','); // Разделяем строку на массив
      if (takenSeats.includes(seatCode)) {
        throw new BadRequestException(`Seat ${seatCode} is already booked.`);
      }

      // Если место свободно, бронируем его
      if (schedule.taken) {
        schedule.taken += `,${seatCode}`; // Добавляем новое место
      } else {
        schedule.taken = seatCode; // Инициализируем строку
      }

      // Сохраняем изменения
      await this.filmRepository.save(filmDoc);
    }

    return `Successfully booked ${tickets.length} tickets.`;
  }
}
