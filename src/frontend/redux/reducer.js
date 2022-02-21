import * as actions from './actionTypes';

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.editItems:
      return { items: action.payload.items, itemsDisplayState: state.itemsDisplayState, token: state.token };
    case actions.editItemsDisplayState:
      return { items: state.items, itemsDisplayState: action.payload.itemsDisplayState, token: state.token };
    case actions.addToken:
      return { items: state.items, itemsDisplayState: state.itemsDisplayState, token: action.payload.token };
    default:
      return state;
  }
}
