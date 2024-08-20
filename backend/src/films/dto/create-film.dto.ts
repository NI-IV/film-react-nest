//TODO описать DTO для запросов к /films
import { IsNumber, IsString, IsArray, IsDate } from 'class-validator';

export class CreateScheduleDto {
  @IsDate()
  daytime: Date;
  @IsNumber()
  hall: number;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
}

export class CreateFilmDto {
  @IsString()
  title: string;
  @IsString()
  director: string;
  @IsNumber()
  rating: number;
  @IsArray()
  tags: string[];
  @IsString()
  image: string;
  @IsString()
  cover: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsArray()
  schedule: CreateScheduleDto[];
}
