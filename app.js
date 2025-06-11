const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const categoryRoutes = require('./routes/categories');
const itemRoutes = require('./routes/items');
const db = require('./config/database');

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Temporary seed route for production
app.get('/seed', async (req, res) => {
  try {
    // Create tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT
      );
      
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        quantity INTEGER NOT NULL CHECK (quantity >= 0),
        price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
        category_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      );
    `);

    // Insert seed data
    await db.query(`
      INSERT INTO categories (name, description) VALUES
      ('Electronics', 'Devices and gadgets'),
      ('Clothing', 'Apparel and accessories'),
      ('Books', 'Various genres of books')
      ON CONFLICT (name) DO NOTHING;
      
      INSERT INTO items (name, description, quantity, price, category_id) VALUES
      ('Smartphone', 'Latest model', 10, 699.99, (SELECT id FROM categories WHERE name = 'Electronics')),
      ('Laptop', 'High-performance laptop', 5, 999.99, (SELECT id FROM categories WHERE name = 'Electronics')),
      ('T-Shirt', 'Cotton casual shirt', 50, 19.99, (SELECT id FROM categories WHERE name = 'Clothing')),
      ('Novel', 'Bestselling fiction', 30, 14.99, (SELECT id FROM categories WHERE name = 'Books'))
      ON CONFLICT (name) DO NOTHING;
    `);

    res.send('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).send('Seeding failed: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.render('home', { title: 'Inventory App' });
});

app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});