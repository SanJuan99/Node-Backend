const DataStore = require('nedb');
const campaigns = new DataStore({ filename: './data/campaigns.db', autoload: true });

// Modell för kampanjer i NeDB
module.exports = campaigns;