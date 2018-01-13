import { combineReducers } from 'redux'
import swapItemReducer from './redux/swapItem/reducer'

const reducer = combineReducers({
  swapItem: swapItemReducer
});

export default reducer;
