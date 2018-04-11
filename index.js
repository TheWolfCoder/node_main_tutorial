var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

//Configure the server to respond to all requests with a string
var httpServer = http.createServer(function(req, res)
 {
   logicServer(req,res);
 });


//Start the server
  httpServer.listen(9997, function(req, res)
 {
   console.log("Server listening on port" + 9997);
 });

//Implement the server logic
var logicServer = function(req, res) {

 var parsedUrl = url.parse(req.url, true)
 var path = parsedUrl.pathname;
 var trimmedPath = path.replace(/^\/+|\/+$/g, '');
 var queryString = parsedUrl.query;
 var method = req.method.toLowerCase();
 var header = req.headers;

    //get the payload if any
    var decoder = new StringDecoder("utf-8");
    var buffer = '';

    req.on('data', function(data) {
     buffer += decoder.write(data);
    });
    
    req.on('end', function(){
     buffer += decoder.end();
 

    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;


    var data = {
     'trimmedPath' : trimmedPath,
     'queryString' : queryString,
     'method' : method,
     'payload' : buffer,
     'header' : header
    };

     chosenHandler(data, function(statusCode, payload)
       {
         statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
         payload = typeof(payload) == 'object' ? payload: {};

         payloadString = JSON.stringify(payload);

         res.setHeader('Content-Type', 'application/json');
         res.writeHead(statusCode);
         res.end(payloadString);
       });

     });   

};


//Define all the handlers
var handlers = {};

handlers.show = function(data, callback)
{
  callback(301);
};   

handlers.index = function(data, callback)
{
  callback(302);
};

handlers.update_records = function(data, callback)
{
  callback(303);
};

handlers.delete_records = function(data, callback)
{
  callback(304);	
}

handlers.create_records = function(data, callback)
{
  callback(305);	
}

var router = {
	"show" : handlers.show,
	"index" : handlers.index,
	"update_records" : handlers.update_records,
	"delete_records" : handlers.delete_records,
	"create_records" : handlers.create_records
}