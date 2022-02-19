const router = require('express').Router();
const itemsController = require('./items.controller');

router.post('/add', itemsController.addItem);
router.put('/edit', itemsController.editItem);
router.delete('/delete/:id', itemsController.deleteItem);
router.get('/getAll', itemsController.getAllItems);

module.exports = router;
