import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

import QnaCommentRepository from '../repositories/q.comment.repository.js';
import Notification from '../models/noti.js';

class QnaCommentService {
  qnaCommentRepository = new QnaCommentRepository();

  CreateQnaComment = async (qnaId, userName, comment) => {
    if (!comment) throw new BadRequestException('내용 입력은 필수');

    const existQna = await this.qnaCommentRepository.FindQna(qnaId);
    if (!existQna) throw new NotFoundException('게시물이 존재 하지 않음');

    const commentdata = await this.qnaCommentRepository.CreateComment(
      qnaId,
      userName,
      comment
    );

    // const findQna = await QnaBookmark.findAll({
    //   where: { qnaId },
    // });

    // if (findQna.length === 0) {
    //   await Notification.create({
    //     type: 'qna',
    //     check: false,
    //     qnaId: existQna.id,
    //     userName: existQna.userName,
    //   });
    // }

    // if (findQna) {
    //   for (let i = 0; i < findQna.length; i++) {
    //     await Notification.create({
    //       type: 'qna',
    //       check: false,
    //       qnaId,
    //       userName: findQna[i].userName,
    //     });
    //   }
    // }
    return {
      id: commentdata.id,
      comment: commentdata.comment,
      userName: commentdata.userName,
      createdAt: commentdata.createdAt,
    };
  };

  GetQnaComment = async (qnaId, userName, page_count, page) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const commentLists = await this.qnaCommentRepository.GetQnaComment(
      qnaId,
      page_count,
      page
    );
    // return commentLists;
    return commentLists
      .map((list) => {
        let isLike = false;
        if (userName) {
          for (let i = 0; i < list.QnaCommentLike?.length; i++) {
            if (list.QnaLikes[i]?.userName === userName) {
              isLike = true;
              break;
            }
          }
        }

        return {
          id: list.id,
          comment: list.comment,
          userName: list.userName,
          profileImg: list.User.profileImg,
          createdAt: list.createdAt,
          like: list.QnaCommentLikes.length,
          isChoose: list.isChoose,
          isLike,
        };
      })
      .sort((a, b) => {
        a = a.like;
        b = b.like;
        return b - a;
      });
  };

  LikeComment = async (qnaCommentId, userName) => {
    const existLike = await QnaCommentLike.findOne({
      where: { qnaCommentId, userName },
    });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');

    await QnaCommentLike.create({ qnaCommentId, userName });
  };

  RemoveLikeComment = async (qnaCommentId, userName) => {
    const existLike = await QnaCommentLike.findOne({
      where: { qnaCommentId, userName },
    });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaCommentLike.destroy({ where: { qnaCommentId, userName } });
  };

  ChooseComment = async (qnaCommentId, userName) => {
    const existComment = await QnaComment.findByPk(qnaCommentId);
    if (!existComment) throw new ConflictException('존재하지 않는 댓글입니다.');
    const qna = await existComment.getQna();
    if (qna.userName !== userName)
      throw new ConflictException('채택은 게시글 작성자만 가능합니다.');
    else {
      await Qna.update({ isResolve: true }, { where: { id: qna.id } });
      await QnaComment.update(
        { isChoose: true },
        { where: { id: qnaCommentId } }
      );
    }
  };
}

export default QnaCommentService;
