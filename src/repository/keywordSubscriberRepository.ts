import { AppDataSource } from '../data-source';
import KeywordSubscriber from '../model/keywordSubscriber';

const commentRepository = AppDataSource.getRepository(KeywordSubscriber);

export default commentRepository;
