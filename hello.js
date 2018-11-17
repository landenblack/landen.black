var express = require('express');
var app = express();

app.use("/game", express.static('game'));
app.use("/tetris", express.static('tetris'));
app.use("/tetris/local", express.static('tetris'));
app.use("/public", express.static('public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

app.get('/game/', function (req, res) {
  res.sendFile(__dirname+'/game/game.html');
});

app.get('/tetris/', function (req, res) {
  res.sendFile(__dirname+'/tetris/tetris.html');
});

app.get('/tetris/local/', function (req, res) {
  res.sendFile(__dirname+'/tetris/local/tetris.html');
});

app.get('/tetris/multiplayer/', function (req, res) {
  res.sendFile(__dirname+'/tetris/multiplayer/tetris.html');
});

app.get('*', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

/*
app.get('/public/:file', function( req, res ) {
  res.sendFile(__dirname+'/public/'+req.params.file);
});
*/

app.listen(8080);
