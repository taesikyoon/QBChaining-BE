import Sequelize from 'sequelize';
import Post from './post.js';
import User from './user.js';

import { sequelize } from './sequelize.js';

export default class PostBookmark extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: 'post_bookmark',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  // belongsTo로 받아옴
  static associate(db) {
    db.post_bookmark.belongsTo(db.post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      onDelete: 'cascade',
      // constraints: false,
    });
    db.post_bookmark.belongsTo(db.user, {
      foreignKey: 'user_name',
      targetKey: 'user_name',
      onDelete: 'cascade',
      // constraints: false,
    });
  }
}
