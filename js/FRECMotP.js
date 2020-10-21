const  mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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


//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tpsoutienutilisateurs@gmail.com',
    pass: 'Adminroot'
  }
});

// var mensaje = "Hola desde nodejs...";

// var mailOptions = {
//   from: 'tpsoutienutilisateurs@gmail.com',
//   to: 'pawlosierra1@gmail.com',
//   subject: 'Recuperacion clave',
//   text: mensaje
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email enviado: ' + info.response);
//   }
// });

app.post('/User', (req, res, next) => {
  // console.log(typeof res.res);
  // console.log(res.body);
  //res.send('received');
  const emailId = req.body;
  console.log(emailId);
  // for (var key in emailId){
  //   temp = key;
  //   console.log(temp);
  // }
  // console.log("lo que necesito = ", temp);
  // console.log(typeof temp);
  // temp = emailId.toString();
  // console.log(temp);
  try{
  conexion.query(`select User.email, User.password from User where User.username = '${emailId.username}' and User.email = '${emailId.email}'`, (error, results, fields) => {
    // conexion.query(`select User.username, User.email from User`, (error, results, fields) => {
    // conexion.query(`select * from User`, (error, results, fields) => {
      console.log(JSON.stringify(results));
      // if(error){
        // if((error)||(email == undefined)){
        if(error){
        console.log("yo estoy aqui");
        throw error;
        return res.json({ 
            success: false,
            message: "Erreur : L'inscription n'a pas été insérée dans la base de données"
        });
      }
      else{

        //console.log(emailId.username);
        console.log(results);
        // let juan = Object.values(results);
        // console.log(juan[0]);
        // pawlo = Object.values(juan[0]);
        // console.log(typeof pawlo);

        // let r = new Map(Object.entries(results));
        // console.log(r.has(emailId.username));
        //for(let values of results.values()){
      
          // if(values == emailId.username){
          //   console.log("ok");
          // }
       // }
        // console.log(results)
        // console.log(Object.values(results));
        // for(key in results){
        //   console.log(get(key));
        // }
        // console.log(results.indexOf(emailId.username))
        //console.log(Object.keys(results));

//////////////////

        var emailClient = results[0].email;
        console.log(typeof emailClient);
        var passwordClient = results[0].password;
        console.log(typeof passwordClient);


        var mailOptions = {
          from: 'tpsoutienutilisateurs@gmail.com',
          to: emailClient,
          subject: 'Récupération du mot de passe',
          text: 'Votre mot de passe est: '+passwordClient
        };
          transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('e-mail envoyé: ' + info.response);
          }
        });
        
        return res.json({        
          success: true,
          message: "Le succès : Le mot de passe a été envoyée avec succès à l'adresse électronique enregistrée."
      });

      
    }
  
      //     throw error;
      // return res.json(results);
    
  });
}
catch(Err){
    console.error(Err);
    res.status(500).json(
      {
      "readyState":Err.code,
      "status":Err.sqlState,
      "statusText":Err.sqlMessage
      }
    );

}
  //throw 'myException';
  
});


// app.get('/User/:emailId', (req, res, next) => {
//     //  console.log(req.body);
//     // res.send('received');
//     const emailId = req.params.emailId;
//     console.log(emailId);
//     conexion.query(`select User.password, User.email from User where User.email = '${emailId}'`, (error, results, fields) => {
//         if(error)
//             throw error;
//         return res.json(results);
//     });
// });


app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));