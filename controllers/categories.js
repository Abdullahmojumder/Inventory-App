const Category = require('../models/category');

module.exports = {
  async index(req, res) {
    const categories = await Category.getAll();
    res.render('categories/index', { title: 'Categories', categories });
  },
  new(req, res) {
    res.render('categories/new', { title: 'New Category' });
  },
  async create(req, res) {
    const { name, description } = req.body;
    await Category.create(name, description);
    res.redirect('/categories');
  },
  async show(req, res) {
    const category = await Category.getById(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    const items = await require('../models/item').getAll();
    const categoryItems = items.filter(item => item.category_id == req.params.id);
    res.render('categories/show', { title: category.name, category, items: categoryItems });
  },
  async edit(req, res) {
    const category = await Category.getById(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    res.render('categories/edit', { title: `Edit ${category.name}`, category });
  },
  async update(req, res) {
    const { name, description } = req.body;
    await Category.update(req.params.id, name, description);
    res.redirect(`/categories/${req.params.id}`);
  },
  async delete(req, res) {
    await Category.delete(req.params.id);
    res.redirect('/categories');
  },
};