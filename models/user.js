"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(36),
        // nullible by default, must specify:
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        // nullible by default, must specify:
        allowNull: false,
        unique: true,
      },
      password: {
        // limit chars w (<limit num>), default is 255 chars
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: DataTypes.STRING,
    },
    // OPTIONS FOR THIS MODEL:
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
