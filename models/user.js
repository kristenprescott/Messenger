"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // Make sure email is valid:
        //    https://sequelize.org/master/manual/validations-and-constraints.html
        validate: {
          isEmail: {
            args: true,
            // error msg:
            msg: "Invalid email address.",
          },
        },
      },
      password: {
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
