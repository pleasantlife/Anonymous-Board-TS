import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class KeywordSubscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keywords: string;

  @Column()
  subscriber: string;
}
