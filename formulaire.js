// $(window).on("load", function (){

//   $.ajax({
//     "url": "http://localhost:3000/formulaireInscription.html",
//     "method": "GET",
//     "data": "idProgram", "programDescription",
//     "timeout": 0,
//   }).done(function (response) {
//       console.log(response);
//       const events = $('#idProgram');
//       response.forEach((item) => {
//           console.log(JSON.stringify(item));
//           events.append(`<input type="checkbox" value="' ${item.programDescription} "' name = " ${item.idProgram} " />`);
//       });
//     }); 
// } );

// $(document).ready(function (){

//     $.ajax({
//       "url": "http://localhost:3000/formulaireInscription.html",
//       "method": "GET",
//       "timeout": 0,
//     }).done(function (response) {
//         console.log(response);
//         const events = $('#idProgram');
//         response.forEach((item) => {
//             console.log(JSON.stringify(item));
//             events.append(`<input type="checkbox" value="' ${item.programDescription} "' name = " ${item.idProgram} " />`);
//         });
//       }); 
//   } );

$(document).ready(function (){

    const getprogramDescription = () => {
        var settings = {
            "url": "http://localhost:3000/Program/programDescription",
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            const events = $('#idProgram');
            response.forEach((item) => {
                // events.append(`<li>${item.programDescription} </li>`);
                events.append(`<div><input class="courseId" type="checkbox" value="${item.idProgram}">${item.programDescription} </input></div>`);
                //const cursesIdSelected = $('.curseId:checked').val();//[]
                //console.log(cursesIdSelected);
            });
          });
    }

    getprogramDescription();

    // if (document.getElementById("autre").checked) {
    //   document.getElementById("autreText").style.visibility='visible';
    // } else {
    //     document.getElementById("autreText").style.visibility='hidden';
    // }


    // $('input[type="radio"]').click(function(){
    //   if(!$(autreText).val()) {
    //     //input element where you put value
    //     $(autre).empty();
    //     $(bouche).empty();
    //     $(web).empty();
    //     $(reseaux).empty();
    //     $(journal).empty();
    //     $(carrefour).empty();            
    //   } 
    // } 
    // SUBMIT FORM
    $("#formulaire").submit(function(event) {
        // Prevent the form from submitting via the browser
        console.log("Submit!!");
        event.preventDefault();
        processData();
    });
});

function afficherCacher() {
  var autre = document.getElementById("autre");
  var dvtext = document.getElementById("autreText");
  dvtext.style.display = autre.checked ? "inline" : "none";
}

function changeFunc() {
  var selectBox = document.getElementById("selectBox");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  if (selectedValue != "Canada") {
    document.getElementById("provinceLabel").style.display = "none";
    document.getElementById("province").style.display = "none";
  } else {
    document.getElementById("provinceLabel").style.display = "inline";
    document.getElementById("province").style.display = "inline";
  }
 }


function processData(){
    const form2 = $("#formulaire");
    const form = document.getElementById("formulaire")
    console.log("FORM: ", form, "TYPE:",typeof(form));
    var autreText = document.getElementById("autreText").value;
    var data = {};
        data.lastName = form.nom.value;
        data.firstName = form.prenom.value;
        data.phone = form.telephone.value;
        data.mail = form.courriel.value;
        data.country = form.pays.value;
        if (data.country == "Canada") {
          data.state = form.province.value;
        } 
        data.courseId = checkboxProgrammeSelectionne();
        if (autreText.length > 0) {
          data.moyenCommunication = autreText;
          //data.moyenCommunication = $('.moyenCommunication:checked').val();
        } else {
          data.moyenCommunication = checkboxCommunicationSelectionne();
        }
        data.consentMessage = form.consent.value;
        console.log(data);
    submitForm(data);
  }
  
  function checkboxProgrammeSelectionne(){
    let valeursProgrammeCheck = [];
  $('.courseId:checked').each(function(){
      valeursProgrammeCheck.push(this.value);
  });
  return valeursProgrammeCheck;
  }

  function checkboxCommunicationSelectionne(){
    let valeursCommunicationCheck = [];
  $('.moyenCommunication:checked').each(function(){
      valeursCommunicationCheck.push(this.value);
  });
  return valeursCommunicationCheck;
  }


  // else if($(this).is(":not(:checked)")){
  //   $("#isClicked").val("");
  //   //  console.log( $("#isClicked").val());
  // }


/*function valider(f){
    console.log("FORM", f);
    // Le nom est obligatoire et ne doit pas être un champ vide. Le champ ne doit
    // pas comporté d'espace. Afficher un message alert, si erreur.
    var nom = f.nom.value.trim(); 
    if (nom =="") {
        alert("Le nom est obligatoire.");
        return false;
     }

    var prenom = f.prenom.value.trim(); 
    if (prenom =="") {
        alert("Le prénom est obligatoire.");
        return false;
     }

    var numeroDeTelephone = f.numeroDeTelephone.value.trim(); 
    if (numeroDeTelephone =="") {
        alert("Le numero de téléphone est obligatoire.");
        return false;
     }

    // Le courriel est obligatoire et ne doit pas être un champ vide. Le champ ne
    // doit pas comporté d'espace.. 
    // Le courriel doit comporté le caractère @.
    // Affichier un message d'alert si erreur.
    var courriel = f.courriel.value.trim(); 
    if (courriel =="") {
        alert("Le courriel est obligatoire.");
        return false;
     }
    if (!courriel.includes("@")) {
        alert("Le format du courriel est invalide.");
        return false;
     }
    if (courriel.includes(" ")) {
        alert("Le format du courriel est invalide.");
        return false;
     }

    var paisCanada = f.paisCanada.value.trim();
    if(paisCanada == "Canada"){
        console.log("FCanada", f.paisCanada.value);
        console.log(f.prenom.value);
        console.log(paisCanada);
    }
  
//     // La réponse à l'équation ne doit pas être vide, et il faut 
//     // supprimer les espaces au début et à la fin de la chaîne de carctère.
//     // Il faut comparer la chaîne de caractère entré par l'utilisateur avec la
//     // réponse de l'addition du nombre1 et nombre2.
  
//     var reponseUtilisateur = parseInt(f.reponse.value.trim()); 
//     var addition = nombre1+nombre2;
//     if (!(reponseUtilisateur === addition)) {
//         alert("La réponse n'est pas bonne.");
//         return false;
//      }
  
    //Si aucun message d'erreur n'est survenu, afficher un message d'alert('Inscris à l'infolettre avec succès').
    alert("Inscris à l'infolettre avec succès");
    return true;
  }*/

  function submitForm(data){
      console.log('DATA:', data);
      var settings = {
        "url": "http://localhost:3000/Inscription",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data)
      };
      
      // if ($(document.getElementById("autre")).is(':checked')) {
      //   document.getElementById("autreText").style.visibility = "visible";
      // }


      $.ajax(settings).done(function (response) {
        if (response.success)
          alert("Le formulaire a été envoyé avec succès")
        else
          alert("Il y a eu une erreur interne dans le serveur")
      });
  }


  
var labelMoyen = document.getElementById("labelMoyen");
var bouche = document.getElementById("bouche");
var web = document.getElementById("web");
var reseaux = document.getElementById("reseaux");
var journal = document.getElementById("journal");
var carrefour = document.getElementById("carrefour");
var autre = document.getElementById("autre");
var autreText = document.getElementById("autreText");



