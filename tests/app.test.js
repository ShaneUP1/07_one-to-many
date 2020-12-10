const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Farmshare = require('../lib/models/Farmshare');
const Veggie = require('../lib/models/Veggie');
const pool = require('../lib/utils/pool');

describe('app endpoint', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    });
    afterAll(() => {
        return pool.end();
    });

    it('creates a new veggie via POST', async () => {
        const res = await request(app)
            .post('/veggies')
            .send({
                name: 'cucumber'
            });

        expect(res.body).toEqual({
            id: '1',
            name: 'cucumber'
        });
    });

    it('GETs a single veggie by Id', async () => {
        const newVeggie = await Veggie.insert({ name: 'cucumber' });

        const response = await request(app)
            .get('/veggies/1');

        expect(response.body).toEqual(newVeggie);
    });

    it('GETs all veggies', async () => {
        const allVeggies = await Promise.all([
            {
                name: 'cucumber'
            },
            {
                name: 'squash'
            },
            {
                name: 'corn'
            }
        ].map(veggie => Veggie.insert(veggie)));

        const response = await request(app)
            .get('/veggies');

        expect(response.body).toEqual(expect.arrayContaining(allVeggies));
        expect(response.body).toHaveLength(allVeggies.length);
    });

    it('updates a veggie by id via PUT', async () => {
        const newVeggie = await Veggie.insert({ name: 'corn' });

        const response = await request(app)
            .put(`/veggies/${newVeggie.id}`)
            .send({ name: 'cauliflower' });

        expect(response.body).toEqual({
            id: newVeggie.id,
            name: 'cauliflower'
        });
    });

    it('Deletes a veggie by id via DELETE', async () => {
        const newVeggie = await Veggie.insert({ name: 'potato' });

        const response = await request(app)
            .delete(`/veggies/${newVeggie.id}`);

        expect(response.body).toEqual(newVeggie);

    });



    it('creates a new Farmshare via POST', async () => {
        const newVeggie = await Veggie.insert({ name: 'tomato' });

        const res = await request(app)
            .post('/farmshares')
            .send({ name: 'Smith', veggieId: newVeggie.id });

        expect(res.body).toEqual({
            id: '1',
            name: 'Smith',
            veggieId: newVeggie.id
        });
    });

    it('GETs a single farmshare by Id', async () => {
        const newVeggie = await Veggie.insert({ name: 'cucumber' });

        const newFarmshare = await Promise.all([
            { name: 'Smith', veggieId: newVeggie.id },
            { name: 'Elvis', veggieId: newVeggie.id },
            { name: 'Big Boi', veggieId: newVeggie.id }
        ].map(farmshare => Farmshare.insert(farmshare)));

        const res = await request(app)
            .get('/farmshares/1');

        expect(res.body).toEqual(newFarmshare[0]);
    });

    it('GETs all farmshares', async () => {
        const newVeggie = await Veggie.insert({ name: 'cucumber' });

        const newFarmshare = await Promise.all([
            { name: 'Smith', veggieId: newVeggie.id },
            { name: 'Elvis', veggieId: newVeggie.id },
            { name: 'Big Boi', veggieId: newVeggie.id }
        ].map(farmshare => Farmshare.insert(farmshare)));

        const res = await request(app)
            .get('/farmshares');

        expect(res.body).toEqual(newFarmshare);
    });

    it('updates an existing farmshare by id via PUT', async () => {
        const newVeggie = await Veggie.insert({ name: 'cucumber' });

        const newFarmshare = await Promise.all([
            { name: 'Smith', veggieId: newVeggie.id },
            { name: 'Elvis', veggieId: newVeggie.id },
            { name: 'Big Boi', veggieId: newVeggie.id }
        ].map(farmshare => Farmshare.insert(farmshare)));

        const res = await request(app)
            .put(`/farmshares/${newFarmshare[0].id}`)
            .send({ name: 'Brown', veggieId: newVeggie.id });

        expect(res.body).toEqual({ id: '1', name: 'Brown', veggieId: newVeggie.id });
    });

    it('deletes an existing farmshare by id', async () => {
        const newVeggie = await Veggie.insert({ name: 'cucumber' });

        const newFarmshare = await Promise.all([
            { name: 'Smith', veggieId: newVeggie.id },
            { name: 'Elvis', veggieId: newVeggie.id },
            { name: 'Big Boi', veggieId: newVeggie.id }
        ].map(farmshare => Farmshare.insert(farmshare)));

        const res = await request(app)
            .delete(`/farmshares/${newFarmshare[2].id}`);

        expect(res.body).toEqual(newFarmshare[2]);

    });

});



