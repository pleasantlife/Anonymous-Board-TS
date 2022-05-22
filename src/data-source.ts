import 'dotenv/config';
import { DataSource } from 'typeorm';
import Post from './model/post';
import Comment from './model/comment';
import Reply from './model/reply';

const isDev: boolean = process.env.NODE_ENV === 'development';
const port: number = Number(process.env.SQL_PORT);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
  synchronize: isDev ? true : false,
  logging: isDev ? false : true,
  entities: [Post, Comment, Reply],
});
