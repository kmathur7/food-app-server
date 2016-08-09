// Setup basic express server
var express = require('express');
var request = require('request');
var heapdump = require('heapdump');  

var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/search', function (req, res) {
  console.log(req.query);
  var options = {
    url: 'https://developers.zomato.com/api/v2.1/search?lat=' + req.query.lat + '&lon=' + req.query.lon + '&radius=' + req.query.radius,
    headers: {
      'user-key': '300a387c4eca4461fb5c7a2e3b3a6265',
      'Content-Type': 'application/json'
    }
  };
  heapdump.writeSnapshot(function(err, filename) {  
  console.log('dump written to', filename);
});
  request(options, callback);

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.send(info);
      res.end();
    }


  }
});

// Routing
app.use(express.static(__dirname + '/public'));
