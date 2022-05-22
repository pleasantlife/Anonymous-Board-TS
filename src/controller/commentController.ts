import { Request, Response } from 'express';
import _ from 'lodash';
import { inject, injectable } from 'tsyringe';
import Comment from '../model/comment';
import CommentService from '../service/commentService';

@injectable()
export default class CommentController {
  constructor(
    @inject('CommentService') private commentService: CommentService,
  ) {}

  async getComments(req: Request, res: Response): Promise<void> {
    try {
      let result;
      if (_.isNil(req.query.postid)) {
        result = await this.commentService.getPaginatedComments(
          Number(req.query.limit),
          Number(req.query.page),
        );
      } else {
        result = await this.commentService.getCommentsByPostId(
          Number(req.query.postid),
          Number(req.query.limit),
          Number(req.query.page),
        );
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: 'Error!' });
    }
  }

  async createComment(req: Request, res: Response): Promise<void> {
    try {
      const data: Pick<Comment, 'body' | 'author' | 'postId'> = _.pick(
        req.body,
        ['body', 'author', 'postId'],
      );
      await this.commentService.createComment(data);
      res.status(201).json({ message: 'success' });
    } catch (err) {
      res.status(500).json({ message: 'Error!' });
    }
  }
}
