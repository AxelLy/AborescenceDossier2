// gfcontroleur.js
var fs = require('fs');
var c = require('./Config')
clog= console.log;
var lechemin = c.dossier;

var Controller = 
{
    Files: function(){ 
    var result = grapheFiles(lechemin);
    return result;
    }
}

clog(grapheFiles(lechemin));
function grapheFiles (dir, result, dossier){
    var result = {};
    var files = fs.readdirSync(dir);

for (var i in files){   
    var chemin = dir + '/' + files[i];  
    if (fs.statSync(chemin).isFile()){
        result[files[i]] = []
    }
    else if(fs.statSync(chemin).isDirectory()){  
        result[files[i]] = grapheFiles(chemin, result, dossier);
    }    
}     
return result;
}
module.exports = { Controller }