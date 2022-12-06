var express = require('express');
var router = express.Router();
var Mystic = require("../models/mystic").Mystic

/* GET home page. */
router.get('/', function(req, res, next) {
  Mystic.find({},{_id:0, title:1, nick:1},function(err, menu){
    res.cookie('greeting', 'Hi!!!')
      .render('index', { title: 'Express', menu:menu });
  
  })
});

module.exports = router;
