const express = require('express');
const Farmshare = require('./models/Farmshare');
const Veggie = require('./models/Veggie');
const app = express();

app.use(express.json());

app.post('/veggies', (req, res, next) => {
    Veggie
        .insert(req.body)
        .then(veggie => res.send(veggie))
        .catch(next);
});

app.get('/veggies/:id', (req, res, next) => {
    Veggie
        .findById(req.params.id)
        .then(veggie => res.send(veggie));
});

module.exports = app;
