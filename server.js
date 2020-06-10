const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
    name: 'kmsession',
    secret: 'special secret', 
    cookie: {
        maxAge: 1000 * 60,
        secure: false,  //normally you want this to be true
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('./data/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

const userRouter = require('./routers/userRouter.js');
const authRouter = require('./routers/authRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;