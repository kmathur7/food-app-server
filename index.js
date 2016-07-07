// Setup basic express server
var express = require('express');
var request = require('request');
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

  var options = {
    url: 'https://developers.zomato.com/api/v2.1/search?lat=40.732013&lon=-73.996155&radius=100',
    headers: {
      'user-key': '300a387c4eca4461fb5c7a2e3b3a6265',
      'Content-Type': 'application/json'
    }
  };

  function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
    res.send(info);
    
  }
  res.send({});
}

request(options, callback);


});

// Routing
app.use(express.static(__dirname + '/public'));