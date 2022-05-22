import { inject, injectable } from 'tsyringe';
import _ from 'lodash';
import { Request, Response } from 'express';
import Reply from '../model/reply';
import ReplyService from '../service/replyService';

@injectable()
export default class ReplyController {
  constructor(@inject('ReplyService') private replyService: ReplyService) {}
  async createReply(req: Request, res: Response) {
    try {
      const data: Pick<Reply, 'body' | 'author' | 'commentId'> = _.pick(
        req.body,
        ['body', 'author', 'commentId'],
      );
      const result = this.replyService.createReply(data);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: 'Error!' });
    }
  }
}
