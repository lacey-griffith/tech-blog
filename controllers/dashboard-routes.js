const router = require('express').Router();
const sequelize = require('../config/connection');
const {BlogPost, User, Comment} = require('../models');



router.get('/', (req, res) => {
    BlogPost.findAll({
        where: {
            id: req.session.user_id
        },
        attributes: ['id','title','post_text','created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text','post_id','user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(postData => {
        const posts = postData.map(post => post.get({plain: true}));

        res.render('dashboard', {posts, loggedIn: true, username: req.session.username})
    }).catch(err => res.status(500).json(err))
})


module.exports = router;