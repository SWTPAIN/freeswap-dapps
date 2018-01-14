import * as ACTIONS from './actions.js';

const initialState = {
  form: {
    name: 'sss',
    description: ''
  },
  totalNumberOfItems: 0,
  items: []
}

const swapItemReducer = (state = initialState, action) => {
	switch(action.type) {
    case ACTIONS.UPDATE_NEW_ITEM_NAME:
      return {...state, form: {...state.form, name: action.payload}};
    case ACTIONS.UPDATE_NEW_ITEM_DESCRIPTION:
      return {...state, form: {...state.form, description: action.payload}};
    case ACTIONS.GET_TOTAL_NUMBER_OF_ITEMS_SUCCESS:
      return {...state, totalNumberOfItems: action.payload};
    case ACTIONS.GET_ONE_ITEM_SUCCESS:
      console.log('action', action.payload);
      return {...state, items: [...state.items, action.payload]};
    default:
      return state;
	}
}

export default swapItemReducer;
