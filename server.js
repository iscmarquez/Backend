const mysql = require("mysql");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const dateFormat = require('dateformat');

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
        console.log('Connecté sur le serveur!');
    }         
});
//app.use(express.static('./'));

// app.get("/formulaireInscription.html", (req, res) => {
//     // console.log("La méthode GET marche bien");
//     // res.json({ message: "Bienvenu sur l'application"});
//     // const queryProgrammes = "SELECT idProgram, programDescription FROM program";
//     // getConnection().query(queryProgrammes, [idProgram, programDescription], (err, results) => {
//     //     console.log(results);
//     //     if(err) {
//     //         throw err;
//     //     }
//     //     return res.json(results);
//     // });
    
//     //const idProgram = req.params.idProgram;
//     //console.log(req.body);
//     conexion.query(`select * from Program`, (error, results, fields) => {
//         if(error)
//             throw error;
//         return res.json(results);
//     });
// });

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
    //const Interestingprogrammes = req.body;

    // const lastName = req.body.nom;
    // const firstName = req.body.prenom;
    // const phone = req.body.telephone;
    // const mail = req.body.courriel;
    // const country = req.body.pays;
    // const state = req.body.province;
    // //const idProgram = req.body.programmes;
    // const moyenCommunication = req.body.moyenCommunication;
    // const consentMessage = req.body.consent;
    // const date = day;

    // console.log(Inscription);

    // var query = `INSERT INTO Inscription (mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, date)
    // VALUES ("${Inscription.mail}", "${Inscription.firstName}", "${Inscription.lastName}", "${Inscription.country}", "${Inscription.state}", "${Inscription.phone}", "${Inscription.moyenCommunication}", "${Inscription.consentMessage}", "${Inscription.date}")`;

    // console.log(query);

///////////////////OK////////////////////////////
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
            resultsQry1 = results;
            // return res.json(results);
            conexion.query(`INSERT INTO Interestingprogrammes (mail, IdProgram)
            VALUES ("${Inscription.mail}", "${Inscription.courseId}")`
            , (error, results, fields) => {
                if(error){
                    throw error;
                    return res.json({
                        success: false,
                        message: "Erreur : Le programme n'a pas été inséré dans la base de données"
                    });
                } else
                    return res.json({
                        success: true,
                        message: "Le succès : Le contenu a été inséré avec succès"
                    });
            }); 
        }
    }); 

});

///////////////////OK////////////////////////////

/////////////////TEST1/////////////////////

//     const queryStringInscription = `INSERT INTO Inscription (mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, date)
//     VALUES ("${Inscription.mail}", "${Inscription.firstName}", "${Inscription.lastName}", "${Inscription.country}", "${Inscription.state}", "${Inscription.phone}", "${Inscription.moyenCommunication}", "${Inscription.consentMessage}", "${day}")`
    
//     const queryStringProgrammes = `INSERT INTO Interestingprogrammes (mail, IdProgram) VALUES ("${Interestingprogrammes.mail}", "${Interestingprogrammes.curseId}")`

//     conexion.query(queryStringInscription, [mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, date], (err, results, fields) => {
       
//         if (err) {
//             console.log("Une erreur s'est produite" + err)
//             res.sendStatus(500)
//             return
//         }
//         console.log("Données insérées avec succès!" + results.insertedId);
//         res.end()

//     })

//     conexion.query(queryStringProgrammes, [idProgram], (err, results, fields) => {
       
//         if (err) {
//             console.log("Une erreur s'est produite" + err)
//             res.sendStatus(500)
//             return
//         }
//         console.log("Données insérées avec succès!" + results.insertedId);
//         res.end()

//     })
// });
/////////////////TEST1/////////////////////

// app.post('/User', (req, res, next) => {
//     console.log(req.body);
//     const User = req.body;
//     console.log(User);

