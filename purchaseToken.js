const express = require('express');
const bodyParser = require('body-parser');
const TokenContract = require('./smartContract');

const app = express();
app.use(bodyParser.json());

 
const tokenContract = new TokenContract('MyToken', 'MTK', 1000);// Crée un contrat ERC20

// API POST pour permettre à un utilisateur d'acheter des tokens
app.post('/purchase', (req, res) => {
  const { buyerAddress, amount } = req.body;

  // Ajoute la quantité spécifiée de tokens à l'adresse de l'acheteur 
  tokenContract.addHolder(buyerAddress, amount);

  // Renvoie un JSON pour indiquer le succès de l'achat
  res.json({ success: true, message: 'Tokens achetés avec succès' });
});

app.listen(3000, () => {
  console.log('Port 3000');
});
