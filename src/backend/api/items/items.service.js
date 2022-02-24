import * as constants from '../../common/constants';

const { Items } = require('../../models/itemsModel');
const { AppError } = require('../../common/errors/AppError');

module.exports = {
  addItem: async (title, isAdmin) => {
    try {
      const item = new Items({
        title,
        isAdmin,
      });
      item.save();
      return {
        statusCode: 200,
        message: constants.RES_MSG_ADD_ITEM_SUCCESS,
      };
    } catch (err) {
      throw new AppError(500, constants.RES_MSG_CAN_NOT_ADD_ITEM);
    }
  },
  editItem: async (_id, newTitle, isAdmin) => {
    try {
      let query = { _id };
      if (!isAdmin) query = { _id, isAdmin };
      await Items.updateOne(query, { title: newTitle });
      return {
        statusCode: 200,
        message: constants.RES_MSG_EDIT_ITEM_SUCCESS,
      };
    } catch (err) {
      throw new AppError(500, constants.RES_MSG_CAN_NOT_EDIT_ITEM);
    }
  },
  deleteItem: async (_id, isAdmin) => {
    try {
      let query = { _id };
      if (!isAdmin) query = { _id, isAdmin };
      await Items.remove(query);
      return {
        statusCode: 200,
        message: constants.RES_MSG_DELETE_ITEM_SUCCESS,
      };
    } catch (err) {
      throw new AppError(500, constants.RES_MSG_CAN_NOT_DELETE_ITEM);
    }
  },
  getAllItems: async isAdmin => {
    try {
      let query = { isAdmin };
      if (isAdmin) query = {};
      const dt = await Items.find(query);
      return {
        statusCode: 200,
        message: constants.RES_MSG_GET_ITEMS_SUCCESS,
        data: dt,
      };
    } catch (err) {
      throw new AppError(500, constants.RES_MSG_CAN_NOT_GET_ITEMS);
    }
  },
};
