const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true }));

app.use(express.static('./'));

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

    const queryString = "INSERT INTO inscription (mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, idProgram) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [mail, firstName, lastName, country, state, phone, moyenCommunication, consentMessage, idProgram], (err, results, fields) => {
        if (err) {
            console.log("Une erreur s'est produite" + err)
            res.sendStatus(500)
            return
        }
        console.log("Données insérées avec succès!" + results.insertedId);
        res.end()
    })
})

function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "PortesOuvertsGrasset"
    })
 }


app.listen(3000, () => {
    console.log("Le serveur marche bien sur le port 3000");
});
