import * as actions from './actionTypes';

export const editItems = items => ({
  type: actions.editItems,
  payload: {
    items,
  },
});

export const editItemsDisplayState = itemsDisplayState => ({
  type: actions.editItemsDisplayState,
  payload: {
    itemsDisplayState,
  },
});

export const addToken = token => ({
  type: actions.addToken,
  payload: {
    token,
  },
});
