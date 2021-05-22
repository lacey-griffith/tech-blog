const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {
}

BlogPost.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,50]}
    }, 
    post_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [10, 500]}
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            keys: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost'
})

module.exports = BlogPost;