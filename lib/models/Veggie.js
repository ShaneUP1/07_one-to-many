const pool = require('../utils/pool');
const Farmshare = require('./Farmshare');

module.exports = class Veggie {
    id;
    name;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
    }

    static async insert({ name }) {
        const { rows } = await pool.query(
            'INSERT INTO veggies (name) VALUES ($1) RETURNING *',
            [name]
        );
        return new Veggie(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM veggies WHERE id=$1',
            [id]
        );
        if (!rows[0]) throw new Error(`No veggies by that ${id} around here`);
        return new Veggie(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM veggies'
        );
        return rows.map(row => new Veggie(row));
    }

    static async update(id, { name }) {
        const { rows } = await pool.query(
            `UPDATE veggies
            SET name=$1
            WHERE id=$2
            RETURNING *`,
            [name, id]
        );

        if (!rows[0]) throw new Error('No veggies with that id around these parts');
        return new Veggie(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM veggies
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        return new Veggie(rows[0]);
    }
};
