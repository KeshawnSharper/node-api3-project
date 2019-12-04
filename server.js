const express = require('express');
// const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter')
const server = express();
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger (req,res,next){
console.log(req.method,req.url,req.body)
next()
}

module.exports = server;