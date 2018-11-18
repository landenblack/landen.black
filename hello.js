var    express = require('express');
var        app = express();
var       exec = require('child_process').exec;
var bodyParser = require('body-parser');


app.use("/game", express.static('game'));
app.use("/tetris", express.static('tetris'));
app.use("/tetris/local", express.static('tetris'));
app.use("/public", express.static('public'));
app.use(bodyParser.json());


app.post("/git/", function (req, res) {
  var sender = req.body.sender;
  var branch = req.body.ref;

  if(branch.indexOf('master') > -1 && sender.login === 'landenblack'){
    console.log('pulling');
    exec('git pull');
  }
});

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

app.listen(8080);
