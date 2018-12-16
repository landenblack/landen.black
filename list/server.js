var    express = require('express');
var        app = express();
var bodyParser = require('body-parser');


/*

app.use("/assets", express.static('assets'));*/
app.use(bodyParser.json());

/*
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
});*/

app.get('/list/server/', function (req, res) {
    console.log('a');
    res.json({a: "b"});
    return;
});

app.listen(8081);
