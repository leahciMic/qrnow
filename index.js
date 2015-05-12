var fs = require('fs'),
    express = require('express'),
    compression = require('compression'),
    morgan = require('morgan'),
    app = express();

var PORT = process.env.PORT || 3000;
var indexHTML = function() { return fs.readFileSync('./public/index.html', 'utf8'); };
var cachedIndexHTML = indexHTML();

app.use(morgan('combined'));
app.use(compression());

app.get('/', function(req, res) {
  res.send(cachedIndexHTML);
});

app.listen(PORT);
console.log('Application listening on', PORT);