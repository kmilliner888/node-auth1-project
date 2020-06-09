const express = require('express');

const userRouter = require('./routers/userRouter.js');
const authRouter = require('./routers/authRouter.js');

const server = express();

server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;