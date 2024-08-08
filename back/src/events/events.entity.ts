import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  eventName: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  img: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column({
    type: 'decimal',
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  location: string;
}
