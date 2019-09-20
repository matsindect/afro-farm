const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const uniErrorHamndler = require('./controllers/errorContoller');

const userRouter = require('./routes/userRouter');

const server = express();

server.use(bodyparser.json());
if (process.env.NNODE_ENV === 'development') {
  server.use(morgan('dev'));
}
//ROUTES;
server.use('/api/v1/users', userRouter);

server.all('*', (req, res, next) => {
  next(new AppError(`Cannot Find ${req.originalUrl} on this server`, 404));
});

server.use(uniErrorHamndler);

module.exports = server;
