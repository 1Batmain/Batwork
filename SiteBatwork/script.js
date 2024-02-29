


document.getElementById('send').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;      // Récupère le texte saisi par l'utilisateur

    if (userInput.trim() !== '') {                                      // Vérifie que l'entrée n'est ps vide
        fetch('http://localhost:3000/nvmsg', {                                               // Envoi une requête au serveur sur l'endpoint /nvmsg
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse reçue:', data);                        // Traite la réponse du serveur

            // ICI : CODE POUR AFFICHER LA REPONSE DANS L'UI

        })
        .catch((error) => {
            console.error('Erreur: ', error);
        });
    
        document.getElementById('user-input').value = '';               // Efface le champ de saisie
    }
});