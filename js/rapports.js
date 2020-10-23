const mysql = require("mysql");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const dateFormat = require('dateformat');
const exceljs = require('exceljs')



const day=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");


app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cors());

const conexion= mysql.createConnection({
    host: 'localhost',
    database: 'PortesOuvertsGrasset1',
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

app.get('/Inscription/:debut/:fin', (req, res, next) => {
    //const dateReport = req.body;
    const debut = req.params.debut;
    const fin = req.params.fin;

    console.log(debut);


    // conexion.query(`select inscription.date, inscription.lastname, inscription.firstname, inscription.phone, inscription.mail, inscription.country, inscription.state, program.programdescription , inscription.moyencommunication from inscription left join interestingprogrammes on inscription.mail = interestingprogrammes.mail inner join program on interestingprogrammes.idprogram = program.idprogram where inscription.date >= '${debut}'`, (error, results, fields) => {
    
    //;select count(idguests) as nombre from guests where dateadmission >= '${debut}
    let resultsQry1;
    conexion.query(`select inscription.date, inscription.lastname, inscription.firstname, inscription.phone, inscription.mail, inscription.country, inscription.state, program.programdescription , inscription.moyencommunication from inscription left join interestingprogrammes on inscription.mail = interestingprogrammes.mail inner join program on interestingprogrammes.idprogram = program.idprogram where inscription.date >= '${debut}' and inscription.date <= '${fin}'`, (error, results, fields) => {

    // conexion.query(`select inscription.date, inscription.lastname, inscription.firstname, inscription.phone, inscription.mail, inscription.country, inscription.state, program.programdescription , inscription.moyencommunication from inscription left join interestingprogrammes on inscription.mail = interestingprogrammes.mail inner join program on interestingprogrammes.idprogram = program.idprogram where inscription.date >= '${dateReport.debut}' and inscription.date <= '${dateReport.fin}';select count(idguests) as nombre from guests where dateadmission >= '${dateReport.debut}' and dateadmission <= '${dateReport.fin}'`, (error, results, fields) => {
        if(error){
            throw error;
            return res.json({
                success: false,
                message: "Erreur : L'inscription n'a pas été insérée dans la base de données"
            });
        }
        else{
            resultsQry1 = results;
            console.log(resultsQry1);
            conexion.query(`select count(idguests) as nombre from guests where dateadmission >= '${debut}' and dateadmission <= '${fin}'`, (error, results, fields) => {
                if(error){
                    throw error;
                    return res.json({ 
                        success: false,
                        message: "Erreur : L'inscription n'a pas été insérée dans la base de données"
                    });
                 }
                 else{
            
                    console.log(results)
                    return res.json(results);
                 }
            
         });
        }
    });
});



app.listen(3000, () => {
    console.log("Le serveur marche bien sur le port 3000");
});
