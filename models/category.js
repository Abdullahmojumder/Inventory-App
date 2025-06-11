const pool = require('../config/database');

module.exports = {
  async getAll() {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
  },
  async getById(id) {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  },
  async create(name, description) {
    const result = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return result.rows[0];
  },
  async update(id, name, description) {
    const result = await pool.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  },
};