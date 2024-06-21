const express = require('express');
const isAdmin = require('../middlewares/auth');
const products = require('../models/products');
const campaigns = require('../models/campaigns');

const router = express.Router();

// Endpoint för att lägga till en ny kampanj
router.post('/', isAdmin, (req, res) => {
    const { productsIncluded, campaignPrice } = req.body;
    if (!productsIncluded || !campaignPrice) {
        return res.status(400).send({ message: 'All fields are required.' });
    }
    products.find({ id: { $in: productsIncluded } }, (err, foundProducts) => {
        if (err || foundProducts.length !== productsIncluded.length) {
            return res.status(400).send({ message: 'Some products do not exist.' });
        }
        const campaign = { productsIncluded, campaignPrice, createdAt: new Date() };
        campaigns.insert(campaign, (err, newCampaign) => {
            if (err) {
                return res.status(500).send({ message: 'Failed to add campaign.' });
            }
            res.status(201).send(newCampaign);
        });
    });
});

module.exports = router;