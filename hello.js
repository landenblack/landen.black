var    express = require('express');
var        app = express();
var       exec = require('child_process').exec;
var bodyParser = require('body-parser');


app.use("/assets", express.static('assets'));
app.use("/game", express.static('game'));
app.use("/MOEnjs", express.static('MOEnjs'));
app.use(express.static('MOEnjs/SpriteBatch'));
app.use("/tetris", express.static('tetris'));
app.use("/tetris/local", express.static('tetris/local'));
app.use("/public", express.static('public'));
app.use(bodyParser.json());


app.post("/git/", function (req, res) {
  var sender = req.body.sender;
  var branch = req.body.ref;

  if(branch.indexOf('master') > -1 && sender.login === 'landenblack'){
    console.log('pulling');
    exec('git pull');
    console.log('restarting pm2 processes');
    exec('pm2 restart all');
    console.log('compiling tsc');
    exec('tsc');
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
