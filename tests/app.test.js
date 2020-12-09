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


});



