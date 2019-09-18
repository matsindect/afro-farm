const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const userRouter = require('./routes/userRouter');

const server = express();

server.use(bodyparser.json());
if (process.env.NNODE_ENV === 'development') {
  server.use(morgan('dev'));
}
//ROUTES;
server.use('/api/v1/users', userRouter);

server.use((req, res, next) => {
  console.log('Hope we did it');
  next();
});

module.exports = server;
