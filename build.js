#!/usr/bin/env node

var Minimize = require('minimize');
var browserify = require('browserify');
var CleanCSS = require('clean-css');
var UglifyJS = require('uglify-js');
var mkdirp = require('mkdirp');

mkdirp('./public');

var fs = require('fs');

var minimize = new Minimize({
  empty: true,        // KEEP empty attributes
  cdata: true,        // KEEP CDATA from scripts
  comments: true,     // KEEP comments
  ssi: true,          // KEEP Server Side Includes
  conditionals: true, // KEEP conditional internet explorer comments
  spare: true,        // KEEP redundant attributes
  quotes: true,       // KEEP arbitrary quotes
  loose: true         // KEEP one whitespace
});

var html = fs.readFileSync('src/html/index.html', 'utf8');
var css = new CleanCSS().minify(fs.readFileSync('src/css/index.css', 'utf8')).styles;

var js = browserify(['src/js/index.js']).bundle(function(error, data) {
  var js = UglifyJS.minify(data.toString('utf8'), {fromString: true});
  html = html.replace(':STYLES:', '<style type="text/css">' + css + '</style>');
  html = html.replace(':SCRIPTS:', '<script type="text/javascript">' + js.code + '</script>');
  minimize.parse(html, function(error, data) {
    fs.writeFileSync('public/index.html', data, 'utf8');
  });
});