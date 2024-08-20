import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type FilmDocument = Film & Document;

@Schema()
export class Schedule {
  @Prop({ default: () => uuidv4() })
  id: string;

  @Prop()
  daytime: Date;

  @Prop()
  hall: number;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film {
  @Prop({ default: () => uuidv4() })
  id: string;

  @Prop()
  title: string;

  @Prop()
  director: string;

  @Prop()
  rating: number;

  @Prop([String])
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop({ type: [ScheduleSchema] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
