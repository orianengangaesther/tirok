const express = require('express');
const bodyParser = require('body-parser');
const TokenContract = require('./smartContract');

const app = express();
app.use(bodyParser.json());

// Crée un contrat ERC20 simulé avec un nom, un symbole et un approvisionnement initial.
const tokenContract = new TokenContract('MyToken', 'MTK', 1000);

// API POST endpoint pour permettre à un utilisateur de payer un loyer.
app.post('/payRent', (req, res) => {
  const { payerAddress, rentAmount } = req.body;

  // Vérifie si le solde du payeur est suffisant pour payer le loyer
  const currentBalance = tokenContract.getBalance(payerAddress);

  if (currentBalance >= rentAmount) {
    // Logique pour déduire le loyer du solde du payeur et redistribuer aux détenteurs de tokens
    tokenContract.holders[payerAddress] -= rentAmount;

    // Logique pour distribuer le montant du loyer aux détenteurs de tokens

    // Renvoie un JSON pour indiquer le succès du paiement du loyer
    res.json({ success: true, message: 'Paiement du loyer réussi' });
  } else {
    // Renvoie une erreur si le solde est insuffisant
    res.status(400).json({ success: false, message: 'Solde insuffisant' });
  }
});

app.listen(3000, () => {
  console.log('Port 3000');
});
