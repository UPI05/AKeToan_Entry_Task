const router = require('express').Router();
const itemsController = require('./items.controller');
const { validate } = require('../../middleware/validate');

router.post('/add', validate, itemsController.addItem);
router.put('/edit', validate, itemsController.editItem);
router.delete('/delete/:id', validate, itemsController.deleteItem);
router.get('/getAll', validate, itemsController.getAllItems);

module.exports = router;
