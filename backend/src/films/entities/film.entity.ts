import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column('float')
  rating: number;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
