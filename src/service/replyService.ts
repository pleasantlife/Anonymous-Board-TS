import { injectable } from 'tsyringe';
import Reply from '../model/reply';
import replyRepository from '../repository/replyRepository';

@injectable()
export default class ReplyService {
  async createReply(
    data: Pick<Reply, 'body' | 'author' | 'commentId'>,
  ): Promise<Reply> {
    const newReply = replyRepository.create(data);
    return await replyRepository.save(newReply);
  }
}
