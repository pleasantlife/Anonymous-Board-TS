import { registry, inject, injectable } from 'tsyringe';
import _ from 'lodash';
import { Request, Response } from 'express';
import PostService from '../service/postService';
import Post from '../model/post';
import crypto from '../util/crypto';

@injectable()
export default class PostController {
  constructor(@inject('PostService') private postService: PostService) {}
  async getPostById(req: Request, res: Response) {
    try {
      const result = await this.postService.findPostById(Number(req.params.id));
      res.status(200).json(result);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      res.status(500).json({ message });
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      let result;
      if (_.isNil(req.query.type) || _.isNil(req.query.keyword)) {
        result = await this.postService.getPaginatedPosts(
          Number(req.query.limit),
          Number(req.query.page),
        );
      } else {
        result = await this.postService.findPosts(
          String(req.query.type),
          String(req.query.keyword),
          Number(req.query.limit),
          Number(req.query.page),
        );
      }
      res.status(200).json(result);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      console.log('error', error);
      res.status(500).json({ message });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const data: Pick<Post, 'title' | 'body' | 'author' | 'password'> = _.pick(
        req.body,
        ['title', 'body', 'author', 'password'],
      );
      const result = await this.postService.createPost(data);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: 'Error!' });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const targetPost = await this.postService.findPostById(
        Number(req.params.id),
      );
      if (crypto.encodingSHA256(req.body.password) !== targetPost!.password) {
        res.status(403).json({ message: 'wrong password' });
      }
      const updateData: Pick<Post, 'title' | 'body' | 'author' | 'password'> =
        req.body;
      await this.postService.updatePostById(Number(req.params.id), updateData);
    } catch (err) {
      res.status(500).json({ message: 'Error!' });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const targetPost = await this.postService.findPostById(
        Number(req.params.id),
      );
      if (crypto.encodingSHA256(req.body.password) !== targetPost!.password) {
        res.status(403).json({ message: 'wrong password' });
      }
      await this.postService.deletePostById(Number(req.params.id));
      res.status(200).json({ message: 'success' });
    } catch (err) {
      res.status(500).json({ message: 'Error!' });
    }
  }
}
