const router = require('express').Router();
const Users = require('../data/users-model.js');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
        const saved = await Users.add(user);
        res.status(201).json(saved);
    } catch(error) {
        console.log(error)
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {
    let {username, password} = req.body;

    try {
        const user = await Users.findBy({username}).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({message: `Welcome ${username}!`});
        } else {
            res.status(400).json({message: 'invalid credentials'});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;