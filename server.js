const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true }));

app.use(express.static('./'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "PortesOuvertsGrasset"
});

app.get("/", (req, res) => {
    console.log("La méthode GET marche bien");
    res.json({ message: "Bienvenu sur l'application"});
});

app.post('/myaction', function (req, res) {
    console.log("La méthode POST marche bien");
    res.send(req.body);
    console.log(req.body);
    var lastName = req.body.nom;
    var firstName = req.body.prenom;
    var phone = req.body.telephone;
    var mail = req.body.courriel;
    var country = req.body.pays;
    var state = req.body.province;
    var idProgram = req.body.programmes;
    var moyenCommunication = req.body.moyenCommunication;
    var consentMessage = req.body.consent;

    con.connect(error => {
        if (error) throw error;
        console.log("Connecté sur la base de données avec succès!");

        var sql = "INSERT INTO `inscription`(`lastName`,`firstName`, `phone`, `mail`, `country`, `state`, `idProgram`, `moyenCommunication`, `consentMessage`) VALUES ('"+lastName+"','"+firstName+"','"+phone+"','"+mail+"','"+country+"','"+state+"','"+idProgram+"','"+moyenCommunication+"','"+consentMessage+"')";
        con.query(sql, function (err) {
            if (err) throw err;
            console.log("One record inserted");
        });
    });
    res.json({ message: "Les données ont été bien insérées"});
 
});


app.listen(3000, () => {
    console.log("Le serveur marche bien sur le port 3000");
});
