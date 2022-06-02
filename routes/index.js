var express = require('express');
var router = express.Router();
const fs = require('fs');
const filePath = "data/notes.json";

/* GET home page. */
router.get('/', function(req, res, next) {
  const content = fs.readFileSync(filePath,"utf8");
  let notes=[]
  if(content){
    notes = JSON.parse(content);
  }
  res.render('index', { notes: notes });
});

module.exports = router;
