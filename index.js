var qr = require('qr-image'),
    fs = require('fs'),
    express = require('express'),
    compression = require('compression'),
    morgan = require('morgan'),
    app = express();

var PORT = process.env.PORT || 3000;

var indexHTML = function() { return fs.readFileSync('./index.html', 'utf8'); };
var indexCSS = function() { return fs.readFileSync('./index.css', 'utf8'); };

var cachedIndexHTML = indexHTML();
var cachedIndexCSS = indexCSS();

app.use(morgan('combined'));

app.use(compression());

app.get('/', function(req, res) {
  res.send(cachedIndexHTML);
});

app.get('/index.css', function(req, res) {
  res.send(cachedIndexCSS);
});

app.use(function(req, res) {
  var what = unescape(req.url.substring(1));
  res.header('Content-Type', 'image/svg+xml');
  qr.image(what, { type: 'svg'}).pipe(res);
});

app.listen(PORT);
console.log('Application listening on', PORT);