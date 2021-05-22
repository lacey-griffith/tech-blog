const router = require('express').Router();
const { BlogPost, User } = require('../../models')


//get all posts
//update to include user information on blog posts
router.get('/', (req, res) => {
    BlogPost.findAll({
        attributes: ['id', 'title', 'post_text', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
        })
        .then(postData => res.json(postData))
        .catch(err => res.status(500).json(err))
});

//get one post
router.get('/:id', (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        if(!postData){
            res.status(404).json({message: 'Post not found!'});
            return
        }
        res.json(postData)
    })
    .catch(err => res.status(500).json(err))
});

//create new post
router.post('/', (req, res) => {
    BlogPost.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.body.user_id
    }).then(postData => res.json(postData))
    .catch(err => res.status(500).json(err))
});

//update post title
router.put('/:id', (req, res) => {
    BlogPost.update(
        { title: req.body.title }, {
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData){
            res.status(404).json({message: 'No post found!'})
            return
        }
        res.json(postData)
    }).catch(err => res.status(500).json(err))
});

//delete post
router.delete('/:id', (req, res) => {
    BlogPost.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData){
            res.status(404).json({message: 'No post foud.'})
            return
        }
        res.json(postData)
    }).catch(err => res.status(500).json(err))
});

module.exports = router;