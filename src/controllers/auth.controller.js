import jwt from 'jsonwebtoken';
import AuthService from '../services/auth.service.js';

export default class AuthController {
  authService = new AuthService();

  updateUser = async (req, res, next) => {
    const userId = req.decoded.userId;
    try {
      const user = await this.authService.userUpdate(userId);

      const token = jwt.sign(
        {
          userId: user.id,
          userName: user.userName,
          isNew: user.isNew,
          profileImg: user.profileImg,
        },
        process.env.JWT_SECRET,
        {
          issuer: 'jihun',
        }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  };

  createUserInfo = async (req, res, next) => {
    const language = req.body.language;
    const age = req.body.age;
    const gender = req.body.gender;
    const job = req.body.job;
    const career = req.body.career;
    const userId = req.decoded.userId;

    try {
      const userInfo = await this.authService.userInfoCreate(
        language,
        age,
        gender,
        job,
        career,
        userId
      );

      console.log(userInfo);

      return res
        .status(200)
        .json({ success: 'ok', message: '유저 정보 등록 성공' });
    } catch (error) {
      return next(error);
    }
  };

  updateUserInfo = async (req, res, next) => {
    const language = req.body.language;
    const age = req.body.age;
    const gender = req.body.gender;
    const job = req.body.job;
    const career = req.body.career;
    const userId = req.decoded.userId;

    try {
      const userInfo = await this.authService.userInfoUpdate(
        language,
        age,
        gender,
        job,
        career,
        userId
      );

      return res
        .status(200)
        .json({ success: 'ok', message: '유저 정보 수정 성공' });
    } catch (error) {
      return next(error);
    }
  };

  getActivity = async (req, res, next) => {
    const userName = req.params.userName;

    try {
      const userActivity = await this.authService.getUserActivity(userName);

      return res.status(200).json({
        userActivity,
      });
    } catch (error) {
      return next(error);
    }
  };

  getUserPage = async (req, res, next) => {
    const userName = req.params.userName;

    try {
      const userPageInfo = await this.authService.getUserPage(userName);

      return res
        .status(200)
        .json({ success: 'ok', message: `${userName}의 페이지`, userPageInfo });
    } catch (error) {
      res
        .status(500)
        .json({ message: '조회하려는 사용자가 존재하지 않습니다.' });
      return next(error);
    }
  };

  getUserRank = async () => {};
}
