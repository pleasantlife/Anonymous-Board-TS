import express from 'express';
import postRouter from './postRouter';
import commentRouter from './commentRouter';

const router = express.Router();

router.use('/post', postRouter);
router.use('/comment', commentRouter);

export default router;
