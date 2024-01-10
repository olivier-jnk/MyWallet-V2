let comptes = {};
let accountNum = 0;

window.onload = function () {
  chargerComptes();
};


function initCompte (){
    nomz = prompt('Nom')
    valeurz = prompt('valeur')
    creerCompte(nomz, valeurz)
}

function creerCompte(nom, valeur) {
    if (!comptes.hasOwnProperty(nom)) {
      comptes[nom] = { nom: nom, valeur: valeur };
      sauvegarderComptes();
      location.reload();
    } else {
      alert("Le compte existe déjà :", nom);
    }
}

function ajouterArgent (){ 
  somme = prompt('entrez la somme à ajouter')
  raison = prompt('Quel est la raison')
  if (somme !== isNaN && somme !== null && somme !== 0) {

  } else {
      alert('Veuillez entrer un nombre valide')
  }
}

// Récupérer le nom du compte sur lequel le boutton à été activé et modifier la somme dans l'objet.
// function retirerArgent (){
//   soustraction = prompt('entrez la somme à soustraire')
//   raison = prompt('Quelle est la raison')
//   if (soustraction !== isNaN && soustraction !== null && soustraction !== 0) {
//     raisonRetrait = raisonRetrait + 1;
//       argent = parseInt(argent) - parseInt(soustraction)
//       document.getElementById('laSomme' + aNum).innerHTML = argent + ' euros';

//       let raisonsGet = document.getElementById('raisons' + aNum)
//       console.log(aNum)
//       let raisonLi = document.createElement('li')
//       raisonLi.id = "raisonRetrait" + aNum + 0 + raisonRetrait;
//       raisonLi.className = "valeurSuivi"

//       raisonsGet.appendChild(raisonLi)
//       liGet = document.getElementById("raisonRetrait" + aNum + 0 + raisonRetrait)
//       txtRetrait = document.createElement('p');
//       txtRetrait.textContent = ('-' + soustraction + ':');
//       raisonRetrait = document.createElement('p');
//       raisonRetrait.textContent = (raison)

//       liGet.appendChild(txtRetrait)
//       liGet.appendChild(raisonRetrait)
//   } else {
//       alert('Veuillez entrez un nombre valide')
//   }
// }

function sauvegarderComptes() {
  localStorage.setItem('comptes', JSON.stringify(comptes));
}

function chargerComptes() {
  const storedComptes = localStorage.getItem('comptes');
  if (storedComptes) {
    console.log('storedaccounts')
    comptes = JSON.parse(storedComptes);
    // 
    for (const nomCompte in comptes) {
      if (comptes.hasOwnProperty(nomCompte)) {
        const compte = comptes[nomCompte];
    
        const divCr = document.createElement('div');
        divCr.id = nomCompte;
        divCr.className = 'account';
        accounts.appendChild(divCr);
    
        const accountGet = document.getElementById(nomCompte);
        const accountTitle = document.createElement('h1');
        accountTitle.textContent = compte.nom;
        const accountValue = document.createElement('p');
        accountValue.id = 'account' + compte.nom;
        accountValue.textContent = compte.valeur;
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttonsUl';
    
        accountGet.appendChild(accountTitle);
        accountGet.appendChild(accountValue);
        accountGet.appendChild(buttonsDiv);
    
        const buttonsDivGet = accountGet.querySelector('.buttonsUl');
        const btnAdd = document.createElement('button');
        btnAdd.textContent = 'Ajouter';
        btnAdd.setAttribute('data-compte', nomCompte)
        // set attribute pour garder le compte.
        btnAdd.addEventListener ('click', function() {
          let somme = prompt("Combien ?")
          let raisonAdd = prompt("Pourquoi ?")
          let compteId = compte.nom
          let accountValue = comptes[compteId].valeur;
          console.log(accountValue)
          let newSomme = parseInt(accountValue) + parseInt(somme)
          console.log(newSomme)
          comptes[compteId].valeur = newSomme;
          
          let compteData = localStorage.getItem(compteId)

          if(compteData){
            let compte = json.parse(compteData)
            compte.valeur = newSomme;
            localStorage.setItem(compteId, JSON.stringify(compte));
            // sauvegarderComptes();
            // location.reload();
          }
          
          // document.getElementById('account' + compteId).innerHTML = newSomme;
          
          // comptes[compteId].raison = raisonAdd;
          //Faire completement un nouvel objet à l'interieur de l'objet raisons. et y stocker tout le flux.
        });
        const btnRetrait = document.createElement('button');
        btnRetrait.textContent = 'Retirer';
        btnRetrait.addEventListener ('click', function() {
          retirerArgent();
        });
        const deleteAccount = document.createElement('button')
        deleteAccount.textContent = 'Supprimer le compte'
        deleteAccount.addEventListener ('click', function(){
          let compteId = compte.nom;
          supprCompte(compteId);
          console.log(compte.nom)
        })

        buttonsDivGet.appendChild(btnAdd);
        buttonsDivGet.appendChild(btnRetrait);
        buttonsDivGet.appendChild(deleteAccount)
      }
    }
    
  }
}

function supprCompte (accountId){
  
  localStorage.removeItem(accountId);
  // localStorage.removeItem(accountId);
  
  delete comptes[accountId];

  sauvegarderComptes();
  location.reload();
  
  console.log('suppression de compte initialisé')
  console.log(accountId)
  delete comptes.mike;
  

  //Supression ne fonctionne pas, soit a cause du local storage, ou peut etre le fait que les infos se stockent
  //dans le html.

}


//Local storage optimal.

// Supprimer compte.
// ajouter et retirer de l'argent d'un compte + raison.
// Sauvegarder les flux d'argent (avec raison) dans l'objet comptes.
// Faire des transferts suivis entre comptes

//Fusionner la creation des elements html lors d'initiation de compte et lors de chargement de la page.
//ou alors des que valeurs initiés reload.

// Ajout d'entrées/sorties d'argent a venir. Ponctuel ou répétitif.
// Graphiques du flux monétaire.
// Prévision avenirs, basé sur les entrées/sorties a venirs et/ou sur des moyennes de dépenses et entrées.

// Design

// Comment manipuler le objets et maitriser le local storage.