const router = require('express').Router();
const restricted = require('../routers/restricted-middleware.js');

const Users = require('../data/users-model.js');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.json(error);
        })
});

module.exports = router;