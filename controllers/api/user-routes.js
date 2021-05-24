const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models')

//get all users
router.get('/', (req, res) => {
    User.findAll({
        })
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err))
});

//get one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: BlogPost,
                attributes: ['id','title','post_text','created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text','created_at'],
                include: {
                    model: BlogPost,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(userData => {
        if(!userData){
            res.status(404).json({message: 'User not found!'});
            return
        }
        res.json(userData)
    })
    .catch(err => res.status(500).json(err))
});

//update user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if(!userData[0]){
            res.status(404).json({message: 'User not found!'});
            return
        }
        res.json(userData)
    })
    .catch(err => res.status(500).json(err))
    
});

//create new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        //when a user signs up, save as session and determine loggedin true
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json(userData)
        })
    })
    .catch(err => res.status(500).json(err))
});

//login a user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(userData => {
        if(!userData){
            alert('Login creditials do not match.')
            res.status(404).json({message: 'That user was not found, try again!'})
            return
        }
        const correctPw = userData.passwordCheck(req.body.password)
        if(!correctPw){
            alert('Wrong password!')
            res.status(400).json({message: 'Yikes, wrong password!'})
            return
        }
        //when a user successfully logs in, save as session and determine loggedin is true
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json({user: userData, message: `Success! You're in!`})
        })

    }).catch(err => res.status(500).json(err))
});

//logout a user
router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            //send status of no content back once session is terminated
            res.status(204).end();
        })
    } else {
        //session to terminate is not found if user is not logged in
        res.status(404).end();
    }
})

//delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'User not found!'});
            return
        }
        res.json(userData)
    })
    .catch(err => res.status(500).json(err))
});

module.exports = router;