var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var player = require('play-sound') (opts = {});
var fs = require('fs');

var speak = require('simple-tts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

//app.post('/save',save);
app.get('/load', load);
app.post('/playGong', playGong);

var listener = app.listen(8082);

console.log("Running Server on " + listener.address().port +' ...');

function playGong (req, res) {

  console.log('In playGong...');


  speak('go greg smith. 100,000 in new ARR', {format:'mp3', filename:'mp3/hello_world'});
  player.play('mp3/hello_world.mp3', function (err) {
     if (err) throw err
  }) 

  console.log(req.body);

  res.sendStatus(200);

}


function save (req, res) {

  console.log('In save...');

  console.log(req.body);

  fs.writeFile("/tmp/test.txt", JSON.stringify(req.body), function(err) {
     if(err) {
        return console.log(err);
     }
     console.log("The File was saved");
   });
  res.sendStatus(200);

}

function load (req, res) {


  console.log('In load...');

   fs.readFile('/tmp/test.txt', 'utf8', function (err, data) {
      if (err) {
         throw err; 
      }
     console.log(data);
     res.send(data);
    });

}

