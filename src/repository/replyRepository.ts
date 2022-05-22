import Reply from '../model/reply';
import { AppDataSource } from './../data-source';

const replyRepository = AppDataSource.getRepository(Reply);

export default replyRepository;
