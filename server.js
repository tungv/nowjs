var http = require('http');
var nowjs = require("now");
var fs = require('fs');
var util = require('util');


var server = require('http').createServer(function(req, res){
    util.pump(fs.createReadStream('./public/index.html'),res);
});
server.listen(3000);

var everyone = nowjs.initialize(server);

var data = [1,2,3,4,5];

everyone.now.sum = function(callback) {
    callback(this.now.a + this.now.b);
};