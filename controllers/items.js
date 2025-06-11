const Item = require('../models/item');
const Category = require('../models/category');

module.exports = {
  async index(req, res) {
    const items = await Item.getAll();
    res.render('items/index', { title: 'Items', items });
  },
  async new(req, res) {
    const categories = await Category.getAll();
    res.render('items/new', { title: 'New Item', categories });
  },
  async create(req, res) {
    const { name, description, quantity, price, category_id } = req.body;
    await Item.create(name, description, quantity, price, category_id);
    res.redirect('/items');
  },
  async show(req, res) {
    const item = await Item.getById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.render('items/show', { title: item.name, item });
  },
  async edit(req, res) {
    const item = await Item.getById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    const categories = await Category.getAll();
    res.render('items/edit', { title: `Edit ${item.name}`, item, categories });
  },
  async update(req, res) {
    const { name, description, quantity, price, category_id } = req.body;
    await Item.update(req.params.id, name, description, quantity, price, category_id);
    res.redirect(`/items/${req.params.id}`);
  },
  async delete(req, res) {
    await Item.delete(req.params.id);
    res.redirect('/items');
  },
};