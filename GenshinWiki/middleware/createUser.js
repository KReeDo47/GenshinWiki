var db = require('../mySQLConnect')


module.exports = function(req,res,next) {
    res.locals.user = null

    db.query(`SELECT * FROM user WHERE user.user_id = '${req.session.user}'`, (err, user) => {
        if (err) 
            return next(err)
        res.locals.user = user;
        next()
    })
}
