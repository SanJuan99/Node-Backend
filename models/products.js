const DataStore = require('nedb');
const products = new DataStore({ filename: './data/products.db', autoload: true });

// Modell för produkter i NeDB
module.exports = products;