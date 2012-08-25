// require modules
var nowjs = require("now"),
    express = require('express');

// init express and http server
var app = express();
var httpServer = app.listen(3000);

// config EXPRESS
// all environments
app.configure(function(){
    app.use(express.static(__dirname + "/public"));
    app.set("view engine", "jade");
    app.use(express.bodyParser());
});

// init NOW
var everyone = nowjs.initialize(httpServer);

// ROUTES
app.get('/:user', function(req, res){
    res.render('user', {
        title : req.params.user,
        username: req.params.user
    });
});

app.get('/:user/:room', function(req, res) {
    console.log(req.params);
    res.render('game/index', req.params);
});

everyone.now.createRoom = function(callback) {

};