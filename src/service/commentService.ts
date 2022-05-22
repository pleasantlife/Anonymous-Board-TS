import { inject, injectable } from 'tsyringe';
import commentRepository from '../repository/commentRepository';
import paginationUtil from '../util/paginationUtil';
import Comment from '../model/comment';
import keywordSubscriberService from './keywordSubscriberService';

@injectable()
export default class CommentService {
  async getPaginatedComments(limit: number = 10, page: number = 0) {
    const { currentPage, offset } = paginationUtil.paginationValues(
      limit,
      page,
    );
    const data = await commentRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return paginationUtil.paginatedData(data, currentPage, limit);
  }

  async getCommentsByPostId(
    postId: number,
    limit: number = 10,
    page: number = 0,
  ) {
    const { currentPage, offset } = paginationUtil.paginationValues(
      limit,
      page,
    );
    const data = await commentRepository.findAndCount({
      where: { id: postId },
      take: limit,
      skip: offset,
    });
    return paginationUtil.paginatedData(data, currentPage, limit);
  }

  async createComment(data: Pick<Comment, 'body' | 'author' | 'postId'>) {
    const comment = commentRepository.create(data);
    await commentRepository.save(comment);
    await keywordSubscriberService.sendKeywordAlarm(data.body);
  }
}
