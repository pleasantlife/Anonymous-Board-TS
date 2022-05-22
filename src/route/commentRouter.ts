import { Router } from 'express';
import CommentController from '../controller/commentController';
import ReplyController from '../controller/replyController';

const commentRouter: Router = Router();
// const commentController = Container.get(CommentController);
// const replyController = Container.get(ReplyController);

// commentRouter.get('/', commentController.getComments);
// commentRouter.post('/create', commentController.createComment);
// commentRouter.post('/reply', replyController.createReply);

export default commentRouter;
