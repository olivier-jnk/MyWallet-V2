let comptes = {};
let accountNum = 0;

chargerComptes();

function initCompte (){
    nomz = prompt('Nom')
    valeurz = prompt('valeur')
    creerCompte(nomz, valeurz)
}

function creerCompte(nom, valeur) {
    if (!comptes.hasOwnProperty(nom)) {
      comptes[nom] = { nom: nom, valeur: valeur };
      sauvegarderComptes();
      console.log("Nouveau compte créé :", nom);
      console.log(nom)
      console.log(valeur)

      const accounts = document.getElementById('accounts')
      const divCr = document.createElement('div')
      divCr.id = nom;
      divCr.className = 'account'
      accounts.appendChild(divCr)

      const accountGet = document.getElementById(nom)
      const accountTitle = document.createElement('h1')
      accountTitle.textContent = (nom)
      const accountValue = document.createElement('p')
      accountValue.textContent = (valeur)
      const buttonsDiv = document.createElement('div')
      buttonsDiv.id = 'buttonsUl'
      

      accountGet.appendChild(accountTitle)
      accountGet.appendChild(accountValue)
      accountGet.appendChild(buttonsDiv)

      const buttonsDivGet = document.getElementById('buttonsUl')
      const btnAdd = document.createElement('button')
      btnAdd.id = "buttonAdd"
      btnAdd.textContent = ("Ajouter")
      btnRetrait.addEventListener ('click', function() {
        ajouterArgent();
      });
      const btnRetrait = document.createElement('button')
      btnRetrait.id = "buttonRetrait"
      btnRetrait.textContent = ("Retirer")
      btnRetrait.addEventListener ('click', function() {
        retirerArgent();
      });

      buttonsDivGet.appendChild(btnAdd)
      buttonsDivGet.appendChild(btnRetrait)

    } else {
      alert("Le compte existe déjà :", nom);
    }
}

function ajouterArgent (){ 
  somme = prompt('entrez la somme à ajouter')
  raison = prompt('Quel est la raison')
  if (somme !== isNaN && somme !== null && somme !== 0) {

      // const compte = comptes[nomCompte];
      // Recuperer le compte en questions
      // modifier la valeur en fonction de la somme
      // ajouter la somme dans une liste avec la raison d'ajout.
      // comptes.accountNum.valeur = comptes.accountNum.valeur + somme;
      // comptes[nomCompte].valeur += montant;

  } else {
      alert('Veuillez entrez un nombre valide')
  }
}

// Récupérer le nom du compte sur lequel le boutton à été activé et modifier la somme dans l'objet.
function retirerArgent (){
  soustraction = prompt('entrez la somme à soustraire')
  raison = prompt('Quelle est la raison')
  if (soustraction !== isNaN && soustraction !== null && soustraction !== 0) {
    raisonRetrait = raisonRetrait + 1;
      argent = parseInt(argent) - parseInt(soustraction)
      document.getElementById('laSomme' + aNum).innerHTML = argent + ' euros';

      let raisonsGet = document.getElementById('raisons' + aNum)
      console.log(aNum)
      let raisonLi = document.createElement('li')
      raisonLi.id = "raisonRetrait" + aNum + 0 + raisonRetrait;
      raisonLi.className = "valeurSuivi"

      raisonsGet.appendChild(raisonLi)
      liGet = document.getElementById("raisonRetrait" + aNum + 0 + raisonRetrait)
      txtRetrait = document.createElement('p');
      txtRetrait.textContent = ('-' + soustraction + ':');
      raisonRetrait = document.createElement('p');
      raisonRetrait.textContent = (raison)

      liGet.appendChild(txtRetrait)
      liGet.appendChild(raisonRetrait)
  } else {
      alert('Veuillez entrez un nombre valide')
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
          accountNum = compte.nom
          console.log(accountNum)
          ajouterArgent();
        });
        const btnRetrait = document.createElement('button');
        btnRetrait.textContent = 'Retirer';
        btnRetrait.addEventListener ('click', function() {
          retirerArgent();
        });
    
        buttonsDivGet.appendChild(btnAdd);
        buttonsDivGet.appendChild(btnRetrait);
      }
    }
    
  }
}


//Local storage optimal.

// Suprimer compte.
// ajouter et retirer de l'argent d'un compte + raison.
// Sauvegarder les flux d'argent dans l'objet comptes.
// Faire des transferts suivis entre comptes

// Ajout d'entrées/sorties d'argent avenir. Ponctuel ou répétitif.
// Graphiques du flux monétaire.
// Prévision avenirs, basé sur les entrées/sorties avenirs et/ou sur des moyennes de dépenses et entrées.

// Design