'use strict';
const hashPass = require('../helpers/bcrypt').hashPassword;

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email can't be empty`
        },
        isEmail: {
          args: true,
          msg: 'Failed email formatted'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password can't be empty`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(model, options) {
        model.password = hashPass(model.password);
      }
    }, sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  return User;
};