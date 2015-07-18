var fs = require('fs');
var http = require('http');

var port = 8011;

http.createServer(function(req,res){
	if(req.url == 'favicon.ico'){res.end()}
	var file = fs.readFileSync(__dirname+req.url.replace(/\?.*$/i,''),{encoding:'utf-8'});
	res.writeHead(200, {'Content-Type':'text/javascript'});
	res.end(file);
}).listen(port,function(){console.log('listening '+port+'...')});