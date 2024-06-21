const express = require('express');
const isAdmin = require('../middlewares/auth');
const products = require('../models/products');
const mongoose = require('mongoose');
const router = express.Router();

// Ladda miljövariabler från .env-filen
require('dotenv').config();

// Använd miljövariabel för databas-URL
const dbUrl = process.env.DB;

// Endpoint för att hämta alla produkter
router.get('/', (req, res) => {
    products.find({}, (err, allProducts) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to fetch products.' });
        }
        res.status(200).send(allProducts);
    });
});

// Anslut till databasen
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database!'))
    .catch(err => console.error('Failed to connect to the database:', err));



// Endpoint för att lägga till en ny produkt i menyn
router.post('/', isAdmin, (req, res) => {
    const { id, title, desc, price } = req.body;
    if (!id || !title || !desc || !price) {
        return res.status(400).send({ message: 'All fields are required.' });
    }
    const product = { id, title, desc, price, createdAt: new Date() };
    products.insert(product, (err, newProduct) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to add product.' });
        }
        res.status(201).send(newProduct);
    });
});

// Endpoint för att modifiera en befintlig produkt i menyn
router.put('/:id', isAdmin, (req, res) => {
    const { id, title, desc, price } = req.body;
    const updatedProduct = { id, title, desc, price, modifiedAt: new Date() };
    products.update({ id: req.params.id }, { $set: updatedProduct }, {}, (err, numReplaced) => {
        if (err || numReplaced === 0) {
            return res.status(500).send({ message: 'Failed to update product.' });
        }
        res.status(200).send(updatedProduct);
    });
});

// Endpoint för att ta bort en produkt från menyn
router.delete('/:id', isAdmin, (req, res) => {
    products.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
        if (err || numRemoved === 0) {
            return res.status(500).send({ message: 'Failed to delete product.' });
        }
        res.status(200).send({ message: 'Product deleted successfully.' });
    });
});

module.exports = router;