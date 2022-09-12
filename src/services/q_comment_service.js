import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

import Qna from '../models/qna.js';
import QnaComment from '../models/qna_comment.js';
import QnaTag from '../models/qna_tag.js';
import User from '../models/user.js';
import QnaLike from '../models/qna_like.js';
import QnaBookmark from '../models/qna_bookmark.js';
import QnaCommentLike from '../models/qna_comment_like.js';
import Notification from '../models/noti.js';

class QnaCommentService {
  CreateQnaComment = async (qna_id, user_name, comment) => {
    if (!comment) throw new ConflictException('내용 입력은 필수');

    const existQna = await Qna.findOne({ where: { id: qna_id } });
    if (!existQna) throw new NotFoundException('게시물이 존재 하지 않음');

    const commentdata = await QnaComment.create({ qna_id, user_name, comment });

    const findQna = await QnaBookmark.findAll({
      where: { qna_id },
    });

    if (findQna) {
      for (let i = 0; i < findQna.length; i++) {
        const noti = await Notification.create({
          data: 'qna_comment',
          check: false,
          qna_id,
          user_id: findQna[i].user_id,
        });
      }
    }

    return { id: commentdata.id, comment: commentdata.comment };
  };

  FindAllComment = async (qna_id, user_name) => {
    const commentLists = await QnaComment.findAll({
      attributes: ['id', 'comment', 'is_choose', 'user_name', 'createdAt'],
      where: { qna_id },
      include: [{ model: QnaCommentLike, attributes: ['user_name'] }],
    });

    return commentLists
      .map((list) => {
        return {
          id: list.id,
          comment: list.comment,
          is_choose: list.is_choose,
          user_name: list.user_name,
          createdAt: list.createdAt,
          honey_tip: list.QnaCommentLikes.length,
          is_honey_tip: list.QnaCommentLikes[0]?.user_name
            ? list.QnaCommentLikes[0]?.user_name === user_name
            : false,
        };
      })
      .sort((a, b) => {
        a = a.honey_tip;
        b = b.honey_tip;
        return b - a;
      });
  };

  UpdateComment = async (id, comment, user_name) => {
    if (!comment) throw new ConflictException('수정 요청에 내용이 없다니..');

    const isSameUser = await QnaComment.findByPk(id);
    if (!isSameUser) throw new ConflictException('댓글이 존재하지 않습니다.');
    if (isSameUser.user_name !== user_name)
      throw new ConflictException('자신의 댓글만 수정 가능합니다.');

    await QnaComment.update({ comment }, { where: { id } });
  };

  RemoveComment = async (id, comment, user_name) => {
    const isSameUser = await QnaComment.findByPk(id);
    if (!isSameUser) throw new ConflictException('댓글이 존재하지 않습니다.');
    if (isSameUser.user_name !== user_name)
      throw new ConflictException('자신의 댓글만 수정 가능합니다.');

    await QnaComment.destroy({ where: { id } });
  };

  LikeComment = async (qna_comment_id, user_name) => {
    const existLike = await QnaCommentLike.findOne({
      where: { qna_comment_id, user_name },
    });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaCommentLike.create({ qna_comment_id, user_name });
  };

  RemoveLikeComment = async (qna_comment_id, user_name) => {
    const existLike = await QnaCommentLike.findOne({
      where: { qna_comment_id, user_name },
    });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaCommentLike.destroy({ where: { qna_comment_id, user_name } });
  };

  ChooseComment = async (qna_comment_id, user_id) => {
    const existComment = await QnaComment.findByPk(qna_comment_id);
    if (!existComment) throw new ConflictException('존재하지 않는 댓글입니다.');

    const qna = await existComment.getQna();
    if (qna.user_id !== user_id)
      throw new ConflictException('채택은 게시글 작성자만 가능합니다.');
    else {
      await Qna.update({ is_resolve: true }, { where: { id: qna.id } });
      await QnaComment.update(
        { is_choose: true },
        { where: { id: qna_comment_id } }
      );
    }
  };
}

export default QnaCommentService;
