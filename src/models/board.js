import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // title과 content init
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        language: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        is_resolve: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: false,
        underscored: true,
        tableName: "board",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.board.hasMany(db.board_comment);
    db.board.belongsTo(db.user);
    db.board.hasMany(db.board_like);
    db.board.hasMany(db.board_bookmark);
  }
}
