const express = require("express");
const db = require("./postDb");
const postRouter= express.Router();

postRouter.get("/", (req, res) => {
  db.get().then(resources => {
    res.status(200).json(resources);
  });
});

postRouter.get('/:id', validatePostId,(req, res) => {
  // do your magic!
db.getById(req.post.id).then(i => res.status(200).json(i))
});

postRouter.delete('/:id', validatePostId,(req, res) => {
  // do your magic!
  db.remove(req.post.id).then(i => res.status(200).json(i))
});

postRouter.put('/:id', validatePostId,validateChanges,(req, res) => {
  // do your magic!
db.update(req.post.id,req.body).then(i => db.getById(req.post.id ).then(i => res.status(200).json(i)))
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  db.getById(req.params.id).then(i => {
    if(!i){
      res.status(400).json({ message: "invalid user id" })
    }
    else{
      req.post = i 
      next()
    }
  })
}
function validateChanges(req,res,next){
  if(Object.keys(req.body).length === 0){
    res.status(400).json({ message: "missing post data" })
      }
      else if (!req.body.text){
        res.status(400).json({ message: "missing required text field" })
      }
      next()
}

module.exports = postRouter;
