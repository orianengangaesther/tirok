class TokenContract {
    // Cette classe représente un contrat ERC20 simulé pour la gestion des tokens.
    constructor(name, symbol, totalSupply) {
      this.name = name; // Nom du token ("MyToken")
      this.symbol = symbol; // Symbole du token ("MTK")
      this.totalSupply = totalSupply; // L'approvisionnement total de tokens
      this.holders = {}; // Une table pour stocker les soldes
    }
  
    // Méthode pour ajouter des tokens à un détenteur
    addHolder(holderAddress, amount) {
      this.holders[holderAddress] = amount;
    }
  
    // Méthode pour obtenir le solde de tokens d'un détenteur
    getBalance(holderAddress) {
      return this.holders[holderAddress] || 0; // Si l'adresse n'a pas de solde, retourne 0
    }
  
    // Méthode pour transférer des tokens d'un détenteur à un autre
    transferTokens(fromAddress, toAddress, amount) {
      if (this.getBalance(fromAddress) >= amount) {
        this.holders[fromAddress] -= amount;
        this.holders[toAddress] += amount;
        return true; // La transaction a réussi
      } else {
        return false; // Solde insuffisant
      }
    }
  }
  
  module.exports = TokenContract;
