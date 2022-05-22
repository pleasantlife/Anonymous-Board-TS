import { injectable } from 'tsyringe';
import { Like } from 'typeorm';
import Post from '../model/post';
import postRepository from '../repository/postRepository';
import crypto from '../util/crypto';
import paginationUtil from '../util/paginationUtil';

@injectable()
export default class PostService {
  async getPaginatedPosts(limit: number = 10, page: number = 0) {
    const { currentPage, offset } = paginationUtil.paginationValues(
      limit,
      page,
    );
    const data = await postRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return paginationUtil.paginatedData(data, currentPage, limit);
  }

  async findPosts(type: string, keyword: string, limit = 10, page = 0) {
    const { currentPage, offset }: { currentPage: number; offset: number } =
      paginationUtil.paginationValues(limit, page);
    const data = await postRepository.findAndCount({
      where: { [type]: Like(`%${keyword}%`) },
      relations: { comment: { reply: true } },
      take: limit,
      skip: offset,
    });
    return paginationUtil.paginatedData(data, currentPage, limit);
  }

  async createPost(
    postData: Pick<Post, 'title' | 'body' | 'author' | 'password'>,
  ): Promise<Post> {
    postData.password = crypto.encodingSHA256(postData.password);
    const newPost = postRepository.create(postData);
    return await postRepository.save(newPost);
  }

  async findPostById(postId: number): Promise<Post | null> {
    return await postRepository.findOne({
      where: { id: postId },
      relations: { comment: { reply: true } },
    });
  }

  async updatePostById(
    postId: number,
    updateData: Pick<Post, 'title' | 'body' | 'author' | 'password'>,
  ) {
    await postRepository.update(postId, updateData);
  }

  async deletePostById(postId: number) {
    await postRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: postId })
      .execute();
  }
}
