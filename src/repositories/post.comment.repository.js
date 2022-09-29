import PostBookmark from '../models/post.bookmark.js';
import Notification from '../models/noti.js';
import PostComment from '../models/post.comment.js';
import User from '../models/user.js';
import Post from '../models/post.js';
import sequelize from 'sequelize';

const option = sequelize.Op;

export default class PostCommentRepository {
  PostFindOne = async (postId) => {
    const findpost = await Post.findOne({
      where: { id: postId },
    });

    return findpost;
  };

  PostBookmark = async (postId, userName) => {
    const bookmark = await PostBookmark.findAll({
      where: { postId: postId, userName: { [option.ne]: userName } },
    });

    return bookmark;
  };

  Notification = async (findpost) => {
    const notification = await Notification.create({
      type: 'blog',
      check: false,
      postId: findpost.id,
      userName: findpost.userName,
    });

    return notification;
  };

  CreateNoti = async (notipost, notiname) => {
    const notification = await Notification.create({
      type: 'blog',
      check: false,
      postId: notipost,
      userName: notiname,
    });
  };

  CommentShowAll = async (postId) => {
    const postcomment = await PostComment.findAll({
      where: { postId: postId },
      attributes: ['id', 'comment', 'createdAt', 'updatedAt'],
      include: [{ model: User, attributes: ['userName', 'profileImg'] }],
    });
    return postcomment;
  };

  CommentCreate = async (comment, userName, postId) => {
    const postcomment = await PostComment.create({
      comment,
      userName,
      postId,
    });

    return postcomment;
  };

  CommentUpdate = async (comment, commentId, userName) => {
    const postcomment = await PostComment.update(
      { comment },
      {
        where: { id: commentId, userName: userName },
      }
    );

    return postcomment;
  };

  CommentFindOneName = async (commentId, userName) => {
    const postcomment = await PostComment.findOne({
      where: { id: commentId, userName: userName },
    });

    return postcomment;
  };

  CommentDestroy = async (commentId, userName) => {
    const postdestroy = await PostComment.destroy({
      where: { id: commentId, userName: userName },
    });

    return postdestroy;
  };

  CommentBookmark = async (postId, num) => {
    const commentbookmark = await Notification.create({
      type: 'posts',
      check: false,
      postId,
      userName: num,
    });

    return commentbookmark;
  };
}
