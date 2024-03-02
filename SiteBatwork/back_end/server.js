const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();


app.use(express.json());                                     //permet de parser des requêtes JSON

// Middleware qui permet toutes  les requêtes CORS
app.use(cors({
    origin: '*' , //Remplacer par * pour autoriser toutes les origines
}));

// Démarer le serveur 
app.listen(port, () => {
    console.log('Le serveur écoute sur le port : ' + port );
});




// Création d'un endpoint sendMessage pour recevoir les messages du frontend
app.post('/nvmsg', async (req, res) => {
    console.log('Corps de la requête: ', req.body);
    const userMessage = req.body.message;
    console.log('Message reçu : ', userMessage);

    // ICI INTEGRATION DE LA LOGIQUE D'ENVOI DU MESSAGE A L'API ET ATTENDRE SA REPONSE
    const openai = new OpenAI(({ apiKey: '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' })) ;

    async function main() {


        // Récupère mon assistant Batbot
          const myAssistant = await openai.beta.assistants.retrieve(
            "asst_x4H0sAdsNBL9vMqGr5kEjBF7"
          );
      
      
          // Crée un nouveau thread 
          const emptyThread = await openai.beta.threads.create();
      
      
          // Crée un message
          const message = await openai.beta.threads.messages.create(
            emptyThread.id,
            {
              role: "user",
              content: userMessage
            }
          );
      
            // Lance la réponse de l'assistant 
          const run = await openai.beta.threads.runs.create(
            emptyThread.id,
            { 
              assistant_id: myAssistant.id,
            }
          );
            // Verifie le statut de la réponse 
          // Initialisation de 'statut' à un objet avec un 'status' initial fictif
                  let statut = { status: 'initial' };
      
                  while (statut.status !== 'completed') {
                    // Récupération du statut
                    statut = await openai.beta.threads.runs.retrieve(emptyThread.id, run.id);
      
                    // Vérifiez ici si 'statut' a une structure différente et ajustez en conséquence
      
                    if (statut.status === 'completed') {
                      console.log('Le processus est terminé.');
                      break; // Sortie de la boucle si le statut est 'completed'
                    } else {
                      console.log("Batbot est en train  d'écrire...");
                      await sleep(1000); // Attend 1 seconde avant de réessayer
                    }
                  }
      
          const messages = await openai.beta.threads.messages.list(
            emptyThread.id
          );
      
        console.log(message.content)
        console.log(messages.data[0].content)
        
        const assistantResponse = {message:messages.data[0].content[0] };
        res.json(assistantResponse); // Renvoi la réponse au frontend
          
      
      
      
      // Fonction pour attendre un certain temps (en ms)
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
          }
      
      main();
    
    
    
    
    // Fin de la communication avec l'api 
    
    // Envoi d'une réponse (factice) au front-end

});



