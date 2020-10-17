﻿const mysql = require("mysql");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const dateFormat = require('dateformat');
const { query } = require("express");



const day=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");


app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cors());

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

app.get('/Program/programDescription', (req, res, next) => {
    
    conexion.query(`select idProgram, programDescription from Program`, (error, results, fields) => {
        if(error)
            throw error;
        return res.json(results);
    });
});

// Add new inscription
app.post('/Inscription', (req, res, next) => {
    console.log(req.body);
    const Inscription = req.body;
 
    let resultsQry1;
    conexion.query(`INSERT INTO Inscription (mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, date)
    VALUES ("${Inscription.mail}", "${Inscription.firstName}", "${Inscription.lastName}", "${Inscription.country}", "${Inscription.state}", "${Inscription.phone}", "${Inscription.moyenCommunication}", "${Inscription.consentMessage}", "${day}")`
    , (error, results, fields) => {
        if(error){
            throw error;
            return res.json({
                success: false,
                message: "Erreur : L'inscription n'a pas été insérée dans la base de données"
            });

            
          
        }
        else {

            //-------PLUSIEURS MOYENS DE COMMUNICATION--------

            resultsQry1 = results;
            //resultsQry2 = results;
            // return res.json(results);
        
             let temporaire = `${Inscription.moyenCommunication}`;
            // console.log(typeof temp);
             var arrayMoyen = temporaire.split(",");
            // console.log(typeof array);
             console.log(arrayMoyen.length);
          
            // for(let i=0; i<=array.length;i++){
            //     console.log(array[i]);
            // }
            
            for(let i=0; i<arrayMoyen.length;i++){/////
                console.log(arrayMoyen[i]);
            // conexion.query(`INSERT INTO Interestingprogrammes (mail, IdProgram)
            // VALUES ("${Inscription.mail}", "${Inscription.curseId}")`
            conexion.query(`INSERT INTO Inscription (moyenCommunication)
            VALUES ("${Inscription.mail}", "${arrayMoyen[i]}")`
            , (error, results, fields) => {
                console.log(results);
                if(error){
                    throw error;
                    return res.json({
                        success: false,
                        message: "Erreur : Le programme n'a pas été inséré dans la base de données"
                    });
                } else
                //console.log(res.json)
                //if(i==array.length){
                    // return res.json({
                    //     success: true,
                    //     message: "Le succès : Le contenu a été inséré avec succès"
                    // });
                    return "Le succès : Le contenu a été inséré avec succès";
               // }
            });
            }////



            //------------PLUSIEURS PROGRAMMES---------
            
            resultsQry1 = results;
            //resultsQry2 = results;
            // return res.json(results);
        
             let temp = `${Inscription.courseId}`;
            // console.log(typeof temp);
             var array = temp.split(",").map(Number);
            // console.log(typeof array);
             console.log(array.length);
          
            // for(let i=0; i<=array.length;i++){
            //     console.log(array[i]);
            // }
            
            for(let i=0; i<array.length;i++){/////
                console.log(array[i]);
            // conexion.query(`INSERT INTO Interestingprogrammes (mail, IdProgram)
            // VALUES ("${Inscription.mail}", "${Inscription.curseId}")`
            conexion.query(`INSERT INTO Interestingprogrammes (mail, IdProgram)
            VALUES ("${Inscription.mail}", "${array[i]}")`
            , (error, results, fields) => {
                console.log(results);
                if(error){
                    throw error;
                    return res.json({
                        success: false,
                        message: "Erreur : Le programme n'a pas été inséré dans la base de données"
                    });
                } else
                //console.log(res.json)
                //if(i==array.length){
                    // return res.json({
                    //     success: true,
                    //     message: "Le succès : Le contenu a été inséré avec succès"
                    // });
                    return "Le succès : Le contenu a été inséré avec succès";
               // }
            });
            }////

            ////
        }
    }); 

});

app.listen(3000, () => {
    console.log("Le serveur marche bien sur le port 3000");
});