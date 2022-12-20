var express = require('express');
var router = express.Router();
var checkAuth = require("./../middleware/checkAuth.js")
var Mystic = require("../models/mystic").Mystic
var User = require("./../models/user").User

/* GET home page. */
router.get('/', function(req, res, next) {
  Mystic.find({}, { _id: 0, title: 1, nick: 1 }, function (err, menu) {
    req.session.greeting = "Hi!!!",
        res.cookie('greeting', 'Hi!!!').render('index', {
            title: 'Express',
            counter: req.session.counter,
});
})
});
/* GET auth page. */
router.get('/logreg', function (req, res, next) {
  res.render('logreg', { error: null });
});
/* POST logout. */
router.post('/logout', function (req, res, next) {
  req.session.destroy()
  res.locals.user = null
  res.redirect('/')
});
/* GET login/registration page. */
router.get('/logreg', function (req, res, next) {
  res.render('logreg', { title: 'Вход' });
});

/* POST login/registration page. */
router.post('/logreg', function (req, res, next) {
  var username = req.body.username
  var password = req.body.password
  User.findOne({ username: username }, function (err, user) {
    if (err) return next(err)
    if (user) {
        if (user.checkPassword(password)) {
            req.session.user = user._id
            res.redirect('/')
        } else {
            res.render('logreg', { title: 'Вход' })
        }
    } else {
        var user = new User({ username: username, password: password })
        user.save(function (err, user) {
            if (err) return next(err)
            req.session.user = user._id
            res.redirect('/')
        })
    }
})
});

/* Страница Heydzo */
router.get('/Heydzo', function(req, res, next) {
  res.render('mystic', {
    title: "Heydzo",
    picture: "images/Heydzo.png",
    desc: "Досин Сиканоин обладает замечательным умом и проницательностью. Пусть он непредсказуем и порою несносен, нельзя не признать, что он талантлив. Комиссии Тэнрё невероятно повезло, что в её рядах есть такой человек."
  })
});
/* Страница NinGuan */
router.get('/NinGuan', function(req, res, next) {
  res.render('mystic', {
    title: "NinGuan",
    picture: "images/NinGuan.png",
    desc: "Все в Ли Юэ любят посплетничать о Нин Гуан, а кажется, что все про неё всё знают, но на самом деле оказывается, что версия нин Гуан каждого человека довольно сильно отличается от версии другого. Но одна вещь остаётся неизменной: все считают Нин Гуан экстраординарной личностью."
  })
});
/* Страница Reyzor */
router.get('/Reyzor', function(req, res, next) {
  res.render('mystic', {
    title: "Reyzor",
    picture: "images/Reyzor.png",
    desc: "Рэйзор — таинственный мальчик, живущий в Вольфендоме. О нём может рассказать всего лишь горстка модштадтцев. Однако, если верить очевидцам, Рэйзор чрезвычайно проворен и путешествует вместе со стаей волков, вдали от людей."
  })
});

module.exports = router;
