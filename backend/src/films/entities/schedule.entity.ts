import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamp', nullable: false })
  daytime: Date;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column({ nullable: false })
  price: number;

  @Column({ type: 'text' })
  taken: string;

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}
