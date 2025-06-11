const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const categoryRoutes = require('./routes/categories');
const itemRoutes = require('./routes/items');

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main'); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Inventory App' });
});

app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});