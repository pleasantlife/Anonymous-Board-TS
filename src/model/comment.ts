import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from './post';
import Reply from './reply';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  author: string;

  @Column({ name: 'post_id' })
  postId: number;

  @ManyToOne(() => Post, post => post.id)
  @JoinColumn()
  post: string;

  @OneToMany(() => Reply, reply => reply.comment)
  @JoinColumn()
  reply: Reply[];
}
