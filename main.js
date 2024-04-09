let comptes = {};
let init = 0;
let iteration = 0

window.onload = function () {
  chargerComptes();
};

function initCompte (){
    nomPrompt = prompt('Nom')
    valeurPrompt = prompt('valeur')
    //Faire en sorte que le nom du compte soit propre.
    let nomPromptClean = nomPrompt.trim().charAt(0).toUpperCase() + nomPrompt.trim().slice(1).toLowerCase();

    if (/^\d+$/.test(valeurPrompt)) {
      creerCompte(nomPromptClean, valeurPrompt);
  } else {
      alert("La valeur doit être constituée uniquement de chiffres. Et aucun espace ne doit apparaitre dans la valeur. Vous ne pous également pas introduire une valeur négative.");
  }
    // Interdire les noms de compte avec chiffre ?
}

function creerCompte(nom, valeur) {
    if (!comptes.hasOwnProperty(nom) && valeur != NaN && valeur != null && valeur != 0) { 
      comptes[nom] = { nom: nom, valeur: valeur, raisons: [], initiations: 0};
      sauvegarderComptes();
      location.reload();
    } else {
      alert("Le compte existe déjà :", nom);// ou valeur entrée = 0
    }    
}

function ajouterArgent (){ 
  let somme = prompt('entrez la somme à ajouter')
  let raison = prompt('Quel est la raison')
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
        accountValue.textContent = compte.valeur + " € ";
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
          let accountValue = comptes[compteId].valeur;
          
          let somme = prompt("Combien ?")
          let raisonAdd = prompt("Pourquoi ?")

          if (/^\d+$/.test(somme)) {
            let newSomme = parseInt(accountValue) + parseInt(somme)
            comptes[compteId].valeur = newSomme;
            FluxTracker(compteId, somme, raisonAdd, "21/01/2020", 'Ajout');
            sauvegarderComptes();
            location.reload();
          } else {
            alert("La valeur doit être constituée uniquement de chiffres. Et ne doit apparaitre dans la valeur aucun espace.");
          }
        });
        const btnRetrait = document.createElement('button');
        btnRetrait.textContent = 'Retirer';
        btnRetrait.addEventListener ('click', function() {
          let compteId = compte.nom
          let accountValue = comptes[compteId].valeur;
          let soust = prompt("Combien ?")
          let raisonRetrait = prompt("Pourquoi ?")
          
          if (/^\d+$/.test(soust)) {
            let newSomme = parseInt(accountValue) - parseInt(soust)
            comptes[compteId].valeur = newSomme;
            FluxTracker(compteId, soust, raisonRetrait, "21/01/2020", 'Retrait');
            sauvegarderComptes();
            location.reload();
        } else {
            alert("La valeur doit être constituée uniquement de chiffres. Et ne doit apparaitre dans la valeur aucun espace.");
        }
          
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
          let raisonDate = comptes[nomCompte].raisons[i].date // Innutilisé pour l'instant, ajouter calcul de date et heure ?
          let raisonRaison = comptes[nomCompte].raisons[i].raison
          let raisonSomme = comptes[nomCompte].raisons[i].somme
          let raisonajoutOuRetrait = comptes[nomCompte].raisons[i].ajoutOuRetrait

          const raisonLi = document.createElement('li')
          raisonLi.textContent = raisonajoutOuRetrait + ' de ' + raisonSomme + ' euros : ' + raisonRaison;
          raisonLi.id = nomCompte + iteration;
          detailsGet.appendChild(raisonLi);
          iteration += 1;
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

  if (/^\d+$/.test(somme)) {
    if(somme <= comptes[accountId1].valeur){
      transfert(accountId1, accountId2, somme, raison);
    }else{
      alert("Vous n'avez pas assez sur votre compte ! Vous voulez faire un transfert de: " + somme 
      + ' euros depuis le compte ' + accountId1 + ' vers le compte ' + accountId2 + ". Mais il n'y a actuellement que " 
      + comptes[accountId1].valeur + ' euros sur le compte ' + accountId1 )
    }
  } else {
    alert("La valeur doit être constituée uniquement de chiffres. Et aucun espace ne doit apparaitre dans la valeur.");
  }
}

function transfert (accountId1, accountId2, somme, raison){
  // Compte 1 = compte qui envoie vers le compte2
  compte1Valeur = comptes[accountId1].valeur;
  compte2Valeur = comptes[accountId2].valeur;
  newValeurCompte1 = parseInt(compte1Valeur) - parseInt(somme);
  newValeurCompte2 = parseInt(compte2Valeur) + parseInt(somme);

  raisonTransfert1 = " Transfert vers le compte: " + accountId2 + '. Raison: ' + raison;
  raisonTransfert2 = " Virement en provenance du compte: " + accountId1 + ". Commentaire de l'envoyeur: " + commentaire;

  FluxTracker(accountId1, somme, raisonTransfert1, "21/01/2020", retrait);
  FluxTracker(accountId2, somme, raisonTransfert2, "21/01/2020", ajout);
  
  //raison on la garde de coté pour l'instant.

  comptes[accountId1].valeur = newValeurCompte1;
  comptes[accountId2].valeur = newValeurCompte2;

  sauvegarderComptes();
  location.reload();
}