const express = require('express');
// const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter')
const server = express();
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
const stretch_goal = process.env.stretch_goal || "too easy"

server.get('/', (req, res) => {
  res.send(`<h2>${stretch_goal}</h2>`);
});

function logger (req,res,next){
console.log(req.method,req.url,req.body,Date.now())
next()
}

module.exports = server;