let comptes = {};
let accountNum = 0;
let init = 0;
let ajout = 'Ajout'
let retrait = 'Retrait'
let iteration = 0


window.onload = function () {
  chargerComptes();
};

function initCompte (){
    nomz = prompt('Nom')
    valeurz = prompt('valeur')
    // valeurzv = valeurz.split(" ").join(""); //Pour eviter les comptes: 'compte '. Pb dans le transfert.
    // console.log(valeurzv)

    // if(valeurz = ){
    //   creerCompte(nomz, valeurz)
    // }else{
    //   alert("La valeur est constitué de lettre, elle ne doit contenir que des chiffres.")
    // }
}

function creerCompte(nom, valeur) {
    if (!comptes.hasOwnProperty(nom) && valeur != NaN && valeur != null && valeur != 0) { 
      // Modifier le if, pour que la valeur soit correcte et que si non elseif spéciale, sinon: compte existe déjà.
      comptes[nom] = { nom: nom, valeur: valeur, raisons: [], initiations: 0};
      // comptes[raisons] = [];
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
        btnAdd.addEventListener ('click', function() {
          let compteId = compte.nom

          comptes[compteId].initiations += 1;

          init = comptes[compteId].initiations; // Changer le nom plus tard.
          let somme = prompt("Combien ?")
          let raisonAdd = prompt("Pourquoi ?")

          let accountValue = comptes[compteId].valeur;

          let newSomme = parseInt(accountValue) + parseInt(somme)

          comptes[compteId].valeur = newSomme;

          FluxTracker(compteId, somme, raisonAdd, "21/01/2020", ajout);

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
          FluxTracker(compteId, soust, raisonRetrait, "21/01/2020", retrait);
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

        //Mise en place de l'historique
        const raisonUl = document.createElement('details')
        raisonUl.id = "Flux" + nomCompte;
        
        accountGet.appendChild(raisonUl)

        const detailsGet = document.getElementById('Flux' + nomCompte)
        const createSummary = document.createElement('summary')
        createSummary.textContent = 'Historique';
        detailsGet.appendChild(createSummary)
        console.log(comptes[nomCompte].raisons.length + 'length')

        for (let i = 0; i < comptes[nomCompte].raisons.length; i++) {
          console.log('LANCE')
          // Recuperation de tous les element du flux et conversion en chaine de caracteres.
          let raisonDate = comptes[nomCompte].raisons[i].date // Innutilisé pour l'instant, ajouter calcul de date et heure ?
          let raisonRaison = comptes[nomCompte].raisons[i].raison
          let raisonSomme = comptes[nomCompte].raisons[i].somme
          let raisonajoutOuRetrait = comptes[nomCompte].raisons[i].ajoutOuRetrait

          //Trouver un moyen plus propre de faire tout ca
          
          const raisonLi = document.createElement('li')
          raisonLi.textContent = raisonajoutOuRetrait + ' de ' + raisonSomme + ' euros : ' + raisonRaison;
          raisonLi.id = nomCompte + iteration;
          detailsGet.appendChild(raisonLi);
          // iteration += 1;
        } 
      }
    } 
  }
}

function FluxTracker (compteId, somme, raison, date, ajoutOuRetrait) {

  if (comptes.hasOwnProperty(compteId)) {
      const nouvelleRaison = {
          message: `date : ${date} ${ajoutOuRetrait} de ${somme} euros sur le compte. Raison indiquée : ${raison}`,
          date: date,
          somme: somme,
          raison: raison,
          ajoutOuRetrait: ajoutOuRetrait,
      };
      // pas mal de faire un message mais peut etre mieux de stocker en plus chaque variables séparément pour pouvoir faire. Apres apparaitre 
      // Le message voulu en html, en fonction de la situation

      comptes[compteId].raisons.push(nouvelleRaison);

      sauvegarderComptes();
      location.reload();
  } else {
      alert("Le compte " + compteId + "n'existe pas...");
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
  raison = prompt('Ajouter une raison'); // Inclure somme + prompt des le debut ou le faire plus tard en fonnction du type ?
  commentaire = prompt('Ajouter un commentaire pour le compte: ' + accountId2)
  transfert(accountId1, accountId2, somme, raison);

}

function transfert (accountId1, accountId2, somme, raison){
  // Compte 1 = compte qui envoie vers le compte2
  compte1Valeur = comptes[accountId1].valeur;
  compte2Valeur = comptes[accountId2].valeur;
  newValeurCompte1 = parseInt(compte1Valeur) - parseInt(somme);
  newValeurCompte2 = parseInt(compte2Valeur) + parseInt(somme);

  raisonTransfert1 = " Transfert vers le compte: " + accountId2 + ' Raison: ' + raison;
  raisonTransfert2 = " Virement du compte: " + accountId1 + " Commentaire de l'envoyeur " + commentaire;

  FluxTracker(accountId1, somme, raisonTransfert1, "21/01/2020", retrait);
  FluxTracker(accountId2, somme, raisonTransfert2, "21/01/2020", ajout);
  
  //raison on la garde de coté pour l'instant.

  comptes[accountId1].valeur = newValeurCompte1;
  comptes[accountId2].valeur = newValeurCompte2;

  sauvegarderComptes();
  location.reload();
}

// Mieux encadrer l'entree de valeurs pour éviter les problemes (5 000, valeur de comptes en lettres...)
// Amelioration plus tard des moyens de creations de changement de compte et de modification, retirer les alerts et prompts faire ca mode intuitif.
// Possibilité de changer le nom du compte, la valeur, supprimer l'historique... ajouter des commentaires aux raisons.

// Ajouter le systeme de calcul de date pour dater chq flux.
// Ajouter le systeme anti-mauvais transfert. si un compte veut transferer 540 sur un autre mais il n'a que 30, refuser le transfert.

// selections des comptes pour transfert avec qlq chose de plus visuel.

// BONUS:
// Ajout d'entrées/sorties d'argent a venir. Ponctuelles ou répétitives.
// Graphiques du flux monétaire .
// Prévision avenirs, basé sur les entrées/sorties à venirs et/ou sur des moyennes de dépenses et entrées.

// Design