import m from "mithril"
var Config = require("../Config")
var cheminparent = Config.dossier
var r = []
var recuperer;
var Chart = {
    list: [],
    lecontenufichier: [],
 
    loadList: function(){
        return m.request({
            method:"GET",
            url: Config.serveur_adress,
            withCredentials: false,
            dataType: "jsonp"
        })
        .then(function(result){
            Chart.list = result
        })
        
    },
    contenufichier: function(lesdonnees){
      return m.request({
          method:"GET",
          url: 'http://127.0.0.1:5000/lecontenu',
          dataType: "jsonp",
          data : lesdonnees,
      })
      .then(function(result){
          Chart.lecontenufichier = result
      }) 
  },
    createDoss: function(lesdonnees){
        return m.request({
            method:"POST",
            url: 'http://127.0.0.1:5000/',
            dataType: "jsonp",
            data: lesdonnees
        })
    },
    ecrire: function(lesdonnees){
      return m.request({
          method:"POST",
          url: 'http://127.0.0.1:5000/ecrire',
          dataType: "jsonp",
          data: lesdonnees
      })
  },
    view: function(){
        google.charts.load('current', {packages:["orgchart"]}),
        google.charts.setOnLoadCallback(drawChart),       
        drawChart()
    }
}
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name')
    data.addColumn('string', 'Manager')
    //data.addColumn('string','Path')
    affichage(Chart.list,null,Config.dossier,cheminparent)
    function affichage (tab, leparent, lechemin)
            {
              var chemin;
              var dir;
              for(var x in tab)
              {
                  if(tab[x] instanceof Array)
                  {   
                    chemin = lechemin+ "/"+x
                    //console.log(chemin)
                    r.push([{v:x, f:"<div style = 'background-color: orange;'><a href ="+chemin+" target = '_blank'>"+x+"</a></div>"}, leparent]);
                    creeBtnModifier(chemin, x)
                  }
                  else {
                    chemin = lechemin+ "/"+x
                    //console.log(x+" "+chemin)
                    creeBtnAjoutDoss(chemin,x);
                    r.push([{v:x, f:"<div style = 'background-color: yellow;'>"+x+"</div>"}, leparent]);
                    for (var e in tab[x]){
                      if(tab[x][e] instanceof Array)
                    {
                       dir= chemin + "/" +e
                       //console.log(dir)
                       creeBtnModifier(dir, e)
                      r.push([{v:e, f:"<div style = 'background-color: orange;'><a href ="+dir+" target = '_blank'>"+e+"</a></div>"}, x]);
                      
                    }
                      else{
                         dir= chemin + "/" +e
                        //console.log(dir)
                        creeBtnAjoutDoss(dir,e);
                       r.push([{v:e, f:"<div style = 'background-color: yellow;' >"+e+"</div>"} , x]);
                      affichage(tab[x][e], e, dir);
                      }
                    }  
                }
              }        
              data.addRows(r);  
            }
      
    function creeBtnModifier(lechemin,nomfichier){
      var data = {chemin : lechemin};
      var bouton = document.createElement("button")
      var text = document.createTextNode(nomfichier)
      bouton.addEventListener ("click", function(){
        Chart.contenufichier({lechemin : "C:/Users/axell/OneDrive/Documents/SystemFile/dossier/Un/Trois/c.txt"})
          console.log(Chart.lecontenufichier)
          var lamodif = prompt("Modifier votre fichier : ", Chart.lecontenufichier.letexte)

          if (lamodif !== null){
            Chart.ecrire({lechemin : lechemin, lecontenu : lamodif})
         
          }
     
      })
      bouton.appendChild(text)
      document.body.appendChild(bouton)
    }

    function creeBtnAjoutDoss(lechemin ,nomdossier){
        var bouton = document.createElement("button")
        var text = document.createTextNode(nomdossier)
        bouton.addEventListener ("click", function(){
          
          var letype;
            var nom;
            var sortir = false;
            while((letype != "fichier" && letype != "dossier")&&(sortir == false))
            {
               var pasdenom = true;
               letype = prompt("Veuillez taper 'dossier' ou 'fichier'", "dossier")
                if (letype === "dossier"){
                  pasdenom = false;
                 nom = prompt("Nom du dossier :", "Nouveau dossier")    
                }
                else if (letype == "fichier")
                {
                  pasdenom = false;
                 nom = prompt("Nom du fichier :", "Fichier.txt")
                }

                if((letype== null)||(!pasdenom && nom == null))
                {
                  sortir = true;
                }
          }

          if(sortir == false)
          {
            var data = {chemin : lechemin+"/" +nom, type : letype};
            Chart.createDoss(data)
            location.reload();
          }

        })
        bouton.appendChild(text)
        document.body.appendChild(bouton)
      }
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(data, {allowHtml:true});
    

}
export default Chart