const { Items } = require('../../models/itemsModel');
const { AppError } = require('../../common/errors/AppError');

module.exports = {
  addItem: async title => {
    try {
      const item = new Items({
        title,
      });
      item.save();
      return {
        statusCode: 200,
        message: 'Add item successfully',
      };
    } catch (err) {
      throw new AppError('500', 'Can not add item');
    }
  },
  editItem: async (_id, newTitle) => {
    try {
      await Items.updateOne(
        {
          _id,
        },
        { title: newTitle },
      );
      return {
        statusCode: 200,
        message: 'Edit item successfully',
      };
    } catch (err) {
      throw new AppError('500', 'Can not add item');
    }
  },
  deleteItem: async _id => {
    try {
      await Items.remove({
        _id,
      });
      return {
        statusCode: 200,
        message: 'Delete item successfully',
      };
    } catch (err) {
      throw new AppError('500', 'Can not add item');
    }
  },
  getAllItems: async () => {
    try {
      const dt = await Items.find({});
      return {
        statusCode: 200,
        message: 'Get items successfully',
        data: dt,
      };
    } catch (err) {
      throw new AppError('500', 'Can not add item');
    }
  },
};
