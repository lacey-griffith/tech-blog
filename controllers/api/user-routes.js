const router = require('express').Router();
const { User } = require('../../models')

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
        where: {
            id: req.params.id
        }
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
    .then(userData => res.json(userData))
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
            res.status(404).json({message: 'That user was not found, try again!'})
            return
        }
        const correctPw = userData.passwordCheck(req.body.password)
        if(!correctPw){
            res.status(400).json({message: 'Yikes, wrong password!'})
            return
        }
        res.json({user: userData, message: `Success! You're in!`})

    }).catch(err => res.status(500).json(err))
});

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