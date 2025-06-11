const db = require('../config/database');

async function seed() {
  try {
    // Insert categories
    await db.query(`INSERT INTO categories (name, description) VALUES
      ('Electronics', 'Devices and gadgets'),
      ('Clothing', 'Apparel and accessories'),
      ('Books', 'Various genres of books')
    `);

    // Insert items
    await db.query(`INSERT INTO items (name, description, quantity, price, category_id) VALUES
      ('Smartphone', 'Latest model', 10, 699.99, (SELECT id FROM categories WHERE name = 'Electronics')),
      ('Laptop', 'High-performance laptop', 5, 999.99, (SELECT id FROM categories WHERE name = 'Electronics')),
      ('T-Shirt', 'Cotton casual shirt', 50, 19.99, (SELECT id FROM categories WHERE name = 'Clothing')),
      ('Novel', 'bestseller fiction', 30, 14.29, (SELECT id FROM categories WHERE name = 'Books'))
    `);

    console.log('Successfully seeded database');
  } catch (error) {
    console.error('Error in seeding database:', error);
  } finally {
    db.end();
  }
};

seed();