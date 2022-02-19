const itemsService = require('./items.service');

module.exports = {
  addItem: async (req, res, next) => {
    try {
      const dt = await itemsService.addItem(req.body.title);
      res.send(dt);
    } catch (err) {
      next(err);
    }
  },
  editItem: async (req, res, next) => {
    try {
      const dt = await itemsService.editItem(req.body.id, req.body.newTitle);
      res.send(dt);
    } catch (err) {
      next(err);
    }
  },
  deleteItem: async (req, res, next) => {
    try {
      const dt = await itemsService.deleteItem(req.params.id);
      res.send(dt);
    } catch (err) {
      next(err);
    }
  },
  getAllItems: async (req, res, next) => {
    try {
      const dt = await itemsService.getAllItems();
      res.send(dt);
    } catch (err) {
      next(err);
    }
  },
};
