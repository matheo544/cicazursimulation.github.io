// Sélectionner les éléments du DOM
const compteRenduForm = document.getElementById('compteRenduForm');

// URL du webhook Discord
const webhookURL = 'https://discord.com/api/webhooks/1303036429991022624/AANWoNu9HK4uQ_UqQhxN7nTp93kxGv8pRkHAzrOMLddIUghOppYXDKRRYMh313Ea5_rk';

// Fonction pour générer un numéro d'intervention unique
function generateInterventionNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Génère un nombre aléatoire entre 100000 et 999999
}

// Événement pour le formulaire de soumission
compteRenduForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const formData = new FormData(compteRenduForm);
    const nom = formData.get('nom');
    const prenom = formData.get('prenom');
    const adresse = formData.get('adresse');
    const complementAdresse = formData.get('complementAdresse') || "Non spécifié";
    const codePostal = formData.get('codePostal');
    const ville = formData.get('ville');
    const motifIntervention = formData.get('motifIntervention');
    const observations = formData.get('observations') || "Aucune observation";
    const operateur = formData.get('operateur');
    const date = formData.get('date');
    const heure = formData.get('heure');

    // Générer un numéro d'intervention
    const interventionNumber = generateInterventionNumber();

    // Création du payload pour Discord sous forme de message
    const payload = {
        content: `INTERVENTION **n°${interventionNumber}**\n\n` + // Ajout du numéro d'intervention
            `**Nom**: ${nom}\n` +
            `**Prénom**: ${prenom}\n` +
            `**Adresse**: ${adresse}\n` +
            `**Complément d'Adresse**: ${complementAdresse}\n` +
            `**Code Postal**: ${codePostal}\n` +
            `**Ville**: ${ville}\n` +
            `**Motif de l'Intervention**: ${motifIntervention}\n` +
            `**Observations**: ${observations}\n` +
            `**Opérateur**: ${operateur}\n\n` +
            `**Date**: ${date}\n` +
            `**Heure**: ${heure}\n`
    };

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Fiche Intervention Crée avec Succès !');
            compteRenduForm.reset(); // Réinitialiser le formulaire après envoi
        } else {
            alert("Échec de la création de l'Intervention.");
        }
    } catch (error) {
        console.error('Erreur lors de l’envoi : ', error);
        alert("Erreur lors de l’envoi de l'intervention.");
    }
});
