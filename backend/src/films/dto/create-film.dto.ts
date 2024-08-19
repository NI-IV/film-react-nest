//TODO описать DTO для запросов к /films
import {
  IsNumber,
  IsString,
  IsArray,
  IsDate,
} from 'class-validator';

export class CreateScheduleDto {
    @IsDate()
    readonly daytime: Date;
    @IsNumber()
    readonly hall: number;
    @IsNumber()
    readonly rows: number;
    @IsNumber()
    readonly seats: number;
    @IsNumber()
    readonly price: number;
  }
  
  export class CreateFilmDto {
    @IsString()
    readonly title: string;
    @IsString()
    readonly director: string;
    @IsNumber()
    readonly rating: number;
    @IsArray()
    readonly tags: string[];
    @IsString()
    readonly image: string;
    @IsString()
    readonly cover: string;
    @IsString()
    readonly about: string;
    @IsString()
    readonly description: string;
    @IsArray()
    readonly schedule: CreateScheduleDto[];
  }