const  mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

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

// bodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/Speaker', (req, res, next) => {
     //console.log(req.body);
    conexion.query(`SELECT * FROM Speaker WHERE chat= true`, (error, results, fields) => {
        if(error)
            throw error;
        return res.json(results);
    });
});


app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
