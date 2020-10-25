const mysql = require("mysql");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const dateFormat = require('dateformat');
const excel = require('exceljs')
const fs = require('fs');

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

app.post('/Inscription', (req, res, next) => {
    const dateReport = req.body;
    const debut = req.body.debut;
    console.log(debut)
    const fin = req.body.fin;
    console.log(fin)
    console.log(dateReport);

    // res.download(__dirname+" Rapport Inscription "+debut+' à '+fin+".xlsx"," Rapport Inscription "+debut+' à '+fin+".xlsx")
   
    let resultsQry1;
    conexion.query(`select inscription.date, inscription.lastname, inscription.firstname, inscription.phone, inscription.mail, inscription.country, inscription.state, program.programdescription , inscription.moyencommunication from inscription left join interestingprogrammes on inscription.mail = interestingprogrammes.mail inner join program on interestingprogrammes.idprogram = program.idprogram where inscription.date >= '${dateReport.debut}' and inscription.date <= '${dateReport.fin}'`, (error, results, fields) => {

        if(error){
            throw error;
            return res.json({
                success: false,
                message: "Erreur : erreur dans le serveur!!!"
            });
        }
        else{
            if(Object.entries(results).length===0){
                return res.json({ 
                    success: false,
                    message: "Erreur : il n'y a pas d'informations relatives aux dates saisies."
                  });
              }
              else{
            resultsQry1 = results;
            console.log(resultsQry1);

            conexion.query(`select count(idguests) as nombre from guests where dateadmission >= '${dateReport.debut}' and dateadmission <= '${dateReport.fin}'`, (error, results, fields) => {
                if(error){
                    throw error;
                    return res.json({ 
                        success: false,
                        message: "Erreur : "
                    });
                 }
                 else{
                    console.log(results)
                     console.log(debut)
                     console.log(fin)

                    if (typeof debut !== 'undefined' && debut !== null && debut !=="M-DD-YY-Y-"&&
                            	typeof fin !== 'undefined' && fin !== null && fin !=="M-DD-YY-Y-") {
                                let workbook = new excel.Workbook(); // pour creer un nouveaux fichier excel 
                                let worksheet = workbook.addWorksheet('inscription') // pour creer une nouvelle page 
                                worksheet.columns = [                                // creer les titres et les colomnes 
                                  {header: 'date', key: 'date'},                     // donner un nom aux titres 
                                  {header: 'Nom', key: 'lastname'},
                                  {header: 'Prenom', key: 'firstname'},
                                  {header: 'Telephone', key: 'phone'},
                                  {header: 'Mail', key: 'mail'},
                                  {header: 'Pays', key: 'country'},
                                  {header: 'Province', key: 'state'},
                                  {header: 'Programme', key: 'programdescription'},
                                  {header: 'Moyen de Communication', key: 'moyencommunication'}
                                ];
                                worksheet.columns.forEach(column => {            //gerer la taille des colonnes
                                    column.width = column.header.length < 12 ? 12 : column.header.length //si la taille du titre est plus grand que 12 on lui donne la taille de la colonne
                                });
                                worksheet.getColumn("E").width = 25;    // changer manuellement la taille de la colonne
                                worksheet.getColumn("H").width = 50;   // pareil
                                const cell2 = worksheet.getCell('K1');   // mettre une cellule dans une variable par exemple ici la cellule K1
                                cell2.value = "Nombre d'invités";        // change la valeur de la cellule 
                                worksheet.getRow(1).font = {bold: true}; // modifie le style de caracthere de toute la rangee 1
                                // Dump all the data into Excel
                                resultsQry1.forEach((e, index) => {       //place les information de la base de donnee dans le classeur
                                // row 1 is the header.
                                    const rowIndex = index + 2
                                    worksheet.addRow({
                                        ...e,
                                      });
                                });                                  // fin du placement des donnees
                                const cell = worksheet.getCell('K2');
                                cell.value = results[0].nombre; //ici nombre vaut le nombre de guests 
                                workbook.xlsx.writeFile('Rapport Inscription '+debut+' à '+fin+'.xlsx'); // ecrit le classeur avec la date de debut et de fin dans le nom
                            }

                    //Pour telecharger le ficher creer sur rappor inscription
                    // var file = "Rapport Inscription "+debut+' à '+fin+".xlsx";
                    // var files = fs.createReadStream(file);
                    // var stat = fs.statSync(file)
                    // res.writeHead(200, {'Content-disposition': 'attachment; filename=' + file , 'Content-Length': stat.size}); //here you can specify file name
                    // files.pipe(res);
                    // files.on('end',function(){
                    //     fs.unlinkSync("./"+file);
                    // });
                    ////////////////////////////////////////
    
                    return res.json({        
                        success: true,
                        message: "Le succès : les rapports d'inscription a été généré avec succès"
                    });
                 }
         });
        }
    }
    });
});

