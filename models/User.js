const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');

class User extends Model {};

User.init(
    //add rules to columns here
)

module.exports = User;