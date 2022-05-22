import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import PostController from '../controller/postController';
import PostService from '../service/postService';

const postRouter: Router = Router();

container.register('PostService', { useClass: PostService });
container.register('PostController', { useClass: PostController });
const postController = container.resolve(PostController);

postRouter.get('/', postController.getPosts);
postRouter.post('/create', postController.createPost);
postRouter
  .route('/:id')
  .get(postController.getPostById)
  .put(postController.updatePost)
  .delete(postController.deletePost);

export default postRouter;
