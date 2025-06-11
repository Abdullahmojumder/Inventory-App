const pool = require('../config/database');

module.exports = {
  async getAll() {
    const result = await pool.query(`
      SELECT items.*, categories.name AS category_name
      FROM items
      LEFT JOIN categories ON items.category_id = categories.id
      ORDER BY items.name
    `);
    return result.rows;
  },
  async getById(id) {
    const result = await pool.query(`
      SELECT items.*, categories.name AS category_name
      FROM items
      LEFT JOIN categories ON items.category_id = categories.id
      WHERE items.id = $1
    `, [id]);
    return result.rows[0];
  },
  async create(name, description, quantity, price, category_id) {
    const result = await pool.query(
      'INSERT INTO items (name, description, quantity, price, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, quantity, price, category_id || null]
    );
    return result.rows[0];
  },
  async update(id, name, description, quantity, price, category_id) {
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2, quantity = $3, price = $4, category_id = $5 WHERE id = $6 RETURNING *',
      [name, description, quantity, price, category_id || null, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
  },
};