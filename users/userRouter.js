const express = require('express');
const db = require('./userDb')
const postDb = require("../posts/postDb")
const userRouter = express.Router();

userRouter.post('/',validateUser,(req, res) => {
  db.insert(req.body).then(user =>
    res.status(201).json(user)).catch(error =>{
    res.status(500).json(error);
})})
userRouter.post('/:id/posts',validateUserId,validatePost,(req, res) => {
  // do your magic!
  postDb.insert(req.body).then(post => 
    {res.status(201).json(post)})
});

userRouter.get('/',(req, res) => {
  // do your magic!
  db.get().then(i => res.status(200).json(i))
});

userRouter.get('/:id',validateUserId,(req, res) => {
  console.log(req.user)
  db.getById(req.user.id)
  .then(i => res.status(200).json(i))
});

userRouter.get('/:id/posts', (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id).then(
    i => res.status(200).json(i)
  )
});

userRouter.delete('/:id', validateUserId,(req, res) => {
  // do your magic!
  db.remove(req.user.id).then(
    i => res.status(200).json(i)
  )
});

userRouter.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  db.getById(req.params.id).then(i => {
    if(!i){
      res.status(400).json({ message: "invalid user id" })
    }
    else{
      req.user = i 
      next()
    }
  })

}


function validatePost(req, res, next) {
  // do your magic!
  if(Object.keys(req.body).length === 0){
    res.status(400).json({ message: "missing post data" })
      }
      else if (!req.body.text){
        res.status(400).json({ message: "missing required text field" })
      }
      req.body.user_id = req.user.id
      next()
}
function validateUser(req, res, next){
  if(Object.keys(req.body).length === 0){
res.status(400).json({ message: "missing user data" })
  }
  else if (!req.body.name){
    res.status(404).json({ message: "missing required name field" })
  }
  next()
};

module.exports = userRouter;
