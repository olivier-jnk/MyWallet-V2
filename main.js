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
    if (!comptes.hasOwnProperty(nom) && valeur != NaN && valeur != null && valeur != 0) { 
      // Modifier le if, pour que la valeur soit correcte et que si non elseif spéciale, sinon: compte existe déjà.
      comptes[nom] = { nom: nom, valeur: valeur };
      sauvegarderComptes();
      location.reload();
    } else {
      alert("Le compte existe déjà :", nom);
    }
    
    // else if(valeur == Nan || valeur == null || valeur == 0){
    //   alert("Merci d'entrer une valeur valide.")
    // }   
}

function ajouterArgent (){ 
  somme = prompt('entrez la somme à ajouter')
  raison = prompt('Quel est la raison')
  if (somme !== isNaN && somme !== null && somme !== 0) {

  } else {
      alert('Veuillez entrer un nombre valide')
  }
}

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

        // let raisonnement = {
        //   raisonNum : nomCompte + '01',
        // }
        // let compteIdpre = comptes[nomCompte]
        // let raisons = Object.create(raisonnement)
        // raisons.name = 'raisons' + nomCompte;

        btnAdd.addEventListener ('click', function() {
          let somme = prompt("Combien ?")
          let raisonAdd = prompt("Pourquoi ?")
          let compteId = compte.nom
          let accountValue = comptes[compteId].valeur;

          let newSomme = parseInt(accountValue) + parseInt(somme)

          comptes[compteId].valeur = newSomme;

          // const raisonCreate = comptes[compteId].Object.create(raisons)
          // raison

          sauvegarderComptes();
          location.reload();
        });
        const btnRetrait = document.createElement('button');
        btnRetrait.textContent = 'Retirer';
        btnRetrait.addEventListener ('click', function() {
          let soust = prompt("Combien ?")
          let raisonRetrait = prompt("Pourquoi ?")
          let compteId = compte.nom
          let accountValue = comptes[compteId].valeur;
          let newSomme = parseInt(accountValue) - parseInt(soust)
          comptes[compteId].valeur = newSomme;
          sauvegarderComptes();
          location.reload();
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

  delete comptes[accountId];
  sauvegarderComptes();
  location.reload();
  console.log('suppression de compte initialisé')
  console.log(accountId)

}

function preTransfert (){

  accountId1 = prompt('Compte qui envoie')
  accountId2 = prompt('Compte qui recoit')
  somme = prompt('Combien ?')
  raison = prompt('Ajouter un commentaire')
  transfert(accountId1, accountId2, somme, raison);

}

function transfert (accountId1, accountId2, somme, raison){
  // Compte 1 = compte qui envoie vers le compte2
  compte1Valeur = comptes[accountId1].valeur;
  compte2Valeur = comptes[accountId2].valeur;
  newValeurCompte1 = parseInt(compte1Valeur) - parseInt(somme);
  newValeurCompte2 = parseInt(compte2Valeur) + parseInt(somme);
  
  //raison on la garde de coté pour l'instant.

  comptes[accountId1].valeur = newValeurCompte1;
  comptes[accountId2].valeur = newValeurCompte2;

  sauvegarderComptes();
  location.reload();
}

//Local storage optimal. x

// ajouter et retirer de l'argent d'un compte x / + raison. 
// Sauvegarder les flux d'argent (avec raison) dans l'objet comptes.
// Faire des transferts x / suivis entre comptes
// Mieux encadrer l'entree de valeurs pour éviter les problemes (5 000, valeur de comptes en lettres...)

// BONUS:
// Ajout d'entrées/sorties d'argent a venir. Ponctuel ou répétitif.
// Graphiques du flux monétaire .
// Prévision avenirs, basé sur les entrées/sorties a venirs et/ou sur des moyennes de dépenses et entrées.

// Design
// Comment manipuler le objets et maitriser le local storage.