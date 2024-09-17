import { IsArray, IsNumber, IsString } from 'class-validator';

export class TicketDto {
  @IsString()
  film: string; // ID фильма
  @IsString()
  session: string; // ID сеанса
  @IsString()
  day: string; // День сеанса
  @IsString()
  daytime: string; // Время сеанса
  @IsNumber()
  row: number; // Номер ряда
  @IsNumber()
  seat: number; // Номер места
  @IsNumber()
  price: number; // Стоимость билета
  @IsNumber()
  time: number; // Время сеанса
}

export class CreateOrderDto {
  @IsString()
  email: string; // Email пользователя
  @IsString()
  phone: string; // Телефон пользователя
  @IsArray()
  tickets: TicketDto[]; // Массив билетов
}
