var express = require('express'),
    pkg = require('./package.json'),
    app = express();

app.set('port', 8000);

// enables compression for all requests
//app.use(express.compress());

// mounts and configures rest api

app.get('/', function(req, res){
  res.send('This is the landing page');
});

app.get('/hello', function(req, res){
  res.send('Hello World');
});

app.listen(app.get('port'));
