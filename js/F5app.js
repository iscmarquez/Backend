const express = require('express');
const app = express();
const port = 3009;
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'pug');

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

app.get('/', (req, res) => {
    // const eventId = req.params.eventId;
    // conexion.query(`select speaker.name, speaker.photolink, conference.linkconference, conference.nomconference, event.startdate from speaker left join conference on conference.idspeaker = speaker.idspeaker inner join event on conference.idevent = event.idevent and event.idevent = ${eventId}`, (error, results, fields) => {
    //     if(error)
    //         throw error;
    //     return res.json(results);
    // });
        
    res.render('Formulaire', {nom:'results.params.name', photo:'results.photolink'})});



app.listen(port, () => console.log(`Example app listening on port port!`));

