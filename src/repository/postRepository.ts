import { AppDataSource } from '../data-source';
import Post from '../model/post';

const postRepository = AppDataSource.getRepository(Post);

export default postRepository;
