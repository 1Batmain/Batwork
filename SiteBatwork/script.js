

function envoyerMessage() {

    const userInput = document.getElementById('user-input').value;      // Récupère le texte saisi par l'utilisateur

    if (userInput.trim() !== '') {                                      // Vérifie que l'entrée n'est ps vide
        
        
        const userMessageElement = document.createElement('div');       // Crée un nouvel élément div pour afficher le message de l'utilisateur
        userMessageElement.classList.add('nvmessage');                 // Ajoute la classe 'nvmessage' à l'élément créé
        userMessageElement.textContent = userInput;                     // Ajoute le contenu à l'élément

        const chatbox = document.getElementById('chatbox');             // Définie l'élement chatbox comme la div d'id 'chatbox' dans mon document
        chatbox.appendChild(userMessageElement);                        // Ajoute userMessageElement à chatbox

        chatbox.scrollTop = chatbox.scrollHeight;                       // Scroll 

        
        
        
        
        
        fetch('http://127.0.0.1:3000/nvmsg', {                          // Envoi une requête au serveur sur l'endpoint /nvmsg
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse reçue:', data);                        // Traite la réponse du serveur

            const batbotResponseElement = document.createElement('div');       // Crée un nouvel élément div pour afficher la reponse de batbot
            batbotResponseElement.classList.add('nvmessage');                 // Ajoute la classe 'nvmessage' à l'élément créé
            batbotResponseElement.textContent = "Batbot : " + data.message.text.value;                     // Ajoute le contenu de la réponse à l'élément

            chatbox.appendChild(batbotResponseElement);                        // Ajoute userMessageElement à chatbox

            chatbox.scrollTop = chatbox.scrollHeight;                       // Scroll 
            // ICI : CODE POUR AFFICHER LA REPONSE DANS L'UI

        })
        .catch((error) => {
            console.error('Erreur: ', error);
        });
    
        document.getElementById('user-input').value = '';               // Efface le champ de saisie
    }
};

document.getElementById('send').addEventListener('click', envoyerMessage);

document.getElementById('user-input').addEventListener('keydown',function(event) {
    if(event.key === "Enter"){
        event.preventDefault();
        envoyerMessage();
    }
})
