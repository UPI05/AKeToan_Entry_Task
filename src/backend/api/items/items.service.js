import * as constants from '../../common/constants';

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
        message: constants.RES_MSG_ADD_ITEM_SUCCESS,
      };
    } catch (err) {
      throw new AppError('500', constants.RES_MSG_CAN_NOT_ADD_ITEM);
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
        message: constants.RES_MSG_EDIT_ITEM_SUCCESS,
      };
    } catch (err) {
      throw new AppError('500', constants.RES_MSG_CAN_NOT_EDIT_ITEM);
    }
  },
  deleteItem: async _id => {
    try {
      await Items.remove({
        _id,
      });
      return {
        statusCode: 200,
        message: constants.RES_MSG_DELETE_ITEM_SUCCESS,
      };
    } catch (err) {
      throw new AppError('500', constants.RES_MSG_CAN_NOT_DELETE_ITEM);
    }
  },
  getAllItems: async () => {
    try {
      const dt = await Items.find({});
      return {
        statusCode: 200,
        message: constants.RES_MSG_GET_ITEMS_SUCCESS,
        data: dt,
      };
    } catch (err) {
      throw new AppError('500', constants.RES_MSG_CAN_NOT_GET_ITEMS);
    }
  },
};
