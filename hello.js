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
app.use(bodyParser.urlencoded({extended: false}));


app.post("/git/", function (req, res) {
  var sender = req.body.sender;
  var branch = req.body.ref;

  if(branch.indexOf('master') > -1 && sender.login === 'landenblack'){
    console.log('pulling');
    exec('git pull');
    console.log('compiling tsc');
    exec('tsc');
    console.log('restarting pm2 processes');
    exec('pm2 restart all');
    
  }
});


require('./list/list.server.js')();
app.post('/list/server/', function (req, res) {
  var user = 1; // replaced with user session

  if (req.body.action === "get_books") {
    res.json(jsonFile("./list/books.json"));
    return;
  }
  if (req.body.action === "get_lists") {
    res.json(getLists(user));
    return;
  }

  res.json({message: "no action"});
  return;
});

app.get('/list/', function (req, res) {
  res.sendFile(__dirname+'/list/list.html');
  return;
});
app.get('/list/jquery.sortable.js', function (req, res) {
  res.sendFile(__dirname+'/list/jquery.sortable.js');
  return;
});
app.get('/list/list.client.js', function (req, res) {
  res.sendFile(__dirname+'/list/list.client.js');
  return;
});

app.get('/game/', function (req, res) {
  res.sendFile(__dirname+'/game/game.html');
  return;
});

app.get('/tetris/', function (req, res) {
  res.sendFile(__dirname+'/tetris/tetris.html');
  return;
});

app.get('/tetris/local/', function (req, res) {
  res.sendFile(__dirname+'/tetris/local/tetris.html');
  return;
});

app.get('/tetris/multiplayer/', function (req, res) {
  res.sendFile(__dirname+'/tetris/multiplayer/tetris.html');
  return;
});

app.get('*', function (req, res) {
  res.sendFile(__dirname+'/index.html');
  return;
});

app.listen(8080);
