//  ----------------------------------------------  CRUD employé  ----------------------------------------- //

// Preparation et validation du formulaire //

function validateForm() {

  var first = document.getElementById("first").value;
  var last = document.getElementById("last").value;
  var email = document.getElementById("email").value;
  var societe = document.getElementById("societe").value;
  var address = document.getElementById("Address").value;
  

  if (first == "") {
    alert("Le nom est obligatoire")
    return false;
  }


  if (last == "") {
    alert("Le prenom est obligatoire")
    return false;
  }

  if (address == "") {
    alert("L'adresse est obligatoire")
    return false;
  }


  if (email == "") {
    alert("L'adresse mail est obligatoire")
    return false;
  }
  else if (!email.includes("@")) {
    alert("Email: saisie invalide")
    return false;
  }

  return true

}

// envoi et enregistrement des données dans le localStorage //


function AddData() {

  if (validateForm() == true) {

    var first = document.getElementById("first").value;
    var last = document.getElementById("last").value;
    var email = document.getElementById("email").value;
    var societe = document.getElementById("societe").value;
    var address = document.getElementById("Address").value;
    

    var peopleList = [];

    if (localStorage.getItem('peopleList') == null) {
      peopleList = [];
    }
    else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    // Remplissage du tableau //

    peopleList.push({
      first: first,
      last: last,
      email: email,
      societe: societe,
      address: address,
      
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    // RESET des champs aprés chaque remplissage //

    document.getElementById("first").value = "";
    document.getElementById("last").value = "";
    document.getElementById("email").value = "";
    document.getElementById("societe").value = "";
    document.getElementById("Address").value = "";
    
  }
}

// Affichage des données //

function showData() {

  var peopleList;

  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  }
  else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var html = "";

  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.first + "</td>";
    html += "<td>" + element.last + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.societe + "</td>";
    html += "<td>" + element.address + "</td>";
    html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning">Edit</button></td>'
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();


// fonction "Delete" //

function deleteData(index) {

  var peopleList;

  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  }
  else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}


// fonction "Edit" //

function updateData(index) {

  var peopleList;

  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  }
  else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

// recuperer les données depuis le localstorage et remplissage automatique des champs du formulaire //

  document.getElementById("first").value = peopleList[index].first;
  document.getElementById("last").value = peopleList[index].last;
  document.getElementById("email").value = peopleList[index].email;
  document.getElementById("societe").value = peopleList[index].societe;
  document.getElementById("Address").value = peopleList[index].address;
  

// Modification des champs et re-enregistrement dans le localstorage

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {

      peopleList[index].first = document.getElementById("first").value;
      peopleList[index].last = document.getElementById("last").value;
      peopleList[index].email = document.getElementById("email").value;
      peopleList[index].societe = document.getElementById("societe").value;
      peopleList[index].address = document.getElementById("Address").value;
      

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();

// Reset des champs aprés modification //

      document.getElementById("first").value ="";
      document.getElementById("last").value ="";
      document.getElementById("email").value ="";
      document.getElementById("societe").value ="";
      document.getElementById("Address").value ="";
      

    }
  }
}