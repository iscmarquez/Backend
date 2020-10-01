const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Bienvenu sur l'application"});
});

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "PortesOuvertsGrasset"
});

app.listen(3000, () => {
    console.log("Le serveur marche bien sur le port 3000");
});

connection.connect(error => {
    if (error) throw error;
    console.log("Connecté sur la base de données avec succès!");
});

const User = function(user) {
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.telephone = user.telephone;
    this.email = user.email;
    this.pays = user.pays;
};

User.create = (newUser, result) => {
    connection.query("INSERT INTO User SET ?", newUser, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }

        console.log("Création de l'utilisateur: ", {username: res.insertusername, newUser});
        result(null, { username: res.insertusername, newUser});
    });
};




