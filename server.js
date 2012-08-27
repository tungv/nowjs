// require modules
var nowjs = require("now"),
    express = require('express'),
    lazy = require('lazy');

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
    res.render('game', req.params);
});

var ensureFunction = function(callback) {
    if(callback && 'function' == typeof callback) {
        return callback;
    }
    return function() {};
};

everyone.now.getAllRooms = function(callback) {
    var current = this.now;
    var myRooms = rooms.filter(function (room) {
        return 0 <= room.participants.indexOf(current.username);
    });

    ensureFunction(callback)(myRooms);
};

everyone.now.createRoom = function(name, callback) {
    var room = new Room(this.now.username, name);
    rooms.push(room);
    var group = nowjs.getGroup(room.id);
    callback(room);
    console.log('room created. Name: ' + room.name + ' - id: ' + room.id);
};

var randomString = function(len) {
  return String(Math.random()).substr(2,len);
};

var genUID = function() {
    return [randomString(8),randomString(8)].join('-');
};

var Room = function(creator, name) {
    this.creator = creator;
    this.participants = [creator];
    this.name = name || 'new room';
    this.id = genUID();
};

var rooms = [];
