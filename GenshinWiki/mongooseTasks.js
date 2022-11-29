var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test1')
var Mystic = require("./models/mystic").Mystic

var mystic = new Mystic({
    title: "Heydzo",
    nick: "heydzo"
})

console.log(mystic)
mystic.save(function(err, mystic, affected){
console.log(mystic.title)    
})

