var conferences = [];
var queryconf=[];
//var date = new Date();
var tempdateNow="";
var tempdateEvent="";


var mysql= require('mysql');
var conexion= mysql.createConnection({
    host: 'localhost',
    database: 'PortesOuvertsGrasset',
    user: 'root',
    password: 'root',
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('conexion correcta.');
    }         
});

conexion.query('select speaker.name, speaker.photolink, conference.linkconference, conference.linkconference, conference.nomconference, event.startdate from speaker left join conference on conference.idspeaker = speaker.idspeaker inner join event on conference.idevent = event.idevent and event.startdate >= NOW()', function(error, results, fields){
    if(error)
    throw error;

    results.forEach(results => {
        queryconf.push(results);
        
        //console.log(results);

        

        tempdateEvent = results;
        
        CargarDatos(tempdateEvent);
        //console.log(tempdateEvent.length);
        
        //console.log(DateCourrant());

    });
});

// conexion.query('select now()', function(error, results, fields){
//     if(error)
//     throw error;

//     results.forEach(results => {
//         queryconf.push(results);
        
//         //console.log(results);

//         tempdateNow = results;
//         CargarDatos(tempdateNow);
//         //console.log(typeof results);
        
//         //console.log(DateCourrant());

//     });
// });

function CargarDatos(tempdateEvent){

    console.log(tempdateEvent);

    // for(const x in tempdateEvent){
    //     console.log(x);
    // }
    //console.log(tempdateNow);

}



conexion.end();


// function DateCourrant(){
//     console.log(date.getFullYear()+"-"+date.getMonth()+'-'+date.getDay()+'T'+date.getHours()+":"+date.getMinutes()+':'+date.getSeconds()+".000Z");

//     var date_yearN = date.getFullYear();
//     var date_year= date_yearN.toString();
//     //var date_monthN = date.get

//     console.log(typeof date_year);

// }

// window.onload=function() {  
//     creerConference();
//     afficherConference();
// }

// function Conference(nomConf, date, img, speaker, link) {
//     this.nomConf = nomConf;
//     this.date = date;
//     this.img =  img;
//     this.speaker = speaker;
//     this.link = link;
// }

// function creerConference(){
//     queryconf.forEach(element => {
//         var c = new Conference('Conference1',queryconf.date,'/img1.jpg', 'Ramiro', queryconf.linkConference)
        
        
//     });
//     var conf1 = new Conference('Conference1','sep-20', '/img1.jpg', 'Ramiro', 'link');
//     var conf2 = new Conference('Conference1','sep-20', '/img1.jpg', 'Ramiro', 'link');
    
//     conferences.push(conf1);
//     conferences.push(conf2);
  
// }

// function afficherConference(){
   
//     conferences.forEach(function(Conference){
//       var divc=document.createElement("div");
//       var divh = document.createElement("div");
//       var divb = document.createElement("div");
//       var img = document.createElement("img");
//       var texteh = document.createTextNode(Conference.date);
//       var textes = document.createTextNode(Conference.speaker);
//       var textec = document.createTextNode(Conference.nomConf);
//       var ph = document.createElement("p");
//       var ps = document.createElement("p");
//       var pc = document.createElement("p");
  
//       pc.appendChild(textec);
//       ph.appendChild(texteh);
//       ps.appendChild(textes);
//       divh.appendChild(pc);
//       divb.appendChild(ph);
//       divb.appendChild(img);
//       divb.appendChild(ps);
//       divc.appendChild(divh);
//       divc.appendChild(divb);
  
//       document.getElementById("resultat").appendChild(divc);
//     })
//   }