var express = require('express');
var router = express.Router();
var Mystic = require("../models/mystic").Mystic

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Новый маршрутизатор, для маршрутов, начинающихся с mystics');
});

/* Страница мистиков */
router.get("/:nick", function(req, res, next) {
  Mystic.findOne({nick:req.params.nick}, function(err,mystic){
    if(err) return next(err)
    if(!mystic) return next(new Error("Нет такого мистика в этой игре"))
    res.render('mystic', {
        title: mystic.title,
        picture: mystic.avatar,
        desc: mystic.desc
    })
})
}) 

module.exports = router;