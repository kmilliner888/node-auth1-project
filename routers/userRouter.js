const router = require('express').Router();

const Users = require('../data/users-model.js');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.json(error);
        })
});

module.exports = router;