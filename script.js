// Ce script est pour les futures interactions, comme le fondu et d'autres effets
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.sidebar ul li a');

    // Ajouter un effet de fondu à chaque lien
    links.forEach(link => {
        link.addEventListener('mouseover', function () {
            this.style.transition = 'all 0.5s ease';
        });
    });

    // Ajouter des événements de clic pour chaque carte d'actualité
    document.querySelectorAll('.actualite-card').forEach(card => {
        card.addEventListener('click', function () {
            const imageSrc = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const text = this.getAttribute('data-text');
            openModal(title, text, imageSrc);
        });
    });
});

// Fonction pour ouvrir la modale
function openModal(title, text, imageSrc) {
    document.getElementById('modalTitle').innerHTML = title; // Utiliser innerHTML pour le titre
    document.getElementById('modalText').innerHTML = text; // Utiliser innerHTML pour le texte formaté
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modal').style.display = 'block';
}

// Fonction pour fermer la modale
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fermer la modale en cliquant en dehors du contenu
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal(); // Appeler la fonction closeModal
    }
}

// Sélectionner les éléments du DOM pour le formulaire de soumission
const form = document.getElementById('pdfForm');
const pdfFileInput = document.getElementById('pdfFile');
const responseMessage = document.getElementById('responseMessage');

// URL du webhook Discord
const webhookURL = 'https://discord.com/api/webhooks/1290421890522943498/9Qm4mnOnrHSS9tuUhAvlvg9xf3FcTO5YfjZhYV3D1TZlLn_0v_8kgRogEh7wkkqBPIhF';

// Événement pour le formulaire de soumission
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const file = pdfFileInput.files[0];

    if (!file) {
        responseMessage.textContent = "Veuillez sélectionner un fichier.";
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Envoi du fichier via webhook
    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            responseMessage.textContent = "Fichier envoyé avec succès !";
        } else {
            responseMessage.textContent = "Échec de l'envoi du fichier.";
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi : ", error);
        responseMessage.textContent = "Erreur lors de l'envoi du fichier.";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
    let delay = 0;

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, delay);
        delay += 500; // Augmente le délai pour chaque carte (500ms ici, ajuste selon tes besoins)
    });
});