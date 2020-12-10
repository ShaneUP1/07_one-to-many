const pool = require('../utils/pool');
const Veggie = require('./Veggie');

module.exports = class Farmshare {
    id;
    name;
    veggieId;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.veggieId = row.veggie_id;
    }

    static async insert({ name, veggieId }) {
        const { rows } = await pool.query(
            'INSERT INTO farmshares (name, veggie_id) VALUES ($1, $2) RETURNING *',
            [name, veggieId]
        );
        return new Farmshare(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM farmshares WHERE id=$1',
            [id]
        );
        if (!rows[0]) throw new Error(`No farmshares by that ${id} around here`);
        return new Farmshare(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM farmshares'
        );
        return rows.map(row => new Farmshare(row));
    }

    static async update(id, { name, veggieId }) {
        const { rows } = await pool.query(
            `UPDATE farmshares 
            SET name=$1, veggie_id=$2
             WHERE id=$3 
             RETURNING *`,
            [name, veggieId, id]
        );
        return new Farmshare(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE FROM farmshares
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        return new Farmshare(rows[0]);

    }

};

