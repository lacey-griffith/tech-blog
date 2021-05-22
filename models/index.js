const User = require('./User');
const BlogPost = require('./BlogPost');

//create associations

//a user can have many blog posts
User.hasMany(BlogPost, {
    foreignKey: 'user_id'
})

//a blog post can belong to one user
BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = {User, BlogPost}