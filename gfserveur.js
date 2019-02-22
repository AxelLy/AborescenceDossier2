  //gfserveur.js
  var http = require("http");
  var fs = require('fs');
  var express = require('express');
  var app = express();
  var controleur = require("./gfcontroleur");
  var creer = require("./creerdossier");
  var leres;


  


  app.use(express.json());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", null);
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
  });
  app.get('/', (req, res) => {
    var result = controleur.Controller.Files();
    res.json(result);
  });

  app.get('/lecontenu', (req, res) => {
    leres = req.query
    var result = creer.Controller.lire(leres.lechemin);
    var leresult = { letexte : result}
    //console.log(leresult)
    res.json(leresult);
    
  });

  app.post('/ecrire', (req,res) => {
    leres = req.body;
    //console.log(leres)
      creer.Controller.ecrire(leres)
  })

  app.post('/', (req,res) => {
    leres = req.body;
    //console.log(leres)
      creer.Controller.lecontenu(leres)
  })
  app.listen(5000, function () {
    console.log('Example app listening on port 5000!')
  })
  http.createServer(function(request, response) {
    response.end('ok');
  }).listen(8000);