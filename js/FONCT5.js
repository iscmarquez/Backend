const  mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var conferences = [];
var queryconf=[];
//var date = new Date();
var tempdateNow="";
var tempdateEvent="";

const app = express();
const PORT = 3000;

const conexion= mysql.createConnection({
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

// bodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//http://www.google.com/about

app.get('/', (req, res, next) => {
    console.log(req.body);
    conexion.query('select speaker.name, speaker.photolink, conference.linkconference, conference.linkconference, conference.nomconference, event.startdate from speaker left join conference on conference.idspeaker = speaker.idspeaker inner join event on conference.idevent = event.idevent and event.startdate >= NOW()', (error, results, fields) => {
        if(error)
            throw error;
    
        return res.json(results);
        // results.forEach(results => {
        //     queryconf.push(results);
        //     //console.log(results);
        //     tempdateEvent = results;
        //     CargarDatos(tempdateEvent);
        //     //console.log(tempdateEvent.length);
        //     //console.log(DateCourrant());
        // });
    });
});

app.get('/event', (req, res, next) => {
    // console.log(req.body);
    conexion.query('select * from event', (error, results, fields) => {
        if(error)
            throw error;
        return res.json(results);
    });
});

app.get('/event/:eventId', (req, res, next) => {
    const eventId = req.params.eventId;
    // console.log(req.body);
    conexion.query(`select speaker.name, speaker.photolink, conference.linkconference, conference.nomconference, event.startdate from speaker left join conference on conference.idspeaker = speaker.idspeaker inner join event on conference.idevent = event.idevent and event.idevent = ${eventId}`, (error, results, fields) => {
        if(error)
            throw error;
        return res.json(results);
    });
});

app.get('/event/eventId/:idspeaker', (req, res, next) => {
    const idspeaker = req.params.idspeaker;
    // console.log(req.body);
    conexion.query(`select speaker.name from speaker left join conference on conference.idspeaker = speaker.idspeaker inner join event on conference.idevent = event.idevent and conference.idspeaker = ${idspeaker}`, (error, results, fields) => {
        if(error)
            throw error;
        return res.json(results);
    });
});
// Add new event
// app.post('/event', (req, res, next) => {
//     console.log(req.body);
//     const event = req.body;

//     conexion.query(`INSERT INTO event (idEvent, startDate, endDate, idUser)
//     VALUES (${event.idEvent}, ${event.startDate}, ${event.endDate}, ${event.idUser})`
//     , (error, results, fields) => {
//         if(error)
//             throw error;
//         return res.json(results);
//     });
// });

// update an event
// app.post('/event/:id', (req, res, next) => {
//     const id = req.params.id;
//     console.log(req.body);
//     const event = req.body;
//     if (event.startDate || event.endDate)
//         conexion.query(`UPDATE INTO event 
//             SET ${event.startDate ? 'startDate = ' + event.startDate : ''}
//                 ${event.endDate ? 'endDate = ' + event.endDate : ''}`
//             , (error, results, fields) => {
//                 if(error)
//                     throw error;
//                 return res.json(results);
//         });
//     else 
//         return res.status(404).json('We cant update the event');
// });

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

//conexion.end();

//set databse connection credentials
// const FONCT5= {
//     host: 'localhost',
//     database: 'PortesOuvertsGrasset',
//     user: 'root',
//     password: 'root',
// };
//set databse connection credentials

//create a MySQL pool

//const pool = mysql.createPool(conexion);

//Export the pool
// module.exports= pool;

//load the MySQL pool connection
//const pool = require('../data/config');

//Display all users

// app.get('/users', (request, reponse)=>{
//     pool.query('select speaker.name, speaker.photolink, conference.linkconference, conference.linkconference, conference.nomconference, event.startdate from speaker left join conference on conference.idspeaker = speaker.idspeaker inner join event on conference.idevent = event.idevent and event.startdate >= NOW()',(error, result)=>{
//         if(error) throw error;
//         response.send(result);
//     });
// });





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