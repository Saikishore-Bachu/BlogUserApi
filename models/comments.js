'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       comments.belongsTo(models.blog, {foreignKey: 'postId'})
    }
  }
  comments.init({
    postId: DataTypes.INTEGER,
    comments: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};