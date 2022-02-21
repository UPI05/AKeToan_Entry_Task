import * as actions from './actionTypes';

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.editItems:
      return { items: action.payload.items, itemsDisplayState: state.itemsDisplayState };
    case actions.editItemsDisplayState:
      return { items: state.items, itemsDisplayState: action.payload.itemsDisplayState };
    default:
      return state;
  }
}
