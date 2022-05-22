import 'reflect-metadata';
import 'dotenv/config';
import { container } from 'tsyringe';
import { AppDataSource } from './data-source';
import app from './expressService';
import PostService from './service/postService';
import PostController from './controller/postController';
import CommentService from './service/commentService';

const port = process.env.PORT;

async function init() {
  await AppDataSource.initialize();
  container.register('PostService', PostService);
  container.register('PostController', PostController);
  container.register('CommentService', CommentService);

  app.listen(port, () => {
    console.log(`Server running on::: ${port}`);
  });
}

init();
