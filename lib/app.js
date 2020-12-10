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
        .then(veggie => res.send(veggie))
        .catch(next);
});

app.get('/veggies', (req, res, next) => {
    Veggie
        .find()
        .then(veggie => res.send(veggie))
        .catch(next);
});

app.put('/veggies/:id', (req, res, next) => {
    Veggie
        .update(req.params.id, req.body)
        .then(veggie => res.send(veggie))
        .catch(next);
});

app.delete('/veggies/:id', (req, res, next) => {
    Veggie
        .delete(req.params.id)
        .then(veggie => res.send(veggie))
        .catch(next);
});



app.post('/farmshares', (req, res, next) => {
    Farmshare
        .insert(req.body)
        .then(farmshare => res.send(farmshare))
        .catch(next);
});

app.get('/farmshares/:id', (req, res, next) => {
    Farmshare
        .findById(req.params.id)
        .then(farmshare => res.send(farmshare))
        .catch(next);
});

app.get('/farmshares', (req, res, next) => {
    Farmshare
        .find()
        .then(veggie => res.send(veggie))
        .catch(next);
});

app.put('/farmshares/:id', (req, res, next) => {
    Farmshare
        .update(req.params.id, req.body)
        .then(farmshare => res.send(farmshare))
        .catch(next);
});

app.delete('/farmshares/:id', (req, res, next) => {
    Farmshare
        .delete(req.params.id)
        .then(farmshare => res.send(farmshare))
        .catch(next);
});

module.exports = app;
