import express from 'express';

import QnaController from '../controllers/qna_controller.js';
import QnaCommentController from '../controllers/q_comment_controller.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();
const qnaController = new QnaController();
const qnaCommentController = new QnaCommentController();

router.get('/', qnaController.FindAllQna);
router.get('/bookmark', qnaController.FindBookMark);
router.get('/:id', qnaController.FindOneQna);
router.get('/:id/comments', qnaCommentController.FindAllComment);

// router.use(auth);

router.post('/', qnaController.CreateQna);
router.post('/:id/bookmark', qnaController.AddBookMark);
router.delete('/:id/bookmark', qnaController.RemoveBookMark);
router.post('/:id/like', qnaController.LikeQna);
router.delete('/:id/like', qnaController.RemoveLikeQna);

router.post('/:id/comments', qnaCommentController.CreateQnaComment);
router.put('/comments/:id', qnaCommentController.UpdateComment);
router.delete('/comments/:id', qnaCommentController.RemoveComment);
router.post('/comments/:id/like', qnaCommentController.LikeComment);
router.delete('/comments/:id/like', qnaCommentController.RemoveLikeComment);
router.post('/comments/:id/choice', qnaCommentController.ChooseComment);

export default router;
