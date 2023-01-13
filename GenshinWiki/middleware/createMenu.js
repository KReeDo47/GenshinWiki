var db = require('../mySQLConnect')

module.exports = function(req,res,next){
    res.locals.nav = []

    db.query('SELECT title, nick FROM mystics', (err, result) => {
        if(err)throw err
        res.locals.nav = result
        next()
    })
//    Mystic.find(null,{_id:0,title:1,nick:1},function(err,result){
//        if(err) throw err
//        res.locals.nav = result
//        next()
//    })

}
