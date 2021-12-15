# Node Ecole Directe

[![downloadsBadge](https://img.shields.io/npm/dt/node-ecole-directe?style=for-the-badge)](https://npmjs.com/node-ecole-directe)
[![versionBadge](https://img.shields.io/npm/v/node-ecole-directe?style=for-the-badge)](https://npmjs.com/node-ecole-directe)
[![patreonBadge](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3DAndroz2091%26type%3Dpledges&style=for-the-badge)](https://patreon.com/Androz2091)

## Fonctionnalités

🔐 Authentification pour les comptes **Élèves** et **Familles**  
📑 Récupération des **notes**  
📚 Récupération des **devoirs**  
📅 Récupération des **emplois du temps**  
🏃🏽 Récupération des éléments de **vie scolaire** (retards, absences, sanctions, etc...)

## Exemples

⚠️ Dans les exemples suivants, le compte utilisé est un compte **Élève**. Pour utiliser un compte Famille, il faut que vous précisiez l'élève.  
Par exemple `compte.fetchNotes()` deviendra `compte.eleves[0].fetchNotes()`, `compte.eleves[1].fetchNotes()`, etc.

```js
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
(async () => {
    const compte = await session.connexion("identifiant", "mot-de-passe");
    // Vous êtes maintenant connecté à école directe !

    console.log(compte);
    /*
    [
        {
            type: "Élève",
            prenom: "Clotilde",
            nom: "Fernandez",
            sexe: "F",
            classe: "Cinquième D"
        }
    ]
    */
})();
```

## Liste des méthodes


```js
const EcoleDirecte = require("node-ecole-directe");
const session = new EcoleDirecte.Session();
(async () => {
    const compte = await session.connexion("identifiant", "mot-de-passe");
    // Vous êtes maintenant connecté à école directe !

    // Récupération des notes
    const notes = await compte.fetchNotes();

    // Récupération de l'emploi du temps
    const emploiDuTemps = await compte.fetchEmploiDuTemps(); // Sans date spécifiée
    const emploiDuTempsDu18Au22 = await compte.fetchEmploiDuTemps(
    "2020-03-18",
    "2020-03-22"
    ); // Avec une date de début et une date de fin

    // Récupération du cahier de texte
    const cahierDeTexte = await compte.fetchCahierDeTexte();
    const cahierDeTexteJourSpecifique = await compte.fetchCahierDeTexteJour("2020-11-01");

    // Récupération des éléments de vie scolaire (retards, absences, etc...)
    const vieScolaire = await compte.fetchVieScolaire();
})();
```

## Crédits

Merci à [Derp#5777](https://github.com/Derpinou), [R3dlessX](https://github.com/R3dlessX) et [Enertix Le Vrai#0001](https://github.com/Christian-Martins) pour le prêt de leurs identifiants pour effectuer la totalité des tests!
