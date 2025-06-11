const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items');

router.get('/', itemController.index);
router.get('/new', itemController.new);
router.post('/', itemController.create);
router.get('/:id', itemController.show);
router.get('/:id/edit', itemController.edit);
router.post('/:id', itemController.update);
router.post('/:id/delete', itemController.delete);

module.exports = router;