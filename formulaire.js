$(document).ready(function (){

    const getprogramDescription = () => {
        var settings = {
            "url": "http://localhost:4011/Program/programDescription",
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            const events = $('#idProgram');
            response.forEach((item) => {
                // events.append(`<li>${item.programDescription} </li>`);
                events.append(`<div><input class="curseId" id="curseId" type="checkbox" value="${item.idProgram}">${item.programDescription} </input></div>`);
                //const cursesIdSelected = $('.curseId:checked').val();//[]
                //console.log(cursesIdSelected);
                
            });
          });
    }

    getprogramDescription();

    // SUBMIT FORM
    $("#formulaire").submit(function(event) {
        // Prevent the form from submitting via the browser
        console.log("Submit!!");
        event.preventDefault();
        processData();
    });
});

function processData(){

    const form2 = $("#formulaire");
    const form = document.getElementById("formulaire")
    console.log("FORM: ", form, "TYPE:",typeof(form));
    var autreText = document.getElementById("autreText").value;///////
    var data = {};
        data.lastName = form.nom.value;
        data.firstName = form.prenom.value;
        data.phone = form.telephone.value;
        data.mail = form.courriel.value;
        data.country = form.pays.value;
        if (data.country == "Canada") {
          data.state = form.province.value;
        } 
        //data.state = form.province.value;
        // data.curseId = $('.curseId:checked').val();
        data.curseId = checkboxSelectionne();
        if (autreText.length > 0) {
          data.moyenCommunication = autreText;
          //data.moyenCommunication = $('.moyenCommunication:checked').val();
        } else {
          data.moyenCommunication = checkboxCommunicationSelectionne();
        }
        //data.moyenCommunication = $('.moyenCommunication:checked').val();
        data.consentMessage = form.consent.value;
        //console.log(data);
    submitForm(data);

}

function checkboxSelectionne(){
  let valeursCheck = [];
$('.curseId:checked').each(function(){
    valeursCheck.push(this.value);
});
return valeursCheck;
}

function checkboxCommunicationSelectionne(){
  let valeursCommunicationCheck = [];
$('.moyenCommunication:checked').each(function(){
  valeursCommunicationCheck.push(this.value);
});
valeursCommunicationCheck.toString();
return valeursCommunicationCheck;
}

function submitForm(data){
    console.log('DATA:', data);
    var settings = {
        "url": "http://localhost:4011/Inscription",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data)
    };
      
    $.ajax(settings).done(function (response) {
      if (response.success){
          alert("Le formulaire a été envoyé avec succès");
          document.getElementById('formulaire').reset();
      }
      else
          alert("Il y a eu une erreur interne dans le serveur")
      });
}

//////////////////////////////////
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

