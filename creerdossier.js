// gfcontroleur.js
var fs = require('fs');
var c = require('./Config')
clog= console.log;


var Controller = 
{
    lecontenu: function(contenu){ 
        clog(contenu.chemin)
        if(contenu.type == "dossier")
        {
            creerledossier(contenu.chemin);   
        }
        else {
            console.log("fichier")
            creerlefichier(contenu.chemin);
        }
    },
    lire: function(lechemin){
        var content = fs.readFileSync(lechemin,'utf8')
        return content;
    },
    ecrire: function(data){
        clog(data)
        fs.appendFile(data.lechemin, data.lecontenu, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
    }
}


function creerlefichier(lechemin){
    fs.appendFile(lechemin, ' This is my text.', function (err) {
      if (err) throw err;
      console.log('Updated!');
    });

}

function creerledossier(lechemin){
    clog(lechemin)
    if (!fs.existsSync(lechemin)){
        fs.mkdirSync(lechemin);
    }
}


module.exports = { Controller }