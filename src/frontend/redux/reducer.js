import * as actions from './actionTypes';

export default function reducer(state = { items: [], itemsDisplayState: [], token: '', userInfo: {} }, action) {
  switch (action.type) {
    case actions.editItems:
      return { items: action.payload.items, itemsDisplayState: state.itemsDisplayState, token: state.token, userInfo: state.userInfo };
    case actions.editItemsDisplayState:
      return { items: state.items, itemsDisplayState: action.payload.itemsDisplayState, token: state.token, userInfo: state.userInfo };
    case actions.addToken:
      return { items: state.items, itemsDisplayState: state.itemsDisplayState, token: action.payload.token, userInfo: state.userInfo };
    case actions.addUserInfo:
      return { items: state.items, itemsDisplayState: state.itemsDisplayState, token: state.token, userInfo: action.payload.userInfo };
    default:
      return state;
  }
}
