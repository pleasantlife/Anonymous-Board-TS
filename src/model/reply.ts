import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Comment from './comment';

@Entity()
export default class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  author: string;

  @Column({ name: 'comment_id' })
  commentId: number;

  @ManyToOne(() => Comment, comment => comment.id)
  @JoinColumn()
  comment: Comment;
}