app.post('/Programme', (req, res, next) => {
    const dateReport = req.body;
    const debut = req.body.debut;
    console.log(debut)
    const fin = req.body.fin;
    console.log(fin)

    console.log(dateReport);
   
    let resultsQry1;
    conexion.query(`Select COUNT(InterestingProgrammes.mail)as NombreDePersonnesInscrites, Program.programDescription FROM InterestingProgrammes LEFT JOIN Inscription ON Inscription.mail = InterestingProgrammes.mail INNER JOIN Program ON InterestingProgrammes.idProgram = Program.idProgram WHERE Inscription.date >= '${dateReport.debut}' AND Inscription.date <= '${dateReport.fin}' GROUP BY(Program.programDescription)`, (error, results, fields) => {
        if(error){
            throw error;
            return res.json({
                success: false,
                message: "Erreur : erreur dans le serveur!!!"
            });
        }
        else{
            console.log(results)
            if(Object.entries(results).length===0){
                return res.json({ 
                    success: false,
                    message: "Erreur : il n'y a pas d'informations relatives aux dates saisies."
                  });
              }
              else{
                console.log(results)

                if (typeof debut !== 'undefined' && debut !== null && debut !=="M-DD-YY-Y-"&&
                            	typeof fin !== 'undefined' && fin !== null && fin !=="M-DD-YY-Y-") {
                                let workbook = new excel.Workbook(); // pour creer un nouveaux fichier excel 
                                let worksheet = workbook.addWorksheet('inscription') // pour creer une nouvelle page 
                                worksheet.columns = [                                // creer les titres et les colomnes 
                                  {header: 'Nombre de personnes inscrites', key: 'NombreDePersonnesInscrites'},                     // donner un nom aux titres 
                                  {header: 'Description du programme', key: 'programDescription'},
                                ];
                                worksheet.columns.forEach(column => {            //gerer la taille des colonnes
                                    column.width = column.header.length < 2 ? 2 : column.header.length //si la taille du titre est plus grand que 12 on lui donne la taille de la colonne
                                });
                                worksheet.getColumn("A").width = 25;    // changer manuellement la taille de la colonne
                                worksheet.getColumn("B").width = 90;   // pareil
                                worksheet.getRow(1).font = {bold: true}; // modifie le style de caracthere de toute la rangee 1     
                                // Dump all the data into Excel
                                results.forEach((e, index) => {       //place les information de la base de donnee dans le classeur
                                // row 1 is the header.
                                    const rowIndex = index + 2
                                    worksheet.addRow({
                                        ...e,
                                      });
                                });                                  // fin du placement des donnees                              
                                workbook.xlsx.writeFile('Rapport Programme '+debut+' à '+fin+'.xlsx'); // ecrit le classeur avec la date de debut et de fin dans le nom
                            }

                return res.json({        
                    success: true,
                    message: "Le succès : les rapports de programme a été généré avec succès"
                });
              }  
        }
    });  
});

app.listen(3000, () => {
    console.log("Le serveur marche bien sur le port 3000");
});
