//  ----------------------------------------------  CRUD Societe  ----------------------------------------- //

// Preparation et validation du formulaire //

function validateForm() {

  var name = document.getElementById("name").value;
  var email2 = document.getElementById("email").value;
  var address2 = document.getElementById("Address").value;


  if (name == "") {
    alert("Le nom est obligatoire")
    return false;
  }

  if (email2 == "") {
    alert("L'adresse mail est obligatoire")
    return false;
  }
  else if (!email2.includes("@")) {
    alert("Email: saisie invalide")
    return false;
  }

  if (address2 == "") {
    alert("L'adresse est obligatoire")
    return false;
  }

  return true

}

// envoi et enregistrement des données dans le localStorage //


function AddData_2() {

  if (validateForm() == true) {

    var name = document.getElementById("name").value;
    var email2 = document.getElementById("email").value;
    var address2 = document.getElementById("Address").value;

    var societyList = [];

    if (localStorage.getItem('societyList') == null) {
      societyList = [];
    }
    else {
      societyList = JSON.parse(localStorage.getItem("societyList"));
    }

    // Remplissage du tableau //

    societyList.push({
      name: name,
      address2: address2,
      email2: email2,
    });

    localStorage.setItem("societyList", JSON.stringify(societyList));
    // RESET des champs aprés chaque remplissage //

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("Address").value = "";
  }
}

// Affichage des données //

function showData() {

  var societyList;

  if (localStorage.getItem('societyList') == null) {
    societyList = [];
  }
  else {
    societyList = JSON.parse(localStorage.getItem("societyList"));
  }

  var html = "";

  societyList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.email2 + "</td>";
    html += "<td>" + element.address2 + "</td>";
    html += "<td>" + element.employee + "</td>";
    html += '<td><button onclick="deleteData_2(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData_2(' + index + ')" class="btn btn-warning">Edit</button></td>'
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();


// fonction "Delete" //

function deleteData_2(index) {

  var societyList;

  if (localStorage.getItem('societyList') == null) {
    societyList = [];
  }
  else {
    societyList = JSON.parse(localStorage.getItem("societyList"));
  }

  societyList.splice(index, 1);
  localStorage.setItem("societyList", JSON.stringify(societyList));
  showData();
}


// fonction "Edit" //

function updateData_2(index) {

  var societyList;

  if (localStorage.getItem('societyList') == null) {
    societyList = [];
  }
  else {
    societyList = JSON.parse(localStorage.getItem("societyList"));
  }

  // recuperer les données depuis le localstorage et remplissage automatique des champs du formulaire //

  document.getElementById("name").value = societyList[index].name;
  document.getElementById("email").value = societyList[index].email2;
  document.getElementById("Address").value = societyList[index].address2;


  // Modification des champs et re-enregistrement dans le localstorage

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {

      societyList[index].name = document.getElementById("name").value;
      societyList[index].email2 = document.getElementById("email").value;
      societyList[index].address2 = document.getElementById("Address").value;


      localStorage.setItem("societyList", JSON.stringify(societyList));
      showData();

      // Reset des champs aprés modification //

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("Address").value = "";


    }
  }
}