//     // const lastName = req.body.nom;
//     // const firstName = req.body.prenom;
//     // const phone = req.body.telephone;
//     // const mail = req.body.courriel;
//     // const country = req.body.pays;
//     // const state = req.body.province;
//     // //const idProgram = req.body.programmes;
//     // const moyenCommunication = req.body.moyenCommunication;
//     // const consentMessage = req.body.consent;
//     // const date = day;

//     // var query = `INSERT INTO User (username, email, password, rol)
//     // VALUES ("${User.username}", "${User.email}", "${User.password}", "${User.rol}")`;
//     // console.log(query);
//     conexion.query(`INSERT INTO User (username, email, password, rol)
//     VALUES ("${User.username}", "${User.email}", "${User.password}", "${User.rol}")`
//     , (error, results, fields) => {
//         if(error)
//             throw error;
//         return res.json(results);
//     });
// });


// // app.post('/myaction', function (req, res) {
// app.post('/Inscription', function (req, res) {
//     console.log("La méthode POST marche bien");
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write("<h2>Inscription bien effectuée</h2>" + day);    
//     console.log(req.body);
//     const lastName = req.body.nom;
//     const firstName = req.body.prenom;
//     const phone = req.body.telephone;
//     const mail = req.body.courriel;
//     const country = req.body.pays;
//     const state = req.body.province;
//     const idProgram = req.body.programmes;
//     const moyenCommunication = req.body.moyenCommunication;
//     const consentMessage = req.body.consent;
//     const date = day;

    // const queryStringInscription = "INSERT INTO inscription (mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, date) VALUES (?, ?, ?, ?, ?, ?, ?, 1, now())"
//     const queryStringProgrammes = "INSERT INTO interestingprogrammes (mail, idProgram) VALUES (?, ?);"

//     conexion.query(queryStringInscription, [mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, date], (err, results, fields) => {
       
//         if (err) {
//             console.log("Une erreur s'est produite" + err)
//             res.sendStatus(500)
//             return
//         }
//         console.log("Données insérées avec succès!" + results.insertedId);
//         res.end()

//     })

//     conexion.query(queryStringProgrammes, [idProgram], (err, results, fields) => {
       
//         if (err) {
//             console.log("Une erreur s'est produite" + err)
//             res.sendStatus(500)
//             return
//         }
//         console.log("Données insérées avec succès!" + results.insertedId);
//         res.end()

//     })

// })

// function getConnection() {
//     return mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "PortesOuvertsGrasset1"
//     })
//  }


////////////////////////////////////////

// app.post('/myaction', function (req, res) {
//     console.log("La méthode POST marche bien");
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write("<h2>Inscription bien effectuée</h2>" + day);    
//     console.log(req.body);
//     const lastName = req.body.nom;
//     const firstName = req.body.prenom;
//     const phone = req.body.telephone;
//     const mail = req.body.courriel;
//     const country = req.body.pays;
//     const state = req.body.province;
//     const idProgram = req.body.programmes;
//     const moyenCommunication = req.body.moyenCommunication;
//     const consentMessage = req.body.consent;
//     const date = day;

//     const queryStringInscription = "INSERT INTO inscription (mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, date) VALUES (?, ?, ?, ?, ?, ?, ?, 1, now())"
//     const queryStringProgrammes = "INSERT INTO interestingprogrammes (mail, idProgram) VALUES (?, ?);"

//     getConnection().query(queryStringInscription, [mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, date], (err, results, fields) => {
       
//         if (err) {
//             console.log("Une erreur s'est produite" + err)
//             res.sendStatus(500)
//             return
//         }
//         console.log("Données insérées avec succès!" + results.insertedId);
//         res.end()

//     })

//     getConnection().query(queryStringProgrammes, [idProgram], (err, results, fields) => {
       
//         if (err) {
//             console.log("Une erreur s'est produite" + err)
//             res.sendStatus(500)
//             return
//         }
//         console.log("Données insérées avec succès!" + results.insertedId);
//         res.end()

//     })

// })

// function getConnection() {
//     return mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "PortesOuvertsGrasset1"
//     })
//  }


app.listen(3000, () => {
    console.log("Le serveur marche bien sur le port 3000");
});