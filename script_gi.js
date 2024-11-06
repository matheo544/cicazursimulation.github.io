const webhookUrl = 'https://discord.com/api/webhooks/1303036429991022624/AANWoNu9HK4uQ_UqQhxN7nTp93kxGv8pRkHAzrOMLddIUghOppYXDKRRYMh313Ea5_rk'; // Remplacez par l'URL de votre Webhook Discord
const channelId = '1205960909445668895'; // Remplacez par l'ID de votre canal Discord

async function fetchInterventions() {
    try {
        const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': 'MTMwMzA5Nzc2NjM4OTQ4MTU2Mg.Gnt3EE.AXfLZz4i6g0Wn1zvbNQZ4b7TvCDojVTE0K7c9c', // Ceci est requis pour récupérer les messages (Token du Bot)
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des messages.');
        }

        const messages = await response.json();

        // Filtrer les messages qui n'ont pas de réaction ":x:"
        const interventions = messages.filter(message => {
            const reactions = message.reactions || [];
            return !reactions.some(reaction => reaction.emoji.name === '❌'); // Vérifie la réaction :x:
        });

        displayInterventions(interventions);
    } catch (error) {
        console.error("Erreur lors de la récupération des interventions :", error);
    }
}

function displayInterventions(interventions) {
    const interventionsList = document.getElementById('interventions-list');
    interventionsList.innerHTML = ''; // Réinitialiser la liste

    if (interventions.length === 0) {
        interventionsList.innerHTML = '<p>Aucune intervention en cours.</p>';
        return;
    }

    interventions.forEach(intervention => {
        const interventionDiv = document.createElement('div');
        interventionDiv.classList.add('intervention');

        // Structure compacte pour l'affichage des messages
        interventionDiv.innerHTML = `
            <p><strong>ID :</strong> ${intervention.id}</p>
            <p><strong>Contenu :</strong> ${intervention.content}</p>
            <p><strong>Date :</strong> ${new Date(intervention.timestamp).toLocaleString()}</p>
            <button class="btn" onclick="finaliserIntervention('${intervention.id}')">Finaliser l'Intervention</button>
        `;

        interventionsList.appendChild(interventionDiv);
    });
}

async function finaliserIntervention(interventionId) {
    // Envoyer une réaction au message via le Webhook
    const payload = {
        content: `Intervention ${interventionId} finalisée.`,
        embeds: [{
            title: `Intervention Terminée`,
            description: `L'intervention avec ID ${interventionId} a été marquée comme terminée.`,
            color: 3066993 // Vert
        }]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi de la réaction au Webhook.');
        }

        alert("Intervention finalisée avec succès !");
        fetchInterventions(); // Récupérer à nouveau les interventions
    } catch (error) {
        console.error("Erreur lors de la finalisation de l'intervention :", error);
    }
}

// Appeler la fonction pour récupérer les interventions au chargement de la page
window.onload = fetchInterventions;
