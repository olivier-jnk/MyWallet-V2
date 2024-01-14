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
      // Modifier le if, pour que la valeur soit correcte et que si non elseif spéciale, sinon: compte existe déjà.
      comptes[nom] = { nom: nom, valeur: valeur, raisons: [], initiations: 0};
      // comptes[raisons] = [];
      sauvegarderComptes();
      location.reload();
    } else {
      alert("Le compte existe déjà :", nom);// ou valeur entrée = 0
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
            FluxTracker(compteId, somme, raisonAdd, "21/01/2020", ajout);
            sauvegarderComptes();
            location.reload();
          } else {
            alert("La valeur doit être constituée uniquement de chiffres. Et ne doit apparaitre dans la valeur aucun espace.");
          }
        // Faire une fonction pour reprendre ce systeme de verification plus simplement sans besoin de le répeter partout ?
        // Juste besoin de recuperer les infos necessaires et de les envoyer à la fonction.
        // Embetant, car utilisateur entre toutes les infos et l'alert ne le préviens que à la fin. Surtout pour transfert.
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
            FluxTracker(compteId, soust, raisonRetrait, "21/01/2020", retrait);
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

// Améliorations / Modifications.

// selections des comptes pour transfert avec qlq chose de plus visuel. Remplacer les prompts ! systeme plus moderne de selection et entree des valeurs.
// Bloquer les boxs max-width pour empecher redimensionnement lors d'ouverture de details.
// Mettre l'historique dans le bon ordre. Les plus récents le plus en haut.
// mettre en couleur le texte de l'historique. ajout et retrait en gras + vert ou rouge.
// Possibilité d'etre à découvert ? avec retrait ? pourquoi pas. 

// Revoir Design.

// BONUS:
// Ajout d'entrées/sorties d'argent à venir. Temporaires ou permanentes.
// Graphiques du flux monétaire .
// Prévision avenirs, basé sur les entrées/sorties à venirs et/ou sur des moyennes de dépenses et entrées.
// Amelioration plus tard des moyens de creations de changement de compte et de modification, retirer les alerts et prompts faire ca mode intuitif.
// Possibilité de changer le nom du compte, la valeur, supprimer l'historique... ajouter des commentaires aux raisons.
// Ajouter le systeme de calcul de date pour dater chq flux.
// choix du type de monnaie et conversion lors du transfert.