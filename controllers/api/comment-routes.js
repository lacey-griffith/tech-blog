const router = require('express').Router();
const { Comment } = require('../../models');
const authenticateUser = require('../../utils/auth')

//get comments
router.get('/', (req, res) => {
    Comment.findAll({

    })
    .then(commentData => res.json(commentData))
    .catch(err => res.status(500).json(err))
});

//post new comment
router.post('/', authenticateUser, (req, res) => {
    if(req.session){
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        .then(commentData => res.json(commentData))
        .catch(err => res.status(500).json(err))
    }
});

//put update comment
router.put('/:id', authenticateUser, (req, res) => {
    Comment.update(
        {comment_text: req.body.comment_text}, {
            where: { 
                id: req.params.id
            }
        }).then(commentData => {
            if(!commentData){
                res.status(404).json({message: 'Comment not found!'})
                return
            }
            res.json(commentData)
        }).catch(err => res.status(500).json(err))
});

//delete comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {id: req.params.id}
    }).then(commentData => {
        if(!commentData){
            res.status(404).json({message: 'Comment not found!'})
            return
        }
        res.json(commentData)
    }).catch(err => res.status(500).json(err))
});

module.exports = router;