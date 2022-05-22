import { AppDataSource } from '../data-source';
import Comment from '../model/comment';

const commentRepository = AppDataSource.getRepository(Comment);

export default commentRepository;
